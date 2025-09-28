import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Card} from '@rneui/base';
import {View, Text} from 'react-native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {CustomerDetails} from '../../../../models/PosModel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import QubeButton from '../../../../UILibrary/QubeButton';

const OrderDetailsCard = ({
  customer_details,
  GotoOrder,
  return_status,
  GoodRecived,
}: OrderDetailsCardProps) => {
  console.log(return_status, 'llllllllllllllllllll');

  const theme: ThemeItem = Object(useTheme());
  return (
    <Card containerStyle={{margin: 0}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 9.5}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 180}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                  fontWeight: 'bold',
                }}>
                Order ID
              </Text>
            </View>
            <View style={{flex: 1.5}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                }}>
                {customer_details?.order_ref_no}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 180}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                  fontWeight: 'bold',
                }}>
                Bag ID
              </Text>
            </View>
            <View style={{flex: 1.5}}>
              <TouchableOpacity onPress={() => GotoOrder()}>
                <Text
                  style={{
                    fontSize: theme.fonts.bigFont,
                    paddingBottom: 5,
                    color: theme.colors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  {customer_details?.bag_ref_no}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 180}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                  fontWeight: 'bold',
                }}>
                Customer Name
              </Text>
            </View>
            <View style={{flex: 1.5}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                }}>
                {customer_details?.first_name} {customer_details?.last_name}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 180}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                  fontWeight: 'bold',
                }}>
                Mobile Number
              </Text>
            </View>
            <View style={{flex: 1.5}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                }}>
                {customer_details?.phone_no}
              </Text>
            </View>
          </View>
          {!!customer_details?.address_details && (
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 180}}>
                <Text
                  style={{
                    fontSize: theme.fonts.bigFont,
                    paddingBottom: 5,
                    color: theme.colors.primary,
                    fontWeight: 'bold',
                  }}>
                  Delivery Address
                </Text>
              </View>
              <View style={{flex: 1.5}}>
                <Text
                  style={{
                    fontSize: theme.fonts.bigFont,
                    paddingBottom: 5,
                    color: theme.colors.primary,
                  }}>
                  {customer_details?.address_details?.addressline1}{' '}
                  {customer_details?.address_details?.addressline2}{' '}
                  {customer_details?.address_details?.city}{' '}
                  {customer_details?.address_details?.landmark}{' '}
                  {customer_details?.address_details?.states_name} {'-'}{' '}
                  {customer_details?.address_details?.pin}
                </Text>
              </View>
            </View>
          )}

          <View style={{flexDirection: 'row'}}>
            <View style={{width: 180}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                  fontWeight: 'bold',
                }}>
                Order Type
              </Text>
            </View>
            <View style={{flex: 1.5}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  paddingBottom: 5,
                  color: theme.colors.primary,
                }}>
                {customer_details?.origin_type_name}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{flex: 2.5, justifyContent: 'center', alignItems: 'center'}}>
          {!!return_status && return_status === 'Requested' && (
            <QubeButton
              color={'success'}
              onPress={() => GoodRecived()}
              title="Goods Recived"></QubeButton>
          )}
        </View>
      </View>
    </Card>
  );
};

interface OrderDetailsCardProps {
  customer_details?: CustomerDetails;
  GotoOrder?: any;
  return_status?: string;
  GoodRecived?: any;
}

export default OrderDetailsCard;
