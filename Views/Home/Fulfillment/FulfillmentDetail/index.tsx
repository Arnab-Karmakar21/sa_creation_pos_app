import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import FulfillmentDetailView from './FulfillmentDetail';
import {connect} from 'react-redux';
import {
  SearchWishListAction,
  UpdateRequsititionAction,
  WishListDetailsLoadAction,
} from '../../../../Store/actions/WishListActions';
import {StoreState} from '../../../../models/reduxModel';
import {
  SearchProductList,
  WishListPayload,
} from '../../../../models/WishListModels';
import {useFocusEffect} from '@react-navigation/native';
import {
  ProductBrandLoad,
  ProductCategoryLoad,
  ProductEditLoad,
  ProductSubCategoryLoad,
  StockAddLoad,
  StoreInventoryLoad,
} from '../../../../Store/actions/storeAction';
import {
  CreateStockFullFillmentAction,
  StockFullFillmentDetailAction,
} from '../../../../Store/actions/StockAction';
import {RequsitionDetails} from '../../../../models/Stock';
import {template} from '@babel/core';
import {
  TemplateItem,
  ProductCategoryItem,
  ProductSubCategoryItem,
  ProductBrandItem,
} from '../../../../models/StoreModel';

const FulfillmentDetail = ({
  WishListDetailsLoadAction,
  route,
  wishlist_detail,
  navigation,
  CreateStockFullFillmentAction,
  requsition_detail,
  StockFullFillmentDetailAction,
  productBrands,
  productCategories,
  productSubCategories,
  templates,
  qc_partner_id,
  product_list,
  total_count,
  SearchWishListAction,
  StoreInventoryLoad,
  ProductCategoryLoad,
  ProductSubCategoryLoad,
  ProductBrandLoad,
  UpdateRequsititionAction,
}: FulfillmentDetailProps) => {
  const [page_index, SetPageIndex] = useState<number>(0);
  const [page_size, SetPageSize] = useState<number>(20);
  const [template, SetTemplate] = useState<any>(undefined);
  const [catagory, Setcatagory] = useState<any>(undefined);
  const [subcatagory, SubSetcatagory] = useState<any>(undefined);
  const [brand, Setbrand] = useState<any>(undefined);
  const [search, SetSearch] = useState<any>(undefined);
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.wishListId) {
        WishListDetailsLoadAction({
          wishlist_id: +route.params?.wishListId,
        });
      }
      if (route?.params?.fullfillmentId) {
        StockFullFillmentDetailAction({
          fulfilment_id: +route?.params?.fullfillmentId,
        });
      }
    }, []),
  );
  const AddItem = (item: any) => {
    let payload: any = {};
    if (!!requsition_detail) {
      payload = JSON.parse(JSON.stringify(requsition_detail));
      payload.wishlist_id = wishlist_detail?.wishlist_id;
      payload.product_list.push(item);
    } else {
      payload = {
        store_id: wishlist_detail?.store_id,
        fulfilment_id: null,
        wishlist_id: wishlist_detail?.wishlist_id,
        product_list: [item],
      };
    }

    CreateStockFullFillmentAction(payload);
  };
  const DeleteAction = (payload: any) => {
    payload.wishlist_id = wishlist_detail?.wishlist_id;
    CreateStockFullFillmentAction(payload);
  };
  const GetData = () => {
    if (
      !!total_count &&
      total_count > product_list.length &&
      !!wishlist_detail
    ) {
      SetPageIndex(page_index + 1);
      SearchWishListAction({
        store_id: wishlist_detail?.store_id,
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
    !!qc_partner_id && ProductBrandLoad(subcategory_id, qc_partner_id);
  };
  const SearchAction = (filter: any) => {
    SetPageIndex(0);
    SetTemplate(!!filter.template_id ? +filter.template_id : null);
    Setcatagory(!!filter.category_id ? +filter.category_id : null);
    SubSetcatagory(!!filter.subcategory_id ? +filter.subcategory_id : null);
    Setbrand(!!filter?.brand_id ? +filter?.brand_id : null);
    SetSearch(!filter.searching ? +filter.searching : null);
    SearchWishListAction({
      store_id: wishlist_detail?.store_id,
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
    if (!!wishlist_detail) {
      SetPageIndex(0);
      SetTemplate(undefined);
      Setcatagory(undefined);
      SubSetcatagory(undefined);
      Setbrand(undefined);
      SetSearch(undefined);
      StoreInventoryLoad(wishlist_detail.store_category);
      SearchWishListAction({
        store_id: wishlist_detail.store_id,
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

  useEffect(() => {
    if (!!wishlist_detail) {
      StoreInventoryLoad(wishlist_detail.store_category);
      SetPageIndex(0);
      SetTemplate(undefined);
      Setcatagory(undefined);
      SubSetcatagory(undefined);
      Setbrand(undefined);
      SetSearch(undefined);
      SearchWishListAction({
        store_id: wishlist_detail.store_id,
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
  }, [wishlist_detail]);
  const Send = () => {
    UpdateRequsititionAction({
      data: {
        wishlist_id: null,
        fulfilment_id: requsition_detail?.fulfilment_id,
        status: 2,
      },
      navigation: navigation,
      type: 2,
    });
  };
  return (
    <FulfillmentDetailView
      wishlist_detail={wishlist_detail}
      navigation={navigation}
      AddItem={AddItem}
      requsition_detail={requsition_detail}
      DeleteAction={DeleteAction}
      onCategorySelection={onCategorySelection}
      onSubCategorySelection={onSubCategorySelection}
      onTemplateSelection={onTemplateSelection}
      productBrands={productBrands}
      productCategories={productCategories}
      productSubCategories={productSubCategories}
      product_list={product_list}
      templates={templates}
      ClearData={ClearData}
      GetData={GetData}
      SearchAction={SearchAction}
      Send={Send}
    />
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    wishlist_detail: state.wish_list.wishlist_detail,
    requsition_detail: state.stock.requsition_detail,
    product_list: state.wish_list.product_list,
    total_count: state.wish_list.total_count,
    templates: state.store.templates,
    productCategories: state.store.productCategories,
    productSubCategories: state.store.productSubCategories,
    productBrands: state.store.productBrands,
    qc_partner_id: state.user.user_detail?.partner_id,
  };
};
const mapDispatchToProps = {
  WishListDetailsLoadAction,
  ProductCategoryLoad,
  ProductSubCategoryLoad,
  ProductBrandLoad,
  StockAddLoad,
  ProductEditLoad,
  CreateStockFullFillmentAction,
  StockFullFillmentDetailAction,
  SearchWishListAction,
  StoreInventoryLoad,
  UpdateRequsititionAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(FulfillmentDetail);
interface FulfillmentDetailProps {
  route?: any;
  WishListDetailsLoadAction?: any;
  wishlist_detail?: WishListPayload;
  navigation?: any;
  CreateStockFullFillmentAction?: any;
  requsition_detail?: RequsitionDetails;
  StockFullFillmentDetailAction?: any;
  templates: TemplateItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  productBrands: ProductBrandItem[];
  qc_partner_id?: number;
  product_list: SearchProductList[];
  total_count?: number;
  SearchWishListAction?: any;
  StoreInventoryLoad?: any;
  ProductCategoryLoad?: any;
  ProductSubCategoryLoad?: any;
  ProductBrandLoad?: any;
  UpdateRequsititionAction?: any;
}
