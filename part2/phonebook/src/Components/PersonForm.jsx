import { useState } from 'react';

export default function PersonForm({ persons, setPersons }) {
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

  const addHandler = (e) => {
    e.preventDefault();

    const newPerson = {
      ...formPhoneBook,
      id: persons.length + 1,
    };

    const existPerson = persons.find(
      (person) => person.name.toLowerCase() === formPhoneBook.name.toLocaleLowerCase()
    )?.name;

    if (existPerson) {
      alert(`${existPerson} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
      setFormPhonebook({
        name: '',
        number: '',
      });
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
