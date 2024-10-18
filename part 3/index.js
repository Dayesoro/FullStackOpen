const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('dist'))

const morgan = require('morgan')
// app.use(morgan('tiny'));

// Create a Custom Morgan Token to Log the Request Body
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.json())
// Configure Morgan to Use the Custom Token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      const requestTime = new Date();
      response.send(`Phonebook has info for ${count} people <br/><br/> 
        ${requestTime}`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  
  const person = new Person({
    name: name,
    number: number,
  })

  person.save()
    .then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.use(errorHandler)

const PORT = process.env.PORT || 8004
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})