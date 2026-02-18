import express from 'express';
import Booking from '../models/booking.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// 🔹 Kaikki reitit vaativat tokenin
router.use(verifyToken);

// 🔹 Luo varaus
router.post('/', async (req, res) => {
  try {
    const { date, time, note } = req.body;

    const newBooking = new Booking({
      userId: req.user.id,
      date,
      time,
      note
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

// 🔹 Hae kaikki käyttäjän varaukset
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

// 🔹 Päivitä varaus
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Varausta ei löydy' });

    const { date, time, note } = req.body;
    if (date) booking.date = date;
    if (time) booking.time = time;
    if (note) booking.note = note;

    await booking.save();
    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

// 🔹 Poista varaus
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Varausta ei löydy' });

    res.status(200).json({ message: 'Varaus poistettu', booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

export default router;

