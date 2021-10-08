import { LocationWeather, LocationWeatherList } from "../Api";

interface Payload {
  location?: LocationWeather;
  isNewCityDialogOpen?: boolean;
  locations?: LocationWeatherList;
  chosenLocationIndex?: number;
  bookmark?: string;
}

export interface AppState {
  locations: LocationWeatherList;
  isNewCityDialogOpen: boolean;
  chosenLocationIndex: number;
  bookmarks: string[];
}

export interface Action {
  type: string;
  payload: Payload;
}
