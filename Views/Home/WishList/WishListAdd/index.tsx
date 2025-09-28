import {View, Text} from 'react-native';
import React, {useState} from 'react';
import WishListAddView from './WishListAddView';
import {connect} from 'react-redux';
import {
  GoodRecivedAction,
  GoodRecivedListAction,
  SearchWishListAction,
  UpdateRequsititionAction,
  WishListDetailsAction,
  WishListDetailsLoadAction,
} from '../../../../Store/actions/WishListActions';
import {StoreState} from '../../../../models/reduxModel';
import {useFocusEffect} from '@react-navigation/native';
import {
  GoodRecived,
  ProductList,
  SearchProductList,
  WishListPayload,
} from '../../../../models/WishListModels';
import {
  ProductCategoryLoad,
  ProductSubCategoryLoad,
  ProductBrandLoad,
  StoreInventoryLoad,
} from '../../../../Store/actions/storeAction';
import {
  ProductBrandItem,
  ProductCategoryItem,
  ProductSubCategoryItem,
  TemplateItem,
} from '../../../../models/StoreModel';
import {StockFullFillmentDetailAction} from '../../../../Store/actions/StockAction';
import {RequsitionDetails} from '../../../../models/Stock';

const WishListAdd = ({
  navigation,
  route,
  SearchWishListAction,
  product_list,
  total_count,
  ProductBrandLoad,
  ProductCategoryLoad,
  ProductSubCategoryLoad,
  templates,
  productCategories,
  productSubCategories,
  productBrands,
  qc_partner_id,
  StoreInventoryLoad,
  wishlist_detail,
  WishListDetailsAction,
  WishListDetailsLoadAction,
  UpdateRequsititionAction,
  StockFullFillmentDetailAction,
  requsition_detail,
  GoodRecivedAction,
  GoodRecivedListAction,
  GoodRecived,
}: WishListAddProps) => {
  const [page_index, SetPageIndex] = useState<number>(0);
  const [page_size, SetPageSize] = useState<number>(20);
  const [template, SetTemplate] = useState<any>(undefined);
  const [catagory, Setcatagory] = useState<any>(undefined);
  const [subcatagory, SubSetcatagory] = useState<any>(undefined);
  const [brand, Setbrand] = useState<any>(undefined);
  const [search, SetSearch] = useState<any>(undefined);

  useFocusEffect(
    React.useCallback(() => {
      if (!!route.params.store_category) {
        StoreInventoryLoad(route.params.store_category);
      }
      if (
        !!route?.params?.fulfilment_id &&
        !!route.params.fulfilment_status &&
        route?.params?.fulfilment_status == 2
      ) {
        StockFullFillmentDetailAction({
          fulfilment_id: +route?.params?.fulfilment_id,
        });
        GoodRecivedListAction(+route?.params?.fulfilment_id);
      }

      if (route.params.store_id) {
        SetPageIndex(0);
        SetTemplate(undefined);
        Setcatagory(undefined);
        SubSetcatagory(undefined);
        Setbrand(undefined);
        SetSearch(undefined);
        SearchWishListAction({
          store_id: route.params.store_id,
          page_size: page_size,
          page_index: 0,
          searching: null,
          product_subcategory_id: null,
          template_id: null,
          brand_id: null,
          template_item_id: null,
          created_by_role: null,
          init: 0,
        });
      }
      if (route.params?.wishlist_id) {
        WishListDetailsLoadAction({
          wishlist_id: +route.params?.wishlist_id,
        });
      }
    }, []),
  );
  const GetData = () => {
    if (!!total_count && total_count > product_list.length) {
      SetPageIndex(page_index + 1);
      SearchWishListAction({
        store_id: route.params.store_id,
        page_size: page_size,
        page_index: page_index + 1,
        searching: !!search ? search : null,
        product_subcategory_id: !!subcatagory ? +subcatagory : null,
        template_id: !!template ? +template : null,
        brand_id: !!brand ? +brand : null,
        template_item_id: !!catagory ? +catagory : null,
        created_by_role:
          !!brand && !!subcatagory
            ? productBrands.find(
                m => m.brand_id == +brand && m.subcategory_id == +subcatagory,
              )?.created_by_role
            : null,
        init: 1,
      });
    }
  };

  const onTemplateSelection = (template_id: number) => {
    ProductCategoryLoad(template_id);
  };

  const onCategorySelection = (template_item_id: number) => {
    ProductSubCategoryLoad(template_item_id);
  };

  const onSubCategorySelection = (subcategory_id: number) => {
    ProductBrandLoad(subcategory_id, qc_partner_id);
  };
  const SearchAction = (filter: any) => {
    SetPageIndex(0);
    SetTemplate(!!filter.template_id ? +filter.template_id : null);
    Setcatagory(!!filter.category_id ? +filter.category_id : null);
    SubSetcatagory(!!filter.subcategory_id ? +filter.subcategory_id : null);
    Setbrand(!!filter?.brand_id ? +filter?.brand_id : null);
    SetSearch(!filter.searching ? +filter.searching : null);
    SearchWishListAction({
      store_id: route.params.store_id,
      page_size: page_size,
      page_index: 0,
      searching: !!filter.searching ? filter.searching : null,
      product_subcategory_id: !!filter.subcategory_id
        ? +filter.subcategory_id
        : null,
      template_id: !!filter.template_id ? +filter.template_id : null,
      brand_id: !!filter?.brand_id ? +filter?.brand_id : null,
      template_item_id: !!filter.category_id ? +filter.category_id : null,
      created_by_role:
        !!filter?.brand_id && !!filter.subcategory_id
          ? productBrands.find(
              m =>
                m.brand_id == +filter.brand_id &&
                m.subcategory_id == +filter.subcategory_id,
            )?.created_by_role
          : null,
      init: 0,
    });
  };
  const ClearData = () => {
    if (route.params.store_id) {
      SetPageIndex(0);
      SetTemplate(undefined);
      Setcatagory(undefined);
      SubSetcatagory(undefined);
      Setbrand(undefined);
      SetSearch(undefined);
      StoreInventoryLoad(route.params.store_category);
      SearchWishListAction({
        store_id: route.params.store_id,
        page_size: page_size,
        page_index: 0,
        searching: null,
        product_subcategory_id: null,
        template_id: null,
        brand_id: null,
        template_item_id: null,
        created_by_role: null,
        init: 0,
      });
    }
  };
  const CreateWish = (item: ProductList) => {
    let payload: any;
    if (!!wishlist_detail) {
      payload = {
        ...JSON.parse(JSON.stringify(wishlist_detail)),
      };
      payload.product_list.push(item);
    } else {
      payload = {
        store_id: route.params.store_id,
        wishlist_id: null,
        product_list: [item],
      };
    }
    WishListDetailsAction(payload);
  };
  const Delete = (id: number) => {
    let payload: WishListPayload = JSON.parse(JSON.stringify(wishlist_detail));
    payload.product_list = payload.product_list.filter(
      m =>
        (!!m.product_id && m.product_id != id) || (!m.product_id && m.id != id),
    );
    WishListDetailsAction(payload);
  };
  const SendWishList = () => {
    UpdateRequsititionAction({
      data: {
        wishlist_id: wishlist_detail?.wishlist_id,
        fulfilment_id: null,
        status: 2,
      },
      navigation: navigation,
      type: 1,
    });
  };

  const GoodRecivedAdd = (porps: any) => {
    if (!!GoodRecived) {
      let payload: GoodRecived = {
        fulfilment_id: requsition_detail?.fulfilment_id,
        recieve_master_id: GoodRecived.recieve_master_id,
        product_list: porps,
        store_id: requsition_detail?.store_id,
      };
      GoodRecivedAction(payload);
    } else {
      let payload: GoodRecived = {
        fulfilment_id: requsition_detail?.fulfilment_id,
        recieve_master_id: null,
        product_list: porps,
        store_id: requsition_detail?.store_id,
      };
      GoodRecivedAction(payload);
    }
  };
  const RecivedProduct = () => {
    UpdateRequsititionAction({
      data: {
        wishlist_id: null,
        fulfilment_id: null,
        recieve_master_id: GoodRecived?.recieve_master_id,
        status: 2,
      },
      navigation: navigation,
      type: 1,
    });
  };

  return (
    <WishListAddView
      productCategories={productCategories}
      productBrands={productBrands}
      onSubCategorySelection={onSubCategorySelection}
      productSubCategories={productSubCategories}
      onCategorySelection={onCategorySelection}
      onTemplateSelection={onTemplateSelection}
      templates={templates}
      GetData={GetData}
      product_list={product_list}
      SearchAction={SearchAction}
      ClearData={ClearData}
      wishlist_detail={wishlist_detail}
      CreateWish={CreateWish}
      Delete={Delete}
      SendWishList={SendWishList}
      requsition_detail={requsition_detail}
      f_status={route?.params?.fulfilment_status}
      GoodRecivedAdd={GoodRecivedAdd}
      GoodRecived={GoodRecived}
      RecivedProduct={RecivedProduct}
    />
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    user: state.user.user_detail,
    product_list: state.wish_list.product_list,
    total_count: state.wish_list.total_count,
    templates: state.store.templates,
    productCategories: state.store.productCategories,
    productSubCategories: state.store.productSubCategories,
    productBrands: state.store.productBrands,
    qc_partner_id: state.user.user_detail?.partner_id,
    wishlist_detail: state.wish_list.wishlist_detail,
    requsition_detail: state.stock.requsition_detail,
    GoodRecived: state.wish_list.GoodRecived,
  };
};

const mapDispatchToProps = {
  SearchWishListAction,
  ProductBrandLoad,
  ProductSubCategoryLoad,
  ProductCategoryLoad,
  StoreInventoryLoad,
  WishListDetailsAction,
  WishListDetailsLoadAction,
  UpdateRequsititionAction,
  StockFullFillmentDetailAction,
  GoodRecivedAction,
  GoodRecivedListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishListAdd);
interface WishListAddProps {
  navigation?: any;
  route?: any;
  SearchWishListAction?: any;
  product_list: SearchProductList[];
  total_count?: number;
  ProductBrandLoad: any;
  ProductSubCategoryLoad: any;
  ProductCategoryLoad: any;
  templates: TemplateItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  productBrands: ProductBrandItem[];
  qc_partner_id?: number;
  StoreInventoryLoad?: any;
  wishlist_detail?: WishListPayload;
  WishListDetailsAction?: any;
  WishListDetailsLoadAction?: any;
  UpdateRequsititionAction?: any;
  StockFullFillmentDetailAction?: any;
  requsition_detail?: RequsitionDetails;
  GoodRecivedListAction?: any;
  GoodRecivedAction?: any;
  GoodRecived?: GoodRecived;
}
