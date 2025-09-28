import {DomainData} from './DomainModels';

export interface StoresState {
  storeList: StoreItem[];
  storeCategories: DomainData[];
  unit: Units[];
  storeStock?: ProductItem[];
  singleStore?: SingleStoreDetails;
  templates: TemplateItem[];
  templateInfo?: TemplateInfoItem;
  stockAddDone: boolean;
  brandAddDone: boolean;
  units: UnitItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  templateList: TemplateItem[];
  productBrands: ProductBrandItem[];
  singleProductDetail?: ProductEditPayload;
  varients: Variants[];
  updatingDone: boolean;
  txnTypes: DomainData[];
  updateStockDone: boolean;
  qr: string;
  qr_flag: boolean;
  productEditDone?: boolean;
  similar_product: ProductEditPayload[];
}

export interface StoreItem {
  latitude?: number;
  longitude?: number;
  store_id: number;
  store_name: string;
  store_category: number;
  store_image: StoreImage;
  store_desc: string;
  qc_partner_id: number;
  store_rating: number;
  store_status: number;
  store_open_time: string;
  store_close_time: string;
  store_days: number[];
  addressline1: string;
  addressline2: string;
  pin: number;
  city: string;
  state: number;
  country: number;
  states_name: string;
  countries_name: string;
  district_name: string;
  store_category_dtls: string;
  store_status_dtls: string;
  store_open_days: string[];
  unit_name: string;
  created_on: string;
  district_id: number;
  store_address_id: number;
  unit_id: number;
  updated_on: string;
  store_policy: string;
}
export interface SingleStoreDetails {
  store_id: number;
  store_address_id: number;
  store_name: string;
  store_category: number;
  store_image: StoreImage[];
  store_desc: string;
  store_policy: any;
  qc_partner_id: number;
  store_rating: number;
  district_id: number;
  store_status: number;
  created_on: string;
  updated_on: string;
  store_open_time: string;
  store_close_time: string;
  store_days: number[];
  latitude: number;
  longitude: number;
  unit_id: number;
  unit_name: string;
  addressline1: string;
  addressline2: string;
  pin: number;
  city: string;
  state: number;
  country: number;
  states_name: string;
  countries_name: string;
  district_name: string;
  store_category_dtls: string;
  store_status_dtls: string;
  store_open_days: string[];
}
export interface StoreImage {
  doc_id: number;
  default: number;
  thumb_doc_name: string;
  thumb_doc_path: string;
  doc_name: string;
}
export interface StoreCreatePayload {
  qc_partner_id: number;
  addressline1: string;
  addressline2: string;
  state_id: number;
  country_id: number;
  pin: number;
  city: string;
  store_name: string;
  store_category: number;
  store_image?: string;
  credit_flag?: number | boolean;
  latitude: number;
  longitude: number;
  store_open_time?: any;
  store_close_time?: any;
  store_days?: number[];
  store_policy?: string;
  prebooking_flag?: number | boolean;
  only_prebooking_flag?: number | boolean;
  only_prebooking_buffer?: number | string;
  district_id: number;
}

export interface Units {
  unit_master_id: number;
  unit_name: string;
  addressline1: string;
  addressline2: any;
  pin: number;
  city: string;
  state: number;
  country: number;
  district_id: number;
  states_name: string;
  district_name: string;
  countries_name: string;
}
export interface StoreUpdatePayload {
  store_days: number[];
  store_id: number;
  store_name: string;
  store_category: any;
  store_desc: any;
  store_policy: any;
  store_open_time: any;
  store_close_time: any;
  qc_partner_id: number;
  unit_id: any;
  latitude: any;
  longitude: any;
  addressline1: any;
  addressline2: any;
  city: any;
  district_id: any;
  state_id: any;
  country_id: any;
  pin: any;
  store_image: any;
}

export interface ProductItem {
  brand_created_by_role: number;
  brand_created_by_role_name: string;
  brand_name: string;
  online_discount: number;
  online_end_date: any;
  online_flag: number;
  online_gst_percentage: number;
  online_product_mrp: number;
  online_qty: number;
  online_selling_price: number;
  online_start_date: string;
  packaged_product: any;
  partner_product_id: number;
  product_brand_id: number;
  product_description: string;
  product_discount: number;
  product_mrp: number;
  product_quantity: any;
  product_selling_price: number;
  product_unit: number;
  product_variants: number[];
  product_variants_name: string[];
  product_variants_type: number[];
  product_variants_type_name: string[];
  qr_unique_code: string;
  stock_quantity: number;
  store_id: number;
  subcategory_name: string;
  unit_short: string;
  updated_on: string;
  variants: Variant[];
  category_name?: string;
}

export interface Variant {
  variant: number;
  variant_name: string;
  variants_type: number;
  variants_type_name: string;
}
export interface StockAddPayload {
  store_id?: number;
  brand_id?: number;
  qc_partner_id?: number;
  admn_user_id?: number;
  product_description?: string;
  // variants?: number[];
  // variants?: number[][];
  variants?: any;
  unit?: any;
  product_mrp?: number;
  product_gst_percentage?: number;
  product_discount?: number;
  product_selling_price?: number;
  images?: Image[];
  created_by_role?: number;
  product_gst_code?: any;
  stock_quantity?: number;
  stock_description?: string;
  packaged_product?: any;
  product_quantity?: any;
  online_flag?: boolean;
  online_qty?: number;
  online_mrp?: number;
  online_discount?: number;
  online_selling_price?: number;
  online_gst_percentage?: number;
  template_id?: number;
  category_id?: number;
  subcategory_id?: number;
  store_category?: number;
  long_desc?: any;
  procurement_price?: number;
}
export interface Image {
  default: number;
  doc_name: string;
  thum_doc_name: string;
  doc_id: number;
}
export interface getItemsbyBrandPayload {
  store_id?: number;
  brand_id?: number;
}

export interface ProductEditPayload {
  brand_created_by_role_name: string;
  online_discount: number;
  online_flag: number;
  online_gst_percentage: number;
  online_mrp: number;
  online_quantity: number;
  online_selling_price: number;
  packaged_product: any;
  partner_product_id: number;
  product_brand_description: string;
  product_brand_id: number;
  product_brand_name: string;
  product_category_name: string;
  product_description: string;
  product_images: ProductImage[];
  product_quantity: any;
  product_rating: number;
  product_unit: number;
  product_variants: string;
  product_variants_name: string;
  product_variants_type: string;
  qr_unique_code: string;
  subcategory_name: string;
  template_name: string;
  variant: Variant[];
  variant_type_name: string;
  product_mrp?: any;
  product_selling_price?: any;
  product_gst_percentage?: any;
  product_discount?: any;
  variants: any[];
  template_id: number;
  product_subcategory_id: number;
  product_category_id: number;
  product_long_description?: string;
  return_days?: number;
  parent_product_id?: number;
  approx_weight?: number;
  procurement_price?: number;
}
export interface ProductImage {
  default_flag: number;
  doc_id: number;
  thum_doc_name: string;
  thumb_doc_path: string;
}

export interface Variant {
  product_variant: number;
  product_variant_name: string;
  product_variant_type: number;
  product_variant_type_name: string;
}

export interface ProductEditLoadPayload {
  partner_product_id: number;
  store_category: number;
  varients: any;
  store_id: number;
  qc_partner_id?: number;
}

export interface TemplateItem {
  template_id: number;
  category: number;
  updated_by: number;
  updated_on: string;
  template_name: string;
  template_description?: string;
  template_ref_no: string;
  status: number;
  category_name: string;
}

export interface ProductBrandItem {
  brand_description: string;
  brand_id: number;
  brand_name: string;
  created_by_role: number;
  status: number;
  subcategory_id: number;
  updated_by: number;
  updated_on?: any;
  products: ProductItem[];
}
export interface CategoryInfo {
  product_category_name: string;
  subcategories: SubcategoryInfo[];
  template_item_id: number;
  variants: number[];
}
export interface SubcategoryInfo {
  brands: BrandInfo[];
  product_subcategory_id: number;
  subcategory_name: string;
}

export interface BrandInfo {
  admn_product_brand_id: number;
  created_by_role: string;
  product_brand_description?: string;
  product_brand_name: string;
  status: number;
  products: ProductItem[];
}

export interface BrandProductsPayload {
  subcategory_id: number;
  store_id: number;
  qc_partner_id: number;
}

export interface TemplateInfoItem {
  categories: CategoryInfo[];
  category: number;
  status: number;
  template_description?: string;
  template_id: number;
  template_name: string;
}

export interface BrandAddPayload {
  subcategory_id: number;
  qc_partner_id: number;
  brand_name: string;
}

export interface UnitItem {
  unit_id: number;
  store_category: number;
  unit_short: string;
  unit_long: string;
}

export interface StockAddLoadPayload {
  template_id: number;
  category_id: number;
  subcategory_id: number;
  store_category: number;
  qc_partner_id: number;
  brand_id: number;
  created_by_role: number;
  variants: number[];
}

export interface ProductSubCategoryItem {
  product_category_id: number;
  product_subcategory_id: number;
  subcategory_name: string;
}
export interface ProductCategoryItem {
  product_category_name: string;
  template_id: number;
  template_item_id: number;
  variants: number[];
}

export interface TemplateItem {
  template_id: number;
  category: number;
  updated_by: number;
  updated_on: string;
  template_name: string;
  template_description?: string;
  template_ref_no: string;
  status: number;
  category_name: string;
}

export interface ProductBrandItem {
  brand_description: string;
  brand_id: number;
  brand_name: string;
  created_by_role: number;
  status: number;
  subcategory_id: number;
  updated_by: number;
  updated_on?: any;
  products: ProductItem[];
}

export interface Variants {
  variant_type: number;
  variant_type_name: string;
  variants: Variant[];
}

export interface Variant {
  variant_types_id: number;
  variant_name: string;
}

export interface StockModifyPayload {
  store_id: number;
  partner_product_id: number;
  stock_quantity: number;
  txn_type: number;
  online_flag: number;
  procurement_price?: number;
}

export interface Search {
  partner_product_id: any;
  product_description: any;
  brand_created_by_role: any;
  product_brand_id: any;
  product_brand_name: any;
  category_id: any;
  category_name: any;
  product_subcategory_id: any;
  subcategory_name: any;
  template_id: number;
  template_name: string;
  store_category: number;
  store_category_name: string;
  store_name: any;
}

export interface VariantImage {
  variantId: number 
  images: any[]
}