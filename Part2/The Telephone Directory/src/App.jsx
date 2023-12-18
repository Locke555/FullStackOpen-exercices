import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/persons';
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setnewName ] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(()=> {
    axios.get('http://localhost:3001/persons')
         .then((response)=>{
          console.log(response.data);
          setPersons(response.data)
         })
  },[])  


  const handleNameChange = (e) => {
    console.log(e.target.value);
    setnewName((prev)=>e.target.value);
  }

  const handleNumberChange = (e) => {
    console.log(newNumber);
    setnewNumber(prev=>e.target.value)
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
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      axios.post('http://localhost:3001/persons', newPerson)
           .then(response => {
            setPersons(prev=>prev.concat(response.data));
            setnewName("");
            setnewNumber("");
           })
    } else {
      alert(`${newName} is alredy added to phonebook`)
    }
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={search} onChange={handleSearchChange} />
      <h2>Add New</h2>
        <PersonForm onSubmit={handleSubmitPersons} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons persons={persons} search={search}/>
    </div>
  )
}

export default App