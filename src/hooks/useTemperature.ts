import { Units, WeatherMain } from "../weather/weather";
import React from "react";

interface Temps {
  temp: string;
  min: string;
  max: string;
}

export const useTemperature = (
  weatherMain: WeatherMain,
  units?: Units
): Temps => {
  const unit = React.useMemo(
    () => "°" + (units && units === Units.Imperial ? "F" : "C"),
    [units]
  );

  const temp = React.useMemo(() => weatherMain.temp.toFixed(1) + unit, [
    weatherMain.temp,
    unit,
  ]);
  const min = React.useMemo(() => weatherMain.temp_min.toFixed(1) + unit, [
    weatherMain.temp_min,
    unit,
  ]);
  const max = React.useMemo(() => weatherMain.temp_max.toFixed(1) + unit, [
    weatherMain.temp_max,
    unit,
  ]);

  return { min, temp, max };
};
