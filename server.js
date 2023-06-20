const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());
// app.use(cors({
//     "origin": "https://kodilla.com", //origin sets domains that we approve
//     "methods": "GET,POST", //we allow only GET and POST methods
//   }));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const testimonial = db[Math.floor(Math.random() * db.length)];
  res.json(testimonial);
});

app.get('/testimonials/:id', (req, res) => {
  const testimonial = db.find((t) => `${t.id}` === req.params.id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    db.push({ id: uuidv4(), author, text });
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'No author or text...' });
  }
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const testimonial = db.find((t) => `${t.id}` === req.params.id);
  if (!testimonial) res.status(404).json({ message: 'Not found...' });
  if (author && text) {
    testimonial.author = author;
    testimonial.text = text;
    res.json({ message: 'OK' });
  } else {
    res.status(400).json({ message: 'No author or text...' });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const testimonial = db.find((t) => `${t.id}` === req.params.id);
  if (testimonial) {
    db.splice(db.indexOf(testimonial), 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});
