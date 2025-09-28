import {View, Text} from 'react-native';
import React from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {PaymentSummery} from '../../../../models/PosModel';

const Summery = ({payment_summery}: SummeryProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        borderBottomColor: theme.colors.inputBorder,
        borderBottomWidth: 0.5,
        padding: 10,
      }}>
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
          Shift Summery
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.cardalt,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          Amount Cash In Hand
        </Text>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          {'\u20B9'} {payment_summery?.cash_in_hand}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.cardalt,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          In Transit Amount
        </Text>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          {'\u20B9'} {payment_summery?.transit_amount}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.cardalt,
          padding: 10,
          borderTopColor: theme.colors.inputBorder,
          borderTopWidth: 0.5,
        }}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          Total Order Made
        </Text>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          {payment_summery?.total_order_no}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.cardalt,
          padding: 10,
          borderTopColor: theme.colors.inputBorder,
          borderTopWidth: 0.5,
        }}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          Total Product Sell
        </Text>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          {payment_summery?.total_product_no}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.cardalt,
          padding: 10,
          borderTopColor: theme.colors.inputBorder,
          borderTopWidth: 0.5,
        }}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          Total Transfer Amount
        </Text>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          {'\u20B9'} {payment_summery?.transfer_amount}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.cardalt,
          padding: 10,
          borderTopColor: theme.colors.inputBorder,
          borderTopWidth: 0.5,
        }}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          Cash Voucher Recharge
        </Text>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '800',
            color: theme.colors.primary,
          }}>
          {'\u20B9'} {payment_summery?.total_wallet_recharge}
        </Text>
      </View>
    </View>
  );
};

export default Summery;
interface SummeryProps {
  payment_summery?: PaymentSummery;
}
