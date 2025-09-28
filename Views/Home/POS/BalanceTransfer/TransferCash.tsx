import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import KeyBoard from '../PosDashboard/KeyBoard';
import QubeButton from '../../../../UILibrary/QubeButton';
import {PaymentSummery} from '../../../../models/PosModel';

const TransferCash = ({
  payment_summery,
  TransferPaymentAction,
}: TransferCashProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [recived, Setrecived] = useState<string>('');
  useFocusEffect(
    React.useCallback(() => {
      Setrecived('');
    }, []),
  );
  return (
    <View style={{padding: 10, flex: 1}}>
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.primaryTint,
          padding: 10,
        }}>
        <Text
          style={{
            color: theme.colors.background,
            fontSize: theme.fonts.bigFont,
            fontWeight: '800',
          }}>
          Transfer Cash
        </Text>
      </View>
      <View
        style={{
          borderColor: theme.colors.inputBorder,
          height: 40,
          borderWidth: 0.5,
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: theme.fonts.massiveFont,
            color: theme.colors.primary,
          }}>
          {'\u20B9'} {!!recived && recived != '' ? (+recived)?.toFixed(2) : '0'}
        </Text>
      </View>
      <View style={{marginTop: 30, height: '40%'}}>
        <KeyBoard
          currency={true}
          string={recived?.toString()}
          setstring={Setrecived}
        />
      </View>
      {!!payment_summery?.cash_in_hand && (
        <View
          style={{
            height: '30%',
            padding: 10,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <QubeButton
            color={'primary'}
            disabled={
              !recived ||
              (!!recived &&
                recived != '' &&
                +recived > payment_summery?.cash_in_hand)
            }
            onPress={() => (
              TransferPaymentAction({
                amount: +recived,
              }),
              Setrecived('')
            )}
            title="Transfer"></QubeButton>
        </View>
      )}
    </View>
  );
};

export default TransferCash;

interface TransferCashProps {
  payment_summery?: PaymentSummery;
  TransferPaymentAction?: any;
}
