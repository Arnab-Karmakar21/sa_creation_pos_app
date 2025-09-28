import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Card} from '@rneui/base';
import {View, Text} from 'react-native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {RefundDetails} from '../../../../models/PosModel';

const ReturnCard = ({refund_details}: ReturnCardProps) => {
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
          Refund Detail
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
            {refund_details?.bank_return_ref_no}
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
            Return Date
          </Text>
        </View>
        <View style={{flex: 1.5}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1.5,
            }}>
            {refund_details?.return_date}
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
            Return Amount
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
            {'\u20B9'} {refund_details?.return_amount}
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
            Refund Mode
          </Text>
        </View>
        <View style={{flex: 1.5}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1.5,
            }}>
            {refund_details?.return_mode}
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
            Status
          </Text>
        </View>
        <View style={{flex: 1.5}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              flex: 1.5,
              color:
                refund_details?.status === 'Failed'
                  ? theme.colors.danger
                  : refund_details?.status === 'Successful' &&
                    theme.colors.success,
            }}>
            {refund_details?.status}
          </Text>
        </View>
      </View>
    </Card>
  );
};

interface ReturnCardProps {
  refund_details?: RefundDetails;
}

export default ReturnCard;
