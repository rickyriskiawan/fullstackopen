import { useState } from 'react';
import phonebookServices from '../services/phonebook';

export default function PersonForm({ persons, setPersons, setNotification }) {
  const [formPhoneBook, setFormPhonebook] = useState({
    name: '',
    number: '',
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

    if (!formPhoneBook.name || !formPhoneBook.number) {
      setNotification({
        message: `${!formPhoneBook.name ? 'Name' : 'Number'} cannot be empty`,
        error: true,
      });

      setTimeout(() => {
        setNotification({
          message: '',
        });
      }, 3000);

      return;
    }

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

        setPersons(
          persons.map((person) => (person.id === response.data.id ? response.data : person))
        );

        setNotification({
          message: `Updated ${response.data.name}'s number`,
          error: false,
        });

        setTimeout(() => {
          setNotification({
            message: '',
          });
        }, 3000);

        setFormPhonebook({
          name: '',
          number: '',
        });
      }
    } else {
      try {
        const response = await phonebookServices.create(formPhoneBook);
        console.log(response);

        if (response.status === 400) {
          setNotification({
            message: response.data.message,
            error: true,
          });

          setTimeout(() => {
            setNotification({
              message: '',
              error: false,
            });
          }, 3000);
          return;
        }

        setPersons([...persons, response.data]);
        setFormPhonebook({
          name: '',
          number: '',
        });

        setNotification({
          message: `Added ${formPhoneBook.name}`,
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
