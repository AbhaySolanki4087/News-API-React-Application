import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Components/User";
import UserByID from "./Components/UserByID";
import Navbar from "./Components/CommonFiles/Navbar";
import News from "./Components/News"; 
import NewsDetail from "./Components/NewsDetail";
import Login from "./Components/User Activity/Login";
import Register from "./Components/User Activity/Register";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProtectedRoute } from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        {/* <Home /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Users />} />} />
          <Route path="/sources" element={<ProtectedRoute element={<Users />} />} />
          <Route path="/sources/:id" element={<ProtectedRoute element={<UserByID />} />} />
          <Route path="/articles" element={<ProtectedRoute element={<News />} />} />
          <Route path="/articles/:index" element={<ProtectedRoute element={<NewsDetail key={window.location.pathname} />} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;