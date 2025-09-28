import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiCallErrorAction, BeginApiCallAction} from './apiStatusActions';
import {UserLogoutSuccess} from './userAction';
import {showIndefiniteToast} from '../../Service/Toast';
import {
  CitiesService,
  CountriesService,
  DistrictsService,
  StatesService,
} from '../../Service/ServiecShared';
import {
  CityItem,
  CountryItem,
  DistrictItem,
  StateItem,
} from '../../models/DomainModels';
import {EntityType} from 'aws-sdk/clients/iam';
import {
  Role,
  SingleUserDetails,
  UpdateStatusPayload,
  UserDetails,
  entityType,
} from '../../models/UserManagementModel';
import {
  createUser,
  getEntityType,
  getRoles,
  getSingleUserDetails,
  updateStatus,
} from '../../Service/Admin';
import {GetStoresService} from '../../Service/ServicePartner';
import {StoreItem} from '../../models/StoreModel';
import {GetUserService} from '../../Service/Partner';

export enum UserManagementActionTypes {
  User_Add_Load_Success_Action = '[USERMANAGEMENT] User Load Action Success',
  Create_User_Success_Action = '[USERMANAGEMENT] Create User Action Success',
  Role_Load_Success_Action = '[USERMANAGEMENT] Role Load Action Success',
  User_List_Load_Success_Action = '[USERMANAGEMENT] User List Load Action Success',
  Update_User_Success_Action = '[USERMANAGEMENT] Update User Status Action Success',
  Single_User_Details_Success_Action = '[USERMANAGEMENT] Single User Details Action Success',
}

export const UserAddLoad = () => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return Promise.all([
      CitiesService(),
      StatesService(),
      CountriesService(),
      DistrictsService(),
      getEntityType(),
    ])
      .then(response => {
        if (
          response[0].data.exception ||
          response[1].data.exception ||
          response[2].data.exception ||
          response[3].data.exception ||
          response[4].data.exception
        ) {
          if (response[0].data.exception) {
            dispatch(ApiCallErrorAction(response[0].data.Errors));
          } else if (response[1].data.exception) {
            dispatch(ApiCallErrorAction(response[1].data.Errors));
          } else if (response[2].data.exception) {
            dispatch(ApiCallErrorAction(response[2].data.Errors));
          } else if (response[3].data.exception) {
            dispatch(ApiCallErrorAction(response[3].data.Errors));
          } else if (response[4].data.exception) {
            dispatch(ApiCallErrorAction(response[4].data.Errors));
          }
        } else {
          dispatch(
            UserAddLoadSuccess(
              response[0].data.data,
              response[1].data.data,
              response[2].data.data,
              response[3].data.data,
              response[4].data.data,
            ),
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

export const UserAddLoadSuccess = (
  cities: CityItem[],
  states: StateItem[],
  countries: CountryItem[],
  districts: DistrictItem[],
  entity: entityType[],
) => {
  return {
    type: UserManagementActionTypes.User_Add_Load_Success_Action,
    payload: {
      cities,
      states,
      countries,
      districts,
      entity,
    },
  };
};

export const AddUser = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Adding new user. Please Wait.',
      }),
    );
    return createUser(payload.data)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          payload.navigation.navigate('user-list');
          dispatch(CreateUserAddActionSuccess());
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

export const CreateUserAddActionSuccess = () => {
  showIndefiniteToast('User Created Successfully', 'rgba(0, 0, 0, 0.7)');
  return {type: UserManagementActionTypes.Create_User_Success_Action};
};

export const RoleLoad = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching roles. Please Wait.',
      }),
    );
    return Promise.all([
      getRoles(payload.role_payload),
      GetStoresService(payload.store_payload),
    ])
      .then(response => {
        if (response[0].data.exception || response[1].data.exception) {
          if (response[0].data.exception) {
            dispatch(ApiCallErrorAction(response[0].data.Errors));
          } else if (response[1].data.exception) {
            dispatch(ApiCallErrorAction(response[1].data.Errors));
          }
        } else {
          // payload.navigation.replace('user-add');
          dispatch(
            RoleLoadSuccessAction(response[0].data.data, response[1].data.data),
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

export const RoleLoadSuccessAction = (
  roles: Role[],
  storeList: StoreItem[],
) => {
  return {
    type: UserManagementActionTypes.Role_Load_Success_Action,
    payload: {
      roles,
      storeList,
    },
  };
};

export const userList = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching user list. Please Wait.',
      }),
    );
    return GetUserService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(GetUserListSuccessAction(response.data.data));
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

export const GetUserListSuccessAction = (payload: any) => {
  return {
    type: UserManagementActionTypes.User_List_Load_Success_Action,
    payload: payload,
  };
};
export const UpdateUserStatusAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Updating status. Please Wait.',
      }),
    );
    return updateStatus(payload.statusPayload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          // payload.navigation.replace('user-list');
          dispatch(userList(payload.userListPayload));
          dispatch(UpdateStatusSuccessAction());
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
export const UpdateStatusSuccessAction = () => {
  showIndefiniteToast('Status Updated Succesfully', 'rgba(0, 0, 0, 0.7)');
  return {type: UserManagementActionTypes.Update_User_Success_Action};
};

export const GetSingleUserDetails = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching user details. Please Wait.',
      }),
    );
    return getSingleUserDetails(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          // payload.navigation.replace('user-list');
          dispatch(GetSingleUserDetailsSuccessAction(response.data.data));
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

export const GetSingleUserDetailsSuccessAction = (
  singleUserDtls: SingleUserDetails,
) => {
  return {
    type: UserManagementActionTypes.Single_User_Details_Success_Action,
    payload: {
      singleUserDtls,
    },
  };
};
