import React, { useState } from 'react';
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  // const [temperature, setTemperature] = useState(null);
  const [details,setDetails] = useState(null);

  function displayDetails(response) {
    console.log(response.data);
    setLoaded(true);
    // setTemperature(response.data.main.temp);
    setDetails({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon : `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    })
  }

  function handleSearch(event) {
    event.preventDefault();
    // alert("Searching...")
    // 1- having access to city-name and updated city-name
    // alert(city);
    // 2- making an API call
    let apiKey = "dd8c6087e35a3f1d45d727bc1ccc0027";
    let units = 'metric';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    // console.log(apiUrl);

    axios.get(apiUrl).then(displayDetails);
    // 3- have access to weather-detail and updated weather-detail
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSearch}>
    <input type="search" placeholder="Enter city name..." onChange={updateCity} />
    <button type="submit">Search</button>
  </form>
  );

  if (loaded) {
    return (
      <>
      {form}
      <ul>
<li>
    Temperature: {Math.round(details.temperature)}°C
    </li>
<li>
   Wind: {details.wind}km/h
    </li>
<li>
    Humidity: {details.humidity}%
    </li>
<li>
   Description: {details.description}
    </li>
  
<li>
    <img src={details.icon} alt={details.description}/>
    </li>
      </ul>
    </>)
  } else {
    return (
     form
    )
  }
}

export default Weather;