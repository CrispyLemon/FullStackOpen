import { useState, useEffect } from 'react'
import phoneService from "./services/phonebook"
import "./index.css"
const Error = ({message}) => {
  if (message === null){
    return null;
  }

  return(
    <div className='error'>
      {message}
    </div>
  )
}

const Notification = ({message}) => {
  if (message === null){
    return null;
  }

  return(
    <div className='notif'>
      {message}
    </div>
  )
}

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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
          .update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            setNewName('');
            setNewNumber('');
            setSuccess(`${existingPerson.name} was successfully updated.`)
            setTimeout(() => {
              setSuccess(null)
            }, 5000)
            })
          .catch(error => {
            setError(`${newPerson.name} could not be updated`)
            setTimeout(() => {
              setError(null)
            }, 5000) 
          });
      }
    } else {
      phoneService
        .func2(newPerson) // Use POST for creating new person
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setSuccess(`${newPerson.name} was successfully added`) 
          setTimeout(() => {
            setSuccess(null)
          }, 5000)
        })
      .catch(error => {
        setError(
          `${newPerson.name} could not be added.`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
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
        .remove(id) 
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setSuccess("Successfully deleted.")
          setTimeout(() => {
            setSuccess(null)
          }, 5000)
        })
        .catch(error => {
          setError(
            `This person has already been deleted`
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        }
        )
    }
  }
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Notification message={success} />
      <Error message={error} /> 
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
