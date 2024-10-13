const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('dist'))

const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// app.use(morgan('tiny'));

// Create a Custom Morgan Token to Log the Request Body
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

// Configure Morgan to Use the Custom Token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/info', (request, response) => {
    const phoneBookSize = persons.length
    const requestTime = new Date()
    response.send(`Phonebook has info for ${phoneBookSize} people <br/><br/> 
        ${requestTime}`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body
  console.log(`${name} ${number}`);
    if (!name && !number) {
        return response.status(400).json({ error: 'content missing' })
    }

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})



const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})