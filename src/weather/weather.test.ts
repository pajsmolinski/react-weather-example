import Weather from "./weather";

const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_KEY || "";

const weather = new Weather();

describe("Settings", () => {
  it("Should set Api Key", function () {
    weather.setApiKey(openWeatherApiKey);
    expect(weather.apiKey).toBeTruthy();
    expect(weather.apiKey).toBe(openWeatherApiKey);
  });
});

describe("Requests", () => {
  it("Should find weather for Gdynia, Poland", function () {
    return weather.getCurrentWeatherForTerm("Gdynia, Poland").then((data) => {
      expect(data.name).toBe("Gdynia");
    });
  });

  it("Should find forecast for 3 day in Gdynia, Poland", function () {
    return weather.getForecastForTerm("Gdynia, Poland", 3).then((data) => {
      expect(data.list.length).toBe(3);
    });
  });

  it("Should find weather for 54.694235,18.6742052 (Jastarnia, Poland)", function () {
    return weather
      .getCurrentWeatherForLocation("54.694235", "18.6742052")
      .then((data) => {
        expect(data.name).toBe("Jastarnia");
      });
  });

  it("Should find weather forecast for 3 day in 54.694235,18.6742052 (Jastarnia, Poland)", function () {
    return weather
      .getForecastForLocation("54.694235", "18.6742052", 3)
      .then((data) => {
        expect(data.list.length).toBe(3);
      });
  });

  it("Should not find weather for Rivendel, Middleearth", function () {
    return weather
      .getCurrentWeatherForTerm("Rivendel, Middleearth")
      .catch((err) => {
        expect(err.message).toBe("city not found");
      });
  });

  it("Should fail if no api key is specified", function () {
    weather.setApiKey("");
    return weather.getCurrentWeatherForTerm("Warsaw, Poland").catch((err) => {
      expect(err.message).toContain("No API key");
    });
  });

  it("Should fail if invalid api key is specified", function () {
    weather.setApiKey("asdasdasd");
    return weather.getCurrentWeatherForTerm("Warsaw, Poland").catch((err) => {
      expect(err.message).toContain("Invalid API key");
    });
  });
});
