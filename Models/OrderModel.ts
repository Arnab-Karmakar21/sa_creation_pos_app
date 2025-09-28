import {DomainData} from './DomainModels';

export interface OrderState {
  OrderList: orders[];
  SingleOrder?: SingleOrder;
  bagStatus: DomainData[];
  Payment_type: DomainData[];
  active_order: number;
  conversation?: any[];
  orderStatus: DomainData[];
}

export interface orders {
  bag_id: number;
  store_id: number;
  bag_ref_no: string;
  updated_on: any;
  updated_by: any;
  bag_status: number;
  paid_to_partner: number;
  paid_to_qubecart: number;
  special_request: any;
  order_id: number;
  order_ref_no: string;
  secret_code: any;
  customer_id: number;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_no: string;
  billing_address_id: number;
  payment_type: number;
  pre_order_flag: number;
  bag_status_name: string;
  total_price: number;
  order_created_at: string;
  expected_delivery_date: any;
  scheduled_delivery_date: string;
  payment_type_name: string;
  customer_name: string;
  address_lane1: string;
  address_lane2: string;
  city: string;
  pin: number;
  state_name: string;
  district_name: string;
  store_name: string;
  qc_partner_id: number;
}

export interface BagItem {
  bag_item_id: number;
  product_id: number;
  required_quantity: number;
  total_price: number;
  bag_item_status: number;
  bag_id: number;
  discount: any;
  product_mrp: number;
  partner_product_id: number;
  updated_on: string;
  updated_by: number;
  product_description: string;
  product_unit: number;
  product_quantity: any;
  product_rating: number;
  product_selling_price: number;
  product_discount: number;
  stock_quantity: number;
  packaged_product: any;
  unit_name: string;
  brand_created_by_role: number;
  product_brand_id: number;
  product_brand_name: string;
  subcategory_name: string;
  stock_statement: string;
  online_selling_price: string;
  return_quantity: number;
  qr_unique_code?: string;
}

export interface BagDetails {
  bag_id: number;
  store_id: number;
  bag_ref_no: string;
  updated_on: any;
  updated_by: any;
  bag_status: number;
  paid_to_partner: number;
  paid_to_qubecart: number;
  special_request: any;
  order_id: number;
  total_price: number;
  order_ref_no: string;
  order_created_at: string;
  order_delivery_date: any;
  scheduled_delivery_date: string;
  bag_status_name: string;
  payment_type: number;
  pre_order_flag: number;
  payment_type_name: string;
  pre_order_flag_name: string;
  store_name: string;
  store_category: number;
  store_category_name: string;
  qc_partner_id: number;
  order_delivery_type_name: string;
  bag_items: BagItem[];
  unit_master_id?: string;
  unit_name?: string;
  bank_return_ref_no?: string;
  order_delivery_type?: number;
}

export interface DeliveryAddress {
  customer_address_id: number;
  name: string;
  contact_number: any;
  optional_contact_no: any;
  addressline1: string;
  addressline2: string;
  city: string;
  pin: number;
  default_flag: any;
  address_status: any;
  landmark: any;
  latitude: any;
  longitude: any;
  state_name: string;
  country_name: string;
  district_name: string;
  first_name: string;
  last_name: string;
  customer_email: string;
  customer_phone: string;
}

export interface SingleOrder {
  bag_details: BagDetails;
  delivery_address: DeliveryAddress[];
  dtdc_tracker?: trackerDetails;
}

export interface UpdateOrderModel {
  bag_id: number;
  bag_status: number;
  secret_code?: any;
}

export interface OrderListLoadModel {
  partner_id: number;
  store_id?: number | null;
  order_status?: any;
  start_date: any;
  end_date: any;
  payment_type?: number;
  pre_order_flag?: number | null;
}

export interface Problemdetail {
  problem_code?: string;
  problem_code_name?: string;
}

export interface GetConversationDetailsPayload {
  order_id?: number;
  incident_id?: number;
}

export interface MesseageSend {
  sender_id?: number;
  sender_role_id?: number;
  order_id?: number;
  incident_id?: number;
  message?: string;
}

export interface Conversations {
  conversations_id?: number;
  created_at: string;
  incident_id?: number;
  message: string;
  order_id?: number;
  sender_id: number;
  sender_role: string;
  sender_role_id?: number;
}

export interface trackerDetails {
  trackDetails: TrackDetail[];
  trackHeader: TrackHeader;
}

export interface TrackDetail {
  sTrRemarks: string;
  strAction: string;
  strActionDate: string;
  strActionTime: string;
  strCode: string;
  strDestination: any;
  strDestinationCode: any;
  strManifestNo: string;
  strOrigin: string;
  strOriginCode: string;
}

export interface TrackHeader {
  strActualAgent: string;
  strActualServiceType: string;
  strAgentConnectionLocation: string;
  strAltReferenceNumber: string;
  strBookedDate: string;
  strBookedTime: string;
  strBookingType: string;
  strCNProdCODFOD: string;
  strCNProduct: string;
  strCNType: string;
  strCNTypeCode: string;
  strCNTypeName: string;
  strComplaintNo: string;
  strConnectionDateTime: string;
  strDestination: string;
  strExpectedAgent: string;
  strExpectedDeliveryDate: string;
  strMode: string;
  strModeCode: string;
  strNoOfAttempts: string;
  strOrigin: string;
  strOriginRemarks: string;
  strPieces: string;
  strRefNo: string;
  strRemarks: string;
  strRevExpectedDeliveryDate: string;
  strRtoNumber: string;
  strShipmentNo: string;
  strStatus: string;
  strStatusRelCode: string;
  strStatusRelName: string;
  strStatusTransOn: string;
  strStatusTransTime: string;
  strWeight: string;
  strWeightUnit: string;
}
