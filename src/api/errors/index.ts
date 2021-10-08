import { toast } from "react-toastify";

const ENTER_VALID_CITY_NAME_ERROR = "Please enter a valid city name";
const COULD_NOT_FETCH_LOCATION_ERROR =
  "Could not fetch this location's data. Please try again later";
export const ENABLE_LOCATION_SERVICES_ERROR =
  "Please enable location access in your browser settings";
export const COULD_NOT_GET_USER_LOCATION_ERROR =
  "Could not get your current location";
export const LOCATION_ALREADY_ADDED_ERROR =
  "This location has already been added";

// displays a toast with a given  error message
export const displayError = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

// returns an error message based on the response's code
export const handleError = (response: Response): string =>
  response.status === 404
    ? ENTER_VALID_CITY_NAME_ERROR
    : COULD_NOT_FETCH_LOCATION_ERROR;
