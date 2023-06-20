const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const concert = db.concerts.find((c) => `${c.id}` === req.params.id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (performer && genre && price && day && image) {
    db.concerts.push({ id: uuidv4(), performer, genre, price, day, image });
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Not enough data...' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  let index;
  let concert = db.concerts.find((c, i) => {
    index = i;
    return `${c.id}` === req.params.id;
  });
  if (!concert) res.status(404).json({ message: 'Not found...' });
  if (Object.keys(req.body).length != 0) {
    db.concerts[index] = { ...concert, ...req.body };
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Nothing to change' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const concert = db.concerts.find((c) => `${c.id}` === req.params.id);
  if (concert) {
    db.concerts.splice(db.concerts.indexOf(concert), 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});
module.exports = router;
