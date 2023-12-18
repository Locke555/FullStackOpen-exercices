import personsService from "../services/persons"

const Person = ({person, setPersons}) => {

    const handleClick = () => {
        if (confirm(`Delete ${person.name}`)) {
            personsService.remove(person.id)
                          .then(response=>{
                            setPersons(prev=>prev.filter(oldPerson => oldPerson.id != person.id))
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