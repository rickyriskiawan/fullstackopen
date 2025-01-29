import { useEffect, useState } from 'react';
import APIWeather from '../services/API-weather';

export default function WeatherCountry({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const response = await APIWeather.get(country);
      setWeather(response.data);
    };

    getWeather();
  }, [country]);

  console.log(weather);

  return (
    <div>
      {!weather ? null : (
        <>
          <h2>Weather in {country} </h2> <p>temprature {weather.main.temp} Celcius </p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
          <p>wind {weather.wind.speed} m/s </p>
        </>
      )}
    </div>
  );
}
