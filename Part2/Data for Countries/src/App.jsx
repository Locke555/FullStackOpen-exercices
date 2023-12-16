import { useEffect, useState } from "react"
import axios from 'axios'
import SearchBar from "./components/SearchBar"
import Display from './components/Display.jsx'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
         .then((response)=> {
          console.log(response.data[1])
          setCountries(response.data)
        })
  }, [])

  return(
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Display search={search} countries={countries} />
    </>
  )
}

export default App