import {ErrorModel, ErrorState} from '../../models/errorModels';
import {LoadingPayload} from '../../models/loadingModels';

export enum ApiStatusActionTypes {
  Begin_Api_Call = '[API_STATUS] Begin Api Call Action',
  Api_Call_Error = '[API_STATUS] Api Call Error Action',
  Api_Call_Success = '[API_STATUS] Api Call Success Action',
  Loading_Stop_Success = '[API_STATUS] Loading Stop Success',
  Camera_Clear_One = '[API_STATUS] Camera Clear One',
  Camera_Clear_All = '[API_STATUS] Camera Clear All',
  Location_pick_Success_Action = '[API_STATUS] Location Pick Success Action',
  UpdateLocation_Success_Action = '[API_STATUS] UpdateLocation Success Action',
}

export const BeginApiCallAction = (payload: LoadingPayload) => {
  return {type: ApiStatusActionTypes.Begin_Api_Call, payload: payload};
};

export const ApiCallErrorAction = (payload: ErrorModel) => {
  return {type: ApiStatusActionTypes.Api_Call_Error, payload: payload};
};

export const ApiCallSuccessAction = () => {
  return {type: ApiStatusActionTypes.Api_Call_Success};
};

export const LoadingStopAction = () => {
  return {type: ApiStatusActionTypes.Loading_Stop_Success};
};
export const CameraClearOne = (payload: number) => {
  return {type: ApiStatusActionTypes.Camera_Clear_One, payload: payload};
};
export const CameraClearAll = () => {
  return {type: ApiStatusActionTypes.Camera_Clear_All};
};
export const LocationPickSuccessAction = (loc: any) => {
  return {
    type: ApiStatusActionTypes.Location_pick_Success_Action,
    payload: loc,
  };
};
export const LocationClearAction = () => {
  return {type: ApiStatusActionTypes.Loading_Stop_Success};
};
