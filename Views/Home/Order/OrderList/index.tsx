import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import globalStyles from '../../../../GlobalStyle';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {StoreState} from '../../../../models/reduxModel';
import {
  ListClearAction,
  OrderListLoad,
} from '../../../../Store/actions/OrderAction';
import OrderListView from './OrderListView';
import {
  BeginApiCallAction,
  ApiCallSuccessAction,
} from '../../../../Store/actions/apiStatusActions';
import {User} from '../../../../models/UserModel';
import {DomainData} from '../../../../models/DomainModels';
import {orders} from '../../../../models/OrderModel';
import {StoreListLoad} from '../../../../Store/actions/storeAction';
import {StoreItem} from '../../../../models/StoreModel';

const OrderLists = (props: OrderListProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [page_index, SetPageIndex] = useState<number>(0);
  const [page_size, SetPageSize] = useState<number>(10);
  const styles = StyleSheet.create({
    container: {
      paddingBottom: 15,
      flex: 1,
    },
    headerContainer: {
      paddingTop: 20,
      paddingHorizontal: '5%',
      backgroundColor: theme.colors.primary,
      width: '60%',
    },
    headerText: {
      fontSize: theme.fonts.massiveFont,
      fontWeight: 'bold',
      color: theme.colors.primaryConstrast,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
    },
    headerSubText: {
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.secondaryTint,
    },
    spacingMargin: {
      paddingVertical: 10,
    },
    rightheaderContainer: {
      paddingTop: 20,
      paddingHorizontal: '5%',
      backgroundColor: theme.colors.primary,
      width: '40%',
      // justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    hederRightText: {
      fontSize: theme.fonts.mediumFont,
      fontWeight: 'bold',
      color: theme.colors.primaryConstrast,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
      textAlign: 'right',
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      props.ListClearAction();
      SetPageIndex(0);
      props.OrderListLoad({
        partner_id:
          props.partner?.user_type == 6 ? null : props.partner.partner_id,
        store_id: null,
        start_date: null,
        end_date: null,
        payment_type: null,
        order_status: null,
        page_index: 0,
        page_size: page_size,
        search_string: null,
        init: 0,
      });
      props.StoreListLoad({
        qc_partner_id: props?.partner?.partner_id,
        admn_user_id: props?.partner?.admn_user_id,
      });
    }, []),
  );
  const viewOrderDetails = (bag_id: number) => {
    props.navigation.navigate('orderdetail', {
      bag_id: bag_id,
    });
  };
  const ClearData = () => {
    SetPageIndex(0);
    props.OrderListLoad({
      partner_id:
        props.partner?.user_type == 6 ? null : props.partner.partner_id,
      store_id: null,
      start_date: null,
      end_date: null,
      payment_type: null,
      order_status: null,
      page_index: 0,
      page_size: page_size,
      search_string: null,
      init: 0,
    });
  };
  const SearchAction = (payload: any) => {
    SetPageIndex(0);
    props.OrderListLoad({
      partner_id:
        props.partner?.user_type == 6 ? null : props.partner.partner_id,
      store_id: payload.store_id,
      start_date: payload.start_date,
      end_date: payload.end_date,
      payment_type: null,
      order_status: payload.order_status,
      page_index: 0,
      page_size: page_size,
      search_string: payload.search_string,
      init: 0,
    });
  };

  const GetData = (payload: any) => {
    if (!!props.active_Order && props.active_Order > props.order_list.length) {
      SetPageIndex(page_index + 1);
      props.OrderListLoad({
        partner_id:
          props.partner?.user_type == 6 ? null : props.partner.partner_id,
        store_id: payload.store_id,
        start_date: payload.start_date,
        end_date: payload.end_date,
        payment_type: null,
        order_status: payload.order_status,
        page_index: page_index + 1,
        page_size: page_size,
        search_string: payload.search_string,
        init: 1,
      });
    }
  };

  return (
    <OrderListView
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderLists);
