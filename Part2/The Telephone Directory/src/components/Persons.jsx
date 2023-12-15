const Persons = ({persons, search}) => {
    const personsToShow = search.length === 0
    ? persons
    : persons.filter((person) => person.name.toLowerCase().startsWith(search.toLocaleLowerCase()))


    return (
        <ul>
        {personsToShow.map((person) => <li key={person.name}> { person.name} {person.number} </li>)}
      </ul>
    )
}

export default Persons