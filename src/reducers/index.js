import { combineReducers } from 'redux';
import coordinatesReducer from './coordinates-reducer';

const rootReducer = combineReducers({
  coords: coordinatesReducer,
});

export default rootReducer;
