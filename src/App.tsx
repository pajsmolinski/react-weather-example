import React from "react";
import "./App.css";

import { useCurrentPosition, useDebounce, useWeather } from "./hooks";
import { SearchInput } from "./components/SearchInput";
import { Error } from "./components/Error";
import { CurrentWeather } from "./components/CurrentWeather";
import { UnitSwitch } from "./components/UnitSwitch";
import { Forecast } from "./components/Forecast";
import { Units } from "./weather/weather";
import { Spinner } from "./components/Spinner";

const App: React.ComponentType = () => {
  const [currentLocation] = useCurrentPosition();

  const [units, setUnits] = React.useState<Units>(
    (localStorage.getItem("weather-units") as Units) || Units.Metric
  );

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("weather-term") || ""
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const weather = useWeather(units, 4, currentLocation, debouncedSearchTerm);

  const saveUnits = (units: Units) => {
    localStorage.setItem("weather-units", units);
    setUnits(units);
  };

  const saveLastTerm = (term: string) => {
    localStorage.setItem("weather-term", term);
    setSearchTerm(term);
  };

  return (
    <div className="app">
      <div className="appHeader">
        <SearchInput value={searchTerm} onChange={saveLastTerm} />
        <UnitSwitch units={units} onChange={saveUnits} />
      </div>
      {weather.loading && <Spinner />}

      {weather.success && weather.today && (
        <CurrentWeather
          city={weather.city}
          data={weather.today}
          units={units}
        />
      )}
      <div className="forecast">
        {weather.success &&
          weather.forecast &&
          weather.forecast.map((data) => (
            <Forecast data={data} key={data.dt_txt} units={units} />
          ))}
      </div>

      {weather.error && <Error message={weather.error} />}
    </div>
  );
};

export default App;
