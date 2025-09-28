import InitialState from './initialState';
import {ErrorState} from '../../models/errorModels';
import {ApiStatusActionTypes} from '../actions/apiStatusActions';
import {ToastAndroid} from 'react-native';

const initialState: ErrorState = InitialState.error;

export default function ErrorReducer(
  state: ErrorState = initialState,
  action: any,
) {
  switch (action.type) {
    case ApiStatusActionTypes.Api_Call_Error:
      return {...state, error: action.payload};
    default:
      return state;
  }
}
