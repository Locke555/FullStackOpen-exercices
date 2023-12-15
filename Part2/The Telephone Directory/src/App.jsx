import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]); 
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName((prev)=>e.target.value);
  }

  const handleNumberChange = (e) => {
    console.log(newNumber);
    setNumber(prev=>e.target.value)
  }
  
  const personExist = (actualPerson) => {
    return persons.reduce((result, person) => {
      if (actualPerson === person.name) {
        return true
      }
    }, false)
  }

  const handleSubmitPersons = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (newName.length > 0 && !personExist(newName)) {
      setPersons((prev)=>prev.concat({name: newName, number: newNumber}));
      setNewName("");
      setNumber("");
    } else {
      alert(`${newName} is alredy added to phonebook`)
    }
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value)
  }

  const personsToShow = search.length === 0
                        ? persons
                        : persons.filter((person) => person.name.toLowerCase().startsWith(search.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <p>filter shown with <input value={search} onChange={handleSearchChange}/></p>
      <h2>Add New</h2>
      <form onSubmit={handleSubmitPersons}>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => <li key={person.name}> { person.name} {person.number} </li>)}
      </ul>
    </div>
  )
}

export default App