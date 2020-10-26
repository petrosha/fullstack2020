import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountrySearch from './components/country_search'
import CountryInfo from './components/country_info'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(undefined);

  const handleCountrySelect = (country) => {
    return (event) => {
      
      console.log(country);
      setCountry(Object.assign({},country));
      
    }
  }

  const hookCountries = () => {
    console.log('effect!')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('persons list received');
        setCountries(response.data);
      });
  }
  useEffect(hookCountries, []);

  return (
    <div>
      <CountrySearch countries={countries} buttonClb={handleCountrySelect} />
      <CountryInfo country={country} />
    </div>
  )
}

export default App