import { CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { displayError, LOCATION_ALREADY_ADDED_ERROR } from "../../api/errors";
import AddCityDialog from "../../components/AddCityDialog";
import LocationCard from "../../components/LocationCard";
import { useWeatherApi } from "../../hooks/useWeather";
import {
  closeNewCityDialog,
  openNewCityDialog,
  removeLocation,
  saveLocation,
  setChosenLocationIndex,
  unsaveLocation,
} from "../../store";
import { LocationWeather } from "../../types/Api";
import { AppState } from "../../types/Store";

// main app compoenent
const WeatherAppHome: React.FC<AppState> = (props: AppState) => {
  const { locations, isNewCityDialogOpen, chosenLocationIndex, bookmarks } =
    props;
  const { loading, addCity, locationList, getLocationList, isLocationAllowed } =
    useWeatherApi();
  const dispatch = useDispatch();

  // checks if a location is already added before adding a given new location
  const checkIsNewLocation = (name: string) => {
    const isNewLocation = !Object.keys(locations).includes(name);

    if (!isNewLocation) {
      displayError(LOCATION_ALREADY_ADDED_ERROR);

      return;
    }
    addCity(name);
  };

  // refreshes menu locations' list everytime the app's locations list changes
  useEffect(() => {
    getLocationList(locations);
  }, [locations]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt={5}
      height="70vh"
    >
      <ToastContainer />
      {!loading && Object.keys(locations).length > 0 ? (
        <Container>
          <LocationCard
            isLocationAllowed={isLocationAllowed}
            loadedLocations={Object.keys(locations)}
            location={locations[Object.keys(locations)[chosenLocationIndex]]}
            locationList={locationList}
            openNewCityDialog={() => dispatch(openNewCityDialog())}
            loadLocation={(name: string) => dispatch(addCity(name))}
            setChosenLocation={(num: number) =>
              dispatch(setChosenLocationIndex(num))
            }
            isSaved={bookmarks?.includes(
              locations[Object.keys(locations)[chosenLocationIndex]].name
            )}
            saveCity={(name: string) => dispatch(saveLocation(name))}
            unsaveCity={(name: string) => dispatch(unsaveLocation(name))}
            deleteCity={(location: LocationWeather) =>
              dispatch(removeLocation(location))
            }
          />
        </Container>
      ) : (
        <CircularProgress disableShrink />
      )}
      <AddCityDialog
        open={isNewCityDialogOpen}
        onClose={() => dispatch(closeNewCityDialog())}
        addCity={(name: string) => checkIsNewLocation(name)}
      />
    </Box>
  );
};

const mapStateToProps = ({
  locations,
  isNewCityDialogOpen,
  chosenLocationIndex,
  bookmarks,
}: AppState) => ({
  locations,
  isNewCityDialogOpen,
  chosenLocationIndex,
  bookmarks,
});

export default connect(mapStateToProps)(WeatherAppHome);
