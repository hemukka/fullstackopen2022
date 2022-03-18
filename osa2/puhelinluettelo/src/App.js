import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, handleClick}) => {
  return (
    <div>
      {person.name} {person.number} <button
      onClick={() => handleClick(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({persons, handleClick}) => {
  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.name}
          person={person}
          handleClick={handleClick} />
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

const Notification = ({message, color='green'}) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('green')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`${returnedPerson.name} number changed to ${returnedPerson.number}`)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })
          .catch(error => {
            setMessage(`Information of ${person.name} has already been removed from server`)
            setMessageColor('red')
            setTimeout(() => {
              setMessage(null)
              setMessageColor('green')
            }, 4000)
            setPersons(persons.filter(p => p.id !== person.id))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: newName, number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
        })
    }
  }

  const removePerson = (id) => {
    const removeName = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${removeName} ?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setMessage(`Deleted ${removeName}`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        setMessage(`Information of ${removeName} has already been removed from server`)
        setMessageColor('orange')
        setTimeout(() => {
          setMessage(null)
          setMessageColor('green')
        }, 4000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const personsToShow = filter.trim().length === 0
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filter.trim().toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={messageColor} />
      <Filter filter={filter} handleChange={(event) => setFilter(event.target.value)} />
      <h3>add a new</h3>
      <PersonForm handleSubmit={(event) => addPerson(event)}
        nameValue={newName}
        handleNameChange={(event) => setNewName(event.target.value)}
        numberValue={newNumber}
        handleNumberChange={(event) => setNewNumber(event.target.value)} />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        handleClick={(id) => removePerson(id)} />
    </div>
  )

}

export default App