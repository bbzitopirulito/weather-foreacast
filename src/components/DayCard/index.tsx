import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { getIcon, getWeekDay } from "../../utils/Api";
import { useStyles } from "./styles";

interface Props {
  icon: string;
  date: number;
  min: number;
  max: number;
}

// displays a day's forecast
const DayCard: React.FC<Props> = (props) => {
  const { icon, date, min, max } = props;

  const classes = useStyles();

  return (
    <Paper elevation={0}>
      <Box py={2}>
        <Typography variant="subtitle1" textAlign="center">
          {getWeekDay(date)}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img width="80" src={getIcon(icon)} alt="weather icon" />
        </Box>

        <Box display="flex" justifyContent="space-around">
          <Typography>{max}°</Typography>
          <Typography className={classes.grayText}>{min}°</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DayCard;
