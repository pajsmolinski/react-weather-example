import { CurrentWeatherData, Units } from "../weather/weather";
import React from "react";

import style from "./Forecast.module.css";
import { useTemperature } from "../hooks";

interface ForecastProps {
  data: CurrentWeatherData;
  units?: Units;
}

export const Forecast: React.ComponentType<ForecastProps> = ({
  data,
  units,
}) => {
  const date = new Date(data.dt_txt).toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const { max, min } = useTemperature(data.main, units);

  return (
    <div className={style.wrapper}>
      <div className={style.details}>{date}</div>
      {data.weather.map((weather, index) => (
        <img
          src={`http://openweathermap.org/img/w/${weather.icon}.png`}
          key={index}
          alt={weather.main}
        />
      ))}
      <div className={style.details}>
        temp: {max}° | {min}°
      </div>
      <div className={style.details}>wind: {data.wind.speed}m/s</div>
    </div>
  );
};
