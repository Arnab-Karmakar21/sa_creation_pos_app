import {WishListMain} from '../../models/WishListModels';
import {WishListActionTypes} from '../actions/WishListActions';
import InitialState from './initialState';

const initialState: WishListMain = InitialState.wish_list;

export default function WishListReducer(
  state: WishListMain = initialState,
  action: any,
) {
  switch (action.type) {
    case WishListActionTypes.WishList_Get_Success_Action:
      return {
        ...state,
        wishListLists:
          action.payload.init == 1
            ? [...state.wishListLists, ...action.payload.wishlists]
            : action.payload.wishlists,
        no_wishlist: action.payload.no_wishlist,
        wishlist_detail: undefined,
        total: action.payload.total,
        GoodRecived: undefined,
      };
    case WishListActionTypes.Search_WishList_Success_Action:
      return {
        ...state,
        product_list:
          action.payload.init === 0
            ? action.payload.product_list
            : [...state.product_list, ...action.payload.product_list],
        total_count: action.payload.total_count,
      };
    case WishListActionTypes.WishList_Details_Success_Action:
      return {...state, wishlist_detail: action.payload};
    case WishListActionTypes.WishList_Details_Load_Success_Action:
      return {...state, wishlist_detail: action.payload};
    case WishListActionTypes.Good_Recived_Success_Action:
      return {...state, GoodRecived: action.payload};
    case WishListActionTypes.Good_Recived_List_Success_Action:
      return {...state, GoodRecived: action.payload};
    default:
      return state;
  }
}
