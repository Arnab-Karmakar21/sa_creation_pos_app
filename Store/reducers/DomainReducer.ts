import {DomainState} from '../../Models/DomainModels';
import {StoreActionTypes} from '../actions/storeAction';
import {UserActionTypes} from '../actions/userAction';
import { UserManagementActionTypes } from '../actions/userManagementAction';
import InitialState from './initialState';

const initialState: DomainState = InitialState.domain;

export default function DomainReducer(
  state: DomainState = initialState,
  action: any,
) {
  switch (action.type) {
    case UserActionTypes.Sign_Up_Load_Success:
      return {
        ...state,
        cities: action.payload.cities,
        states: action.payload.states,
        countries: action.payload.countries,
        districts: action.payload.districts,
      };
    case StoreActionTypes.Store_Add_Load_Success:
      return {
        ...state,
        states: action.payload.states,
        countries: action.payload.countries,
        districts: action.payload.districts,
      };
    case StoreActionTypes.Store_List_Load_Success:
      return {
        ...state,
        states: [],
        countries: [],
        districts: [],
      };
    case StoreActionTypes.Store_Edit_Load_Success:
      return {
        ...state,
        states: action.payload.states,
        countries: action.payload.countries,
        districts: action.payload.districts,
      };
    case UserManagementActionTypes.User_Add_Load_Success_Action:
      return {
        ...state,
        states: action.payload.states,
        countries: action.payload.countries,
        districts: action.payload.districts,
      }
    default:
      return state;
  }
}
