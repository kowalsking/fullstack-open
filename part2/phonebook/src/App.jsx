import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
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
    const existPerson = persons.find((p) => p.name === newName)
    if (existPerson) {
      const agree = confirm(
        `${newName} is already added to phonebook, replace the old number width a new one?`,
      )
      if (!agree) return
      personService
        .update(existPerson.id, { ...existPerson, number: newNumber })
        .then((resPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === existPerson.id ? resPerson : person,
            ),
          )
          setNewName('')
          setNewNumber('')
        })
      return
    }
    const personObject = { name: newName, number: newNumber }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
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

  const handleDelete = (pers) => {
    const agree = confirm(`Delete ${pers.name}?`)
    if (!agree) return
    const { name, id } = persons.find((p) => p.id === pers.id)

    personService.remove(id).then((res) => {
      console.log(`User ${name} with id: ${id} was deleted from phonebook.`)
      setPersons(persons.filter((p) => p.id !== id))
    })
  }

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

      {filteredPersons.map((p) => {
        return (
          <Person key={p.name} person={p} onClick={() => handleDelete(p)} />
        )
      })}
    </div>
  )
}

export default App
