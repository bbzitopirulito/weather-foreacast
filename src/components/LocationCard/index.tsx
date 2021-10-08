import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LocationWeather } from "../../types/Api";
import { getIcon, getWeekDay } from "../../utils/Api";
import WeekCarousel from "../WeekCarousel";
import { useStyles } from "./styles";

interface Props {
  location: LocationWeather;
  locationList: string[];
  loadedLocations: string[];
  setChosenLocation: (key: number) => void;
  openNewCityDialog: () => void;
  loadLocation: (name: string) => void;
  saveCity: (name: string) => void;
  unsaveCity: (name: string) => void;
  deleteCity: (location: LocationWeather) => void;
  isLocationAllowed: boolean;
  isSaved: boolean;
}

// displays a full location forecast, including an 8 weekdays' forecast
const LocationCard: React.FC<Props> = (props) => {
  const {
    location,
    isSaved,
    locationList,
    openNewCityDialog,
    setChosenLocation,
    loadLocation,
    loadedLocations,
    isLocationAllowed,
    saveCity,
    deleteCity,
    unsaveCity,
  } = props;

  const classes = useStyles();

  // anchor element for the locations list menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchorEl);

  // set menu anchor element
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // remove menu anchor element
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  // opens a dialog to add a new city
  const handleOpenCityDialog = () => {
    closeMenu();
    openNewCityDialog();
  };

  // loads a chosen location if it hasn't loaded yet
  // navigates to the chosen location
  const handleChooseLocation = (name: string, key: number) => {
    closeMenu();

    if (loadedLocations.includes(name)) {
      setChosenLocation(key);

      return;
    }

    loadLocation(name);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Box p={{ xs: 0, sm: 2, md: 5 }} pt={0}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item>
                  <img
                    src={getIcon(location.weather[0].icon)}
                    width={100}
                    alt="Weather icon"
                  />
                </Grid>
                <Grid item>
                  <Box display="flex" pt={2}>
                    <Typography variant="h3">
                      {Math.round(location.main.temp)}
                    </Typography>

                    <Typography variant="h5">°C</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box pt={2}>
                    <Box>
                      <Typography className={classes.grayText}>
                        Wind: {location.wind.speed}km/h
                      </Typography>
                      <Typography className={classes.grayText}>
                        Feels like: {location.main.feels_like}°C
                      </Typography>
                      <Typography className={classes.grayText}>
                        Humidity: {location.main.humidity}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" width="100%" justifyContent="end" pt={2}>
                <Box>
                  <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={openMenu}
                  >
                    <Box display="flex" flexDirection="column">
                      <Typography>{location.name}</Typography>
                      <Typography
                        className={classes.grayText}
                        variant="subtitle1"
                        textAlign="end"
                      >
                        {getWeekDay(location.dt)}
                      </Typography>
                    </Box>
                  </Button>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={open}
                    onClose={closeMenu}
                    PaperProps={{
                      style: {
                        maxHeight: 216,
                      },
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {locationList?.map((locationName, key) => (
                      <MenuItem
                        key={key}
                        onClick={() => handleChooseLocation(locationName, key)}
                      >
                        {locationName}
                      </MenuItem>
                    ))}
                    <MenuItem>
                      <Tooltip
                        title="Add Location"
                        onClick={() => handleOpenCityDialog()}
                      >
                        <Box
                          p={0}
                          m={0}
                          display="flex"
                          justifyContent="center"
                          width="100%"
                        >
                          <AddCircleOutlineOutlinedIcon color="success" />
                        </Box>
                      </Tooltip>
                    </MenuItem>
                  </Menu>
                  <Box display="flex" justifyContent="end">
                    {locationList.indexOf(location.name) !== 0 ? (
                      <>
                        <Tooltip title={isSaved ? "Unsave City" : "Save City"}>
                          <IconButton
                            onClick={() =>
                              isSaved
                                ? unsaveCity(location.name)
                                : saveCity(location.name)
                            }
                          >
                            <BookmarkIcon
                              color={isSaved ? "primary" : "inherit"}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Location">
                          <IconButton onClick={() => deleteCity(location)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip
                        title={
                          isLocationAllowed
                            ? "Current Location"
                            : "Default Location"
                        }
                      >
                        <IconButton>
                          {isLocationAllowed ? (
                            <LocationOnIcon color="primary" />
                          ) : (
                            <LocationOffIcon color="error" />
                          )}
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {location?.daily && (
            <Box>
              <WeekCarousel daily={location.daily} />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LocationCard;
