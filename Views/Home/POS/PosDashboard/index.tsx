import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import PosDashboardView from './PosDashboardView';
import {
  FrequentItems,
  Item,
  OrderDetails,
  PosCustomerData,
  SerchProduct,
} from '../../../../models/PosModel';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {
  BookingLoadAction,
  BookingProductAction,
  ProductSearchAction,
  ProductSearchSuccessAction,
  RemoveItemAction,
  VoidOrderAction,
} from '../../../../Store/actions/posActions';
import {User} from '../../../../models/UserModel';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import MarqueeView from 'react-native-marquee-view';
import {ThemeItem} from '../../../../Theme/LightTheme';
import moment from 'moment';
import Marquee from './Marquee';

const PosDashboard = ({
  navigation,
  route,
  search_flag,
  search_product,
  ProductSearchSuccessAction,
  ProductSearchAction,
  order_details,
  BookingProductAction,
  userData,
  BookingLoadAction,
  frequents,
  VoidOrderAction,
  RemoveItemAction,
}: PosDashboardProps) => {
  const customer: PosCustomerData = route.params;

  useFocusEffect(
    React.useCallback(() => {
      if (!!customer && !!userData?.active_shift) {
        BookingLoadAction({
          unit_id: userData?.active_shift.unit_id,
          store_id: userData?.active_shift.store_id,
          order_no: !!customer.order_no ? customer.order_no : null,
        });
      }
    }, []),
  );
  const HoldBill = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'CustomerAddNew'}],
    });
  };
  const CancelOrder = () => {
    let payload = {
      data: {
        order_no: order_details?.order_no,
        is_void: true,
        is_hold: false,
      },
      navigation: navigation,
      type: 2,
    };
    VoidOrderAction(payload);
  };
  const RemoveItems = (item: Item) => {
    RemoveItemAction({
      unit_id: userData?.active_shift?.unit_id,
      store_id: userData?.active_shift?.store_id,
      order_id: order_details?.order_id,
      order_no: order_details?.order_no,
      bag_id: order_details?.bag_id,
      items: [
        {
          product_id: item.product_id,
          required_quantity: 0,
        },
      ],
    });
  };
  const Update = (item: Item) => {
    RemoveItemAction({
      unit_id: userData?.active_shift?.unit_id,
      store_id: userData?.active_shift?.store_id,
      order_id: order_details?.order_id,
      order_no: order_details?.order_no,
      bag_id: order_details?.bag_id,
      items: [
        {
          product_id: item.product_id,
          required_quantity: item.required_quantity,
        },
      ],
    });
  };
  const PaymentAction = (order: string) => {
    navigation.navigate('Payment', {
      order_id: order,
      customer_name: customer.name,
      phone: customer.mobile,
    });
  };
  return (
    <>
      <StatusBar hidden={true} />
      <Marquee />
      <PosDashboardView
        search_flag={search_flag}
        ProductSearchSuccessAction={ProductSearchSuccessAction}
        search_product={search_product}
        customer={customer}
        ProductSearchAction={ProductSearchAction}
        order_details={order_details}
        BookingProductAction={BookingProductAction}
        userData={userData}
        frequents={frequents}
        HoldBill={HoldBill}
        CancelOrder={CancelOrder}
        RemoveItems={RemoveItems}
        Update={Update}
        PaymentAction={PaymentAction}
      />
    </>
  );
};
const mapDispatchToProps = {
  ProductSearchAction,
  ProductSearchSuccessAction,
  BookingProductAction,
  BookingLoadAction,
  VoidOrderAction,
  RemoveItemAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    search_flag: state.pos.search_flag,
    search_product: state.pos.searchProduct,
    order_details: state.pos.order_details,
    userData: state.user.user_detail,
    frequents: state.pos.frequents,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PosDashboard);

interface PosDashboardProps {
  route?: any;
  navigation?: any;
  search_flag: boolean;
  search_product?: SerchProduct;
  ProductSearchSuccessAction?: any;
  ProductSearchAction?: any;
  order_details?: OrderDetails;
  BookingProductAction?: any;
  userData?: User;
  BookingLoadAction?: any;
  frequents: FrequentItems[];
  VoidOrderAction?: any;
  RemoveItemAction?: any;
}
