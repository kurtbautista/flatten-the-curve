import { Map } from "immutable";
import { combineReducers } from "redux";
import covidReducer, {
  initialState as initialCovidReducer
} from "./covidReducer";

export const initialState = Map({
  covid: initialCovidReducer
});

const rootReducers = combineReducers({
  flattenTheCurve: covidReducer
});

export default rootReducers;
