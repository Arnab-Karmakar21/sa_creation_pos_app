import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {OrderDetailsHistry} from '../../../../models/PosModel';
import Billing from '../PosDashboard/Billing';
import PriceBreakups from './PriceBreakup';
import QubeButton from '../../../../UILibrary/QubeButton';
import ThermalPrinterModule from 'react-native-thermal-printer';
import {RetrieveImageService_one} from '../../../../Service/S3';
import {Billformater, items} from '../../../../Service/BillFormater';
import moment from 'moment';
const OrderDetailView = ({orderHistoryDetail, Back}: OrderDetailViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [print, SetPrint] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      SetPrint(false);
    }, 3000);
  }, [print]);
  const PrintBill = async () => {
    SetPrint(true);
    let item: any = orderHistoryDetail?.items.map(m => ({
      discount: (m.product_mrp - m.selling_price).toFixed(2).toString(),
      mrp: m.product_mrp.toFixed(2).toString(),
      product_name: m.product_description,
      quantity:
        m.required_quantity.toString() +
        (m.return_quantity
          ? ' > ' + (m.required_quantity - m.return_quantity).toString()
          : ''),
      selling_price: m.total_price.toFixed(2).toString(),
    }));
    let payload = await Billformater({
      address: orderHistoryDetail?.unit_address,
      customer_name: orderHistoryDetail?.customer_name,
      title: 'SRISHTISHREE',
      invoice_no: orderHistoryDetail?.order_no,
      phone_no: orderHistoryDetail?.customer_mobile,
      store: orderHistoryDetail?.store_name,
      unit_name: orderHistoryDetail?.unit_name,
      date: moment(orderHistoryDetail?.order_date)
        .format('DD/MM/YYYY HH:MM a')
        .toString(),
      item: item,
      ammount_recived: orderHistoryDetail?.actual_payment_amount?.toString(),
      payment_type: orderHistoryDetail?.payment_mode,
      return_amount: orderHistoryDetail?.return_amount?.toString(),
      total: orderHistoryDetail?.price.toString(),
      bag_id: orderHistoryDetail?.bag_ref_no,
    });
    setTimeout(() => {
      ThermalPrinterModule.printBluetooth({
        printerWidthMM: 55,
        mmFeedPaper: 55,
        printerNbrCharactersPerLine: 32,
        payload: payload,
      })
        .then(res => {})
        .catch(err => {});
    }, 800);
  };

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 6}}>
        <View style={{backgroundColor: theme.colors.cardalt}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              backgroundColor: theme.colors.inputBorder,
              borderWidth: 0.5,
            }}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                fontWeight: 'bold',
              }}>
              Customer Name
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
              }}>
              {orderHistoryDetail?.customer_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              backgroundColor: theme.colors.inputBorder,
              borderWidth: 0.5,
            }}>
            <Text
              style={{
                fontSize: theme.fonts.mediumFont,
                color: theme.colors.primary,
                fontWeight: 'bold',
              }}>
              Mobile Number
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.mediumFont,
                color: theme.colors.primary,
              }}>
              {orderHistoryDetail?.customer_mobile}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Billing type={0} order_details={orderHistoryDetail} />
        </View>
      </View>
      <View
        style={{
          flex: 4,
          borderLeftColor: theme.colors.inputBorder,
          borderLeftWidth: 0.5,
        }}>
        <PriceBreakups orderHistoryDetail={orderHistoryDetail} />
        <View
          style={{height: '20%', justifyContent: 'space-between', padding: 10}}>
          <QubeButton
            disabled={print}
            color={'primary'}
            onPress={() => PrintBill()}
            title="Print Bill"></QubeButton>
          <QubeButton
            color={'placeholderText'}
            onPress={() => Back()}
            title="Back"></QubeButton>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailView;

interface OrderDetailViewProps {
  orderHistoryDetail?: OrderDetailsHistry;
  Back?: any;
}
