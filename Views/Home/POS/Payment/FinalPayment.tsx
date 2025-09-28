import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {PaymentData} from '../../../../models/PosModel';
import KeyBoard from '../PosDashboard/KeyBoard';
import QubeButton from '../../../../UILibrary/QubeButton';
import QubeInputPicture from '../../../../UILibrary/QubeInputPicture';
import {TextInput} from 'react-native-gesture-handler';
const FinalPayment = ({
  SetFinal,
  final,
  payment_due,
  PaidPayment,
  wallet_balance,
  Payment,
  captureClicked,
  DeleteImage,
  pictureData,
  uploadClicked,
  SetRef,
  ref_no,
}: FinalPaymentProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [recived, Setrecived] = useState<string>('');
  useEffect(() => {
    !!payment_due?.amount_due &&
      Setrecived(
        Payment == 2
          ? (payment_due?.amount_due - wallet_balance)?.toString()
          : payment_due?.amount_due?.toString(),
      );
  }, [final]);
  return (
    <Modal
      style={{
        width: '50%',
        // position: 'absolute',
        top: '0%',
        left: '22%',
        zIndex: 1,
        height: '80%',
      }}
      propagateSwipe={true}
      testID={'modal'}
      onBackdropPress={() => SetFinal(false)}
      isVisible={final}>
      <View
        style={{
          backgroundColor: '#ffff',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            borderBottomColor: theme.colors.placeholderText,
            borderBottomWidth: 0.5,
            width: '100%',
            padding: 15,
            margin: 2,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            Verify & Submit
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: theme.colors.inputBorder,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.bigFont,
              fontWeight: '700',
              color: theme.colors.primary,
            }}>
            Due Amount
          </Text>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: '700',
              color: theme.colors.danger,
            }}>
            {'\u20B9'} {payment_due?.amount_due?.toFixed(2)}
          </Text>
        </View>
        {Payment == 2 && (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              backgroundColor: theme.colors.inputBorder,
            }}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                fontWeight: '700',
                color: theme.colors.primary,
              }}>
              Cash Voucher Balance
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.massiveFont,
                fontWeight: '700',
                color: theme.colors.danger,
              }}>
              {'\u20B9'} {wallet_balance?.toFixed(2)}
            </Text>
          </View>
        )}
        {((!!payment_due?.amount_due &&
          Payment == 2 &&
          wallet_balance < payment_due?.amount_due) ||
          (Payment != 2 && Payment != 7)) && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: 10,
              alignItems: 'center',
              backgroundColor: theme.colors.inputBorder,
              borderTopColor: theme.colors.background,
              borderTopWidth: 1,
            }}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                fontWeight: '700',
                color: theme.colors.primary,
              }}>
              {Payment == 2 ? 'Recharge Amount' : 'Recived Amount'}
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.massiveFont,
                fontWeight: '700',
                color: theme.colors.success,
              }}>
              {'\u20B9'} {(+recived)?.toFixed(2)}
            </Text>
          </View>
        )}
        {Payment != 2 && Payment != 7 && (
          <KeyBoard
            currency={true}
            string={recived?.toString()}
            setstring={Setrecived}
          />
        )}
        {Payment == 7 && (
          <View
            style={{
              marginVertical: 5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: theme.fonts.smallFont,
                color: theme.colors.primary,
              }}>
              Payment Referance No.(*)
            </Text>
            <View
              style={{
                borderColor: theme.colors.inputBorder,
                borderWidth: 0.5,
                width: '100%',
                margin: 5,
                borderRadius: theme.roundness.smallRoundness,
              }}>
              <TextInput
                value={ref_no}
                onChangeText={text => SetRef(text)}
                style={{fontSize: theme.fonts.mediumFont}}
              />
            </View>
          </View>
        )}
        {Payment == 7 && (
          <QubeInputPicture
            imageURI={pictureData.map((m: any) => ({...m, default: 0}))}
            label="Payment Referance Image (*)"
            captureClicked={captureClicked}
            DeleteImage={DeleteImage}
            ChangeDefault={() => {}}
            disabled={pictureData.length > 0}
            uploadClicked={uploadClicked}></QubeInputPicture>
        )}
        {payment_due?.amount_due && recived && (
          <View
            style={{
              height: 100,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: 5,
              borderTopWidth: 0.5,
              marginTop: 10,
              borderTopColor: theme.colors.inputBorder,
            }}>
            <QubeButton
              color={'primary'}
              onPress={() => PaidPayment(recived)}
              disabled={
                Payment == 2
                  ? false
                  : Payment == 7
                  ? !ref_no || ref_no == '' || pictureData.length <= 0
                  : +recived <= 0 || +recived < payment_due?.amount_due
              }
              title="Submit"></QubeButton>
            <QubeButton
              color={'placeholderText'}
              onPress={() => SetFinal(false)}
              title="Close"></QubeButton>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default FinalPayment;
interface FinalPaymentProps {
  final: boolean;
  SetFinal: any;
  payment_due?: PaymentData;
  PaidPayment?: any;
  wallet_balance?: any;
  Payment?: number;
  uploadClicked?: any;
  DeleteImage?: any;
  captureClicked: any;
  pictureData?: any;
  ref_no?: any;
  SetRef?: any;
}
