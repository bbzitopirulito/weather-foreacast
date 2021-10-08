import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  addCity: (name: string) => void;
}

// dialog to add a new city
const AddCityDialog: React.FC<Props> = (props) => {
  const { open, onClose, addCity } = props;

  const [cityName, setCityName] = useState<string>("");

  const handleAddNewCity = () => {
    setCityName("");
    addCity(cityName);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      aria-describedby="add city dialog"
    >
      <DialogTitle>{"Add a New City"}</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setCityName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddNewCity();
            }
          }}
          value={cityName}
          label="City Name"
          fullWidth
          variant="standard"
          helperText="Please enter a valid city name"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddNewCity}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCityDialog;
