const express = require('express');
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
