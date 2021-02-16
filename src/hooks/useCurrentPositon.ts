import React from "react";
import { GeoLocation } from "../weather/weather";

export const useCurrentPosition = (): [GeoLocation | undefined, string] => {
  const [position, setPosition] = React.useState<GeoLocation>();
  const [error, setError] = React.useState<string>("");

  const onChange: PositionCallback = ({ coords }) => {
    setPosition({
      lat: coords.latitude.toString(),
      lon: coords.longitude.toString(),
    });
  };

  const onError: PositionErrorCallback = (error) => {
    setError(error.message);
  };

  React.useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(onChange, onError);
  }, []);

  return [position, error];
};
