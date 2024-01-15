import Person from "./Person"

const Persons = ({persons, search, setPersons, setNewMessage}) => {
    const personsToShow = search.length === 0
    ? persons
    : persons.filter((person) => person.name.toLowerCase().startsWith(search.toLocaleLowerCase()))


    return (
        <ul>
        {personsToShow.map((person) => <Person key={person.id} person={person} setPersons={setPersons} setNewMessage={setNewMessage}/>)}
      </ul>
    )
}

export default Persons