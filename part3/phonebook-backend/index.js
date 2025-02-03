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

const People = require('./models/people');

app.use(cors());
app.use(express.json());

morgan.token('req-body', function (req) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/api/persons', async (req, res, next) => {
  try {
    const people = await People.find({});
    res.status(200).json(people);
  } catch (error) {
    next(error);
  }
});

app.get('/info', (req, res, next) => {
  const date = new Date();
  const personsLength = persons.length;
  res.send(`<p>phonebook has info ${personsLength} people </p> <br> ${date}`);
});

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await People.findById(id);

    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({
        message: 'Data not found',
      });
    }
  } catch (error) {
    next(error);
  }
});

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPerson = await People.findByIdAndDelete(id);

    if (!deletedPerson) {
      res.status(404).json({
        message: 'Id not found',
      });
    }
    res.status(200).json({
      status: 'Delete successfull',
      data: deletedPerson,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/persons', async (req, res, next) => {
  try {
    const name = req.body.name;
    const number = req.body.number;

    if (!name || !number) {
      return res.status(400).json({
        error: !name ? 'Name cant be empty' : 'Number cant be empty',
      });
    }

    const newPerson = new People({
      name: name,
      number: number,
    });

    const person = await newPerson.save();

    res.status(201).json({
      message: 'Person Saved',
      data: person,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const number = req.body.number;
    const updatedPerson = await People.findByIdAndUpdate(id, { number: number }, { new: true });

    res.status(200).json({
      message: 'Updated successfull',
      data: updatedPerson,
    });
  } catch (error) {}
});

const errorHandling = (error, req, res, next) => {
  const errorName = error.name;
  console.log(errorName);

  if (errorName === 'CastError') {
    return res.status(400).json({
      message: 'invalid id',
    });
  }
};

app.use(errorHandling);

app.listen(PORT, () => {
  console.log('Server Running On Port 3001');
});
