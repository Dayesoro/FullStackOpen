const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// app.use(morgan('tiny'));

// Create a Custom Morgan Token to Log the Request Body
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

// Configure Morgan to Use the Custom Token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const phoneBookSize = persons.length
    const requestTime = new Date()
    response.send(`Phonebook has info for ${phoneBookSize} people <br/><br/> 
        ${requestTime}`)
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
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {

  const { name, number } = request.body

  // Check if name or number is missing
    if (!name || !number) {
        return response.status(400).json({ error: 'name or number is missing' });
    }

    // Check if name already exists in the phonebook
    const existingPerson = persons.find(person => person.name === name);
    if (existingPerson) {
        return response.status(400).json({ error: 'name must be unique' });
    }
  
    const id = Math.floor(Math.random() * 20000)

    const newPerson = {
        id: id.toString(),
        name,
        number
    };

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})