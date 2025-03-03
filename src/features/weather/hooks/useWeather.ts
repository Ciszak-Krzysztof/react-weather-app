import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchCurrentWeatherData,
  fetchForecastData,
  selectCurrentWeather,
  selectError,
  selectForecast,
  selectIsLoading,
} from "../store/weather.slice";

const useWeather = () => {
  const dispatch = useAppDispatch();
  const currentWeatherData = useAppSelector(selectCurrentWeather);
  const forecastData = useAppSelector(selectForecast);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (!currentWeatherData && !isLoading.currentWeather) {
      dispatch(fetchCurrentWeatherData({ lat: 52.52, lon: 13.41 }));
    }
    if (!forecastData && !isLoading.forecast) {
      dispatch(fetchForecastData({ lat: 52.52, lon: 13.41 }));
    }
  }, [currentWeatherData, forecastData, isLoading, dispatch]);

  return { currentWeatherData, forecastData, isLoading, error };
};

export default useWeather;
