const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.database_uri;

mongoose.set('strictQuery', false);
mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
