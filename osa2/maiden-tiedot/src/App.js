import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country, handleClick}) => {
  
  return (
    <div>
      {country} <button onClick={() => handleClick(country)}>show</button>
    </div>
  )
}

const Countries = ({countries, handleClick}) => {
  return (
    <div>
      {countries.length > 10
        ? 'Too many matches, specify another filter'
        : countries.map(country => 
          <Country key={country.name.common}
            country={country.name.common}
            handleClick={handleClick} />
        )
      }
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      find countries <input
        value={props.filter}
        onChange={props.handleChange} />
    </div>
  )
}

const Language = ({language}) => {
  return (
    <li>{language}</li>
  )
}

const CountryInfo = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(lang =>
          <Language key={lang} language={lang}/>)}
      </ul>
      <img width="200" src={country.flags.svg}></img>
      <h3>Weather in {country.capital}</h3>
      <p>{Math.random() > 0.5 ? 'good' : 'bad'} weather</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.trim().toLowerCase())
  )

  return (
    <div>
      <Filter filter={filter} handleChange={(event) => setFilter(event.target.value)} />
      {countriesToShow.length === 1
        ? <CountryInfo country={countriesToShow[0]} />
        : <Countries countries={countriesToShow} handleClick={(country) => setFilter(country)} />
      }
    </div>
  );
}

export default App;
