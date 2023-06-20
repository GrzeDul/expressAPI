const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const testimonial = db.testimonials[Math.floor(Math.random() * db.length)];
  res.json(testimonial);
});

router.route('/testimonials/:id').get((req, res) => {
  const testimonial = db.testimonials.find((t) => `${t.id}` === req.params.id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    db.testimonials.push({ id: uuidv4(), author, text });
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'No author or text...' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  let index;
  let testimonial = db.testimonials.find((t, i) => {
    index = i;
    return `${t.id}` === req.params.id;
  });
  if (!testimonial) res.status(404).json({ message: 'Not found...' });
  if (Object.keys(req.body).length != 0) {
    db.testimonials[index] = { ...testimonial, ...req.body };
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'Nothing to change' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const testimonial = db.testimonials.find((t) => `${t.id}` === req.params.id);
  if (testimonial) {
    db.testimonials.splice(db.testimonials.indexOf(testimonial), 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});
module.exports = router;
