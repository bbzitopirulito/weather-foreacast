import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "react-multi-carousel/lib/styles.css";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { createStore, Reducer } from "redux";
import "./index.css";
import WeatherAppHome from "./pages/WeatherAppHome";
import reducer, { initialState } from "./store";
import { AppState } from "./types/Store";

// creates the application's store
const store = createStore(reducer as Reducer<AppState>, initialState);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <WeatherAppHome />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
