const express = require('express')
const app = express()
//for connection to frontend
const cors = require('cors')


app.use(express.json())
//using the cors middleware
app.use(cors())

//data
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//homepage of our api server
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//info page for api requests
app.get('/info', (request, response) => {
  const count  = `There are currently ${persons.length} contacts in the database` 
  const date =  new Date()
  const info = `${count} as at ${date}`
  response.send(info)
})

//get a single person resource endpoint
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  //making sure the right status code appears when a wrong index number is called
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

//get all persons in database
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//delete a resource node
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

//add an entry to the person list
app.post('/api/persons', (request, response) => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id)) 
  : 0

  const person = request.body
  person.id = maxId + 1
  persons = persons.concat(person)
  response.json(person)
})

//specify the port for the server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})