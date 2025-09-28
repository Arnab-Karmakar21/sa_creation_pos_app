import {View, Text} from 'react-native';
import React from 'react';
import {PaymentSummery} from '../../../../models/PosModel';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import Summery from './Summery';
import Transaction from './Transaction';
import TransferCash from './TransferCash';

const BalanceTransferView = ({
  payment_summery,
  TransferPaymentAction,
}: BalanceTransferViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          width: '60%',
          borderRightWidth: 0.5,
          borderRightColor: theme.colors.inputBorder,
          flexDirection: 'column',
        }}>
        <Summery payment_summery={payment_summery} />
        <Transaction payment_summery={payment_summery} />
      </View>
      <View style={{width: '40%'}}>
        <TransferCash
          payment_summery={payment_summery}
          TransferPaymentAction={TransferPaymentAction}
        />
      </View>
    </View>
  );
};

export default BalanceTransferView;

interface BalanceTransferViewProps {
  payment_summery?: PaymentSummery;
  TransferPaymentAction?: any;
}
