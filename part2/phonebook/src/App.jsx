import { useEffect, useState } from 'react';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import Filter from './Components/Filter';
import phoneBookServices from './services/phonebook';
import Notification from './Components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({
    message: '',
    error: false,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await phoneBookServices.getAll();
        setPersons(response);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const [filter, setFilter] = useState('');

  const filteredPersons = persons.filter((person) => {
    return (
      person.name.toLocaleLowerCase().includes(filter) ||
      person.number.replace('-', '').includes(filter)
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <Notification notifInfo={notification} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification} />

      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
}

export default App;
