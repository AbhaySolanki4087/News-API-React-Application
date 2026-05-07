import { useState, useEffect, useRef, useCallback } from "react";
import { AuthContext } from "./AuthContext.js";
import { logoutUser } from "../services/api";

const parseJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    if (pad === 2) base64 += "==";
    else if (pad === 3) base64 += "=";
    else if (pad === 1) return null;
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (error) {
    console.error("JWT parse error:", error);
    return null;
  }
};

const getTokenExpiryMs = (token) => {
  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return null;
  return decoded.exp * 1000 - Date.now();
};

const getInitialAuth = () => {
  if (typeof window === "undefined") {
    return { token: null, user: null, isAuthenticated: false };
  }

  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!storedToken || !storedUser) {
    return { token: null, user: null, isAuthenticated: false };
  }

  const expiresInMs = getTokenExpiryMs(storedToken);
  if (!expiresInMs || expiresInMs <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { token: null, user: null, isAuthenticated: false };
  }

  return {
    token: storedToken,
    user: JSON.parse(storedUser),
    isAuthenticated: true,
  };
};

export const AuthProvider = ({ children }) => {
  const initialAuth = getInitialAuth();
  const [user, setUser] = useState(initialAuth.user);
  const [token, setToken] = useState(initialAuth.token);
  const [loading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth.isAuthenticated);
  const logoutTimer = useRef(null);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  }, []);

  const clearAuth = useCallback(
    (redirect = false) => {
      clearLogoutTimer();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (redirect) {
        window.location.href = "/login";
      }
    },
    [clearLogoutTimer]
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const expiresInMs = getTokenExpiryMs(token);
    if (!expiresInMs || expiresInMs <= 0) {
      window.location.href = "/login";
      return;
    }

    logoutTimer.current = window.setTimeout(() => {
      clearAuth(true);
    }, expiresInMs);

    return () => {
      clearLogoutTimer();
    };
  }, [token, clearAuth, clearLogoutTimer]);

  const login = (tokenValue, userValue) => {
    setToken(tokenValue);
    setUser(userValue);
    setIsAuthenticated(true);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userValue));
  };

  const logout = async () => {
    clearLogoutTimer();
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
    clearAuth();
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
