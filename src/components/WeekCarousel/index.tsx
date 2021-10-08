import { Box } from "@mui/system";
import React from "react";
import Carousel from "react-multi-carousel";
import { Daily } from "../../types/Api";
import DayCard from "../DayCard";
import "./styles.css";

// controls carousel responsiveness
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 650 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 650, min: 0 },
    items: 3,
  },
};

interface Props {
  daily: Daily[];
}

// displays an 8 day forecast for a given location
const WeekCarousel: React.FC<Props> = (props: Props) => {
  const { daily } = props;

  return (
    <Carousel swipeable responsive={responsive}>
      {daily?.map(({ dt, weather, temp: { max, min } }, key) => (
        <Box display="flex" justifyContent="center" key={key}>
          <DayCard
            icon={weather[0].icon}
            date={dt}
            max={Math.round(max)}
            min={Math.round(min)}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default WeekCarousel;
