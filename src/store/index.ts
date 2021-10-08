import { LocationWeather } from "../types/Api";
import { Action, AppState } from "../types/Store";
import { LOCAL_STORAGE_CITIES_LIST_NAME } from "../utils/Api";

const ADD_LOCATION = "ADD_LOCATION";
const REMOVE_LOCATION = "REMOVE_LOCATION";
const OPEN_CITY_DIALOG = "OPEN_CITY_DIALOG";
const CLOSE_CITY_DIALOG = "CLOSE_CITY_DIALOG";
const SET_CHOSEN_LOCATION = "SET_CHOSEN_LOCATION";
const SAVE_LOCATION = "SAVE_LOCATION";
const UNSAVE_LOCATION = "UNSAVE_LOCATION";

/* 
  locations: a list with all loaded locations
  isNewCityDialogOpen: a controller boolean for the dialog that adds new cities
  chosenLocationIndex: an index to control which location is displayed
  bookmarks: an array with all saved locations
*/
export const initialState: AppState = {
  locations: {},
  isNewCityDialogOpen: false,
  chosenLocationIndex: 0,
  bookmarks: JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CITIES_LIST_NAME) || "[]"
  ) as string[],
};

const reducer = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case ADD_LOCATION:
      if (payload.location) {
        const newLocations = {
          ...state.locations,
          [payload.location.name]: payload.location,
        };
        return {
          ...state,
          locations: newLocations,
          chosenLocationIndex:
            Object.keys(newLocations).length > 0
              ? Object.keys(newLocations).length - 1
              : 0,
        };
      }
    case REMOVE_LOCATION:
      if (payload?.location?.name) {
        // saved locations
        const cities = localStorage.getItem(LOCAL_STORAGE_CITIES_LIST_NAME);

        if (cities) {
          const parsedCities = JSON.parse(cities) as string[];

          // check if a location is saved before trying to remove it
          if (parsedCities.includes(payload.location.name)) {
            const newCities = parsedCities.filter(
              (name) => name !== payload?.location?.name
            );

            localStorage.setItem(
              LOCAL_STORAGE_CITIES_LIST_NAME,
              JSON.stringify(newCities)
            );
          }
        }
        const newLocations = { ...state.locations };

        delete newLocations[payload.location.name];

        // get which location will be displayed in the place of the removed one
        let newChosenLocationIndex = state.chosenLocationIndex;
        if (state.chosenLocationIndex > Object.keys(newLocations).length - 1) {
          newChosenLocationIndex -= 1;
        }

        return {
          ...state,
          locations: newLocations,
          chosenLocationIndex: newChosenLocationIndex,
        };
      }
    case OPEN_CITY_DIALOG:
      return { ...state, isNewCityDialogOpen: true };

    case CLOSE_CITY_DIALOG:
      return { ...state, isNewCityDialogOpen: false };
    case SET_CHOSEN_LOCATION:
      return { ...state, chosenLocationIndex: payload.chosenLocationIndex };
    case SAVE_LOCATION:
      if (payload.bookmark) {
        let newBookmarks = state.bookmarks;
        const rawCities = localStorage.getItem(LOCAL_STORAGE_CITIES_LIST_NAME);

        /* 
          pushes to saved locations list if the localStorage item already exist,
          otherwise the list is started with a list containing the name of the location to be saved 
        */
        if (!rawCities) {
          newBookmarks = [payload.bookmark];
        } else {
          newBookmarks = JSON.parse(rawCities) as string[];

          if (!newBookmarks.includes(payload.bookmark)) {
            newBookmarks.push(payload.bookmark);
          }
        }
        localStorage.setItem(
          LOCAL_STORAGE_CITIES_LIST_NAME,
          JSON.stringify(newBookmarks)
        );

        return { ...state, bookmarks: newBookmarks };
      }

    case UNSAVE_LOCATION:
      if (payload.bookmark) {
        const savedCities = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_CITIES_LIST_NAME) || "[]"
        ) as string[];
        let newBookmarks = state.bookmarks;

        /* 
          check if state and localStorage contain 
          the location before removing it from the saved locations list 
        */
        if (
          savedCities.includes(payload.bookmark) &&
          newBookmarks.includes(payload.bookmark)
        ) {
          newBookmarks = newBookmarks.filter(
            (name) => name !== payload.bookmark
          );

          // set a filtered list without the unsaved location
          localStorage.setItem(
            LOCAL_STORAGE_CITIES_LIST_NAME,
            JSON.stringify(newBookmarks)
          );
          return {
            ...state,
            bookmarks: newBookmarks,
          };
        }
      }
    default:
      return state;
  }
};

export const addLocation = (location: LocationWeather): Action => ({
  type: ADD_LOCATION,
  payload: { location },
});

export const removeLocation = (location: LocationWeather): Action => ({
  type: REMOVE_LOCATION,
  payload: { location },
});

export const openNewCityDialog = (): Action => ({
  type: OPEN_CITY_DIALOG,
  payload: { isNewCityDialogOpen: true },
});

export const closeNewCityDialog = (): Action => ({
  type: CLOSE_CITY_DIALOG,
  payload: { isNewCityDialogOpen: false },
});

export const setChosenLocationIndex = (
  chosenLocationIndex: number
): Action => ({
  type: SET_CHOSEN_LOCATION,
  payload: { chosenLocationIndex },
});

export const saveLocation = (bookmark: string): Action => ({
  type: SAVE_LOCATION,
  payload: { bookmark },
});

export const unsaveLocation = (bookmark: string): Action => ({
  type: UNSAVE_LOCATION,
  payload: { bookmark },
});

export default reducer;
