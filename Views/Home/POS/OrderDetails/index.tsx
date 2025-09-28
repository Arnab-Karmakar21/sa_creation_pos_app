import {View, Text} from 'react-native';
import React from 'react';
import OrderDetailView from './OrderDetailView';
import {StoreState} from '../../../../models/reduxModel';
import {GetOrderHistoryDetailAction} from '../../../../Store/actions/posActions';
import {connect} from 'react-redux';
import {User} from '../../../../Models/UserModel';
import {OrderDetailsHistry} from '../../../../models/PosModel';
import {useFocusEffect} from '@react-navigation/native';

const OrderDetails = ({
  navigation,
  orderHistoryDetail,
  userData,
  GetOrderHistoryDetailAction,
  route,
}: OrderDetailProps) => {
  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        GetOrderHistoryDetailAction(route.params);
      }
    }, []),
  );
  const Back = () => {
    navigation.goBack();
  };

  return (
    <OrderDetailView Back={Back} orderHistoryDetail={orderHistoryDetail} />
  );
};

const mapDispatchToProps = {
  GetOrderHistoryDetailAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
    orderHistoryDetail: state.pos.orderHistoryDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
interface OrderDetailProps {
  navigation?: any;
  userData?: User;
  orderHistoryDetail?: OrderDetailsHistry;
  GetOrderHistoryDetailAction?: any;
  route?: any;
}
