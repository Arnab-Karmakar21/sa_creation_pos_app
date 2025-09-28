import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CreateStoresService,
  GetStoresService,
} from '../../Service/ServicePartner';
import {
  CitiesService,
  CountriesService,
  DistrictsService,
  DomainService,
  GetUnitsService,
  StatesService,
  UnitService,
} from '../../Service/ServiecShared';
import {showIndefiniteToast, showToast} from '../../Service/Toast';
import {
  BrandAddPayload,
  ProductEditLoadPayload,
  ProductEditPayload,
  StockAddLoadPayload,
  StockAddPayload,
  StockModifyPayload,
  StoreCreatePayload,
  StoreItem,
  StoreUpdatePayload,
  TemplateItem,
} from '../../models/StoreModel';
import {ApiCallErrorAction, BeginApiCallAction} from './apiStatusActions';
import {UserLogoutSuccess} from './userAction';
import {
  BrandAddService,
  GetSingleProductService,
  GetStoreStockService,
  SingleStoreService,
  UpdateStoreService,
  StockAddService,
  UpdateStockService,
  EditProductService,
  SimilarProduct,
} from '../../Service/Partner';
import {
  GetBrandsService,
  GetCategoriesService,
  GetSubCategoriesService,
  GetTemplatesService,
  GetVarient,
} from '../../Service/Admin';
import {DomainData} from '../../models/DomainModels';

export enum StoreActionTypes {
  Store_List_Load_Success = '[STORE] Store List Load Success',
  Store_Add_Load_Success = '[STORE] Store Add Load Success',
  Store_Add_Action_Success = '[STORE] Store Add Action Success',
  Store_Details_Load_Success = '[STORE] Store Details Load Success',
  Store_Inventory_Load_Success = '[STORE] Store Inventory Load Success',
  Brand_Add_Action_Success = '[STORE] Brand Add Action Success',
  Reset_Brand_Add_Done = '[STORE] Reset Brand Add Done',
  Stock_Add_Load_Success = '[STORE] Stock Add Load Success',
  Reset_Stock_Add_Done = '[STORE] Reset Stock Add Done',
  Product_Category_Load_Success = '[STORE] Product Category Load Success',
  Product_Sub_Category_Load_Success = '[STORE] Product Sub Category Load Success',
  Product_Edit_Load_Success = '[STORE] Product Edit Load Success',
  Product_Brand_Load_Success = '[STORE] Product Brand Load Success',
  Store_Edit_Load_Success = '[STORE] Store Edit Load Success',
  Store_Edit_Action_Success = '[STORE] Store Edit Action Success',
  Product_Variants_Load_Success = '[STORE] Product Variants Load Success',
  Stock_Add_Action_Success = '[STORE] Stock Add Action Success',
  Stock_Modify_Load_Success = '[STORE] Stock Modify Load Success',
  Stock_Modify_Action_Success = '[STORE] Stock Modify Action Success',
  Reset_Stock_Update_Done = '[STORE] Reset Stock Update Done',
  Qr_Set_Action = '[STORE] QR Set Action',
  Product_Edit_Action_Success = '[STORE] Product Edit Action Success',
  Reset_Product_Edit_Action = '[STORE] Reset Product Edit Action',
  Similar_Product_Success_Action = '[STORE] Similar Product Success Action',
}

export const StoreListLoad = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return GetStoresService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(StoreListLoadSuccess(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StoreListLoadSuccess = (payload: StoreItem[]) => {
  return {type: StoreActionTypes.Store_List_Load_Success, payload: payload};
};

export const StoreAddLoad = () => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return Promise.all([
      StatesService(),
      CountriesService(),
      DomainService({domain_type: ['store_category']}),
      DistrictsService(),
      UnitService(),
    ])
      .then(response => {
        if (response[0].data.exception) {
          dispatch(ApiCallErrorAction(response[0].data.Errors));
        } else if (response[1].data.exception) {
          dispatch(ApiCallErrorAction(response[1].data.Errors));
        } else if (response[2].data.exception) {
          dispatch(ApiCallErrorAction(response[2].data.Errors));
        } else if (response[3].data.exception) {
          dispatch(ApiCallErrorAction(response[3].data.Errors));
        } else if (response[4].data.exception) {
          dispatch(ApiCallErrorAction(response[4].data.Errors));
        } else {
          dispatch(
            StoreAddLoadSuccess({
              states: response[0].data.data,
              countries: response[1].data.data,
              storeCategories: response[2].data.data.store_category,
              districts: response[3].data.data,
              unit: response[4].data.data,
            }),
          );
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StoreAddLoadSuccess = (payload: any) => {
  return {type: StoreActionTypes.Store_Add_Load_Success, payload: payload};
};

export const StoreAddAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Adding Store. Please Wait.',
      }),
    );
    return CreateStoresService(payload.data)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          payload.navigation.navigate('store_list');
          showIndefiniteToast(
            'Srishtishree admin will aprrove the created store once verified.',
            'rgba(0, 0, 0, 0.7)',
          );
          dispatch(StoreAddActionSuccess());
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          if (
            error?.response?.status === 403 ||
            error?.response?.status === 408
          ) {
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              System_Errors: [],
              Warnings: [],
            }),
              dispatch(UserLogoutSuccess());
            AsyncStorage.multiRemove(['userData', 'token']);
          } else if (error?.response?.status === 500) {
            dispatch(
              ApiCallErrorAction({
                Business_Errors: [],
                Info: [],
                System_Errors: [
                  {
                    CODE: 'SE001',
                    MESSAGE: 'Error',
                    Payload: [],
                  },
                ],
                Warnings: [],
              }),
            );
          } else {
            dispatch(
              ApiCallErrorAction({
                Business_Errors: [],
                Info: [],
                System_Errors: [
                  {
                    CODE: 'SE001',
                    MESSAGE: 'Error',
                    Payload: [],
                  },
                ],
                Warnings: [],
              }),
            );
          }
        }
      });
  };
};

export const StoreAddActionSuccess = () => {
  return {type: StoreActionTypes.Store_Add_Action_Success};
};

export const StoreDetailsLoad = (store_id: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Store Data. Please Wait.',
      }),
    );
    return Promise.all([
      SingleStoreService(store_id),
      GetStoreStockService(store_id),
    ])
      .then(response => {
        if (response[0].data.exception) {
          dispatch(ApiCallErrorAction(response[0].data.Errors));
        } else if (response[1].data.exception) {
          dispatch(ApiCallErrorAction(response[1].data.Errors));
        } else {
          dispatch(
            StoreDetailsLoadSuccess({
              singleStore: response[0].data.data,
              storeStock: response[1].data.data.allproducts,
            }),
          );
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};
export const StoreDetailsLoadSuccess = (payload: any) => {
  return {type: StoreActionTypes.Store_Details_Load_Success, payload: payload};
};

export const StoreInventoryLoad = (store_category: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Templates. Please wait.',
      }),
    );
    return GetTemplatesService(store_category)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(StoreInventoryLoadSuccess(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StoreInventoryLoadSuccess = (payload: TemplateItem[]) => {
  return {
    type: StoreActionTypes.Store_Inventory_Load_Success,
    payload: payload,
  };
};

export const BrandAddAction = (payload: BrandAddPayload) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Processing Request. Please wait.',
      }),
    );
    return BrandAddService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(BrandAddActionSuccess(true));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const BrandAddActionSuccess = (payload: boolean) => {
  showToast('Request submitted successfully.', 'rgba(0, 0, 0, 0.7)');
  return {type: StoreActionTypes.Brand_Add_Action_Success, payload: payload};
};

export const ResetBrandAddDone = (payload: boolean) => {
  return {type: StoreActionTypes.Reset_Brand_Add_Done, payload: payload};
};
export const StockAddLoad = (payload: StockAddLoadPayload) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return Promise.all([
      GetTemplatesService(payload.store_category),
      GetUnitsService(payload.store_category),
      GetCategoriesService(payload.template_id),
      GetSubCategoriesService(payload.category_id),
      GetBrandsService({
        subcategory_id: payload.subcategory_id,
        qc_partner_id: payload.qc_partner_id,
      }),
      GetVarient(payload.variants),
    ])
      .then(response => {
        if (response[0].data.exception) {
          dispatch(ApiCallErrorAction(response[0].data.Errors));
        } else if (response[1].data.exception) {
          dispatch(ApiCallErrorAction(response[1].data.Errors));
        } else if (response[2].data.exception) {
          dispatch(ApiCallErrorAction(response[2].data.Errors));
        } else if (response[3].data.exception) {
          dispatch(ApiCallErrorAction(response[3].data.Errors));
        } else if (response[4].data.exception) {
          dispatch(ApiCallErrorAction(response[4].data.Errors));
        } else if (response[5].data.exception) {
          dispatch(ApiCallErrorAction(response[5].data.Errors));
        } else {
          dispatch(
            StockAddLoadSuccess({
              templates: response[0].data.data,
              units: response[1].data.data,
              productCategories: response[2].data.data,
              productSubCategories: response[3].data.data,
              productBrands: response[4].data.data,
              variants: response[5].data.data,
            }),
          );
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StockAddLoadSuccess = (payload: any) => {
  return {type: StoreActionTypes.Stock_Add_Load_Success, payload: payload};
};
export const ResetStockAddDone = (payload: boolean) => {
  return {type: StoreActionTypes.Reset_Stock_Add_Done, payload: payload};
};

export const ProductCategoryLoad = (template_id: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return GetCategoriesService(template_id)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(ProductCategoryLoadSuccess(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const ProductCategoryLoadSuccess = (payload: any) => {
  return {
    type: StoreActionTypes.Product_Category_Load_Success,
    payload: payload,
  };
};

export const ProductSubCategoryLoad = (template_item_id: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return GetSubCategoriesService(template_item_id)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(ProductSubCategoryLoadSuccess(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const ProductSubCategoryLoadSuccess = (payload: any) => {
  return {
    type: StoreActionTypes.Product_Sub_Category_Load_Success,
    payload: payload,
  };
};

export const ProductEditLoad = (payload: ProductEditLoadPayload) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return Promise.all([
      GetUnitsService(payload.store_category),
      GetSingleProductService(payload.partner_product_id),
    ])
      .then(response => {
        if (response[0].data.exception) {
          dispatch(ApiCallErrorAction(response[0].data.Errors));
        } else if (response[1].data.exception) {
          dispatch(ApiCallErrorAction(response[1].data.Errors));
        } else {
          dispatch(
            ProductEditLoadSuccess({
              units: response[0].data.data,
              singleProductDetail: response[1].data.data,
            }),
          );
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const ProductEditLoadSuccess = (payload: any) => {
  return {type: StoreActionTypes.Product_Edit_Load_Success, payload: payload};
};

export const ProductBrandLoad = (
  subcategory_id: number,
  qc_partner_id: number,
) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please Wait.',
      }),
    );
    return GetBrandsService({
      subcategory_id: subcategory_id,
      qc_partner_id: qc_partner_id,
    })
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(ProductBrandLoadSuccess(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const ProductBrandLoadSuccess = (payload: any) => {
  return {type: StoreActionTypes.Product_Brand_Load_Success, payload: payload};
};

export const StoreEditLoad = (store_id: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Store Info. Please Wait.',
      }),
    );
    return Promise.all([
      StatesService(),
      CountriesService(),
      DomainService({domain_type: ['store_category']}),
      DistrictsService(),
      UnitService(),
      SingleStoreService(store_id),
    ])
      .then(response => {
        if (response[0].data.exception) {
          dispatch(ApiCallErrorAction(response[0].data.Errors));
        } else if (response[1].data.exception) {
          dispatch(ApiCallErrorAction(response[1].data.Errors));
        } else if (response[2].data.exception) {
          dispatch(ApiCallErrorAction(response[2].data.Errors));
        } else if (response[3].data.exception) {
          dispatch(ApiCallErrorAction(response[3].data.Errors));
        } else if (response[4].data.exception) {
          dispatch(ApiCallErrorAction(response[4].data.Errors));
        } else if (response[5].data.exception) {
          dispatch(ApiCallErrorAction(response[5].data.Errors));
        } else {
          dispatch(
            StoreEditLoadSuccess({
              states: response[0].data.data,
              countries: response[1].data.data,
              storeCategories: response[2].data.data.store_category,
              districts: response[3].data.data,
              unit: response[4].data.data,
              singleStore: response[5].data.data,
            }),
          );
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};
export const StoreEditLoadSuccess = (payload: any) => {
  return {type: StoreActionTypes.Store_Edit_Load_Success, payload: payload};
};

export const StoreEditAction = (payload: StoreUpdatePayload) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Updating Store. Please Wait.',
      }),
    );
    return UpdateStoreService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(StoreEditActionSuccess());
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StoreEditActionSuccess = () => {
  showToast('Store updated successfully.', 'rgba(0, 0, 0, 0.7)');
  return {type: StoreActionTypes.Store_Edit_Action_Success, payload: true};
};
export const ProductVariantLoadSuccess = (payload: any) => {
  return {
    type: StoreActionTypes.Product_Variants_Load_Success,
    payload: payload,
  };
};

export const StockAddAction = (payload: StockAddPayload) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Adding Stock. Please Wait.',
      }),
    );
    return StockAddService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(StockAddActionSuccess(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StockAddActionSuccess = (payload: any) => {
  showToast('Item created successfully.', 'rgba(0, 0, 0, 0.7)');
  return {type: StoreActionTypes.Stock_Add_Action_Success, payload: true};
};

export const GetVariantLoad = (variant: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Store Info. Please Wait.',
      }),
    );
    return GetVarient(variant)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(ProductVariantLoadSuccess(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StockModifyLoad = () => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fetching Data. Please wait.',
      }),
    );
    return DomainService({domain_type: ['txn_type']})
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(StockModifyLoadSuccess(response.data.data.txn_type));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StockModifyLoadSuccess = (payload: DomainData[]) => {
  return {type: StoreActionTypes.Stock_Modify_Load_Success, payload: payload};
};

export const StockModifyAction = (payload: StockModifyPayload) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Updating Stock. Please wait.',
      }),
    );
    return UpdateStockService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(StockModifyActionSuccess(true));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const StockModifyActionSuccess = (payload: boolean) => {
  showToast('Stock updated successfully.', 'rgba(0, 0, 0, 0.7)');
  return {type: StoreActionTypes.Stock_Modify_Action_Success, payload: payload};
};

export const ResetStockUpdateDone = (payload: boolean) => {
  return {type: StoreActionTypes.Reset_Stock_Update_Done, payload: payload};
};

export const QrSetAction = (payload: any) => {
  return {type: StoreActionTypes.Qr_Set_Action, payload: payload};
};

export const ProductEditAction = (payload: ProductEditPayload) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Updating Product. Please wait.',
      }),
    );
    return EditProductService(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(ProductEditActionSuccess(true));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const ProductEditActionSuccess = (payload: boolean) => {
  showToast('Item updated successfully.', 'rgba(0, 0, 0, 0.7)');
  return {type: StoreActionTypes.Product_Edit_Action_Success, payload: payload};
};

export const ResetProductEditAction = (payload: boolean) => {
  return {type: StoreActionTypes.Reset_Product_Edit_Action, payload: payload};
};

export const SimilarProductAction = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      BeginApiCallAction({
        count: 1,
        message: 'Fatching data. Please wait.',
      }),
    );
    return SimilarProduct(payload)
      .then(response => {
        if (response.data.exception) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(SimilarProductSuccessAction(response.data.data));
        }
      })
      .catch(error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 408
        ) {
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [
              {
                CODE: 'SE001',
                MESSAGE: 'Error',
                Payload: [],
              },
            ],
            System_Errors: [],
            Warnings: [],
          }),
            dispatch(UserLogoutSuccess());
          AsyncStorage.multiRemove(['userData', 'token']);
        } else if (error?.response?.status === 500) {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        } else {
          dispatch(
            ApiCallErrorAction({
              Business_Errors: [],
              Info: [],
              System_Errors: [
                {
                  CODE: 'SE001',
                  MESSAGE: 'Error',
                  Payload: [],
                },
              ],
              Warnings: [],
            }),
          );
        }
      });
  };
};

export const SimilarProductSuccessAction = (payload: boolean) => {
  return {
    type: StoreActionTypes.Similar_Product_Success_Action,
    payload: payload,
  };
};
