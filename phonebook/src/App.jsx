import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNumbers, setFilteredNumbers] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    // Check if the 'personObject' object already exists in the 'persons' array
    const existingObject = persons.find(person => person.name === personObject.name && person.number === personObject.number)

    if (existingObject) {
      alert(`${newName} ${newNumber} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <div>
        filter shown with: <input
          value={filteredNumbers}
          onChange={handleFilteredNumbers} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App