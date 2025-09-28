import {BaseSharedUrl, environment} from '../environment';
import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
} from '../models/UserModel';
import RestService from './rest';

export const serviceClient = new RestService({
  baseURL: BaseSharedUrl,
});

export const CountriesService = () => {
  return serviceClient.get(environment.url.country_url);
};

export const StatesService = () => {
  return serviceClient.get(environment.url.state_url);
};

export const CitiesService = () => {
  return serviceClient.get(environment.url.city_url);
};

export const DistrictsService = () => {
  return serviceClient.get(environment.url.district_url);
};

export const DomainService = (domain_type: any) => {
  return serviceClient.post(environment.url.domainUrl, domain_type);
};

export const UnitService = () => {
  return serviceClient.get(environment.url.get_units_url);
};
export const GetUnitsService = (store_category: number) => {
  return serviceClient.post(environment.url.getUnitsUrl, {
    store_category: store_category,
  });
};

export const ChangePasswordService = (payload: ChangePasswordPayload) => {
  return serviceClient.post(environment.url.ChangePasswordUrl, payload);
};

export const ForgotPasswordService = (payload: ForgotPasswordPayload) => {
  return serviceClient.post(environment.url.ForgotPasswordUrl, payload);
};
