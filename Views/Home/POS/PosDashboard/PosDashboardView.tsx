import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import Menu from '../Menu';
import ProductScanner from './ProductScanner';
import FrequentProduct from './FrequentProduct';
import Billing from './Billing';
import ActionArea from './ActionArea';
import {
  FrequentItems,
  OrderDetails,
  PosCustomerData,
  ProductAddApyload,
  SerchProduct,
} from '../../../../models/PosModel';
import SearchProductPopOver from './SearchProductPopOver';
import {User} from '../../../../models/UserModel';

const PosDashboardView = ({
  customer,
  search_flag,
  search_product,
  ProductSearchSuccessAction,
  ProductSearchAction,
  order_details,
  BookingProductAction,
  userData,
  frequents,
  HoldBill,
  CancelOrder,
  RemoveItems,
  Update,
  PaymentAction,
}: PosDashboardViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const ProductAdd = (quantity: number, product_id: string) => {
    let paload: ProductAddApyload = {
      bag_id: !!order_details?.bag_id ? order_details?.bag_id : null,
      order_id: !!order_details?.order_id ? order_details?.order_id : null,
      order_no: !!order_details?.order_no ? order_details?.order_no : '',
      product_id: product_id?.split('-')[product_id?.split('-').length - 1],
      quantity: quantity,
      store_id: userData?.active_shift?.store_id,
      unit_id: userData?.active_shift?.unit_id,
      customer_id: customer?.customer_id,
    };
    ProductSearchSuccessAction({data: undefined, flag: false});
    BookingProductAction(paload);
  };
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <SearchProductPopOver
        search_flag={search_flag}
        search_product={search_product}
        ProductSearchSuccessAction={ProductSearchSuccessAction}
        ProductAdd={ProductAdd}
      />
      <View
        style={{
          flex: 5,
          height: '100%',
          borderLeftColor: theme.colors.inputBorder,
          borderLeftWidth: 1,
        }}>
        <View style={{height: '70%'}}>
          <ProductScanner
            customer={customer}
            ProductSearchAction={ProductSearchAction}
          />
        </View>
        <View
          style={{
            height: '30%',
            borderTopColor: theme.colors.inputBorder,
            borderTopWidth: 1,
          }}>
          <FrequentProduct frequents={frequents} FeqBuy={ProductSearchAction} />
        </View>
      </View>
      <View
        style={{
          flex: 6,
          height: '100%',
          borderLeftColor: theme.colors.inputBorder,
          borderLeftWidth: 1,
        }}>
        <View style={{height: '70%'}}>
          <Billing
            order_details={order_details}
            RemoveItems={RemoveItems}
            Update={Update}
          />
        </View>
        <View
          style={{
            height: '30%',
            borderTopColor: theme.colors.inputBorder,
            borderTopWidth: 1,
          }}>
          <ActionArea
            CancelOrder={CancelOrder}
            order_details={order_details}
            HoldBill={HoldBill}
            PaymentAction={PaymentAction}
          />
        </View>
      </View>
    </View>
  );
};

export default PosDashboardView;

interface PosDashboardViewProps {
  customer?: PosCustomerData;
  search_flag: boolean;
  search_product?: SerchProduct;
  ProductSearchSuccessAction?: any;
  ProductSearchAction?: any;
  order_details?: OrderDetails;
  BookingProductAction?: any;
  userData?: User;
  frequents: FrequentItems[];
  HoldBill?: any;
  CancelOrder?: any;
  RemoveItems?: any;
  Update?: any;
  PaymentAction?: any;
}
