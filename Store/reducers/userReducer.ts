import {UserMain} from '../../models/UserModel';
import {ApiStatusActionTypes} from '../actions/apiStatusActions';
import {PosActionTypes} from '../actions/posActions';
import {UserActionTypes} from '../actions/userAction';
import InitialState from './initialState';

const initialState: UserMain = InitialState.user;

export default function UserReducer(
  state: UserMain = initialState,
  action: any,
) {
  switch (action.type) {
    case UserActionTypes.Logout_Success_Action:
      return {...state, user_detail: undefined};
    case UserActionTypes.Login_Success_Action:
      return {...state, user_detail: action.payload};
    case PosActionTypes.Shift_End_Action:
      return {
        ...state,
        user_detail: {...state.user_detail, active_shift: undefined},
      };
    case PosActionTypes.Shift_Start_Action:
      return {
        ...state,
        user_detail: {
          ...state.user_detail,
          active_shift: action.payload.active_shift,
        },
      };
    case UserActionTypes.Change_Password_Success_Action: {
      return {
        ...state,
      };
    }
    case UserActionTypes.Forgot_Password_Success_Action: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
