export interface GeoLocation {
  lat: string;
  lon: string;
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface City {
  name: string;
  country: string;
}

export interface CurrentWeatherData {
  coord: GeoLocation;
  timezone: number;
  weather: WeatherInfo[];
  visibility: number;
  wind: WeatherWind;
  clouds: { all: number };
  main: WeatherMain;
  name: string;
  dt_txt: string;
}

export interface ForecastData {
  list: CurrentWeatherData[];
  city: City;
}

export enum Units {
  Imperial = "imperial",
  Metric = "metric",
  Standard = "standard",
}

class Weather {
  apiUrl = "https://api.openweathermap.org/data/2.5/";
  apiKey = "";
  lang = "";
  units = Units.Standard;

  forecastCache: { [key: string]: ForecastData } = {};

  setApiKey(key: string): Weather {
    this.apiKey = key;
    return this;
  }

  setUnits(units: Units): Weather {
    this.units = units;
    return this;
  }
  setLang(lang: string): Weather {
    this.lang = lang;
    return this;
  }

  getCurrentWeatherForTerm(q: string): Promise<CurrentWeatherData> {
    return this.request("weather", {
      q,
    });
  }

  getCurrentWeatherForLocation(
    lat: string,
    lon: string
  ): Promise<CurrentWeatherData> {
    return this.request("weather", {
      lat,
      lon,
    });
  }

  getForecastForTerm(q: string, days: number): Promise<ForecastData> {
    const key = `${q}-${days}-${this.units}`;

    const cachedData = this.readCachedKey(key);
    if (cachedData) {
      return Promise.resolve(cachedData);
    }

    return this.request("forecast", {
      q,
      cnt: days.toString(),
    }).then((data) => {
      this.saveCachedKey(key, data);
      return data;
    });
  }

  getForecastForLocation(
    lat: string,
    lon: string,
    days: number
  ): Promise<ForecastData> {
    const key = `${lat}-${lon}-${days}-${this.units}`;

    const cachedData = this.readCachedKey(key);
    if (cachedData) {
      return Promise.resolve(cachedData);
    }

    return this.request("forecast", {
      lat,
      lon,
      cnt: days.toString(),
    }).then((data) => {
      this.saveCachedKey(key, data);
      return data;
    });
  }

  private readCachedKey(key: string): ForecastData | null {
    if (this.forecastCache[key]) {
      return this.forecastCache[key];
    }
    return null;
  }

  private saveCachedKey(key: string, data: ForecastData) {
    this.forecastCache[key] = data;
  }

  private invalidateCache() {
    this.forecastCache = {};
  }

  private async request(method: string, params: { [index: string]: string }) {
    if (!this.apiKey) {
      throw new Error("No API key");
    }

    const url = new URL(this.apiUrl + method);

    Object.entries(params).forEach(([index, value]) =>
      url.searchParams.append(index, value)
    );

    url.searchParams.append("units", this.units);
    url.searchParams.append("appid", this.apiKey);

    if (this.lang) {
      url.searchParams.append("lang", this.lang);
    }

    const result = await fetch(url.toString());

    const data = await result.json();

    if (data.cod.toString() !== "200") {
      throw new Error(data.message);
    }

    return data;
  }
}

export default Weather;
