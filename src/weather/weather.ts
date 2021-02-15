
export interface GeoLocation {
    lat: string,
    lon: string
}

export interface WeatherInfo {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface WeatherMain {
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number,
    sea_level: number,
    grnd_level: number,
}

export interface WeatherWind {
    speed: number,
    deg: number,
    gust: number
}

export interface CurrentWeatherData {
    coord: GeoLocation,
    timezone: number,
    weather: WeatherInfo[],
    visibility: number,
    wind: WeatherWind,
    clouds: { all: number },
    main: WeatherMain,
    name: string,
    dt_txt: string,
}

export interface ForecastData {
    list: CurrentWeatherData[],
}

class Weather {
    apiUrl = "https://api.openweathermap.org/data/2.5/";
    apiKey = "";
    lang = "";
    units = 'standard';

    setApiKey(key: string) {
        this.apiKey = key;
        return this;
    }

    setUnits(units: string) {
        this.units = units;
        return this;
    }
    setLang(lang: string) {
        this.lang = lang
        return this;
    }

    getCurrentWeatherForTerm(q: string): Promise<CurrentWeatherData> {
        return this.request('weather', {
            q
        })
    }

    getCurrentWeatherForLocation(lat: string, lon: string): Promise<CurrentWeatherData> {
        return this.request('weather', {
            lat,
            lon
        })
    }

    getForecastForTerm(q: string, days: number): Promise<ForecastData> {
        return this.request('forecast', {
            q,
            cnt: days.toString()
        });
    }

    getForecastForLocation(lat: string, lon: string, days: number): Promise<ForecastData> {
        return this.request('forecast', {
            lat,
            lon,
            cnt: days.toString()
        });
    }

    private async request(method: string, params: { [index: string]: string }) {
        if(!this.apiKey) {
            throw new Error('No API key');
        }

        const url = new URL(this.apiUrl + method);

        Object.entries(params).forEach(([index, value]) => url.searchParams.append(index, value));

        url.searchParams.append('units', this.units);
        url.searchParams.append('appid', this.apiKey);

        if(this.lang) {
            url.searchParams.append('lang', this.lang);
        }

        const result = await fetch(url.toString());

        const data = await result.json();

        if(data.cod.toString() !== "200") {
            throw new Error(data.message);
        }

        return data;
    }
}

export default Weather
