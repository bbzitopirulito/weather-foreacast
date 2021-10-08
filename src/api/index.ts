import { LocationWeather, WeekForecast } from "../types/Api";
import { handleError } from "./errors";

// api configuration data
const apiConfig = {
  baseUrl: "https://api.openweathermap.org/data/2.5",
  params: "&units=metric",
  exclude: "current,minutely,hourly,alerts",
  apiId: import.meta.env.VITE_API_ID,
};

// gets weather forecast for a given coordinates
export const getWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<LocationWeather> => {
  const response = await fetch(
    `${apiConfig.baseUrl}/weather?lat=${lat}&lon=${lon}${apiConfig.params}&appid=${apiConfig.apiId}`
  );

  if (response.status !== 200) {
    throw handleError(response);
  }

  return response.json();
};

// gets weather forecast for a given city name
export const getWeatherByCityName = async (
  name: string
): Promise<LocationWeather> => {
  const response = await fetch(
    `${apiConfig.baseUrl}/weather?q=${name}${apiConfig.params}&appid=${apiConfig.apiId}`
  );

  if (response.status !== 200) {
    throw handleError(response);
  }

  return response.json();
};

// gets week forecast for a given location
export const getWeekWeatherForecast = async (
  lat: number,
  lon: number
): Promise<WeekForecast> => {
  const response = await fetch(
    `${apiConfig.baseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=${apiConfig.exclude}${apiConfig.params}&appId=${apiConfig.apiId}`
  );

  if (response.status !== 200) {
    throw handleError(response);
  }

  return response.json();
};
