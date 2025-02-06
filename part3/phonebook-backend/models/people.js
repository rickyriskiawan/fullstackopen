const mongoose = require('mongoose');
require('dotenv').config();
const paramater = process.argv;

const uri = process.env.database_uri;

mongoose.set('strictQuery', false);
mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 character'],
    require: true,
  },

  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    require: [true, 'User phone number required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
