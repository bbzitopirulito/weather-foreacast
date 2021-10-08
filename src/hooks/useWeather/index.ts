import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getWeatherByCityName,
  getWeatherByCoordinates,
  getWeekWeatherForecast,
} from "../../api";
import {
  COULD_NOT_GET_USER_LOCATION_ERROR,
  displayError,
  ENABLE_LOCATION_SERVICES_ERROR,
  handleError,
} from "../../api/errors";
import { addLocation } from "../../store";
import { LocationWeatherList } from "../../types/Api";
import { LOCAL_STORAGE_CITIES_LIST_NAME } from "../../utils/Api";

const DEFAULT_CITY = "Leiria";

export const useWeatherApi = () => {
  const [loading, setLoading] = useState(false);
  // acess to user location permission state
  const [isLocationAllowed, setIsLocationAllowed] = useState(false);
  // all loaded and saved locations' list
  const [locationList, setLocationList] = useState<string[]>([]);

  const dispatch = useDispatch();

  /* 
    when hook is called, its loads user current location forecast or default location forecast depending 
    on location permission 
  */
  useEffect(() => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        await getCityByCoords(latitude, longitude);
        setIsLocationAllowed(true);
      },
      async (error) => {
        displayError(
          error.code === error.PERMISSION_DENIED
            ? ENABLE_LOCATION_SERVICES_ERROR
            : COULD_NOT_GET_USER_LOCATION_ERROR
        );
        await addCityByName(DEFAULT_CITY, loading);
      }
    );
  }, []);

  // gets city forecast for a given location coordinates
  const getCityByCoords = async (latitude: number, longitude: number) => {
    const city = await getWeatherByCoordinates(latitude, longitude);

    city.daily = await getWeekForecast(city.coord.lat, city.coord.lon);

    dispatch(addLocation(city));

    setLoading(false);
  };

  // gets a list with all loaded and saved locations
  const getLocationList = (locations: LocationWeatherList): void => {
    const locationNames: string[] = [];

    if (Object.keys(locations).length > 0) {
      for (let i = 0; i < Object.keys(locations).length; i++) {
        locationNames.push(locations[Object.keys(locations)[i]].name);
      }
    }

    const rawCities = localStorage.getItem(LOCAL_STORAGE_CITIES_LIST_NAME);
    if (rawCities) {
      const cities = JSON.parse(rawCities) as string[];

      cities.forEach((cityName) => {
        if (locationNames.includes(cityName)) {
          return;
        }
        locationNames.push(cityName);
      });
    }

    setLocationList(locationNames);
  };

  // loads city forecast for a given city name
  const addCityByName = async (name: string, dispatchValue = true) => {
    setLoading(true);

    try {
      const city = await getWeatherByCityName(name);

      city.daily = await getWeekForecast(city.coord.lat, city.coord.lon);

      dispatch(addLocation(city));
    } catch (e) {
      displayError(handleError(e as Response));
    } finally {
      setLoading(false);
    }
  };

  // gets 8 day forecast for the given coordinates
  const getWeekForecast = async (lat: number, lon: number) => {
    const data = await getWeekWeatherForecast(lat, lon);

    return data.daily;
  };

  return {
    loading,
    locationList,
    getLocationList,
    isLocationAllowed,
    addCity: addCityByName,
  };
};
