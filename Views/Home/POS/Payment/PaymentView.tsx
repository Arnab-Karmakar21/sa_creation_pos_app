import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import Billing from '../PosDashboard/Billing';
import {
  OrderDetails,
  PaymentData,
  PaymentMode,
  PriceBreakUp,
} from '../../../../models/PosModel';
import PaymentMethod from './PaymentMethod';
import QubeButton from '../../../../UILibrary/QubeButton';
import FinalPayment from './FinalPayment';
import PriceBrkUp from './PriceBrkUp';
import PaymentConfrimation from './PaymentConfrimation';
import {Billformater} from '../../../../Service/BillFormater';
import ThermalPrinterModule from 'react-native-thermal-printer';
import moment from 'moment';
import {User} from '../../../../models/UserModel';
const PaymentView = ({
  order_details,
  payment_mode,
  payment_due,
  Back,
  PaidPayment,
  price_breakup,
  PaymentDone,
  paid_Payment,
  returnAmount,
  customer,
  userData,
  wallet_balance,
  captureClicked,
  DeleteImage,
  pictureData,
  uploadClicked,
  SetRef,
  ref_no,
  Setimage,
}: PaymentViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [Payment, SetPayment] = useState<number>(0);
  const [final, SetFinal] = useState<boolean>(false);
  const [p, Setp] = useState<boolean>(false);
  const [print, SetPrint] = useState<boolean>(false);
  const [cash, SetCash] = useState<number>();
  const Paid = () => {
    SetFinal(true);
    SetRef('');
    Setimage([]);
  };

  useEffect(() => {
    setTimeout(() => {
      SetPrint(false);
    }, 3000);
  }, [print]);
  const PrintBill = async () => {
    SetPrint(true);
    let item: any = order_details?.items.map(m => ({
      discount: !!m.discount ? m.discount.toFixed(2).toString() : '0.00',
      mrp: m.product_mrp.toFixed(2).toString(),
      product_name: m.product_description,
      quantity: m.required_quantity.toString(),
      selling_price: m.total_price.toFixed(2).toString(),
    }));
    let payload = await Billformater({
      address: payment_due?.unit_address,
      customer_name: customer?.customer_name,
      title: 'SRISHTISHREE',
      invoice_no: order_details?.order_no,
      phone_no: customer?.phone,
      store: userData?.active_shift?.store_name,
      unit_name: userData?.active_shift?.unit_name,
      date: moment(new Date()).format('DD/MM/YYYY HH:MM a').toString(),
      item: item,
      ammount_recived: cash?.toFixed(2).toString(),
      payment_type: payment_mode.find(m => m.domain_code == Payment)
        ?.domain_text,
      return_amount: returnAmount?.toFixed(2).toString(),
      total: payment_due?.amount_due?.toFixed(2).toString(),
      bag_id: order_details?.bag_ref_no,
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
      <PriceBrkUp flag={p} SetFlag={Setp} price_breakup={price_breakup} />
      <PaymentConfrimation
        paid_Payment={paid_Payment}
        returnAmount={returnAmount}
        PaymentDone={PaymentDone}
        PrintBill={PrintBill}
        print={print}
      />
      <FinalPayment
        SetFinal={SetFinal}
        final={final}
        Payment={Payment}
        payment_due={payment_due}
        wallet_balance={wallet_balance}
        PaidPayment={(ammount: string) => (
          PaidPayment(+ammount, Payment), SetCash(+ammount), SetFinal(false)
        )}
        captureClicked={captureClicked}
        DeleteImage={DeleteImage}
        pictureData={pictureData}
        uploadClicked={uploadClicked}
        ref_no={ref_no}
        SetRef={SetRef}
      />
      <View
        style={{
          flex: 7,
          borderRightWidth: 0.5,
          height: '100%',
          borderRightColor: theme.colors.inputBorder,
          borderLeftColor: theme.colors.inputBorder,
          borderLeftWidth: 0.5,
        }}>
        <View style={{height: '90%'}}>
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
                {customer?.customer_name}
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
                {customer?.phone}
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
                Cash Voucher Balance
              </Text>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  color: theme.colors.primary,
                }}>
                {'\u20B9'}
                {wallet_balance?.toFixed(2)}
              </Text>
            </View>
          </View>
          <Billing order_details={order_details} type={2} />
        </View>
        <TouchableOpacity
          onPress={() => Setp(true)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: theme.colors.primary,
            flex: 1,
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.massiveFont,
                color: theme.colors.background,
                fontWeight: 'bold',
              }}>
              Total Due
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.massiveFont,
                color: theme.colors.background,
                fontWeight: 'bold',
              }}>
              {'\u20B9'}
              {payment_due?.amount_due?.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 5, borderRightWidth: 0.5, height: '100%'}}>
        <View style={{height: '75%'}}>
          <PaymentMethod
            Payment={Payment}
            SetPayment={SetPayment}
            payment_mode={payment_mode}
          />
        </View>
        <View
          style={{
            height: '25%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 5,
            borderTopWidth: 0.5,
            borderTopColor: theme.colors.inputBorder,
          }}>
          <QubeButton
            color={'primary'}
            onPress={() => Paid()}
            disabled={!Payment || Payment == 0}
            title="Paid"></QubeButton>
          <QubeButton
            color={'placeholderText'}
            onPress={() => Back()}
            title="Back"></QubeButton>
        </View>
      </View>
    </View>
  );
};

export default PaymentView;

interface PaymentViewProps {
  order_details?: OrderDetails;
  payment_mode: PaymentMode[];
  payment_due?: PaymentData;
  Back?: any;
  PaidPayment?: any;
  price_breakup: PriceBreakUp[];
  paid_Payment?: any;
  returnAmount?: any;
  PaymentDone?: any;
  customer?: any;
  userData?: User;
  wallet_balance?: number;
  uploadClicked?: any;
  DeleteImage?: any;
  captureClicked: any;
  pictureData?: any;
  ref_no?: any;
  SetRef?: any;
  Setimage?: any;
}
