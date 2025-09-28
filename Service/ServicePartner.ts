import {
  GenerateCodePayload,
  LoginPayload,
  SignUpPayload,
} from '../Models/AuthenticationModels';
import {BasePartnerURL, environment} from '../environment';
import {ShiftStartPayload} from '../models/PosModel';
import {StoreCreatePayload} from '../models/StoreModel';
import RestService from './rest';

export const serviceClient = new RestService({
  baseURL: BasePartnerURL,
});

export const GenerateCodeService = (payload: GenerateCodePayload) => {
  return serviceClient.post(environment.url.generateCode, payload);
};

export const SignUpService = (payload: SignUpPayload) => {
  return serviceClient.post(environment.url.signupUrl, payload);
};

export const LoginService = (payload: LoginPayload) => {
  return serviceClient.post(environment.url.login, payload);
};
export const GetStoresService = (payload: any) => {
  console.log(payload)
  return serviceClient.post(environment.url.store_list_url, payload);
};
export const CreateStoresService = (payload: StoreCreatePayload) => {
  return serviceClient.post(environment.url.storeCreateUrl, payload);
};

export const StartShiftService = (payload: ShiftStartPayload) => {
  return serviceClient.post(environment.url.PosShiftStartUrl, payload);
};

export const CustomerSearchService = (payload: any) => {
  return serviceClient.post(environment.url.customerGetUrl, payload);
};
export const CustomerRegistrationService = (payload: any) => {
  return serviceClient.post(environment.url.customerRegistrationUrl, payload);
};
