const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// the name of the saved locations list in localStorage
export const LOCAL_STORAGE_CITIES_LIST_NAME = "cities";

// gets the forecast icon from the weather api
export const getIcon = (icon: string) =>
  `http://openweathermap.org/img/wn/${icon}@4x.png`;

// gets the day of the week for a given timestamp
export const getWeekDay = (timestamp: number) => {
  const dayIdx = new Date(timestamp * 1000).getDay();

  return weekDays[dayIdx];
};
