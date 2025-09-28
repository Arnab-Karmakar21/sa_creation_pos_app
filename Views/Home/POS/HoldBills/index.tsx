import {View, Text} from 'react-native';
import React from 'react';
import HoldBillsView from './HoldBillsView';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {HoldProduct, PosCustomerData} from '../../../../models/PosModel';
import {
  HoldBillLoadAction,
  VoidOrderAction,
} from '../../../../Store/actions/posActions';
import {useFocusEffect} from '@react-navigation/native';
import {User} from '../../../../models/UserModel';

const HoldBills = ({
  holdbill,
  HoldBillLoadAction,
  navigation,
  userData,
  VoidOrderAction,
}: HoldBillsProps) => {
  useFocusEffect(
    React.useCallback(() => {
      if (!!userData?.active_shift) {
        HoldBillLoadAction({
          store_id: userData.active_shift.store_id,
        });
      }
    }, [userData]),
  );
  //
  const GotoOrder = (data: HoldProduct) => {
    let payload: PosCustomerData = {
      customer_id: data.customer_id,
      mobile: +data.mobile,
      name: data.name,
      order_no: data.order_ref_no,
    };
    navigation.navigate('posDashboard', payload);
  };
  const DeleteOrder = (data: HoldProduct) => {
    let payload = {
      data: {
        order_no: data.order_ref_no,
        is_void: true,
        is_hold: false,
      },
      navigation: navigation,
      type: 1,
    };
    VoidOrderAction(payload);
  };
  return (
    <HoldBillsView
      DeleteOrder={DeleteOrder}
      GotoOrder={GotoOrder}
      holdbill={holdbill}
    />
  );
};

const mapDispatchToProps = {
  HoldBillLoadAction,
  VoidOrderAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
    holdbill: state.pos.holdbill,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HoldBills);
interface HoldBillsProps {
  navigation?: any;
  HoldBillLoadAction?: any;
  holdbill: HoldProduct[];
  userData?: User;
  VoidOrderAction?: any;
}
