import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Card} from '@rneui/base';
import {View, Text} from 'react-native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {PaymentDetails} from '../../../../models/PosModel';

const OrderCard = ({payment_details}: OrderCardProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <Card containerStyle={{margin: 0, marginRight: 10, minHeight: 210}}>
      <View>
        <Text
          style={{
            color: theme.colors.placeholderText,
            fontSize: theme.fonts.bigFont,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}>
          Payment Detail
        </Text>
      </View>
      <View style={{width: '100%', paddingTop: 5, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
            }}>
            Referance No.
          </Text>
        </View>
        <View style={{flex: 1.5}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              color: theme.colors.primary,
            }}>
            {payment_details?.pg_ref_no} {payment_details?.upi_ref_no}
          </Text>
        </View>
      </View>
      <View style={{width: '100%', paddingTop: 5, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1,
            }}>
            Payment Date
          </Text>
        </View>
        <View style={{flex: 1.5}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1.5,
            }}>
            {payment_details?.payment_date}
          </Text>
        </View>
      </View>
      <View style={{width: '100%', paddingTop: 5, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1,
            }}>
            Payment Mode
          </Text>
        </View>
        <View style={{flex: 1.5}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1.5,
              color: theme.colors.success,
            }}>
            {payment_details?.payment_mode}
          </Text>
        </View>
      </View>
      <View style={{width: '100%', paddingTop: 5, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1,
            }}>
            Payment Amount
          </Text>
        </View>
        <View style={{flex: 1.5}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1.5,
              color: theme.colors.danger,
            }}>
            {'\u20B9'}
            {payment_details?.payment_amount}
          </Text>
        </View>
      </View>
    </Card>
  );
};

interface OrderCardProps {
  payment_details?: PaymentDetails;
}

export default OrderCard;
