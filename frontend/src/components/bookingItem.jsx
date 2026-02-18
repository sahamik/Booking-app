import { useState } from 'react';
import axios from 'axios';

const BookingItem = ({ booking, authToken, setBookings }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(booking.title);
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);
  const [note, setNote] = useState(booking.note);

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/bookings/${booking._id}`,
        { title, date, time, note },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setBookings(prev => prev.map(b => (b._id === booking._id ? res.data : b)));
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${booking._id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setBookings(prev => prev.filter(b => b._id !== booking._id));
    } catch (err) {
      console.log(err);
    }
  };

  if (editMode) {
    return (
      <li>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        <input value={note} onChange={e => setNote(e.target.value)} />
        <button onClick={handleUpdate}>Tallenna</button>
        <button onClick={() => setEditMode(false)}>Peruuta</button>
      </li>
    );
  }

  return (
    <li>
      {booking.title} - {booking.date} {booking.time} {booking.note && `(${booking.note})`}
      <button onClick={() => setEditMode(true)}>Muokkaa</button>
      <button onClick={handleDelete}>Poista</button>
    </li>
  );
};

export default BookingItem;
