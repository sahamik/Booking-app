import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.send('Booking app backend toimii!');
});

// Yhdistä MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB yhdistetty'))
  .catch(err => console.log(err));

// Reitit
app.use('/api/auth', authRoutes);

// Käynnistä palvelin
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server käynnissä portissa ${PORT}`));
