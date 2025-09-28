import {View, Text} from 'react-native';
import React from 'react';
import BalanceTransferView from './BalanceTransferView';
import {PaymentSummery} from '../../../../models/PosModel';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {
  PaymentSummeryAction,
  TransferPaymentAction,
} from '../../../../Store/actions/posActions';
import {useFocusEffect} from '@react-navigation/native';
import {User} from '../../../../models/UserModel';

const BalanceTransfer = ({
  PaymentSummeryAction,
  payment_summery,
  userData,
  TransferPaymentAction,
}: BalanceTransferProps) => {
  useFocusEffect(
    React.useCallback(() => {
      PaymentSummeryAction({store_id: userData?.active_shift?.store_id});
    }, []),
  );
  return (
    <BalanceTransferView
      TransferPaymentAction={(data: any) =>
        TransferPaymentAction({
          ...data,
          store_id: userData?.active_shift?.store_id,
          unit_id: userData?.active_shift?.unit_id,
        })
      }
      payment_summery={payment_summery}
    />
  );
};

const mapDispatchToProps = {
  PaymentSummeryAction,
  TransferPaymentAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
    payment_summery: state.pos.payment_summery,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTransfer);
interface BalanceTransferProps {
  payment_summery?: PaymentSummery;
  PaymentSummeryAction?: any;
  userData?: User;
  TransferPaymentAction?: any;
}
