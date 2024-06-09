import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowResults from './components/ShowResults'


const App = () => {
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data)
    })
  }, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div>
      find countries <input value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
      <ShowResults filteredCountries={filteredCountries} setSearchFilter={setSearchFilter} />
    </div>
  )
}

export default App