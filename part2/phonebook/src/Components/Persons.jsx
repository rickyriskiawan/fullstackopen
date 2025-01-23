import phonebookServices from '../services/phonebook';

export default function Persons({ persons, setPersons }) {
  const deleteHandler = async (personID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this person?');
    if (!confirmDelete) return;

    try {
      await phonebookServices.deletePerson(personID);
      setPersons((prevPersons) => prevPersons.filter((person) => person.id !== personID));
      console.log(`Person with ID ${personID} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => deleteHandler(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
}
