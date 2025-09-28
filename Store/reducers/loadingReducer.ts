import {LoadingState} from '../../models/loadingModels';
import {OrderActionTypes} from '../actions/OrderAction';
import {StockActionTypes} from '../actions/StockAction';
import {WishListActionTypes} from '../actions/WishListActions';
import {ApiStatusActionTypes} from '../actions/apiStatusActions';
import {PosActionTypes} from '../actions/posActions';
import {StoreActionTypes} from '../actions/storeAction';
import {UserActionTypes} from '../actions/userAction';
import {UserManagementActionTypes} from '../actions/userManagementAction';
import InitialState from './initialState';

const initialState: LoadingState = InitialState.loading;

export default function LoadingReducer(
  state: LoadingState = initialState,
  action: any,
) {
  switch (action.type) {
    case ApiStatusActionTypes.Begin_Api_Call:
      return {
        ...state,
        count: state.count + action.payload.count,
        message: action.payload.message,
      };
    case ApiStatusActionTypes.Api_Call_Error:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case ApiStatusActionTypes.Api_Call_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case ApiStatusActionTypes.Loading_Stop_Success:
      return {...state, count: 0};
    case UserActionTypes.Generate_Code_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserActionTypes.Sign_Up_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserActionTypes.Sign_Up_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserActionTypes.Login_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Store_List_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Store_Add_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Store_Add_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Store_Details_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Store_Inventory_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Brand_Add_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Stock_Add_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Product_Category_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Product_Sub_Category_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Product_Edit_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Product_Brand_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Store_Edit_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Store_Edit_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Product_Variants_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Stock_Add_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Stock_Modify_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Stock_Modify_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Product_Edit_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserManagementActionTypes.Create_User_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserManagementActionTypes.User_Add_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Shift_Start_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Shift_Start_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Customer_Search_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Customer_Registration_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserManagementActionTypes.Role_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserManagementActionTypes.Create_User_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserManagementActionTypes.User_List_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Product_Search_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Product_Booking_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Booking_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserManagementActionTypes.Update_User_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserManagementActionTypes.Single_User_Details_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Hold_Bill_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Void_Order_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Remove_Items_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Shift_End_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Payment_Initial_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Made_Payment_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Payment_Summery_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Transfer_Payment_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case WishListActionTypes.WishList_Get_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Complete_Order_History_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case WishListActionTypes.WishList_Get_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Order_History_Detail_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case WishListActionTypes.Search_WishList_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case WishListActionTypes.WishList_Details_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case WishListActionTypes.WishList_Details_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case WishListActionTypes.Update_Requsition_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case OrderActionTypes.Order_List_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case OrderActionTypes.Signle_Order_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case OrderActionTypes.Update_Order_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StockActionTypes.Stock_Fullfillment_List_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserActionTypes.Change_Password_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserActionTypes.Forgot_Password_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserActionTypes.Generate_Otp_Action_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StockActionTypes.Fullfillment_Create_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StockActionTypes.Stock_Fullfillment_Load_Success:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StockActionTypes.Req_Create_Product_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Get_Return_Product_Detail_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Bill_Item_Return_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case WishListActionTypes.Good_Recived_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case WishListActionTypes.Good_Recived_List_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Return_List_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Return_Detail_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case PosActionTypes.Return_Detail_Load_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case StoreActionTypes.Similar_Product_Success_Action:
      return {...state, count: state.count > 0 ? state.count - 1 : 0};
    case UserActionTypes.Logout_Success_Action:
      return initialState;
    default:
      return state;
  }
}
