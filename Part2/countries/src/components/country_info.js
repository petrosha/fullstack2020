import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {

    if (country) return (
        <>
            <hr />
            <h2>{country.name}</h2>
            <p>capital: {country.capital}
                <br />
         population: {country.population}
            </p>
            <CountryLanguages lang={country.languages} />
            <img style={{ width: 200 + "px", height: 150 + "px" }} src={country.flag} alt={country.name + " flag"} />
            <CountryWeather city={country.capital} />
        </>
    )
    else return (<></>);
}
const CountryLanguages = ({ lang }) => {
    return (
        <>
            <h3>Languages spoken</h3>
            <ul>
                {lang.map((elem, idx) => (<li key={idx}>{elem.name}</li>))}
            </ul>
        </>
    );
}
const CountryWeatherDraw = ({ data }) => {
    if (data) return (
        <>
            <b>temperature:</b> {data.current.temperature + ' Celcius'}
            <br />
            <b>feels like:</b> {data.current.feelslike + ' Celcius'}
            <br />
            <b>wind:</b> {data.current.wind_speed + ' m/s direction ' + data.current.wind_dir}
            <br />
            {data.current.weather_icons.map((el, idx) => (<img key={idx} src={el} alt="weather" />))}
            <br />
            {data.current.weather_descriptions.map((el1, idx1) => (<span key={idx1}>{el1} </span>))}
        </>
    );
    else return (<>Loading...</>);
}
const CountryWeather = ({ city }) => {
    console.log("Your weather api key is: ", process.env.REACT_APP_WEATHER_API_KEY);
    const [weather, setWeather] = useState({ weather: undefined, city: undefined });

    const hookWeather = () => {
        if (city !== weather.city) {
            axios
                .get('http://api.weatherstac.com/current' +
                    '?access_key=' + process.env.REACT_APP_WEATHER_API_KEY +
                    '&query=' + city)
                .then(response => {
                    if (response.data.status !== false) setWeather({
                        weather: response.data,
                        city: city
                    })
                    else setWeather({ weather: undefined, city: undefined });
                    console.log('weather info received:', response);
                })
                .catch(error => console.log("Error: ", error));
        }
    }
    useEffect(hookWeather);

    return (
        <div>
            <h3>Weather in {city}</h3>
            <CountryWeatherDraw data={weather.weather} />
        </div>
    )
}

export default CountryInfo;