import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ data }) => {
  const [coord, setCoord] = useState([])
  const name = data.name.common
  const capital = data.capital[0]
  const area = data.area
  const languages = Object.values(data.languages)
  const flag = data.flags.png
  const apiKey = import.meta.env.VITE_SOME_KEY
  const getCityCoordintesURL = `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${apiKey}`

  useEffect(() => {
    axios.get(getCityCoordintesURL).then((response) => {
      console.log('getCityCoordintesURL', response.data)
      const city = response.data[0]
      setCoord([city.lat, city.lon])
    })
  }, [])

  useEffect(() => {
    if (!coord || coord[0] === undefined) return
    console.log('coord', coord)
    axios
      .get(
        `https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat=${coord[0]}&lon=${coord[1]}&appid=${apiKey}`,
      )
      .then((response) => {
        console.log('weather', response.data)
        // got 401 error, need subscription for openweatherrmap
      })
  }, [coord])

  return (
    <div>
      <h1>{name}</h1>
      <div>Capital {capital}</div>
      <div>Area {area}</div>

      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => {
          return <li key={lang}>{lang}</li>
        })}
      </ul>
      <img src={flag} />
      <h3>Weather:</h3>
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data)
        // console.log('countries[0]', response.data[12])
      })
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const filteredCountries = countries.filter((c) => {
    const name = c.name.common.toLowerCase()
    const val = value.toLowerCase()
    return name.includes(val)
  })

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  const showCountry = (country) => {
    setValue(country.name.common)
  }

  const renderContent = () => {
    if (!value) return <div></div>
    if (filteredCountries.length > 10)
      return <div>Too many matches, specify another filter</div>
    if (filteredCountries.length === 1)
      return <Country data={filteredCountries[0]} />

    return filteredCountries.map((c) => {
      return (
        <div key={c.name.common}>
          {c.name.common} <button onClick={() => showCountry(c)}>Show</button>
        </div>
      )
    })
  }

  return (
    <div>
      currency: <input value={value} onChange={handleChange} />
      {renderContent()}
    </div>
  )
}

export default App
