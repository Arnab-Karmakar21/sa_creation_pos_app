import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiCallErrorAction, BeginApiCallAction} from './apiStatusActions';
import {UserLogoutSuccess} from './userAction';
import {
  GetWishListByID,
  GoodRecivedList,
  GoodRecivedService,
  ProductSearchWishList,
  RequsitionCreate,
  UpdateWishlist,
  WishListGet,
} from '../../Service/Partner';
import {showToast} from '../../Service/Toast';

export enum WishListActionTypes {
  WishList_Get_Success_Action = '[WISHLIST] WishList Get Success ACtion',
  Search_WishList_Success_Action = '[WISHLIST] Search WishList Success Action',
  WishList_Details_Success_Action = '[WISHLIST] WishList Details Success ACtion',
  WishList_Details_Load_Success_Action = '[WISHLIST] WishList Details Load Success ACtion',
  Update_Requsition_Success_Action = '[WISHLIST] Update Requsition Success Action',
  Good_Recived_Success_Action = '[WISHLIST] Good Recived Success Action',
  Good_Recived_List_Success_Action = '[WISHLIST] Good Recived List Success Action',
}

export const GetWishListAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fatching Data. Please Wait.',
      }),
    );
    return WishListGet(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(
            GetWishListSuccessAction({
              ...response.data.data,
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

export const GetWishListSuccessAction = (payload: any[]) => {
  return {
    type: WishListActionTypes.WishList_Get_Success_Action,
    payload: payload,
  };
};

export const SearchWishListAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fatching Data. Please Wait.',
      }),
    );
    return ProductSearchWishList(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(
            SearchWishListSuceessAction({
              ...response.data.data,
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

export const SearchWishListSuceessAction = (payload: any[]) => {
  return {
    type: WishListActionTypes.Search_WishList_Success_Action,
    payload: payload,
  };
};

export const WishListDetailsAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fatching Data. Please Wait.',
      }),
    );
    return RequsitionCreate(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          showToast('Updated Successfully.', 'rgba(0, 0, 0, 0.7)');
          dispatch(WishListDetailSuccessAction(response.data.data));
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

export const WishListDetailSuccessAction = (payload: any) => {
  return {
    type: WishListActionTypes.WishList_Details_Success_Action,
    payload: payload,
  };
};

export const WishListDetailsLoadAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fatching Data. Please Wait.',
      }),
    );
    return GetWishListByID(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(WishListDetailLoadSuccessAction(response.data.data));
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

export const WishListDetailLoadSuccessAction = (payload: any) => {
  return {
    type: WishListActionTypes.WishList_Details_Load_Success_Action,
    payload: payload,
  };
};

export const UpdateRequsititionAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fatching Data. Please Wait.',
      }),
    );
    return UpdateWishlist(payload.data)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          if (payload.type == 1) {
            payload.navigation.navigate('wish-list-list');
          } else {
            payload.navigation.navigate('fulfillment-list');
          }
          dispatch(UpdateRequsititionSuccessAction());
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

export const UpdateRequsititionSuccessAction = () => {
  return {
    type: WishListActionTypes.Update_Requsition_Success_Action,
  };
};

export const GoodRecivedAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fatching Data. Please Wait.',
      }),
    );
    return GoodRecivedService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          showToast('Updated Successfully.', 'rgba(0, 0, 0, 0.7)');

          dispatch(GoodRecivedSuccessAction(response.data.data));
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

export const GoodRecivedSuccessAction = (payload: any) => {
  return {
    type: WishListActionTypes.Good_Recived_Success_Action,
    payload: payload,
  };
};

export const GoodRecivedListAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fatching Data. Please Wait.',
      }),
    );
    return GoodRecivedList(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(GoodRecivedSuccessListAction(response.data.data));
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

export const GoodRecivedSuccessListAction = (payload: any) => {
  return {
    type: WishListActionTypes.Good_Recived_List_Success_Action,
    payload: payload,
  };
};
