import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import QubeButton from '../../../../UILibrary/QubeButton';
import Icon from 'react-native-vector-icons/Ionicons';
import KeyBoard from './KeyBoard';
import {PosCustomerData} from '../../../../models/PosModel';
import QrCodeScanners from './QrCodeScanner';
const ProductScanner = ({customer, ProductSearchAction}: ProductScanner) => {
  const theme: ThemeItem = Object(useTheme());
  const [ProductCode, SetProductCode] = useState<string>('');
  const [qr, Setqr] = useState<boolean>(false);
  const getCode = (code: string) => {
    let len = 9 - code.length;
    let cod: string = '000000000';
    return cod.slice(0, len) + code;
  };
  return (
    <View style={{flex: 1}}>
      <QrCodeScanners
        CodeScan={(code: string) =>
          ProductSearchAction({
            product_id: code,
          })
        }
        flag={qr}
        Setflag={Setqr}
      />
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
            {customer?.name}
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
            {customer?.mobile}
          </Text>
        </View>
      </View>
      <View style={{flex: 1, margin: 15, justifyContent: 'space-between'}}>
        <View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.mediumFont,
                paddingVertical: 10,
                fontWeight: 'bold',
                color: theme.colors.primary,
              }}>
              Scan / Enter Item Code
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.colors.darkTint,
              borderRadius: 3,
              height: 48,
              flexDirection: 'row',
            }}>
            <TextInput
              style={{fontSize: theme.fonts.bigFont, width: '90%'}}
              keyboardType="number-pad"
              editable={false}
              value={ProductCode}
              placeholder="Enter Product Code"></TextInput>
            <TouchableOpacity onPress={() => Setqr(true)}>
              <Icon
                name="qr-code-outline"
                color={theme.colors.primary}
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <KeyBoard string={ProductCode} setstring={SetProductCode} />
        </View>
        <View style={{marginTop: 40}}>
          <QubeButton
            color={'primary'}
            // disabled={ProductCode.length != 9}
            onPress={() => (
              ProductSearchAction({
                product_id:
                  ProductCode.length < 9 ? getCode(ProductCode) : ProductCode,
              }),
              SetProductCode('')
            )}
            title="Add"></QubeButton>
        </View>
      </View>
    </View>
  );
};

export default ProductScanner;
interface ProductScanner {
  customer?: PosCustomerData;
  ProductSearchAction?: any;
}
