import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/header";
import defaultAvatar from "../assets/default-avatar.png";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
    password: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      avatar: profile.avatar,
    };

    login(localStorage.getItem("authToken"), updatedUser);
    setEditing(false);
    setMessage("Tiedot päivitetty");
  };

  // Omien tietojen muokkaus kun painetaan "Peruuta" -nappia
  const cancelEditing = () => {
    setEditing(false); // vain muokkaustila pois päältä
  };


// Automaattinen piilotus
useEffect(() => {
  if (!message) return; // jos ei viestiä, ei tehdä mitään

  const timer = setTimeout(() => {
    setMessage(""); // tyhjennä viesti 3 sekunnin jälkeen
  }, 3000);

  return () => clearTimeout(timer); // siivoa ajastin
}, [message]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-200 via-slate-100 to-blue-200">
      <Header />

      <main className="flex justify-center p-6">
        <div className="w-full max-w-md bg-white shadow rounded-xl p-6 space-y-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Takaisin
          </button>

          <h1 className="text-2xl font-bold text-center">
            Oma profiili
          </h1>

          {/* Profiilikuva */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={profile.avatar || defaultAvatar}
              alt="oletus-avatar"
              className="w-38 h-38"
            />
          </div>

          {/* Nimi */}
          <div>
            <label className="block text-sm mb-1">Nimi</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Sähköposti</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
            />
          </div>

          {/* Puhelin */}
          <div>
            <label className="block text-sm mb-1">Puhelinnumero</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder="0401234567"
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
            />
          </div>

          {/* Salasanan vaihto */}
          {editing && (
            <div>
              <label className="block text-sm mb-1">
                Uusi salasana
              </label>
              <input
                name="password"
                type="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="Jätä tyhjäksi jos ei vaihdeta"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          {/* Napit */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Muokkaa tietoja
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Tallenna muutokset
              </button>

              <button
                onClick={cancelEditing}
                className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
              >
                Peruuta
              </button>
            </>
          )}

          {message && (
            <p className="text-green-600 text-center text-sm">
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}