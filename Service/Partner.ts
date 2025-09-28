import {OrderListLoadModel} from '../Models/OrderModel';
import {UpdateOrderModel} from '../Models/OrderModel';
import {BasePartnerURL, environment} from '../environment';
import {
  CompleteOrderHistoryPayload,
  GetInitPayload,
  GetReturnPayload,
  ItemReturnPayload,
  ProductAddApyload,
  RemoveItem,
  ReturnPayload,
  ShiftStartPayload,
  VoidPayload,
} from '../models/PosModel';
import {
  BrandAddPayload,
  BrandProductsPayload,
  ProductEditPayload,
  StockAddPayload,
  StockModifyPayload,
  StoreUpdatePayload,
} from '../models/StoreModel';
import {GetUserPayload} from '../models/UserManagementModel';
import RestService from './rest';

export const serviceClient = new RestService({
  baseURL: BasePartnerURL,
});

export const GetBrandProductsService = (payload: BrandProductsPayload) => {
  return serviceClient.post(environment.url.getBrandProductUrl, payload);
};

export const TemplateInfoService = (template_id: number) => {
  return serviceClient.post(environment.url.templateInfoUrl, {
    template_id: template_id,
  });
};
export const SingleStoreService = (payload: number) => {
  return serviceClient.post(environment.url.singleStoreUrl, {
    store_id: payload,
  });
};

export const GetStoreStockService = (store_id: number) => {
  return serviceClient.post(environment.url.getStoreStockUrl, {
    store_id: store_id,
  });
};

export const BrandAddService = (payload: BrandAddPayload) => {
  return serviceClient.post(environment.url.brandCreateUrl, payload);
};
export const GetSingleProductService = (partner_product_id: number) => {
  return serviceClient.post(environment.url.getSingleProductUrl, {
    partner_product_id: partner_product_id,
  });
};

export const UpdateStoreService = (payload: StoreUpdatePayload) => {
  return serviceClient.post(environment.url.UPDATE_STORE_URL, payload);
};
export const StockAddService = (payload: StockAddPayload) => {
  return serviceClient.post(environment.url.createProductUrl, payload);
};

export const UpdateStockService = (payload: StockModifyPayload) => {
  return serviceClient.post(environment.url.partnerStockUpdateUrl, payload);
};
export const EditProductService = (payload: ProductEditPayload) => {
  return serviceClient.post(environment.url.ProductEditUrl, payload);
};

export const ShiftEndService = (payload: ShiftStartPayload) => {
  return serviceClient.post(environment.url.shiftEndUrl, payload);
};
export const GetUserService = (payload: GetUserPayload) => {
  return serviceClient.post(environment.url.getuserlistUrl, payload);
};

export const SearchProduct = (payload: any) => {
  return serviceClient.post(environment.url.serchProductUrl, payload);
};

export const BookingProduct = (payload: ProductAddApyload) => {
  return serviceClient.post(environment.url.productBookingUrl, payload);
};
export const BookingInit = (payload: GetInitPayload) => {
  return serviceClient.post(environment.url.bookingInitUrl, payload);
};

export const HoldBill = (payload: any) => {
  return serviceClient.post(environment.url.holdBillUrl, payload);
};

export const VoidOrder = (payload: VoidPayload) => {
  return serviceClient.post(environment.url.VoidOrderUrl, payload);
};

export const RemoveItems = (payload: RemoveItem) => {
  return serviceClient.post(environment.url.removeItemUrl, payload);
};

export const PaymentInitial = (payload: any) => {
  return serviceClient.post(environment.url.PaymentInitialUrl, payload);
};

export const PaymentPaid = (payload: any) => {
  return serviceClient.post(
    payload.order_origin_type == 2
      ? environment.url.onlinePaymentUrl
      : environment.url.PaidPaymentUrl,
    payload,
  );
};
export const GetPaymentSummery = (payload: any) => {
  return serviceClient.post(environment.url.GetPaymentSummery, payload);
};

export const TransferAmount = (payload: any) => {
  return serviceClient.post(environment.url.TransferAmountUr, payload);
};

export const WishListGet = (payload: any) => {
  return serviceClient.post(environment.url.WishListGetUrl, payload);
};

export const GetCompleteOrderHistory = (data: CompleteOrderHistoryPayload) => {
  return serviceClient.post(environment.url.GetCompleteOrderHistoryUrl, data);
};

export const OrderHistoryDetails = (data: any) => {
  return serviceClient.post(environment.url.OrderDetailHistoryUrl, data);
};
export const OrderDetailService = (bag_id: number) => {
  return serviceClient.post(environment.url.getOrderDetailsUrl, {
    bag_id: bag_id,
  });
};

export const UpdateOrderService = (data: UpdateOrderModel) => {
  return serviceClient.post(environment.url.updateOrderDetailsUrl, data);
};

export const GetOderListService = (data: OrderListLoadModel) => {
  return serviceClient.post(environment.url.getAllOrderUrl, data);
};
export const ProductSearch = (data: any) => {
  return serviceClient.post(environment.url.searchProductUrlForCust, data);
};

export const ProductSearchWishList = (data: any) => {
  return serviceClient.post(environment.url.SerchProductListUrl, data);
};

export const RequsitionCreate = (data: any) => {
  return serviceClient.post(environment.url.CreateRequsitionUrl, data);
};
export const GetWishListByID = (data: any) => {
  return serviceClient.post(environment.url.GetWishListByIdUrl, data);
};

export const UpdateWishlist = (data: any) => {
  return serviceClient.post(environment.url.RqqusitionUpdateUrl, data);
};
export const GetStockFullFillmentList = (payload: any) => {
  return serviceClient.post(environment.url.GetStockFullfillmentUrl, payload);
};

export const CreateFullFillment = (payload: any) => {
  return serviceClient.post(environment.url.FulFillmentCreateUrl, payload);
};

export const GetFulFulmentByID = (payload: any) => {
  return serviceClient.post(environment.url.GetFullfilmentByIdUrl, payload);
};

export const ReqCreateProduct = (payload: any) => {
  return serviceClient.post(environment.url.reqCreateProductUrl, payload);
};
export const ReturnProduct = (payload: any) => {
  return serviceClient.post(environment.url.returnProductUrl, payload);
};
export const BillItemReturnService = (payload: ItemReturnPayload) => {
  return serviceClient.post(environment.url.billReturnUrl, payload);
};

export const GoodRecivedService = (payload: any) => {
  return serviceClient.post(environment.url.goodRecivedUrl, payload);
};

export const GoodRecivedList = (id: number) => {
  return serviceClient.post(environment.url.recived_listUrl, {
    fulfilment_id: id,
  });
};

export const ReturnList = (payload: GetReturnPayload) => {
  return serviceClient.post(environment.url.getreturnUrl, payload);
};

export const ReturnDetail = (payload: string) => {
  return serviceClient.post(environment.url.returnDetailUrl, {
    return_ref_no: payload,
  });
};

export const ReturnGoodPos = (payload: any) => {
  return serviceClient.post(environment.url.reciveGoodPosUrl, payload);
};

export const SimilarProduct = (payload: any) => {
  return serviceClient.post(environment.url.getSimilarProducetUrl, payload);
};

export const fatchVersion = () => {
  return serviceClient.post(environment.url.getVersionUrl, {app_type: 1});
};
