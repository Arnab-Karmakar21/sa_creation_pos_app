import {StoresState} from '../../models/StoreModel';
import {StoreState} from '../../models/reduxModel';
import {StockActionTypes} from '../actions/StockAction';
import {StoreActionTypes} from '../actions/storeAction';
import {UserManagementActionTypes} from '../actions/userManagementAction';
import InitialState from './initialState';

const initialState: StoresState = InitialState.store;

export default function storeReducer(
  state: StoresState = initialState,
  action: any,
) {
  switch (action.type) {
    case StoreActionTypes.Store_List_Load_Success:
      return {
        ...state,
        storeList: action.payload,
        stockAddDone: false,
        updatingDone: false,
      };
    case StoreActionTypes.Store_Add_Load_Success:
      return {
        ...state,
        storeCategories: action.payload.storeCategories,
        unit: action.payload.unit,
      };
    case StoreActionTypes.Store_List_Load_Success:
      return {
        ...state,
        storeCategories: [],
        unit: [],
      };
    case StoreActionTypes.Store_Details_Load_Success:
      return {
        ...state,
        singleStore: action.payload.singleStore,
        storeStock: action.payload.storeStock,
        templates: undefined,
      };
    case StoreActionTypes.Store_Inventory_Load_Success:
      return {...state, templates: action.payload, templateInfo: undefined};
    case StoreActionTypes.Brand_Add_Action_Success:
      return {...state, brandAddDone: action.payload};
    case StoreActionTypes.Reset_Brand_Add_Done:
      return {...state, brandAddDone: action.payload};
    case StoreActionTypes.Stock_Add_Load_Success:
      return {
        ...state,
        templateList: action.payload.templates,
        units: action.payload.units,
        productCategories: action.payload.productCategories,
        productSubCategories: action.payload.productSubCategories,
        productBrands: action.payload.productBrands,
        varients: action.payload.variants,
      };
    case StoreActionTypes.Reset_Stock_Add_Done:
      return {...state, stockAddDone: action.payload};
    case StoreActionTypes.Product_Category_Load_Success:
      return {...state, productCategories: action.payload};
    case StoreActionTypes.Product_Sub_Category_Load_Success:
      return {...state, productSubCategories: action.payload};
    case StoreActionTypes.Product_Edit_Load_Success:
      return {
        ...state,
        units: action.payload.units,
        singleProductDetail: action.payload.singleProductDetail,
      };
    case StoreActionTypes.Product_Brand_Load_Success:
      return {...state, productBrands: action.payload};
    case StoreActionTypes.Store_Edit_Load_Success:
      return {
        ...state,
        storeCategories: action.payload.storeCategories,
        singleStore: action.payload.singleStore,
        unit: action.payload.unit,
      };
    case StoreActionTypes.Store_Edit_Action_Success:
      return {...state, updatingDone: action.payload};
    case StoreActionTypes.Product_Variants_Load_Success:
      return {...state, varients: action.payload};
    case StoreActionTypes.Stock_Add_Action_Success:
      return {...state, stockAddDone: action.payload};
    case StoreActionTypes.Stock_Modify_Load_Success:
      return {...state, txnTypes: action.payload};
    case StoreActionTypes.Stock_Modify_Action_Success:
      return {...state, updateStockDone: action.payload};
    case StoreActionTypes.Reset_Stock_Update_Done:
      return {...state, updateStockDone: action.payload};
    case StoreActionTypes.Qr_Set_Action:
      return {...state, qr_flag: action.payload.qr_flag, qr: action.payload.qr};
    case StoreActionTypes.Product_Edit_Action_Success:
      return {
        ...state,
        productEditDone: action.payload,
      };
    case StoreActionTypes.Reset_Product_Edit_Action:
      return {
        ...state,
        productEditDone: action.payload,
        singleProductDetail: undefined,
      };
    case UserManagementActionTypes.Role_Load_Success_Action:
      return {
        ...state,
        storeList: action.payload.storeList,
      };
    case StockActionTypes.Stock_Fullfillment_Load_Success:
      return {...state, singleProductDetail: undefined};
    case StoreActionTypes.Similar_Product_Success_Action:
      return {...state, similar_product: action.payload};
    default:
      return state;
  }
}
