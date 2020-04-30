import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

// eslint-disable-next-line no-unused-vars
const configureStore = (rootReducers, initialState, options = {}) => {
  const middleware = [reduxThunk];
  const config = {};
  config.store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return config;
};

export default configureStore;
