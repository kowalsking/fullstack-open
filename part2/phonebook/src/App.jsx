import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  const addPersona = (event) => {
    event.preventDefault()
    if (persons.find((p) => p.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setPersonsToShow(persons)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setQuery(event.target.value)
  }

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} onChange={handleFilter} />
      <PersonForm
        onSubmit={addPersona}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
