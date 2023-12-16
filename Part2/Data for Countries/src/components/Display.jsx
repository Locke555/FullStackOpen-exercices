import Country from "./country"

const Display = ({search, countries}) => {
    
    const countriesToDisplay = countries.filter((country) => country.name.common.toLowerCase().startsWith(search.toLowerCase()))
    console.log(countriesToDisplay)
    return (
        <div>
                {
                    countriesToDisplay.length > 10 
                    ? <p>Too many matches, specify another filter</p>
                    : countriesToDisplay.length === 1
                    ? <Country country={countriesToDisplay[0]}/>
                    : countriesToDisplay.length <= 10
                    ? countriesToDisplay.map((country) => <div key={country.name.common}>{country.name.common}</div>)
                    : "Error"
                }
        </div>
    )
} 
export default Display