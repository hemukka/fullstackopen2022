import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const notify = (message, msgColor='green') => {
    setNotification({message, msgColor})
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

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
            notify(`${returnedPerson.name} number changed to ${returnedPerson.number}`)
          })
          .catch(error => {
            if (error.response.status === 404) {
              notify(`Information of ${person.name} has already been removed from server`, 'red')
              setPersons(persons.filter(p => p.id !== person.id))
              setNewName('')
              setNewNumber('')
            } else {
              notify(error.response.data.error, 'red')
            }
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
          notify(`Added ${returnedPerson.name}`)
        })
        .catch(error => {
          notify(error.response.data.error, 'red')
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
        notify(`Deleted ${removeName}`)
      })
      .catch(error => {
        notify(`Information of ${removeName} has already been removed from server`, 'orange')
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
      <Notification notification={notification} />
      <Filter filter={filter} handleChange={(event) => setFilter(event.target.value)} />
      <PersonForm
        handleAdd={addPerson}
        nameValue={newName}
        handleNameChange={(event) => setNewName(event.target.value)}
        numberValue={newNumber}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <Persons
        persons={personsToShow}
        handleDelete={removePerson}
      />
    </div>
  )
}

export default App