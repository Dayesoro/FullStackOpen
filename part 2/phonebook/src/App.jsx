import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNumbers, setFilteredNumbers] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3002/persons').
      then(response => {
        setPersons(response.data)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    }
    // Check if the 'personObject' object already exists in the 'persons' array
    const existingObject = persons.find(person => person.name === personObject.name && person.number === personObject.number)

    if (existingObject) {
      alert(`${newName} ${newNumber} is already added to phonebook`)
    } else {
      axios
        .post('http://localhost:3002/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      
    }
  }


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
        <Persons key={person.id} person={person} />)}
    </div>
  )
}

export default App