import {StockState} from '../../models/Stock';
import {StockActionTypes} from '../actions/StockAction';
import InitialState from './initialState';

const initialState: StockState = InitialState.stock;

export default function StockReducer(
  state: StockState = initialState,
  action: any,
) {
  switch (action.type) {
    case StockActionTypes.Stock_Fullfillment_List_Load_Success:
      return {
        ...state,
        requsition_detail: undefined,
        requisitionList:
          action.payload.init == 1
            ? [...state.requisitionList, ...action.payload.requisition_list]
            : action.payload.requisition_list,
        total: action.payload.total,
      };
    case StockActionTypes.Fullfillment_Create_Success_Action:
      return {...state, requsition_detail: action.payload};
    case StockActionTypes.Stock_Fullfillment_Load_Success:
      return {...state, requsition_detail: action.payload};
    default:
      return state;
  }
}
