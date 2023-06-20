const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const seatData = db.seats.find((s) => `${s.id}` === req.params.id);
  if (seatData) {
    res.json(seatData);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if (day && seat && client && email) {
    db.seats.push({ id: uuidv4(), day, seat, client, email });
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Not enough data...' });
  }
});

router.route('/seats/:id').put((req, res) => {
  let index;
  const seatData = db.seats.find((s, i) => {
    index = i;
    return `${s.id}` === req.params.id;
  });
  if (!seatData) res.status(404).json({ message: 'Not found...' });
  if (Object.keys(req.body).length != 0) {
    db.seats[index] = { ...seatData, ...req.body };
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Nothing to change' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const seatData = db.seats.find((s) => `${s.id}` === req.params.id);
  if (seatData) {
    db.seats.splice(db.seats.indexOf(seatData), 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});
module.exports = router;
