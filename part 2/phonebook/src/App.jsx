import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNumbers, setFilteredNumbers] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    // Check if the 'personObject' object already exists in the 'persons' array
    const existingObject = persons.find(person => person.name === personObject.name || person.number === personObject.number)
    const changedPerson = { ...existingObject, number: newNumber }

    if (existingObject) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingObject.id, changedPerson)
                     .then(returnedPerson => {
                      setPersons(persons.map(person => person.id !== existingObject.id ? person : returnedPerson))
                     })
        setNotification({ message: `Updated ${existingObject.name}`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
        setNotification({ message: error.response.data.error, type: 'error' })
      })
      
      setNotification({ message: `Added ${personObject.name}`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
    }
  }



  const deletePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        alert(`Failed to delete ${name}: ${error.message}`);
      });
  } 
};



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilteredNumbers = (event) => {
    setFilteredNumbers(event.target.value)
  }


  const personsToShow = filteredNumbers
    ? persons.filter(person =>
      person.name.toLowerCase().includes(filteredNumbers.toLowerCase())
    )
    : persons;



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter handleFilteredNumbers={handleFilteredNumbers} filteredNumbers={filteredNumbers} />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      {personsToShow.map(person =>
        <Persons key={person.id} person={person} deletePerson={() => deletePerson(person.id,person.name)} />)}
    </div>
  )
}

export default App