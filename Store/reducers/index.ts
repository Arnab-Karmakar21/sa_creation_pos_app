import {combineReducers} from '@reduxjs/toolkit';
import ErrorReducer from './errorReducer';
import LoadingReducer from './loadingReducer';
import UserReducer from './userReducer';
import DomainReducer from './DomainReducer';
import storeReducer from './storeReducer';
import LocationReducer from './LocationReducer';
import userManagementReducer from './userManagementReducer';
import posReducer from './posReducer';
import WishListReducer from './wishListReducer';
import OrderReducer from './OrderReducer';
import StockReducer from './StockReducer';

const rootReducer = combineReducers({
  loading: LoadingReducer,
  error: ErrorReducer,
  user: UserReducer,
  domain: DomainReducer,
  store: storeReducer,
  location: LocationReducer,
  usermanagement: userManagementReducer,
  pos: posReducer,
  wish_list: WishListReducer,
  order: OrderReducer,
  stock: StockReducer,
});

export default rootReducer;
