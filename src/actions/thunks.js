import axios from "axios";
import {
  isFetching,
  doneFetching,
  fetchCountry,
  fetchSelectedCountry,
  fetchGlobalCovid
} from "./index";

export const fetchCountryAction = () => async (dispatch, state) => {
  dispatch(isFetching());
  try {
    const response = await axios.get("https://restcountries.eu/rest/v2/all");
    const { data } = response;
    dispatch(fetchCountry(data));
    dispatch(doneFetching());
  } catch (error) {
    dispatch(doneFetching());
  }
};

export const fetchGlobalCovidAction = () => async (dispatch, state) => {
  dispatch(isFetching());
  try {
    const response = await axios.get("https://api.covid19api.com/summary");
    const { data } = response;
    dispatch(fetchGlobalCovid(data));
    dispatch(fetchCountry(data));
    dispatch(doneFetching());
  } catch (error) {
    dispatch(doneFetching());
  }
};

export const fetchSelectedCountryAction = country => async (
  dispatch,
  state
) => {
  dispatch(isFetching());
  try {
    const response = await axios.get(
      `https://api.covid19api.com/total/country/${country}`
    );
    console.log(response);
    const { data } = response;
    dispatch(fetchSelectedCountry({ data, country }));
    dispatch(doneFetching());
  } catch (error) {
    dispatch(doneFetching());
  }
};
