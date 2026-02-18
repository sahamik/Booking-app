import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookingItem from "../components/bookingItem";
import Header from "../components/header";


export default function Dashboard() {
  const { authToken, user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const fetchBookings = async () => {
    if (!authToken) return;
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchBookings();
}, [authToken]);


  return (
  <div className="min-h-screen bg-linear-to-br from-blue-200 via-slate-100 to-blue-200">
    <Header />

    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Tervetuloa, {user?.name} 👋
      </h1>

      <button
        onClick={() => navigate("/booking/new")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Tee uusi varaus
      </button>

      <h2 className="text-xl font-semibold mb-3">
        Omat varaukset
      </h2>

      {bookings.length === 0 ? (
        <p>Ei varauksia vielä.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <BookingItem
              key={b._id}
              booking={b}
              refreshBookings={fetchBookings}
            />
          ))}
        </div>
      )}
    </main>
  </div>
);
}

