const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let cars = [
  { name: 'Ford Aspire', id: 'A101' },
  { name: 'Ford Ecosport', id: 'A102' },
  { name: 'Ford Fiesta', id: 'A103' },
];

// Retrieve all cars
app.get('/read', (req, res) => {
  res.json(cars);
});

// Add a new car
app.post('/insert', (req, res) => {
  const { name, id } = req.body || {};
  if (!name || !id) {
    return res.status(400).json({ error: 'name and id are required' });
  }
  if (cars.some((c) => c.id === id)) {
    return res.status(409).json({ error: `Car with id ${id} already exists` });
  }
  cars.push({ name, id });
  res.json(cars);
});

// Update a car's name by id
app.put('/update/:id', (req, res) => {
  const car = cars.find((c) => c.id === req.params.id);
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  car.name = name;
  res.json(cars);
});

// Delete a car by id
app.delete('/delete/:id', (req, res) => {
  const index = cars.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Car not found' });
  }
  cars.splice(index, 1);
  res.json(cars);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
