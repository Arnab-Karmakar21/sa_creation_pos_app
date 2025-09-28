export interface WishListMain {
  wishListLists: WishListLists[];
  no_wishlist: StoreW[];
  product_list: SearchProductList[];
  total_count?: number;
  wishlist_detail?: WishListPayload;
  total?: number;
  GoodRecived?: GoodRecived;
}

export interface WishListPayload {
  created_by: number;
  created_on: string;
  createdby_fullname: string;
  ref_no: string;
  store_id: number;
  store_name: string;
  updated_on: string;
  wishlist_id: number;
  wishlist_status: number;
  wishlist_status_dtls: string;
  store_category: number;
  product_list: ProductList[];
}

export interface ProductList {
  brand_created_by_role: number;
  brand_created_by_role_name: string;
  brand_name: string;
  category_id: number;
  category_name: string;
  product_brand_id: number;
  product_description: string;
  product_id: number;
  quantity?: number;
  requested?: number;
  status?: number;
  subcategory_id: number;
  subcategory_name: string;
  template_id: number;
  template_name: string;
  variants?: number[];
  wishlist_item_id?: number | null;
  id: number;
  is_product_id_available?: number;
  new_product_description?: string;
  procurement_price?: number;
}

export interface WishListLists {
  wishlist_id: number;
  store_id: number;
  ref_no: string;
  wishlist_status: number;
  created_on: string;
  updated_on: string;
  store_name: string;
  wishlist_status_dtls: string;
  store_category: number;
  fulfilment_status_dtls: string;
  fulfilment_id: number;
  fulfilment_ref_no: string;
  fulfilment_status: number;
  receive_master_status_name?: string;
}

export interface StoreW {
  store_id: number;
  store_name: string;
  store_image: string;
  unit_master_id: number;
  unit_name: string;
  store_category: number;
}

export interface SearchProductList {
  product_id?: number;
  product_brand_id?: number;
  brand_created_by_role?: number;
  product_description?: string;
  qr_unique_code?: string;
  brand_name?: string;
  subcategory_id: number;
  subcategory_name?: string;
  category_id?: number;
  category_name?: string;
  template_id?: number;
  template_name?: string;
  brand_created_by_role_name?: string;
  variants?: Variant[];
}

export interface Variant {
  variant_type_id: number;
  variant_name: string;
  variant_type: number;
  variant_type_name: string;
}

export interface GoodRecived {
  store_id?: number;
  fulfilment_id?: number;
  recieve_master_id?: number | null;
  product_list: Goodproduct[];
  status?: number;
}

export interface Goodproduct {
  recieve_assoc_id?: number | null;
  product_id?: number;
  procurement_price?: number;
  product_mrp?: number;
  product_gst_percentage?: any;
  product_discount?: any;
  product_selling_price?: number;
  online_qty?: number;
  online_mrp?: number;
  online_discount?: number;
  online_selling_price?: number;
  recieved?: number;
  returned?: number;
  damaged?: number;
}
