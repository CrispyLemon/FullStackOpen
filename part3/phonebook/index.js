const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(morgan('tiny'));
app.use(cors());

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

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});

app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

const genID = () => {
    const maxID = persons.length > 0 
    ? Math.max(...persons.map(person => person.id))
    : 0;
    return maxID + 1;
}
app.use(bodyParser.json());

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        });
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        });
    }
    const person = {
        id: genID(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);

    res.json(person);
    
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.get('/info', (req, res) => {
    const personsCount = persons.length;
    const date = new Date();
    res.send(`<p>Phonebook has info for ${personsCount} people</p><p>${date}</p>`)
});


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`); 
