import { City, CurrentWeatherData, Units } from "../weather/weather";
import React from "react";

import style from "./CurrentWeather.module.css";
import { useTemperature } from "../hooks";

interface CurrentWeatherProps {
  data: CurrentWeatherData;
  city: City;
  units?: Units;
}

export const CurrentWeather: React.ComponentType<CurrentWeatherProps> = ({
  data,
  city,
  units,
}) => {
  const { temp, max, min } = useTemperature(data.main, units);

  return (
    <div className={style.wrapper} data-testid="currentWeather">
      <div className={style.name}>
        {city.name}, {city.country}
      </div>
      {data.weather.map((weather, index) => (
        <div className={style.weather} key={index}>
          <img
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
            alt={weather.main}
          />
          <div className={style.weatherMain}>{weather.main}</div>
          <div className={style.weatherDescription}>{weather.description}</div>
        </div>
      ))}
      <div className={style.wind}>wind: {data.wind.speed}m/s</div>
      <div className={style.min}>min: {min}</div>
      <div className={style.max}>max: {max}</div>

      <div className={style.temp}>{temp}</div>
    </div>
  );
};
