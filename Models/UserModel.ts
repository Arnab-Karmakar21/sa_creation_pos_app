export interface UserMain {
  user_detail?: User;
}

export interface User {
  admn_user_id: number;
  username: string;
  contact_phone: string;
  email_id: string;
  firstname: string;
  lastname: string;
  partner_name: string;
  company_name: string;
  contact_email: string;
  contact_person_firstname: string;
  contact_person_lastname: string;
  contact_person_designation: string;
  gst_numbers: string;
  pan: string;
  billing_name: string;
  partner_status: number;
  district_id: number;
  address_id: number;
  addressline1: string;
  addressline2: string;
  city: string;
  pin: number;
  states_name: string;
  countries_name: string;
  account_holder_name: string;
  account_no: string;
  ifsc_code: string;
  bank_name: string;
  branch_name: any;
  district_name: string;
  user_type_name: string;
  partner_status_dtls: string;
  role_permissions: RolePermission[];
  role_name?: string;
  partner_id?: number;
  active_shift?: active_shift;
  user_type: number;
}
export interface active_shift {
  open_count: number;
  shift_no: number;
  store_id: number;
  store_name: string;
  unit_id: number;
  unit_name: string;
}
export interface RolePermission {
  control_element_name: string;
  permission: string;
}

export interface StoreList {
  store_id: number;
  store_address_id: number;
  store_name: string;
  store_category: number;
  store_image: string;
  qc_partner_id: number;
  store_rating: number;
  district_id: number;
  unit_id: number;
  store_status: number;
  created_on: any;
  updated_on: any;
  store_open_time: string;
  store_close_time: string;
  store_days: string;
  latitude: number;
  longitude: number;
  addressline1: string;
  addressline2: any;
  pin: number;
  city: string;
  state: number;
  country: number;
  states_name: string;
  countries_name: string;
  store_type_name: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ForgotPasswordPayload {
  mobile_no: string;
  otp: string;
  new_password: string;
}
