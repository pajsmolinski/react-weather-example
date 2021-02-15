import {CurrentWeatherData} from "../weather/weather";
import React from "react";

import style from "./CurrentWeather.module.css";

interface CurrentWeatherProps {
    data: CurrentWeatherData,
}

export const CurrentWeather: React.ComponentType<CurrentWeatherProps> = ({data}) => {

    return (
        <div className={style.wrapper} data-testid="currentWeather">
            <div className={style.name}>{data.name}</div>
            {data.weather.map((weather, index) => (
                <div className={style.weather} key={index}>
                    <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt={weather.main} />
                    <div className={style.weatherMain}>{weather.main}</div>
                    <div className={style.weatherDescription}>{weather.description}</div>
                </div>
            ))}
            <div className={style.wind}>wind: {data.wind.speed}m/s</div>
            <div className={style.min}>min: {data.main.temp_min}°</div>
            <div className={style.max}>max: {data.main.temp_max}°</div>

            <div className={style.temp}>{data.main.temp}°</div>
        </div>
    )

}
