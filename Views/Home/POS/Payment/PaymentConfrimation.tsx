import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import QubeButton from '../../../../UILibrary/QubeButton';
const PaymentConfrimation = ({
  paid_Payment,
  returnAmount,
  PaymentDone,
  PrintBill,
  print,
}: PaymentConfrimationProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <Modal
      style={{
        width: '50%',
        position: 'absolute',
        left: '22%',
        zIndex: 2,
      }}
      testID={'modal'}
      isVisible={paid_Payment}>
      <View
        style={{
          backgroundColor: '#ffff',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            borderBottomColor: theme.colors.placeholderText,
            borderBottomWidth: 0.5,
            width: '100%',
            padding: 15,
            margin: 2,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            Proceed payment
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={{
              color: theme.colors.primary,
              fontWeight: '700',
              fontSize: theme.fonts.bigFont,
            }}>
            Return Ammount
          </Text>
          <Text
            style={{
              color: theme.colors.primary,
              fontWeight: '700',
              fontSize: theme.fonts.massiveFont,
            }}>
            {'\u20B9'}
            {returnAmount?.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            padding: 10,
            paddingTop: 50,
            flexDirection: 'row',
          }}>
          <View style={{width: '45%'}}>
            <QubeButton
              disabled={print}
              color={'primary'}
              onPress={() => PrintBill()}
              title="Print Bill"></QubeButton>
          </View>
          <View style={{width: '45%'}}>
            <QubeButton
              color={'primary'}
              onPress={() => PaymentDone()}
              title="Done"></QubeButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentConfrimation;

interface PaymentConfrimationProps {
  paid_Payment: boolean;
  returnAmount?: number;
  PaymentDone?: any;
  PrintBill?: any;
  print?: boolean;
}
