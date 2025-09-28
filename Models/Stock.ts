export interface StockState {
  requisitionList: RequisitionItem[];
  total?: number;
  requsition_detail?: RequsitionDetails;
}
export interface RequisitionItem {
  wishlist_id: number;
  store_id: number;
  ref_no: string;
  wishlist_status: number;
  created_by: number;
  created_on: string;
  store_name: string;
  createdby_fullname: string;
  wishlist_status_dtls: string;
  fulfilment_id: any;
  unit_id: number;
  unit_name: string;
  fulfilment_ref_no: string;
  fulfilment_status: string;
  fulfilment_status_dtls: string;
}

export interface RequsitionDetails {
  store_id: number;
  fulfilment_id: number;
  wishlist_id: number;
  product_list: ProductList[];
  created_by?: number;
  created_on?: string;
  createdby_fullname?: string;
  fulfilment_status?: number;
  fulfilment_status_dtls?: string;
  ref_no?: string;
  store_name?: string;
  updated_by?: number;
  updated_on?: string;
}

export interface ProductList {
  fulfilment_item_id?: number;
  wishlist_item_id: number;
  product_id: number;
  quantity: number;
  requested: number;
  procurement_price: number;
  product_description: string;
  requested_dtls?: string;
  status?: number;
}
