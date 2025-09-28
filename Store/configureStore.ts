import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {StoreState} from '../models/reduxModel';

export default function ConfigureStore(initialState?: StoreState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [thunk],
  });
}
