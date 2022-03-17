import { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input
          value={props.nameValue}
          onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input
          value={props.numberValue}
          onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input
        value={props.filter}
        onChange={props.handleChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = filter.trim().length === 0
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filter.trim().toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={(event) => setFilter(event.target.value)} />

      <h3>add a new</h3>
      <PersonForm handleSubmit={(event) => addName(event)}
        nameValue={newName}
        handleNameChange={(event) => setNewName(event.target.value)}
        numberValue={newNumber}
        handleNumberChange={(event) => setNewNumber(event.target.value)} />
        
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App