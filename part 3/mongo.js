const mongoose = require('mongoose')

// Destructure command-line arguments
const [,, password, name, number] = process.argv

// Connection URL with dynamic password
const url = `mongodb+srv://danielayesoro18:${password}@phonebook.dr0va.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)


// Connect to MongoDB
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')

    // If only password is provided, list all entries
    if (process.argv.length === 3) {
      return Person.find({})
    }
    // If name and number are provided, add a new person
    else if (process.argv.length === 5) {
      const person = new Person({ name, number })
      return person.save()
    }
    // Handle incorrect usage
    else {
      console.log('Please provide the correct arguments: password, name, and number.')
      process.exit(1)
    }
  })
  .then(result => {
    // If result is an array, list all phonebook entries
    if (Array.isArray(result)) {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    }
    // If result is not an array, it's a new person added
    else {
      console.log(`Added ${name} number ${number} to phonebook`)
    }
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
    mongoose.connection.close()
  })

// Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

