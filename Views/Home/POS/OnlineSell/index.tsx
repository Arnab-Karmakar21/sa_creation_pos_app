import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import OnlineSellView from './OnlineSellView';
import {connect} from 'react-redux';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import {
  ListClearAction,
  OrderListLoad,
} from '../../../../Store/actions/OrderAction';
import {
  BeginApiCallAction,
  ApiCallSuccessAction,
} from '../../../../Store/actions/apiStatusActions';
import {StoreListLoad} from '../../../../Store/actions/storeAction';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {DomainData} from '../../../../models/DomainModels';
import {orders} from '../../../../models/OrderModel';
import {StoreItem} from '../../../../models/StoreModel';
import {StoreState} from '../../../../models/reduxModel';
import {User} from '../../../../models/UserModel';

const OnlineSell = (props: OrderListProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [page_index, SetPageIndex] = useState<number>(0);
  const [page_size, SetPageSize] = useState<number>(10);

  useFocusEffect(
    React.useCallback(() => {
      SetPageIndex(0);
      props.ListClearAction();
      props.OrderListLoad({
        partner_id:
          props.partner?.user_type == 6 ? null : props.partner.partner_id,
        store_id: props.partner?.active_shift?.store_id,
        start_date: null,
        end_date: null,
        payment_type: 1,
        order_status: null,
        page_index: 0,
        page_size: page_size,
        search_string: null,
        bag_status: 4,
        init: 0,
      });
      // props.StoreListLoad({
      //   qc_partner_id: props?.partner?.partner_id,
      //   admn_user_id: props?.partner?.admn_user_id,
      // });
    }, []),
  );
  const viewOrderDetails = (bag: orders) => {
    props.navigation.navigate('Payment', {
      order_id: bag.order_ref_no,
      customer_name: bag.customer_name,
      phone: bag.phone_no,
    });
  };
  const ClearData = () => {
    SetPageIndex(0);
    props.OrderListLoad({
      partner_id:
        props.partner?.user_type == 6 ? null : props.partner.partner_id,
      store_id: props.partner?.active_shift?.store_id,
      start_date: null,
      end_date: null,
      payment_type: 1,
      order_status: null,
      page_index: 0,
      page_size: page_size,
      search_string: null,
      bag_status: 4,
      init: 0,
    });
  };
  const SearchAction = (payload: any) => {
    SetPageIndex(0);
    props.OrderListLoad({
      partner_id:
        props.partner?.user_type == 6 ? null : props.partner.partner_id,
      store_id: props.partner?.active_shift?.store_id,
      start_date: payload.start_date,
      end_date: payload.end_date,
      payment_type: 1,
      order_status: payload.order_status,
      page_index: 0,
      page_size: page_size,
      search_string: payload.search_string,
      bag_status: 4,
      init: 0,
    });
  };
  const GetData = (payload: any) => {
    if (!!props.active_Order && props.active_Order > props.order_list.length) {
      SetPageIndex(page_index + 1);
      props.OrderListLoad({
        partner_id:
          props.partner?.user_type == 6 ? null : props.partner.partner_id,
        store_id: props.partner?.active_shift?.store_id,
        start_date: payload.start_date,
        end_date: payload.end_date,
        payment_type: 1,
        order_status: payload.order_status,
        page_index: page_index + 1,
        page_size: page_size,
        search_string: payload.search_string,
        bag_status: 4,
        init: 1,
      });
    }
  };
  return (
    <OnlineSellView
      route={props.route}
      navigation={props.navigation}
      ClearData={ClearData}
      SearchAction={SearchAction}
      onViewOrderDetails={viewOrderDetails}
      oderList={props.order_list}
      orderStatusList={props.orderStatusList}
      GetData={GetData}
      stores={props.stores}
    />
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    active_Order: state.order.active_order,
    order_list: state.order.OrderList,
    partner: state.user.user_detail,
    orderStatusList: state.order.orderStatus,
    stores: state.store.storeList,
  };
};
const mapDispatchToProps = {
  OrderListLoad,
  BeginApiCallAction,
  ApiCallSuccessAction,
  StoreListLoad,
  ListClearAction,
};
interface OrderListProps {
  route: any;
  navigation: any;
  active_Order: number;
  SearchAction: any;
  ClearData: any;
  OrderListLoad: any;
  order_list: orders[];
  partner?: User;
  orderStatusList: DomainData[];
  StoreListLoad?: any;
  stores: StoreItem[];
  ListClearAction?: any;
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineSell);
