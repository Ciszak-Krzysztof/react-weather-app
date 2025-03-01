import { API } from "../../../assets/constants/api";
import { ForecastData, WeatherData } from "../models/weather.model";
import httpService from "../../../services/http.service";

export const weatherService = {
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    return httpService
      .get(API.WEATHER.CURRENT_WEATHER, {
        params: {
          lat,
          lon,
          appid: import.meta.env.OPEN_WEATHER_API_KEY,
          units: "metric",
        },
      })
      .then((response) => response.data);
  },

  getForecast: async (lat: number, lon: number): Promise<ForecastData> => {
    return httpService
      .get(API.WEATHER.FORECAST, {
        params: {
          lat,
          lon,
          appid: import.meta.env.OPEN_WEATHER_API_KEY,
          units: "metric",
        },
      })
      .then((response) => response.data);
  },
};
