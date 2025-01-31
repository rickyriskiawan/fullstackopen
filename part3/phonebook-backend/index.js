const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.use(cors());
app.use(express.json());

morgan.token('req-body', function (req) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const date = new Date();
  const personsLength = persons.length;
  res.send(`<p>phonebook has info ${personsLength} people </p> <br> ${date}`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const name = req.body.name;
  const number = req.body.number;

  if (!name || !number) {
    return res.status(400).json({
      error: !name ? 'Name cant be empty' : 'Number cant be empty',
    });
  }

  const existedPerson = persons.find((person) => person.name.toLowerCase() === name.toLowerCase());

  if (existedPerson) {
    return res.status(400).json({
      error: 'Name must be unique',
    });
  }

  const id = Math.floor(Math.random() * 1000);
  const newPerson = {
    id: id.toString(),
    name: name,
    number: number,
  };
  persons = persons.concat(newPerson);

  res.json(newPerson);
});

app.listen(PORT, () => {
  console.log('Server Running On Port 3001');
});
