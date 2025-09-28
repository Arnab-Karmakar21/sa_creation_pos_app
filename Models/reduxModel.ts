import {DomainState} from './DomainModels';
import {LocationItem} from './LocationModels';
import { OrderState } from './OrderModel';
import {POSMain} from './PosModel';
import { StockState } from './Stock';
import {StoresState} from './StoreModel';
import {UserManagementMain} from './UserManagementModel';
import {UserMain} from './UserModel';
import {WishListMain} from './WishListModels';
import {ErrorState} from './errorModels';
import {LoadingState} from './loadingModels';

export interface StoreState {
  loading: LoadingState;
  error: ErrorState;
  user: UserMain;
  domain: DomainState;
  store: StoresState;
  location: LocationItem | null;
  usermanagement: UserManagementMain;
  pos: POSMain;
  wish_list: WishListMain;
  order: OrderState;
  stock: StockState;
}
