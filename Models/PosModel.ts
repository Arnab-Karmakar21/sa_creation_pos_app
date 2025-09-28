export interface POSMain {
  new_customer?: boolean;
  search_flag: boolean;
  searchProduct?: SerchProduct;
  order_details?: OrderDetails;
  frequents: FrequentItems[];
  holdbill: HoldProduct[];
  payment_mode: PaymentMode[];
  payment_due?: PaymentData;
  paid_Payment: boolean;
  returnAmount?: number;
  payment_summery?: PaymentSummery;
  PreviousOrder: PreviousOrder[];
  total_count?: number;
  orderHistoryDetail?: OrderDetailsHistry;
  price_breakup: PriceBreakUp[];
  all_return_details?: AllReturnDetails;
  bill_return_refund?: BillItemReturn;
  refund_list: RefundList;
  return_det?: RentrnDet;
}

export interface ShiftStartPayload {
  store_id: number;
  unit_id: number;
}

export interface SerchProduct {
  product_id: number;
  product_description: string;
  product_images: ProductImages;
  qr_unique_code: string;
  product_selling_price: number;
  product_discount: any;
  product_mrp: number;
}

export interface ProductImages {
  doc_id: number;
  default_flag: number;
  thumb_doc_name: string;
  thumb_doc_path: string;
}

export interface PosCustomerData {
  customer_id: number;
  mobile: number;
  name: string;
  order_no?: string;
}

export interface OrderDetails {
  order_id: number;
  order_no: string;
  bag_id: number;
  items: Item[];
  bag_ref_no: string;
}

export interface Item {
  product_description: string;
  required_quantity: number;
  total_price: number;
  discount: number;
  product_mrp: number;
  qr_unique_code?: string;
  product_images?: ProductImages;
  product_id: number;
  selling_price: number;
  return_quantity?: number;
}

export interface ProductAddApyload {
  unit_id?: number;
  store_id?: number;
  quantity: number;
  product_id: string;
  order_no: string;
  order_id: any;
  bag_id: any;
  customer_id?: number;
}

export interface GetInitPayload {
  unit_id: number;
  store_id: number;
  order_no: string;
}
export interface FrequentItems {
  product_id: number;
  quantity: number;
  product_mrp: number;
  product_discount: number;
  product_selling_price: number;
  product_description: string;
  qr_unique_code: string;
  product_images: ProductImages;
}

export interface ProductImages {
  doc_id: number;
  default_flag: number;
  thumb_doc_name: string;
  thumb_doc_path: string;
}

export interface HoldProduct {
  order_id: number;
  order_ref_no: string;
  bag_id: number;
  customer_id: number;
  name: string;
  mobile: string;
  order_created_at: any;
}
export interface PreviousOrder {
  order_id: number;
  order_ref_no: string;
  bag_id: number;
  customer_id: number;
  name: string;
  mobile: string;
  order_created_at: any;
}

export interface VoidPayload {
  order_no: string;
  is_void: boolean;
  is_hold: boolean;
}

export interface RemoveItem {
  unit_id: number;
  store_id: number;
  order_id: number;
  order_no: string;
  bag_id: number;
  items: Itemm[];
}

export interface Itemm {
  product_id: number;
  required_quantity: number;
}

export interface PaymentMode {
  domain_code: number;
  domain_text: string;
}

export interface PaymentData {
  amount_due?: number;
  unit_address?: string;
  wallet_balance?: number;
  order_origin_type: number;
}

export interface PaymentSummery {
  total_cash_transaction: number;
  transfer_amount: number;
  total_order_no: number;
  cash_in_hand: number;
  total_product_no: number;
  payment_details: PaymentDetail[];
  transit_amount?: number;
  total_wallet_recharge: number;
}

export interface PaymentDetail {
  domain_value: string;
  amount: number;
  list: List[];
}
export interface List {
  amount?: number;
  domain_value?: string;
  order_ref_no?: string;
  payment_ref_no?: any;
  payment_type?: number;
}

export interface CompleteOrderHistoryPayload {
  store_id: number;
  page_index: number;
  page_size: number;
  search_string: any;
  start_date: string;
  end_date: string;
}

export interface OrderDetailsHistry {
  items: Item2[];
  unit_id: number;
  unit_name: string;
  unit_address: string;
  store_id: number;
  store_name: string;
  order_date: string;
  order_id: number;
  bag_id: number;
  order_no: string;
  price: number;
  payment_mode: string;
  actual_payment_amount: number;
  return_amount: number;
  customer_name: string;
  customer_mobile: string;
  bag_ref_no: string;
  price_breakup: PriceBreakUp[];
  bank_return_ref_no?: string;
}

export interface Item2 {
  product_id: number;
  product_description: string;
  required_quantity: number;
  total_price: number;
  selling_price: number;
  product_mrp: number;
  qr_unique_code: string;
  product_images: ProductImages;
  return_quantity: number;
}

export interface ProductImages {
  doc_id: number;
  default_flag: number;
  thumb_doc_name: string;
  thumb_doc_path: string;
}

export interface PriceBreakUp {
  type: string;
  value: number;
}
export interface ReturnPayload {
  order_no: string;
  store_id: number;
}
export interface AllReturnDetails {
  code: string;
  exception: boolean;
  Errors: any;
  data: ReturnProductData;
}

export interface ReturnProductData {
  items: ReturnProductItemwiseDetails[];
  bag_id: number;
  order_no: string;
  customer_id: number;
  order_id: number;
  customer_name: string;
  phone_no: string;
  origin_type: number;
}

export interface ReturnProductItemwiseDetails {
  product_id: number;
  product_description: string;
  total_quantity: number;
  returnable_quantity: number;
  return_quantity: number;
  total_price: number;
  unit_price: number;
  return_days: number;
  returnable: boolean;
  return_reason: string;
}

export interface ItemReturnPayload {
  store_id: number;
  order_no: string;
  bag_id: number;
  order_id: number;
  customer_id: number;
  items: ItemsReturned[];
}
export interface ItemsReturned {
  product_id: number;
  product_description: string;
  total_quantity: number;
  returnable_quantity: number;
  return_quantity: number;
  total_price: number;
  unit_price: number;
  return_days: number;
  returnable: boolean;
  return_reason: string;
}

export interface BillItemReturn {
  refund_amount: number;
}
export interface RefundData {
  refund_amount: number;
}

export interface GetReturnPayload {
  page_size: number;
  page_index: number;
  store_id: number;
  search_string: string;
  start_date: string;
  end_date: string;
  init: number;
}

export interface RefundList {
  total_count: number;
  returns: Return[];
}

export interface Return {
  return_ref_no: string;
  return_amount: number;
  return_date: Date;
  bag_id: number;
  bag_ref_no: string;
  order_id: number;
  order_ref_no: string;
  status: string;
}

export interface RentrnDet {
  payment_details: PaymentDetails;
  refund_details: RefundDetails;
  return_list: ReturnList[];
  customer_details: CustomerDetails;
}

export interface PaymentDetails {
  payment_mode: string;
  payment_amount: number;
  pg_ref_no: string;
  upi_ref_no: any;
  payment_date: string;
}

export interface RefundDetails {
  return_amount: number;
  return_date: string;
  bank_return_ref_no: string;
  status: string;
  return_mode: string;
  return_status: number;
}

export interface ReturnList {
  return_ref_no: string;
  return_amount: number;
  return_date: string;
  bag_id: number;
  bag_ref_no: string;
  order_id: number;
  order_ref_no: string;
  product_id: number;
  product_description: string;
  return_quantity: number;
  status: string;
  bank_return_ref_no: string;
  qr_unique_code: string;
  product_images: ProductImages;
}

export interface CustomerDetails {
  first_name: string;
  last_name: string;
  email_id: string;
  phone_no: string;
  order_id: number;
  bag_id: number;
  order_delivery_type: number;
  address_details: AddressDetails;
  order_ref_no: string;
  bag_ref_no: string;
  origin_type_name?: string;
}

export interface AddressDetails {
  addressline1: string;
  addressline2: string;
  city: string;
  pin: number;
  landmark: string;
  states_name: string;
}
