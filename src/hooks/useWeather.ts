import React from "react";
import Weather, {
  City,
  CurrentWeatherData,
  ForecastData,
  GeoLocation,
  Units,
} from "../weather/weather";

interface WeatherResults {
  currentWeather: ForecastData | null;
  city: City;
  forecast: CurrentWeatherData[];
  today: CurrentWeatherData;
  error: string | null;
  loading: boolean;
  loaded: boolean;
  success: boolean;
}

export const useWeather = (
  units: Units,
  days: number,
  initialGeolocation?: GeoLocation,
  term?: string
): WeatherResults => {
  const weather = React.useRef(new Weather());
  const [
    currentWeather,
    setCurrentWeather,
  ] = React.useState<ForecastData | null>(null);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const [location, setLocation] = React.useState(initialGeolocation);

  React.useEffect(() => {
    weather.current.setApiKey(process.env.REACT_APP_OPENWEATHER_KEY || "");
  }, []);

  React.useEffect(() => {
    if (weather.current) {
      setLoading(true);
      setError(null);
      weather.current.setUnits(units);

      let weatherFunction;

      if (term) {
        weatherFunction = weather.current.getForecastForTerm(term, days);
      } else if (location) {
        weatherFunction = weather.current.getForecastForLocation(
          location.lat,
          location.lon,
          4
        );
      }

      if (weatherFunction) {
        weatherFunction
          .then((data) => {
            setCurrentWeather(data);
            term && setLocation(data.list[0].coord);
          })
          .catch((error) => {
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [weather, location, term, units, days]);

  React.useEffect(() => {
    if (initialGeolocation?.lat && initialGeolocation?.lon) {
      setLocation(initialGeolocation);
    }
  }, [initialGeolocation]);

  const [today, ...forecast] = currentWeather?.list || [];
  const city = React.useMemo(
    () => currentWeather?.city || { name: "", country: "" },
    [currentWeather?.city]
  );

  return {
    currentWeather,
    city,
    forecast,
    today,
    error,
    loading,
    loaded: !loading,
    success: !loading && !error,
  };
};
