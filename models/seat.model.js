const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  id: { type: Number },
  client: { type: String, required: true },
  email: { type: String, required: true },
  seat: { type: Number, required: true },
  day: { type: Number, required: true },
});

module.exports = mongoose.model('Seat', seatSchema);
