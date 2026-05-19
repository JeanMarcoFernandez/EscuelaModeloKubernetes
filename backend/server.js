const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo-service:27017/school');

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

const Student = mongoose.model('Student', StudentSchema);

app.get('/', (req, res) => {
  res.send('School API Running');
});

// CREATE
app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// READ
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// UPDATE
app.put('/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(student);
});

// DELETE
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});