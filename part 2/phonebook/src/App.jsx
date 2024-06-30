import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNumbers, setFilteredNumbers] = useState('')

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
    const existingObject = persons.find(person => person.name === personObject.name && person.number === personObject.number)

    if (existingObject) {
      alert(`${newName} ${newNumber} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      
    }
  }

  const deletePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        alert(`${name} has been successfully deleted.`);
      })
      .catch(error => {
        alert(`Failed to delete ${name}: ${error.message}`);
      });
  } else {
    alert(`Deletion of ${name} was canceled.`);
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