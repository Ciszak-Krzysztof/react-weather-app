import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchCurrentWeatherData,
  fetchForecastData,
  selectCurrentWeather,
  selectError,
  selectForecast,
  selectIsLoading,
} from "../store/weather.slice";
import { POZNAN_COORDINATES } from "../../../assets/constants/constants";

const useWeather = () => {
  const dispatch = useAppDispatch();
  const currentWeatherData = useAppSelector(selectCurrentWeather);
  const forecastData = useAppSelector(selectForecast);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
  }>(POZNAN_COORDINATES);

  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setLocation(location);
        dispatch(fetchCurrentWeatherData(location));
        dispatch(fetchForecastData(location));
      })
      .catch((error) => console.error("Error getting user location:", error));
  }, [dispatch]);

  useEffect(() => {
    if (!currentWeatherData && !isLoading.currentWeather) {
      dispatch(fetchCurrentWeatherData(location));
    }
    if (!forecastData && !isLoading.forecast) {
      dispatch(fetchForecastData(location));
    }
  }, [currentWeatherData, forecastData, isLoading, dispatch, location]);

  const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  };

  return { currentWeatherData, forecastData, isLoading, error };
};

export default useWeather;
