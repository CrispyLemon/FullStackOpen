import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from "./services/phonebook"

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <h2>Filter by name: </h2> 
      <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    phoneService
      .func1()
      .then((response) => {
        console.log("promise fulfilled")
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase());

    if (existingPerson) {
      if (window.confirm(`Person ${existingPerson.name} already exists. Update phone number to ${newNumber}?`)) {
        phoneService
          .update(existingPerson.id, newPerson) // Use PUT for update
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error("Error updating person:", error);
          });
      }
    } else {
      phoneService
        .func2(newPerson) // Use POST for creating new person
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber(''); 
        })
      .catch(error => {
        console.error("Error creating person:", error);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete ${persons.find(p => p.id === id).name}?`)) {
      phoneService
        .remove(id) // Pass the actual ID to be deleted
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error("Error deleting person:", error);
        });
    }
  }
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
