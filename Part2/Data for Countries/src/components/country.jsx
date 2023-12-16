import { useEffect, useState } from "react";

const Country = ({country}) => {
    const [languages, setLanguages] = useState([]);
    
    useEffect(()=>{
        const temp = [];
        for (const language in country.languages) {
            temp.push(country.languages[language]);
        }
        setLanguages((prev)=>temp);
    }, [])
    console.log(languages);

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>
                Capital: {country.capital} <br />
                Population: {country.population}
            </p>
            <h2>Languages</h2>
            <ul>
                {languages.map((language)=><li key={language}> {language} </li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width="300" height="200" />
        </div>
    )
}
export default Country