import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {OrderDetailsHistry} from '../../../../models/PosModel';

const PriceBreakups = ({orderHistoryDetail}: PriceBreakupProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: theme.colors.primaryTint, padding: 8}}>
        <Text
          style={{
            color: '#fff',
            fontSize: theme.fonts.mediumFont,
            fontWeight: 'bold',
          }}>
          Bill Details
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        {!!orderHistoryDetail &&
          orderHistoryDetail.price_breakup.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderTopWidth:
                  index + 1 === orderHistoryDetail.price_breakup.length
                    ? 1
                    : 0.4,
                borderTopColor:
                  index + 1 === orderHistoryDetail.price_breakup.length
                    ? theme.colors.placeholderText
                    : theme.colors.inputBorder,
                borderBottomColor: theme.colors.placeholderText,
                borderBottomWidth:
                  index + 1 === orderHistoryDetail.price_breakup.length ? 1 : 0,
                borderStyle:
                  index + 1 === orderHistoryDetail.price_breakup.length
                    ? 'dashed'
                    : 'solid',
              }}>
              <Text
                style={{
                  fontSize:
                    index + 1 === orderHistoryDetail.price_breakup.length
                      ? theme.fonts.massiveFont
                      : theme.fonts.bigFont,
                  fontWeight: '700',
                  color:
                    index + 1 === orderHistoryDetail.price_breakup.length
                      ? theme.colors.danger
                      : theme.colors.textColor,
                }}>
                {item.type}
              </Text>
              <Text
                style={{
                  fontSize:
                    index + 1 === orderHistoryDetail.price_breakup.length
                      ? theme.fonts.massiveFont
                      : theme.fonts.bigFont,
                  fontWeight: '800',
                  color:
                    index + 1 === orderHistoryDetail.price_breakup.length
                      ? theme.colors.danger
                      : theme.colors.textColor,
                }}>
                {'\u20B9'}
                {item.value}
              </Text>
            </View>
          ))}
        <View
          style={{
            backgroundColor: theme.colors.primaryTint,
            padding: 8,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: theme.fonts.mediumFont,
              fontWeight: 'bold',
            }}>
            Payment Details
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderBottomWidth: 0.4,
            borderBottomColor: theme.colors.placeholderText,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.bigFont,
              fontWeight: '600',
              color: theme.colors.primary,
            }}>
            Payment Mode
          </Text>
          <Text
            style={{
              fontSize: theme.fonts.bigFont,
              fontWeight: '600',
              color: theme.colors.textColor,
            }}>
            {orderHistoryDetail?.payment_mode}
          </Text>
        </View>
        {!!orderHistoryDetail?.actual_payment_amount && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderBottomWidth: 0.4,
              borderBottomColor: theme.colors.placeholderText,
            }}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                fontWeight: '600',
                color: theme.colors.primary,
              }}>
              Amount Recived
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                fontWeight: '600',
                color: theme.colors.textColor,
              }}>
              {'\u20B9'}
              {orderHistoryDetail?.actual_payment_amount}
            </Text>
          </View>
        )}

        {!!orderHistoryDetail?.return_amount && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderBottomWidth: 0.4,
              borderBottomColor: theme.colors.placeholderText,
            }}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                fontWeight: '600',
                color: theme.colors.primary,
              }}>
              Amount Return
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                fontWeight: '600',
                color: theme.colors.textColor,
              }}>
              {'\u20B9'}
              {orderHistoryDetail?.return_amount}
            </Text>
          </View>
        )}
        {!!orderHistoryDetail?.bank_return_ref_no && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderBottomWidth: 0.4,
              borderBottomColor: theme.colors.placeholderText,
            }}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                fontWeight: '600',
                color: theme.colors.primary,
              }}>
              Referance No.
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.smallFont,
                fontWeight: '600',
                color: theme.colors.textColor,
              }}>
              {orderHistoryDetail?.bank_return_ref_no}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PriceBreakups;

interface PriceBreakupProps {
  orderHistoryDetail?: OrderDetailsHistry;
}
