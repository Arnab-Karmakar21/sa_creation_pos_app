import {View, Text} from 'react-native';
import React, {useState} from 'react';
import QubeButton from '../../../../UILibrary/QubeButton';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {OrderDetails} from '../../../../models/PosModel';
import HoldCancelPopover from './HoldCancelPopover';

const ActionArea = ({
  order_details,
  HoldBill,
  CancelOrder,
  PaymentAction,
}: ActionAreaProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [holdCan, SetholdCan] = useState<boolean>(false);
  return (
    <View style={{flex: 1}}>
      <HoldCancelPopover
        HoldBill={HoldBill}
        flag={holdCan}
        Setflag={SetholdCan}
        CancelOrder={CancelOrder}
      />
      <View
        style={{
          height: '25%',
          backgroundColor: theme.colors.inputBorder,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          borderWidth: 0.5,
          borderColor: theme.colors.primary,
        }}>
        <View>
          <Text
            style={{
              fontSize: theme.fonts.bigFont,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            Total Qty
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            {!!order_details &&
            !!order_details.items &&
            order_details.items.length > 0
              ? order_details?.items.reduce(
                  (m, n) => m + n.required_quantity,
                  0,
                )
              : 0}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: theme.fonts.bigFont,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            Total Amt
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            {'\u20B9'}
            {!!order_details &&
            !!order_details.items &&
            order_details.items.length > 0
              ? order_details?.items.reduce((m, n) => m + n.total_price, 0)
              : 0}
          </Text>
        </View>
      </View>
      {!!order_details?.order_no && (
        <View
          style={{
            height: '75%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 10,
          }}>
          <QubeButton
            onPress={() => PaymentAction(order_details.order_no)}
            title="Payment"></QubeButton>
          <QubeButton
            color={'danger'}
            onPress={() => SetholdCan(true)}
            title="Cancel / Hold"></QubeButton>
        </View>
      )}
    </View>
  );
};

export default ActionArea;

interface ActionAreaProps {
  order_details?: OrderDetails;
  HoldBill?: any;
  CancelOrder?: any;
  PaymentAction?: any;
}
