import phonebookServices from '../services/phonebook';

export default function Persons({ persons, setPersons, setNotification }) {
  const deleteHandler = async (person) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this person?');
    if (!confirmDelete) return;

    const response = await phonebookServices.deletePerson(person.id);

    if (response.status === 404) {
      setNotification({
        message: `Information of ${person.name} has already been removed from server`,
        error: true,
      });

      setTimeout(() => {
        setNotification({
          message: '',
          erro: false,
        });
      }, 3000);
    } else {
      setNotification({
        message: `Deleted ${response.data.name}`,
      });

      setTimeout(() => {
        setNotification({
          message: '',
        });
      }, 3000);
    }

    setPersons((prevPersons) => prevPersons.filter((prevPerson) => prevPerson.id !== person.id));
  };

  return (
    <div>
      {persons.map((person) => (
        <p key={person.name + person.number}>
          {person.name} {person.number}{' '}
          <button onClick={() => deleteHandler(person)}>delete</button>
        </p>
      ))}
    </div>
  );
}
