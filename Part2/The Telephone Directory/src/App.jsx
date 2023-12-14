import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "0424-8745643" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNumber] = useState('')

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
  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) => <li key={person.name}> { person.name} {person.number} </li>)}
      </ul>
    </div>
  )
}

export default App