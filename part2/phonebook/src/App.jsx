import { useState } from 'react';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import Filter from './Components/Filter';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [filter, setFilter] = useState('');

  const filteredPersons = persons.filter((person) => {
    return (
      person.name.toLocaleLowerCase().includes(filter) ||
      person.number.split('-').join('').includes(filter)
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
}

export default App;
