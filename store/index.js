import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import temperatureSettingsReducer from './temperatureSettings';
import speedSettingsReducer from './speedSettings';
import unitsReducer from './units';
import logger from 'redux-logger';

const rootReducer = combineReducers ({
  session: sessionReducer,
  temperatureSettings: temperatureSettingsReducer,
  speedSettings: speedSettingsReducer,
  units: unitsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  // const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState={}) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;