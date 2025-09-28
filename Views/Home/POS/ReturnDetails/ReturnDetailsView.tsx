import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {Card} from '@rneui/base';
import {
  CustomerDetails,
  PaymentDetails,
  RefundDetails,
  RentrnDet,
} from '../../../../models/PosModel';
import OrderDetailsCard from './OrderDetailsCard';
import moment from 'moment';
import OrderCard from './OrderCard';
import ReturnCard from './ReturnCard';
import ReturnItemList from './ReturnItemList';
import QubeAlert from '../../../../UILibrary/QubeAlert';

const ReturnDetailsView = ({
  return_det,
  GotoOrder,
  RecivedGoods,
}: ReturnDetailsViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [flag, SetFlag] = useState<boolean>(false);
  return (
    <ScrollView style={{height: '100%'}}>
      <QubeAlert
        isVisible={flag}
        title="Goods Recived"
        okPress={() => (SetFlag(false), RecivedGoods())}
        subTitle="Are you sure you have received the products? If you confirm, the refund will be processed."
        okText="Yes"
        cancelText="No"
        cancelPress={() => SetFlag(false)}
        setIsVisible={SetFlag}
      />
      <View style={{width: '100%'}}>
        <View
          style={{
            marginBottom: 10,
            marginRight: 10,
          }}>
          <OrderDetailsCard
            GotoOrder={GotoOrder}
            customer_details={return_det?.customer_details}
            return_status={return_det?.refund_details?.status}
            GoodRecived={() => SetFlag(true)}
          />
        </View>
        <View
          style={{
            marginBottom: 10,
            marginRight: 10,
            marginTop: 5,
          }}>
          <ReturnItemList
            return_list={
              !!return_det?.return_list ? return_det?.return_list : []
            }
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <OrderCard payment_details={return_det?.payment_details} />
          </View>
          <View style={{flex: 1}}>
            <ReturnCard refund_details={return_det?.refund_details} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReturnDetailsView;

interface ReturnDetailsViewProps {
  return_det?: RentrnDet;
  GotoOrder?: any;
  RecivedGoods?: any;
}
