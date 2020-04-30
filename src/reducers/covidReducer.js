/* eslint-disable no-case-declarations */
import { Map, fromJS, List } from "immutable";
import {
  IS_FETCHING,
  DONE_FETCHING,
  FETCH_COUNTRY,
  FETCH_SELECTED_COUNTRY,
  FETCH_GLOBAL,
  SET_GLOBAL_STATUS
} from "../actions/actionType";

export const initialState = Map({
  countries: List(),
  globalStatus: Map(),
  globalStatistics: List(),
  globalData: List(),
  covidStatus: Map(),
  covidStatistics: List(),
  isFetching: false
});

const covidReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case IS_FETCHING: {
      return state.set("isFetching", true);
    }
    case DONE_FETCHING: {
      return state.set("isFetching", false);
    }
    case FETCH_COUNTRY: {
      const { Countries: list } = payload;
      const country = list.map(item => ({
        label: item.Country,
        value: item.Slug
      }));
      return state.set("countries", fromJS(country));
    }
    case FETCH_GLOBAL: {
      const { Global, Countries } = payload;
      const date = Countries.map(item =>
        new Date(item.Date).toLocaleDateString()
      );
      const totalConfirmed = Countries.map(item => item.TotalConfirmed);
      const totalRecovered = Countries.map(item => item.TotalRecovered);
      const totalDeaths = Countries.map(item => item.TotalDeaths);
      const statistics = {
        date,
        totalConfirmed,
        totalRecovered,
        totalDeaths
      };
      return state
        .set("covidStatus", Map(Global))
        .set("globalStatus", Map(Global))
        .set("globalData", fromJS(Countries))
        .set("globalStatistics", fromJS(statistics))
        .set("covidStatistics", fromJS(statistics));
    }
    case FETCH_SELECTED_COUNTRY: {
      const { data, country: selectedCountry } = payload;
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric"
      };
      const date = data.map(item =>
        new Date(item.Date).toLocaleDateString("en-US", options)
      );
      const totalConfirmed = data.map(item => item.Confirmed);
      const totalRecovered = data.map(item => item.Recovered);
      const totalDeaths = data.map(item => item.Deaths);
      const statistics = {
        date,
        totalConfirmed,
        totalRecovered,
        totalDeaths
      };
      const countryStatus = state
        .get("globalData")
        .filter(item => item.get("Slug") === selectedCountry)
        .get("0");
      return state
        .set("covidStatus", countryStatus || Map())
        .set("covidStatistics", fromJS(statistics));
    }
    case SET_GLOBAL_STATUS:
      const globalStatus = state.get("globalStatus");
      const globalStatistics = state.get("globalStatistics");
      return state
        .set("covidStatus", globalStatus || Map())
        .set("covidStatistics", globalStatistics);
    default:
      return state;
  }
};

export default covidReducer;
