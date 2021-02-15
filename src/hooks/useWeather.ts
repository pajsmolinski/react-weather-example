import React from "react";
import Weather, {ForecastData, GeoLocation} from "../weather/weather";


export const useWeather = (units: string, days: number, initialGeolocation?: GeoLocation, term?: string) => {
    const weather = React.useRef(new Weather());
    const [currentWeather, setCurrentWeather] = React.useState<ForecastData | null>(null);

    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const [location, setLocation] = React.useState(initialGeolocation);

    React.useEffect(() => {
        weather.current.setApiKey(process.env.REACT_APP_OPENWEATHER_KEY || "")
    }, [])

    React.useEffect(() => {
        if (weather && location) {
            setLoading(true);
            setError(null);

            weather.current.setUnits(units);

            weather.current.getForecastForLocation(location.lat, location.lon, days).then(data => {
                setCurrentWeather(data);

            }).catch(error => {
                setError(error.message);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [weather, location, units, days]);

    React.useEffect(() => {
        if (weather && term) {
            setLoading(true);
            setError(null);

            weather.current.setUnits(units);

            weather.current.getForecastForTerm(term, days).then(data => {
                setCurrentWeather(data);
                setLocation(data.list[0].coord);

            }).catch(error => {
                setError(error.message);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [weather, term, units, days])

    React.useEffect(() => {
        if (initialGeolocation?.lat && initialGeolocation?.lon) {
            setLocation(initialGeolocation);
        }
    }, [initialGeolocation])

    const [today, ...forecast] = currentWeather?.list || [];

    return {currentWeather, forecast, today, error, loading, loaded: !loading};
}
