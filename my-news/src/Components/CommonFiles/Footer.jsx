import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">

        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-3">NewsHub</h1>
          <p className="text-sm">
            Stay updated with the latest news, sources, and insights from around the world.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/sources" className="hover:text-white transition">Sources</Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-white transition">Latest News</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Connect</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/contact" className="hover:text-white transition">Email</Link>
            </li>
            <li>
              <Link to="/linkedin" className="hover:text-white transition">LinkedIn</Link>
            </li>
            <li>
              <Link to="/github" className="hover:text-white transition">GitHub</Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} NewsHub. All rights reserved.
      </div>
    </footer>
  );
}