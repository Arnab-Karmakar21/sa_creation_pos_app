import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  OrderListLoadModel,
  SingleOrder,
  UpdateOrderModel,
} from '../../Models/OrderModel';
import {
  GetOderListService,
  OrderDetailService,
  UpdateOrderService,
} from '../../Service/Partner';
import {DomainService} from '../../Service/ServiecShared';
import {showToast} from '../../Service/Toast';
import {ApiCallErrorAction, BeginApiCallAction} from './apiStatusActions';
import {UserLogoutSuccess} from './userAction';

export enum OrderActionTypes {
  Order_List_Load_Success_Action = '[ORDER] Order List Load Success Action',
  Update_Order_Success_Action = '[ORDER] Update Order Success Action',
  Signle_Order_Load_Success_Action = '[ORDER] Single Order Load Success Action',
  List_Clear_Action = '[POS ] List Clear Action',
}

export const OrderDetailsLoad = (bag_id: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Store Data. Please Wait.',
      }),
    );
    return OrderDetailService(bag_id)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(OrderDetailsLoadSuccess(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const OrderDetailsLoadSuccess = (payload: SingleOrder) => {
  return {
    type: OrderActionTypes.Signle_Order_Load_Success_Action,
    payload: payload,
  };
};

export const UpDateOrder = (data: UpdateOrderModel) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Store Data. Please Wait.',
      }),
    );
    return UpdateOrderService(data)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(OrderDetailsLoad(data.bag_id));
          dispatch(UpdateOrderSuccess());
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const UpdateOrderSuccess = () => {
  showToast('Order updated successfully.', 'rgba(0, 0, 0, 0.7)');
  return {type: OrderActionTypes.Update_Order_Success_Action};
};

export const OrderListLoad = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return Promise.all([
      GetOderListService(payload),
      DomainService({domain_type: ['order_status']}),
    ])
      .then(response => {
        if (response[0].data.exception) {
          dispatch(ApiCallErrorAction(response[0].data.Errors));
        } else if (response[1].data.exception) {
          dispatch(ApiCallErrorAction(response[1].data.Errors));
        } else {
          dispatch(
            OrderListLoadSuccess({
              OrderList: response[0].data.data.orders,
              orderStatus: response[1].data.data.order_status,
              active_order: response[0].data.data.total,
              init: payload.init,
            }),
          );
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const OrderListLoadSuccess = (payload: any) => {
  return {
    type: OrderActionTypes.Order_List_Load_Success_Action,
    payload: payload,
  };
};

export const ListClearAction = () => {
  return {
    type: OrderActionTypes.List_Clear_Action,
  };
};
