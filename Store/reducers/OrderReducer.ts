import {OrderState} from '../../Models/OrderModel';
import {OrderActionTypes} from '../actions/OrderAction';
import InitialState from './initialState';

const initialState: OrderState = InitialState.order;
export default function OrderReducer(
  state: OrderState = initialState,
  action: any,
) {
  switch (action.type) {
    case OrderActionTypes.Order_List_Load_Success_Action:
      return {
        ...state,
        orderStatus: action.payload.orderStatus,
        OrderList:
          action.payload.init === 0
            ? action.payload.OrderList
            : [...state.OrderList, ...action.payload.OrderList],
        active_order: action.payload.active_order,
      };
    case OrderActionTypes.Signle_Order_Load_Success_Action:
      return {...state, SingleOrder: action.payload};
    case OrderActionTypes.List_Clear_Action:
      return {...state, active_order: undefined, OrderList: []};
    default:
      return state;
  }
}
