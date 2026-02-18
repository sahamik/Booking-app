import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/header";

const BookingForm = ({ authToken, setBookings }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/bookings',
        { title, date, time, note },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      setBookings(prev => [...prev, res.data]);
      setTitle('');
      setDate('');
      setTime('');
      setNote('');
    } catch (err) {
      setError(err.response?.data?.message || 'Varauksen luominen epäonnistui');
    }
  };

  return (
  <div className="min-h-screen bg-linear-to-br from-blue-200 via-slate-100 to-blue-200">
    <Header />

    <main className="flex justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          ← Palaa etusivulle
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Tee uusi varaus
          </h2>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Varauksen nimi
            </label>
            <input
              type="text"
              placeholder="Varauksen nimi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Päivämäärä
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Aika
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Lisätieto
            </label>
            <input
              type="text"
              placeholder="Lisätieto"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Luo varaus
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>
      </div>
    </main>
  </div>
);
};

export default BookingForm;

