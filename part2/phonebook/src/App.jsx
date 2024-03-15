//TODO: Fix delete

import { useState, useEffect } from 'react'
import phoneService from './services/phonebook'
const Persons = ({ filteredPersons, setPersons }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <Delete person = {person} setPersons={setPersons} /> 
        </div> 
      ))}
    </>
  )
}

const Delete = ({ person, setPersons }) => {
  const delPerson = (event) => {
    event.preventDefault();
    phoneService
      .del(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
      });
  }
  return(
    <div>
      {person.name} {person.number}
      <button onClick={delPerson}>delete</button>
    </div>
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
      .getAll()
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

    if (!existingPerson) {
    phoneService
      .change(newPerson)
      .then(response => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');  
      })

    } else {
      window.alert(`${newName} exists in the phonebook`);
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

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Numbers</h2>
      <Persons setPersons={setPersons} filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
