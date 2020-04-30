import {
  IS_FETCHING,
  DONE_FETCHING,
  FETCH_COUNTRY,
  FETCH_GLOBAL,
  FETCH_SELECTED_COUNTRY,
  SET_COUNTRY_STATUS,
  SET_GLOBAL_STATUS
} from "./actionType";

export const isFetching = () => ({
  type: IS_FETCHING
});

export const doneFetching = () => ({
  type: DONE_FETCHING
});

export const fetchCountry = payload => ({
  type: FETCH_COUNTRY,
  payload
});

export const fetchGlobalCovid = payload => ({
  type: FETCH_GLOBAL,
  payload
});

export const fetchSelectedCountry = payload => ({
  type: FETCH_SELECTED_COUNTRY,
  payload
});

export const setCountryStatus = payload => ({
  type: SET_COUNTRY_STATUS,
  payload
});

export const setGlobalStatus = payload => ({
  type: SET_GLOBAL_STATUS,
  payload
});
