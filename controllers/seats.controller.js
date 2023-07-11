const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const isTaken = await Seat.findOne({
      day: req.body.day,
      seat: req.body.seat,
    });

    if (!isTaken) {
      const newSeat = new Seat(req.body);
      await newSeat.save();
      req.io.emit('seatsUpdated', await Seat.find());
      res.json(newSeat);
    } else {
      res.status(409).json({ message: 'Seat taken, Please select another' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      for (const [key, value] of Object.entries(req.body)) {
        seat[key] = value;
      }
      await seat.save();
      res.json(seat);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(seat);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
