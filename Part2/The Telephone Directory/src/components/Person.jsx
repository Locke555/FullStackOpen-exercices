import personsService from "../services/persons"

const Person = ({person, setPersons, setNewMessage}) => {

    const handleClick = () => {
        if (confirm(`Delete ${person.name}`)) {
            personsService.remove(person.id)
                          .then(response=>{
                            setPersons(prev=>prev.filter(oldPerson => oldPerson.id != person.id))
                          })
                    .catch(error => {
                      setNewMessage({content: `Information of ${person.name} has alredy been removed from server`})
                      setPersons(prev => prev.filter(p => p.id !== person.id))
                      setTimeout(()=> setNewMessage(null), 5000
                      )
                      
                    })
        }
    }

    return (
        <li>
            {person.name} {person.number}
            <button onClick={handleClick}> Delete </button>
        </li>
    )
}

export default Person