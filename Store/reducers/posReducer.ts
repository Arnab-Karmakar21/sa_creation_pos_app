import {POSMain} from '../../models/PosModel';
import {PosActionTypes} from '../actions/posActions';
import InitialState from './initialState';

const initialState: POSMain = InitialState.pos;

export default function posReducer(state: POSMain = initialState, action: any) {
  switch (action.type) {
    case PosActionTypes.Customer_Registration_Success_Action:
      return {...state, new_customer: false};
    case PosActionTypes.Customer_Search_Success_Action:
      return {...state, new_customer: action.payload};
    case PosActionTypes.Product_Search_Success_Action:
      return {
        ...state,
        search_flag: action.payload.flag,
        searchProduct: action.payload.data,
      };
    case PosActionTypes.Product_Booking_Success_Action:
      return {
        ...state,
        search_flag: false,
        searchProduct: undefined,
        order_details: action.payload,
      };
    case PosActionTypes.Booking_Load_Success_Action:
      return {
        ...state,
        frequents: action.payload.f,
        order_details: action.payload.o,
      };
    case PosActionTypes.Hold_Bill_Success_Action:
      return {...state, holdbill: action.payload};
    case PosActionTypes.Remove_Items_Success_Action:
      return {
        ...state,
        order_details: {...state.order_details, items: action.payload},
      };
    case PosActionTypes.Payment_Initial_Success_Action:
      return {
        ...state,
        payment_mode: action.payload.payment_mode,
        payment_due: {
          amount_due: action.payload.amount_due,
          unit_address: action.payload.unit_address,
          wallet_balance: action.payload.wallet_balance,
          order_origin_type: action.payload.order_origin_type,
        },
        price_breakup: action.payload.price_breakup,
        order_details: {
          order_no: action.payload.order_no,
          bag_ref_no: action.payload.bag_ref_no,
          items: action.payload.items,
        },
      };
    case PosActionTypes.Made_Payment_Success_Action:
      return {
        ...state,
        paid_Payment: action.payload.flag,
        returnAmount: action.payload.return_amount,
      };
    case PosActionTypes.Payment_Summery_Success_Action:
      return {
        ...state,
        payment_summery: action.payload,
      };
    case PosActionTypes.Complete_Order_History_Success_Action:
      return {
        ...state,
        PreviousOrder:
          action.payload.init === 0
            ? action.payload.orders
            : [...state.PreviousOrder, ...action.payload.orders],
        total_count: action.payload.total_count,
      };
    case PosActionTypes.Order_History_Detail_Success_Action:
      return {
        ...state,
        orderHistoryDetail: action.payload,
      };
    case PosActionTypes.Get_Return_Product_Detail_Success_Action:
      return {
        ...state,
        all_return_details: action.payload,
        bill_return_refund: undefined,
      };
    case PosActionTypes.Bill_Item_Return_Success_Action:
      return {
        ...state,
        bill_return_refund: action.payload,
      };
    case PosActionTypes.Return_List_Load_Success_Action:
      console.log('from ', {
        ...state,
        refund_list:
          action.payload.init === 0
            ? {
                returns: [
                  ...state.refund_list.returns,
                  ...action.payload.returns,
                ],
                total_count: action.payload.total_count,
              }
            : {
                returns: action.payload.returns,
                total_count: action.payload.total_count,
              },
      });

      return {
        ...state,
        return_det: undefined,
        refund_list:
          action.payload.init === 1
            ? {
                returns: [
                  ...state.refund_list.returns,
                  ...action.payload.returns,
                ],
                total_count: action.payload.total_count,
              }
            : {
                returns: action.payload.returns,
                total_count: action.payload.total_count,
              },
      };
    case PosActionTypes.Return_Detail_Load_Success_Action:
      console.log(JSON.stringify(action.payload));

      return {...state, return_det: action.payload};
    default:
      return state;
  }
}
