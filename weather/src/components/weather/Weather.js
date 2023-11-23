import "./weather.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentSearch, setCurrentSearch] = useState('');
  const [error, setError] = useState('');
  


  const apiKey = 'c092afd090d4384e96521f0ebaa8d949';

  useEffect(() => {
    setCity(city);
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentSearch}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setHistory((prevHistory) => [...prevHistory, response.data]);
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setError('');
     
      
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Handle 404 error (location not found)
            setError('City not found');
          } else {
            // Handle other errors
            setError('An error occurred. Please try again later.');
            console.error('Error fetching weather data:', error);
          }
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };



  const moveToPrevious = () => {
    if (historyIndex > 1) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setWeatherData(history[historyIndex - 2]); // Subtract 2 because arrays are zero-indexed
      setCurrentSearch(history[historyIndex - 2]?.name || '');
    }
  };

  const moveToNext = () => {
    if (historyIndex < history.length) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setWeatherData(history[historyIndex]);
      setCurrentSearch(history[historyIndex]?.name || '');
    }
  };

  return (
    <div className='container'> 
    <div className='box'>
        <div className='body'>
        
    <div>
      <h2 className="head">Weather App</h2>
      <input
        type="text"
        id="search"
        placeholder="Enter city"
        value={currentSearch}
        onChange={(e) => setCurrentSearch(e.target.value)}
        onKeyDown={handleEnterKeyPress}
      />
      <icon onClick={fetchWeatherData}>     
       <i className=" icon fa-solid fa-magnifying-glass"></i></icon>

      <img className="wicon" src ="../assets/weather.png" alt="oo" />

      {error && <p style={{ color: 'red' , display:"flex", justifyContent: "center", fontSize: "36px"}}>{error}</p>}

      {weatherData && (
        <div>
          <h3 className="wdetails">Weather in {weatherData.name}, {weatherData.sys.country}</h3>
          <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
          <p className="des">Description: {weatherData.weather[0].description}</p>

       
         
          {history.length > 1 && (
        <div className= "button" >
          <button className="previous-button" onClick={moveToPrevious}>
         Previous
          </button>
          <button className="next-button" onClick={moveToNext}>
         Next
          </button>
        </div>
      )}
</div>
      )}
        
      </div>
    </div>
    </div>
    </div>
  );
};

export default Weather;
