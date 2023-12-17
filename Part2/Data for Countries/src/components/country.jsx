import { useEffect, useState } from "react";
import axios from 'axios';

const Country = ({country}) => {
    const [languages, setLanguages] = useState([]);
    const [weather, setWeather] = useState({});
    
    useEffect(()=>{
        axios.get('http://api.weatherapi.com/v1/current.json', {params: {key: import.meta.env.VITE_APP_API_KEY, q: country.capital.toString()}})
             .then(response => {
                setWeather(response.data)
             })
        const temp = [];
        for (const language in country.languages) {
            temp.push(country.languages[language]);
        }
        setLanguages((prev)=>temp);
    }, [])
    

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
            <h2>Weather in {country.capital}</h2>
            {weather.hasOwnProperty("current") ? <p>Temperature: {weather.current.temp_c}C°</p> : <p>Temperature: Loading</p>}
            {weather.hasOwnProperty("current") ? <img src={weather.current.condition.icon} alt="Icon" width="100" height="100"></img> : undefined}
            {weather.hasOwnProperty("current") ? <p>Wind: {weather.current.wind_mph} mph direction {weather.current.wind_dir}</p> : <p>Wind: Loading</p>}
        </div>
    )
}
export default Country