import { useState } from 'react';
import phonebookServices from '../services/phonebook';

export default function PersonForm({ persons, setPersons, setNotification }) {
  const [formPhoneBook, setFormPhonebook] = useState({
    name: '',
    number: '',
    id: 0,
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormPhonebook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addHandler = async (e) => {
    e.preventDefault();

    const newPerson = {
      ...formPhoneBook,
      id: Math.floor(Math.random() * 100000).toString(),
    };

    const existPerson = persons.find(
      (person) => person.name.toLowerCase() === formPhoneBook.name.toLocaleLowerCase()
    );

    if (existPerson) {
      const confrimReplace = window.confirm(
        `${existPerson.name} is already added to phonebook, replace the old number with a new one ?`
      );

      if (confrimReplace) {
        const response = await phonebookServices.updatePerson(existPerson.id, {
          ...existPerson,
          number: formPhoneBook.number,
        });

        setPersons(persons.map((person) => (person.id === response.id ? response : person)));
      }
    } else {
      try {
        await phonebookServices.create(newPerson);
        setPersons([...persons, newPerson]);
        setFormPhonebook({
          name: '',
          number: '',
        });

        setNotification({
          message: `Added ${newPerson.name}`,
        });

        setTimeout(() => {
          setNotification({
            message: '',
          });
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form>
      <div>
        <label>name:</label>
        <input name='name' value={formPhoneBook.name} onChange={onChangeHandler} />
      </div>

      <div>
        <label>number:</label>
        <input name='number' value={formPhoneBook.number} onChange={onChangeHandler} />
      </div>

      <div>
        <button type='submit' onClick={addHandler}>
          add
        </button>
      </div>
    </form>
  );
}
