import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import HomeIcon from '@mui/icons-material/Home';
import earthSun from '../assets/earth-with-sun.svg';

const Weather = () => {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [displayElements, setDisplayElements] = useState({
    weatherIcon: false,
    clearButton: false,
    apiCredit: false,
    searchInput: true,
    searchButton: true,
  });

  const getZipCode = () => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=ae1558409c2a4c3390a163852241503&q=${zipCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);

        fetch('weatherData.json')
          .then((response) => response.json())
          .then((weatherInfo) => {
            const weatherCode = weatherInfo.find(
              (entry) => entry.code === data.current.condition.code
            );

            const isDay = data.current.is_day === 1;
            const timeOfDay = isDay ? 'day' : 'night';
            const currentCondition = isDay
              ? weatherCode.day
              : weatherCode.night;
            const iconFolderPath = isDay ? 'icons/day' : 'icons/night';

            setWeatherData((prev) => ({
              ...prev,
              currentCondition,
              iconSrc: `${iconFolderPath}/${weatherCode.icon}.png`,
              timeOfDay,
            }));

            setDisplayElements({
              weatherIcon: true,
              clearButton: true,
              apiCredit: true,
              searchInput: false,
              searchButton: false,
            });
          });
      });
  };

  const clearPage = () => {
    window.location.reload();
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: 'lightgray',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <img
        src={earthSun}
        className="logo react"
        alt="React logo"
        width="120px"
        height="120px"
      />
      <div className="search">
        <h1>What is the weather like?</h1>

        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          {displayElements.searchInput && (
            <TextField
              id="zipcode"
              name="zipcode"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              variant="outlined"
              color="info"
              InputLabel
              sx={{
                height: '40px',
                '& .MuiInputBase-root': { height: '100%' },
              }}
            />
          )}
          {displayElements.searchButton && (
            <Button
              variant="outlined"
              id="searchButton"
              onClick={getZipCode}
              startIcon={<SearchSharpIcon />}
              sx={{ height: '40px', minWidth: '100px' }}
            >
              Search
            </Button>
          )}
        </Box>
        <div
          id="weather-info"
          className="weather-info"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '25px 0',
          }}
        >
          {displayElements.weatherIcon && (
            <img
              id="weatherIcon"
              src={weatherData?.iconSrc}
              alt="Weather Icon"
            />
          )}
          {weatherData && (
            <div>
              <h3>
                {weatherData.location.name}, {weatherData.location.region}
              </h3>
              <h3>{weatherData.current.temp_f}°F</h3>
              <h3>{weatherData.currentCondition}</h3>
            </div>
          )}
        </div>
        {displayElements.clearButton && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              id="clearPage"
              startIcon={<HomeIcon />}
              sx={{ height: '40px', minWidth: '125px' }}
              onClick={clearPage}
            >
              Clear
            </Button>
          </Box>
        )}
      </div>
      {displayElements.apiCredit && (
        <div className="linkBack" id="apiCredit">
          <h6>
            Powered by{' '}
            <a href="https://www.weatherapi.com/" title="Free Weather API">
              WeatherAPI.com
            </a>
          </h6>
        </div>
      )}
    </div>
  );
};

export default Weather;
