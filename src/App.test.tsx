import React from "react";
import { render, screen } from "@testing-library/react";
import { CurrentWeather } from "./components/CurrentWeather";
import { CurrentWeatherData } from "./weather/weather";

const mockWeather: CurrentWeatherData = {
  wind: { speed: 10, deg: 10, gust: 10 },
  dt_txt: "24-04-2020 03:01:00",
  main: {
    temp_min: 0,
    temp_max: 2,
    temp: 2,
    feels_like: 10,
    grnd_level: 10,
    humidity: 10,
    pressure: 10,
    sea_level: 10,
  },
  coord: { lon: "10", lat: "10" },
  weather: [{ icon: "04n", description: "clouds", id: 1, main: "clouds" }],
  name: "Test",
  clouds: { all: 1 },
  timezone: 1,
  visibility: 1,
};

test("renders current weather", () => {
  render(
    <CurrentWeather data={mockWeather} city={{ name: "Test", country: "TS" }} />
  );
  const currentWeather = screen.getByTestId("currentWeather");
  expect(currentWeather).toBeInTheDocument();
});
