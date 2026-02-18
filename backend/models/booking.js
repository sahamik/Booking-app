import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
