import {BaseCustomerUrl, environment} from '../environment';
import RestService from './rest';

export const serviceClient = new RestService({
  baseURL: BaseCustomerUrl,
});

export const GenerateOtpService = (payload: any) => {
  return serviceClient.post(environment.url.GenerateOtpUrl, payload);
};
