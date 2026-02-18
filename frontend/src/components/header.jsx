import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // tyhjentää tokenin ja userin
    navigate("/login"); // vie kirjautumissivulle
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl text-blue-700 font-bold">
        Booking App
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name}
        </span>

        <Link
          to="/calendar"
          className="text-sm text-blue-600 hover:underline"
        >
          Kalenteri
        </Link>

        <Link
          to="/profile"
          className="text-sm text-blue-600 hover:underline"
        >
          Oma profiili
        </Link>

        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
        >
          Kirjaudu ulos
        </button>
      </div>
    </header>
  );
}
