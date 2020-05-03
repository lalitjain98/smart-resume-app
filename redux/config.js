/* eslint-disable no-underscore-dangle */
import {
  createStore, compose, applyMiddleware, combineReducers,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import reducersObj from './reducers';

const combinedReducer = combineReducers(reducersObj);

function crossSliceReducer(state, action) {
  switch (action.type) {
  case 'persist/REHYDRATE': {
    const newState = JSON.parse(JSON.stringify(state));
    const { payload } = action;
    if (payload && payload._persist && payload._persist.version >= process.env.BUILD_ID) {
      return action.payload;
    }
    // if (window.location.pathname !== '/') setTimeout(() => window.location.replace('/'), 300);
    return newState;
  }
  default:
    return state;
  }
}

function rootReducer(state, action) {
  const intermediateState = crossSliceReducer(state, action);
  const finalState = combinedReducer(intermediateState, action);
  return finalState;
}

const enableLogs = process.env.NODE_ENV !== 'production';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
  version: process.env.BUILD_ID,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isClient = typeof window !== 'undefined';

export default () => {
  let store;
  if (isClient) {
    store = createStore(
      persistedReducer,
      composeWithDevTools(
        applyMiddleware(thunk),
        enableLogs ? applyMiddleware(logger) : (f) => f,
        // window.devToolsExtension ? window.devToolsExtension() : f => f,
      ),
    );
    store.__PERSISTOR = persistStore(store);
    return store;
  }
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
      enableLogs ? applyMiddleware(logger) : (f) => f,
      // window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
};
