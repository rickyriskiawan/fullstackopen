const mongoose = require('mongoose');
const paramater = process.argv;

if (paramater.length < 3) {
  console.log(`give password as argument`);
  process.exit(1);
}

const username = 'rickyriski';
const password = paramater[2];
const uri = `mongodb+srv://${username}:${password}@database.5ivmwjy.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=database`;

mongoose.set('strictQuery', false);
mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (paramater.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:');

    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

if (paramater.length > 3) {
  const name = paramater[3];
  const number = paramater[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log('person saved!');
    mongoose.connection.close();
  });
}
