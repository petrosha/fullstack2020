import React, { useState} from 'react';

const CountrySearch = ({ countries,buttonClb}) => {
  const [search, setSearch] = useState("");
  const handleSearchChange = (event) => setSearch(event.target.value);

  let countriesFiltered = countries.filter((elem) => elem.name.indexOf(search) > -1);
  return (
    <>
      <h2>Countries search</h2>
      <Search search={search} clbSearch={handleSearchChange} />
      <Countries data={countriesFiltered} buttonClb={buttonClb} />
    </>
  )
}

const Countries = ({ data,buttonClb }) => {
  if (data.length > 10) return (<p>Too many matches! Specify another filter!</p>);
  else return (
    <>
      {data.map((elem) => (<Country key={elem.numericCode} country={elem} buttonClb={buttonClb} />))}
    </>
  )
}

const Country = ({ country,buttonClb  }) => (<p>{country.name} <button onClick={buttonClb(country)}>Select</button></p>);

const Search = ({ clbSearch, search }) => {
  return (
    <div>
      Filter Countries: <input type="text" value={search} onChange={clbSearch} />
    </div>
  )
}

export default CountrySearch;