import {
  CityItem,
  CountryItem,
  DistrictItem,
  DomainState,
  StateItem,
} from './DomainModels';

export interface UserManagementMain {
  entity_type_main: entityType[];
  role_type_main: Role[];
  userList: UserDetails[];
  singleUserDetails?: SingleUserDetails;
}
export interface CreateUserPayload {
  // username: string
  // password: any
  admn_user_id: number;
  firstname: string;
  lastname: string;
  entity_type: number;
  entity_id: any;
  role_id: number;
  email_id: string;
  contact_phone: string;
  addressline1: string;
  addressline2: any;
  state_id: number;
  country_id: number;
  pin: number;
  city: string;
  district_id: number;
  // user_status: any
}

export interface entityType {
  entity_type: number;
  entity_type_name: string;
}

export interface Role {
  admn_role_id: number;
  role_name: string;
}
export interface GetUserPayload {
  page_index: any;
  page_size: any;
  partner_id: number;
  store_id: any;
}

export interface UserDetails {
  admn_user_id: number;
  qc_partner_id: number;
  company_name: string;
  firstname: string;
  lastname: string;
  email_id: string;
  contact_phone: string;
  addressline1: string;
  addressline2: string;
  pin: number;
  city: string;
  district_name: string;
  countries_name: string;
  states_name: string;
  entity_type: number;
  entity_id: number;
  store_id: string;
  store_name: string;
  user_status: number;
  user_status_name: any;
}
export interface UpdateStatusPayload {
  admin_user_id: number;
  user_status: number;
}

export interface SingleUserDetails {
  admn_user_id: number;
  user_type: number;
  user_status: number;
  username: string;
  firstname: string;
  lastname: string;
  contact_phone: string;
  email_id: string;
  addressline1: string;
  addressline2: any;
  pin: number;
  city: string;
  state_id: number;
  country_id: number;
  district_id: number;
  district_name: string;
  states_name: string;
  countries_name: string;
  stores: StoreDetails[];
  entity_details: EntityDetails[];
}

export interface EntityDetails {
  role_id: number;
  role_name: string;
  entity_id: number;
  entity_name: string;
  entity_type: number;
  entity_type_name: string;
}
export interface StoreDetails {
  store_id: number;
  store_name: string;
}
