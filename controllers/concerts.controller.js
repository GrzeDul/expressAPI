const Concert = require('../models/concert.model');
const Seat = require('./../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const seats = await Seat.find();
    const availableSeats = 50;
    const conWithSeats = concerts.map((concert) => {
      const takenSeats = seats.filter((seat) => seat.day === concert.day);
      return { ...concert._doc, freeSeats: availableSeats - takenSeats.length };
    });
    res.json(conWithSeats);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const newConcert = new Concert(req.body);
    await newConcert.save();
    res.json(newConcert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      for (const [key, value] of Object.entries(req.body)) {
        con[key] = value;
      }
      await con.save();
      res.json(con);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(con);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
