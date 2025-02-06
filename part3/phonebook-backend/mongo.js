const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.database_uri;

mongoose.set('strictQuery', false);
mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 character, got {VALUE}'],
    require: true,
  },
  number: String,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
