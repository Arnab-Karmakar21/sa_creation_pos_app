import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import ProductLists from './ProductList';
import WishList from './WishList';
import {
  GoodRecived,
  Goodproduct,
  ProductList,
  SearchProductList,
  WishListPayload,
} from '../../../../models/WishListModels';
import {
  TemplateItem,
  ProductCategoryItem,
  ProductSubCategoryItem,
  ProductBrandItem,
} from '../../../../models/StoreModel';
import AddRequsitPopover from './AddRequsitPopover';
import FullfilmentList from '../../Fulfillment/FulfillmentDetail/FullfilmentList';
import {RequsitionDetails} from '../../../../models/Stock';
import GoodRecivedPopover from './GoodRecivedPopover';
import QubeButton from '../../../../UILibrary/QubeButton';
import QubeAlert from '../../../../UILibrary/QubeAlert';

const WishListAddView = ({
  product_list,
  GetData,
  onCategorySelection,
  onSubCategorySelection,
  onTemplateSelection,
  productBrands,
  productCategories,
  productSubCategories,
  templates,
  ClearData,
  SearchAction,
  wishlist_detail,
  CreateWish,
  Delete,
  SendWishList,
  requsition_detail,
  f_status,
  GoodRecivedAdd,
  GoodRecived,
  RecivedProduct,
}: WishListAddViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [flag, SetFlag] = useState<boolean>(false);
  const [itemtermidiate, Setintermidiate] = useState<
    SearchProductList | undefined
  >(undefined);
  const [send, SetSend] = useState<boolean>(false);
  const [flag2, SetFlag2] = useState<boolean>(false);
  const [recive, Setreciv] = useState<any>();
  const [itemtermidiateGood, SetintermidiateGood] = useState<
    ProductList | undefined
  >(undefined);

  const AddProduct = (item: SearchProductList) => {
    Setintermidiate(item);
    SetFlag(true);
  };
  const GoodRecivedRec = (props: any) => {
    let payload: any = JSON.parse(
      JSON.stringify({
        prod: !!GoodRecived?.product_list ? GoodRecived?.product_list : [],
      }),
    );
    payload.prod.push({
      recieve_assoc_id: null,
      product_id: itemtermidiateGood?.product_id,
      procurement_price: itemtermidiateGood?.procurement_price,
      product_mrp: props.product_mrp,
      product_gst_percentage: props.product_gst_percentage,
      product_discount: props.product_discount,
      product_selling_price: props.product_selling_price,
      online_qty: props.online_qty,
      online_mrp: props.online_mrp,
      online_discount: props.online_discount,
      online_selling_price: props.online_selling_price,
      recieved: props.recieved,
      returned: props.returned,
      damaged: props.damaged,
    });
    GoodRecivedAdd(payload.prod);
    SetFlag2(false);
  };
  const hasProduct = (id: number) => {
    return !!GoodRecived?.product_list &&
      GoodRecived.product_list.find(m => m.product_id == id)
      ? true
      : false;
  };
  const delRecv = (p: ProductList) => {
    GoodRecivedAdd(
      GoodRecived?.product_list.filter(m => m.product_id != p.product_id),
    );
  };

  return (
    <View style={{width: '100%', height: '100%', flexDirection: 'row'}}>
      <AddRequsitPopover
        CreateWish={CreateWish}
        item={itemtermidiate}
        flag={flag}
        SetFlag={SetFlag}
      />
      <QubeAlert
        isVisible={send}
        setIsVisible={SetSend}
        title={'Are you sure you want to Submit?'}
        okPress={() => RecivedProduct()}
        cancelPress={() => SetSend(false)}
        okText={'Yes'}
        cancelText={'No'}
      />
      <GoodRecivedPopover
        flag={flag2}
        SetFlag={SetFlag2}
        ProductList={itemtermidiateGood}
        GoodRecivedAdd={GoodRecivedRec}
      />
      {(!wishlist_detail || wishlist_detail?.wishlist_status == 1) && (
        <View
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: theme.colors.inputBorder,
          }}>
          <ProductLists
            onCategorySelection={onCategorySelection}
            onSubCategorySelection={onSubCategorySelection}
            onTemplateSelection={onTemplateSelection}
            productBrands={productBrands}
            templates={templates}
            productSubCategories={productSubCategories}
            productCategories={productCategories}
            GetData={GetData}
            product_list={product_list}
            ClearData={ClearData}
            SearchAction={SearchAction}
            AddProduct={AddProduct}
            wishlist_detail={wishlist_detail}
            req_flag={0}
          />
        </View>
      )}

      <View style={{flex: 1}}>
        <WishList
          SendWishList={SendWishList}
          Delete={Delete}
          wishlist_detail={wishlist_detail}
          fulfilment={false}
        />
      </View>
      {!!f_status && f_status == 2 && (
        <View
          style={{
            flex: 1.2,
            borderLeftWidth: 1,
            borderLeftColor: theme.colors.inputBorder,
          }}>
          <FullfilmentList
            goodRecived={(item: any) => (
              SetintermidiateGood(item), SetFlag2(true)
            )}
            w_f={0}
            requsition_detail={requsition_detail}
            hasProduct={hasProduct}
            delRecv={delRecv}
            rec_m={
              !!GoodRecived?.status && GoodRecived?.status < 2
                ? 1
                : !GoodRecived?.recieve_master_id
                ? 1
                : 0
            }
          />
          {((!!GoodRecived?.status && GoodRecived?.status < 2) ||
            !GoodRecived?.recieve_master_id) && (
            <View style={{margin: 5}}>
              <QubeButton
                disabled={
                  !GoodRecived?.product_list ||
                  !requsition_detail?.product_list ||
                  GoodRecived?.product_list.length !=
                    requsition_detail?.product_list.length
                }
                onPress={() => SetSend(true)}
                color={'primary'}
                title="Recived"></QubeButton>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default WishListAddView;
interface WishListAddViewProps {
  product_list: SearchProductList[];
  GetData?: any;
  templates: TemplateItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  productBrands: ProductBrandItem[];
  onTemplateSelection: any;
  onCategorySelection: any;
  onSubCategorySelection: any;
  SearchAction?: any;
  ClearData?: any;
  wishlist_detail?: WishListPayload;
  CreateWish?: any;
  Delete?: any;
  SendWishList?: any;
  requsition_detail?: RequsitionDetails;
  f_status?: number;
  GoodRecivedAdd?: any;
  GoodRecived?: GoodRecived;
  RecivedProduct?: any;
}
