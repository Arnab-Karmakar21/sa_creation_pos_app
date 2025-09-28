import {LocationItem} from '../../Models/LocationModels';
import {LocationActionTypes} from '../actions/LocationActions';
import InitialState from './initialState';

const initialState: LocationItem | null = InitialState.location;

export default function LocationReducer(
  state: LocationItem | null = initialState,
  action: any,
) {
  switch (action.type) {
    case LocationActionTypes.Set_Location_Success:
      return {...state, ...action.payload};
    case LocationActionTypes.Clear_Location_Data:
      return null;
    default:
      return state;
  }
}
