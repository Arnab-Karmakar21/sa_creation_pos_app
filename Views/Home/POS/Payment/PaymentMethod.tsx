import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {PaymentMode} from '../../../../models/PosModel';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';

const PaymentMethod = ({
  payment_mode,
  Payment,
  SetPayment,
}: PaymentMethodProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'space-between',
          height: '13%',
          backgroundColor: theme.colors.primaryTint,
          alignItems: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: theme.fonts.bigFont,
            textDecorationLine: 'underline',
          }}>
          Choose Payment Method
        </Text>
      </View>
      <ScrollView style={{height: '100%'}}>
        {payment_mode.map((item, index) => (
          <CardItem
            Payment={Payment}
            SetPayment={SetPayment}
            item={item}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PaymentMethod;

interface PaymentMethodProps {
  payment_mode: PaymentMode[];
  Payment: number;
  SetPayment: any;
}

const CardItem = ({item, Payment, SetPayment}: CardItemProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <TouchableOpacity
      onPress={() => SetPayment(item.domain_code)}
      style={{
        padding: 10,
        margin: 5,
        backgroundColor:
          Payment == item.domain_code
            ? theme.colors.primary
            : theme.colors.messageToast,
        borderRadius: theme.roundness.smallRoundness,
      }}>
      <Text
        style={{
          fontSize: theme.fonts.bigFont,
          fontWeight: '800',
          color: theme.colors.background,
        }}>
        {item.domain_text}
      </Text>
    </TouchableOpacity>
  );
};
interface CardItemProps {
  item: PaymentMode;
  Payment: number;
  SetPayment: any;
}
