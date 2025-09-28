import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import WishList from '../../WishList/WishListAdd/WishList';
import {
  ProductList,
  SearchProductList,
  WishListPayload,
} from '../../../../models/WishListModels';
import AddStockPopover from './AddStockPopover';
import {RequsitionDetails} from '../../../../models/Stock';
import FullfilmentList from './FullfilmentList';
import QubeButton from '../../../../UILibrary/QubeButton';
import {
  TemplateItem,
  ProductCategoryItem,
  ProductSubCategoryItem,
  ProductBrandItem,
} from '../../../../models/StoreModel';
import ProductLists from '../../WishList/WishListAdd/ProductList';
import QubeAlert from '../../../../UILibrary/QubeAlert';

const FulfillmentDetailView = ({
  wishlist_detail,
  navigation,
  AddItem,
  requsition_detail,
  DeleteAction,
  onCategorySelection,
  onSubCategorySelection,
  onTemplateSelection,
  productBrands,
  productCategories,
  productSubCategories,
  product_list,
  templates,
  ClearData,
  GetData,
  SearchAction,
  Send,
}: FulfillmentDetailViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [flag, SetFlag] = useState<boolean>(false);
  const [flag2, SetFlag2] = useState<boolean>(false);
  const [Item, SetItem] = useState<ProductList | undefined>(undefined);
  const [send, SetSend] = useState<boolean>(false);
  const ProductAdd = (item: ProductList) => {
    if (!!item.product_id) {
      item.requested = 1;
      SetItem(item);
      SetFlag(true);
    }
  };
  const createProduct = (item: ProductList) => {
    navigation.navigate('stock-create', {
      template_id: item.template_id,
      category_id: item.category_id,
      subcategory_id: item.subcategory_id,
      store_category: wishlist_detail?.store_category,
      variants: item.variants,
      partner_product_id: item.product_id,
      store_id: wishlist_detail?.store_id,
      brand_id: item.product_brand_id,
      brand_created_by_role: item.brand_created_by_role,
      wishlist_item_id: item.wishlist_item_id,
      editable: true,
    });
  };
  const findProduct = (id: number) => {
    return !!requsition_detail?.product_list?.find(m => m.product_id === id);
  };
  const Delete = (id: number) => {
    let payload: RequsitionDetails = JSON.parse(
      JSON.stringify(requsition_detail),
    );
    payload.product_list = payload.product_list.filter(
      m => m.fulfilment_item_id != id,
    );
    DeleteAction(payload);
  };
  const AddProduct = (p: SearchProductList) => {
    if (
      !!p &&
      p.brand_created_by_role &&
      p.brand_created_by_role_name &&
      p.brand_name &&
      p.category_id &&
      p.category_name &&
      p.subcategory_name &&
      p.template_name &&
      p.product_description &&
      p.template_id &&
      p.product_id &&
      p.product_brand_id
    ) {
      SetItem({
        id: Math.random(),
        brand_created_by_role: p.brand_created_by_role,
        brand_created_by_role_name: p.brand_created_by_role_name,
        brand_name: p.brand_name,
        category_id: p.category_id,
        category_name: p.category_name,
        subcategory_id: p.subcategory_id,
        subcategory_name: p.subcategory_name,
        product_description: p.product_description,
        template_id: p.template_id,
        product_id: p.product_id,
        product_brand_id: p.product_brand_id,
        template_name: p.template_name,
        requested: 0,
        wishlist_item_id: null,
      });
      SetFlag(true);
      SetFlag2(false);
    }
  };
  const ShowProduct = (item: ProductList) => {
    navigation.navigate('stock-create', {
      template_id: item.template_id,
      category_id: item.category_id,
      subcategory_id: item.subcategory_id,
      store_category: wishlist_detail?.store_category,
      variants: item.variants,
      partner_product_id: item.product_id,
      store_id: wishlist_detail?.store_id,
      brand_id: item.product_brand_id,
      brand_created_by_role: item.brand_created_by_role,
      wishlist_item_id: item.wishlist_item_id,
      editable: false,
    });
  };

  return (
    <View style={{flex: 1}}>
      <AddStockPopover
        AddItem={AddItem}
        SetFlag={SetFlag}
        flag={flag}
        item={Item}
      />
      <QubeAlert
        isVisible={send}
        setIsVisible={SetSend}
        title={'Are you sure you want to Submit?'}
        okPress={() => Send()}
        cancelPress={() => SetSend(false)}
        okText={'Yes'}
        cancelText={'No'}
      />
      <View style={{flex: 1, flexDirection: 'row'}}>
        {!flag2 && (
          <>
            {(requsition_detail?.fulfilment_status == 1 ||
              !requsition_detail?.fulfilment_status) && (
              <View
                style={{
                  flex: 1,
                  borderRightWidth: 2,
                  borderRightColor: theme.colors.inputBorder,
                }}>
                <WishList
                  wishlist_detail={wishlist_detail}
                  fulfilment={true}
                  AddProduct={ProductAdd}
                  findProduct={findProduct}
                  createProduct={createProduct}
                />
              </View>
            )}

            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <FullfilmentList
                  requsition_detail={requsition_detail}
                  Delete={Delete}
                  ShowProduct={ShowProduct}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: theme.colors.primary,
                  padding: 8,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#ffff',
                    fontSize: theme.fonts.bigFont,
                    fontWeight: 'bold',
                  }}>
                  Total Amount
                </Text>
                <Text
                  style={{
                    color: '#ffff',
                    fontSize: theme.fonts.bigFont,
                    fontWeight: 'bold',
                  }}>
                  {'\u20B9'}{' '}
                  {!!requsition_detail
                    ? requsition_detail.product_list
                        .reduce(
                          (item, next) =>
                            item + next.procurement_price * next.quantity,
                          0,
                        )
                        .toFixed(2)
                    : '0.00'}
                </Text>
              </View>
            </View>
          </>
        )}
        {flag2 && (
          <ProductLists
            onCategorySelection={onCategorySelection}
            onSubCategorySelection={onSubCategorySelection}
            onTemplateSelection={onTemplateSelection}
            productBrands={productBrands}
            productCategories={productCategories}
            productSubCategories={productSubCategories}
            product_list={product_list}
            req_flag={1}
            templates={templates}
            AddProduct={AddProduct}
            ClearData={ClearData}
            GetData={GetData}
            SearchAction={SearchAction}
            back={() => SetFlag2(false)}
          />
        )}
      </View>
      {!flag2 && (
        <View
          style={{
            height: '12%',
            borderTopWidth: 0.5,
            borderTopColor: theme.colors.inputBorder,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={{width: '30%', marginHorizontal: 10}}>
            <QubeButton
              onPress={() => navigation.goBack()}
              title="Back"
              color="placeholderText"></QubeButton>
          </View>
          {(requsition_detail?.fulfilment_status == 1 ||
            !requsition_detail?.fulfilment_status) && (
            <>
              <View style={{width: '30%', marginHorizontal: 10}}>
                <QubeButton
                  onPress={() => SetFlag2(true)}
                  title="+ Add Other Product"
                  color="primary"></QubeButton>
              </View>
              <View style={{width: '30%', marginHorizontal: 10}}>
                <QubeButton
                  onPress={() => SetSend(true)}
                  disabled={
                    !requsition_detail ||
                    requsition_detail.product_list.length <= 0
                  }
                  title="Dispatch To Store"
                  color="primary"></QubeButton>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default FulfillmentDetailView;

interface FulfillmentDetailViewProps {
  wishlist_detail?: WishListPayload;
  navigation?: any;
  AddItem?: any;
  requsition_detail?: RequsitionDetails;
  DeleteAction?: any;
  GetData?: any;
  product_list: SearchProductList[];
  templates: TemplateItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  productBrands: ProductBrandItem[];
  onTemplateSelection: any;
  onCategorySelection: any;
  onSubCategorySelection: any;
  SearchAction?: any;
  ClearData?: any;
  Send?: any;
}
