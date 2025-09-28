import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GenerateCodePayload,
  LoginPayload,
  SignUpPayload,
} from '../../Models/AuthenticationModels';
import {
  GenerateCodeService,
  LoginService,
  SignUpService,
} from '../../Service/ServicePartner';
import {
  ChangePasswordService,
  CitiesService,
  CountriesService,
  DistrictsService,
  ForgotPasswordService,
  StatesService,
} from '../../Service/ServiecShared';
import {showIndefiniteToast, showToast} from '../../Service/Toast';
import {
  CityItem,
  StateItem,
  CountryItem,
  DistrictItem,
} from '../../models/DomainModels';
import {ForgotPasswordPayload, User} from '../../models/UserModel';
import {ApiCallErrorAction, BeginApiCallAction} from './apiStatusActions';
import {GenerateOtpService} from '../../Service/Customer';

export enum UserActionTypes {
  Logout_Success_Action = '[USER] Logout Success Action',
  Generate_Code_Action_Success = '[USER] Generate Code Action Success',
  Sign_Up_Load_Success = '[USER] Sign Up Load Success',
  Sign_Up_Action_Success = '[USER] Sign Up Action Success',
  Login_Success_Action = '[USER] Login Success Action',
  Change_Password_Success_Action = '[USER] Change Password Success Action',
  Forgot_Password_Success_Action = '[USER] Forgot Password Success Action',
  Generate_Otp_Action_Success = '[USER] Generate OTP Action Success',
}

export const UserLogoutSuccess = () => {
  return {type: UserActionTypes.Logout_Success_Action};
};

export const GenerateCode = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Generating Code. Please Wait.',
      }),
    );
    return GenerateCodeService(payload.data)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          payload.navigation.replace('signupdetails');
          dispatch(GenerateCodeSuccess());
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

export const GenerateCodeSuccess = () => {
  showIndefiniteToast('Partner Code sent via SMS.', 'rgba(0, 0, 0, 0.7)');
  return {type: UserActionTypes.Generate_Code_Action_Success, payload: true};
};

export const SignUpLoad = () => {
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
    ])
      .then(response => {
        if (
          response[0].data.exception ||
          response[1].data.exception ||
          response[2].data.exception ||
          response[3].data.exception
        ) {
          if (response[0].data.exception) {
            dispatch(ApiCallErrorAction(response[0].data.Errors));
          } else if (response[1].data.exception) {
            dispatch(ApiCallErrorAction(response[1].data.Errors));
          } else if (response[2].data.exception) {
            dispatch(ApiCallErrorAction(response[2].data.Errors));
          } else {
            dispatch(ApiCallErrorAction(response[3].data.Errors));
          }
        } else {
          dispatch(
            SignUpLoadSuccess(
              response[0].data.data,
              response[1].data.data,
              response[2].data.data,
              response[3].data.data,
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

export const SignUpLoadSuccess = (
  cities: CityItem[],
  states: StateItem[],
  countries: CountryItem[],
  districts: DistrictItem[],
) => {
  return {
    type: UserActionTypes.Sign_Up_Load_Success,
    payload: {
      cities,
      states,
      countries,
      districts,
    },
  };
};

export const SignUpAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Completing Signup. Please Wait.',
      }),
    );
    return SignUpService(payload.data)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          payload.navigation.replace('login');
          dispatch(SignUpActionSuccess());
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

export const SignUpActionSuccess = () => {
  return {
    type: UserActionTypes.Sign_Up_Action_Success,
  };
};

export const LoginAction = (payload: LoginPayload) => {
  console.log("LOGIN PAYLOAD :: ", payload);
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Signing In. Please Wait.',
      }),
    );
    return LoginService(payload)
      .then(response => {
        console.log("response?.status :: ", response.status);
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(LoginSuccessAction(response.data.data));
        }
      })
      .catch(error => {
        console.log("error?.response?.status :: ", error);
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

export const LoginSuccessAction = (payload: User) => {
  showToast('Login successful. Welcome to SA Creation.', 'rgba(0, 0, 0, 0.7)');
  return {type: UserActionTypes.Login_Success_Action, payload: payload};
};

export const ChangePasswordAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Changing Password. Please Wait.',
      }),
    );
    return ChangePasswordService(payload.data)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(ChangePasswordSuccessAction());
          dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
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

export const ChangePasswordSuccessAction = () => {
  showIndefiniteToast('Password Changed Successfully.', 'rgba(0, 0, 0, 0.7)');
  return {type: UserActionTypes.Change_Password_Success_Action, payload: true};
};

export const ForgotPasswordAction = (payload: ForgotPasswordPayload) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Changing Password. Please Wait.',
      }),
    );
    return ForgotPasswordService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(ForgotPasswordSuccessAction());
          // dispatch(UserLogoutSuccess());
          // AsyncStorage.multiRemove(['userData', 'token']);
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

export const ForgotPasswordSuccessAction = () => {
  showIndefiniteToast('Password Reset Successfull.', 'rgba(0, 0, 0, 0.7)');
  return {type: UserActionTypes.Forgot_Password_Success_Action, payload: true};
};

export const GenerateOTP = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Generating Code. Please Wait.',
      }),
    );
    return GenerateOtpService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(GenerateOtpSuccess());
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

export const GenerateOtpSuccess = () => {
  showIndefiniteToast('OTP sent via SMS.', 'rgba(0, 0, 0, 0.7)');
  return {type: UserActionTypes.Generate_Otp_Action_Success};
};
