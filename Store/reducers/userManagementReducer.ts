import {UserManagementMain} from '../../Models/UserManagementModel';
import {UserManagementActionTypes} from '../actions/userManagementAction';
import InitialState from './initialState';

const initialState: UserManagementMain = InitialState.usermanagement;

export default function userManagementReducer(
  state: UserManagementMain = initialState,
  action: any,
) {
  switch (action.type) {
    case UserManagementActionTypes.User_Add_Load_Success_Action:
      return {...state, entity_type_main: action.payload.entity};
    case UserManagementActionTypes.Role_Load_Success_Action:
      return {...state, role_type_main: action.payload.roles};
    case UserManagementActionTypes.Create_User_Success_Action:
      return {...state};
    case UserManagementActionTypes.User_List_Load_Success_Action:
      return {...state, userList: action.payload};
    case UserManagementActionTypes.Update_User_Success_Action:
      return {...state};
    case UserManagementActionTypes.Single_User_Details_Success_Action:
      return {...state, singleUserDetails: action.payload.singleUserDtls};
    default:
      return state;
  }
}
