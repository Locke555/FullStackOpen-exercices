import Person from "./Person"

const Persons = ({persons, search, setPersons}) => {
    const personsToShow = search.length === 0
    ? persons
    : persons.filter((person) => person.name.toLowerCase().startsWith(search.toLocaleLowerCase()))


    return (
        <ul>
        {personsToShow.map((person) => <Person key={person.id} person={person} setPersons={setPersons} />)}
      </ul>
    )
}

export default Persons