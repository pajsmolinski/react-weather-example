import {CurrentWeatherData} from "../weather/weather";
import React from "react";

import style from "./Forecast.module.css";

interface ForecastProps {
    data: CurrentWeatherData
}

export const Forecast: React.ComponentType<ForecastProps> = ({data}) => {


    const date = new Date(data.dt_txt).toLocaleDateString([],{ weekday: 'short', day: 'numeric', month: 'short' });

    return (
        <div className={style.wrapper}>
            <div className={style.details}>{date}</div>
            {data.weather.map((weather, index) => (
                <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} key={index} alt={weather.main}/>
            ))}
            <div className={style.details}>temp: {data.main.temp_max}° | {data.main.temp_min}°</div>
            <div className={style.details}>wind: {data.wind.speed}m/s</div>
        </div>
    )
}
