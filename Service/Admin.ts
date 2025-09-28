import {BaseAdminUrl, environment} from '../environment';
import {UpdateStatusPayload, UserDetails} from '../models/UserManagementModel';
import RestService from './rest';

export const serviceClient = new RestService({
  baseURL: BaseAdminUrl,
});

export const GetTemplatesService = (category: number) => {
  return serviceClient.post(environment.url.tempateGetBYCatUrl, {
    category: category,
  });
};

export const GetCategoriesService = (template_id: number) => {
  return serviceClient.post(environment.url.getCatUrlbytem, {
    template_id: template_id,
  });
};
export const GetSubCategoriesService = (template_item_id: number) => {
  return serviceClient.post(environment.url.templateGetsubCatUrl, {
    template_item_id: template_item_id,
  });
};

export const GetBrandsService = (payload: any) => {
  return serviceClient.post(environment.url.adminTemGetBrandUrl, payload);
};

export const GetVarient = (payload: any) => {
  return serviceClient.post(environment.url.getVariantUrl, {
    variant_type: payload,
  });
};
export const createUser = (payload: UserDetails) => {
  return serviceClient.post(environment.url.CreateUserUrl, payload);
};
export const getEntityType = () => {
  return serviceClient.get(environment.url.getEntityTypeUrl);
};
export const getRoles = (payload: any) => {
  return serviceClient.post(environment.url.getRolesUrl, payload);
};
export const updateStatus = (payload: UpdateStatusPayload) => {
  return serviceClient.post(environment.url.updateUserStatus, payload);
}
export const getSingleUserDetails = (payload: any) => {
  return serviceClient.post(environment.url.singleUserDetailsUrl, payload);
}
// export const DomainService = (domain_type: string) => {
//   return serviceClient.post(environment.url.domainUrl, {
//       "domain_type": domain_type
//   });
// }