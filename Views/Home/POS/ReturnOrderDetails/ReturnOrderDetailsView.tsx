import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import QubeButton from '../../../../UILibrary/QubeButton';
import Billing from './Billing';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import KeyBoard from '../PosDashboard/KeyBoard';
import ActionArea from './ActionArea';
import QrCodeScanners from '../PosDashboard/QrCodeScanner';
import QubeAlert from '../../../../UILibrary/QubeAlert';
import RefundModal from './RefundModal';
import {BillItemReturn} from '../../../../models/PosModel';
import ProductEditPopover from './ProductEditPopover';
import {showToast} from '../../../../Service/Toast';

const ReturnOrderDetailsView = ({
  returnDetails,
  ReturnBillDetails,
  ProductSearchAction,
  bill_return_refund,
  navigation,
}: ReturnOrderDetailsViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [ProductCode, SetProductCode] = useState<string>('');
  const [qr, Setqr] = useState<boolean>(false);
  const [retItem, SetRetItem] = useState<any[]>([]);
  const [retConfirm, setRetConfirm] = useState<boolean>(false);
  const [retRefund, setRetRefund] = useState<boolean>(false);
  const [editFlag, SetFlag] = useState<boolean>(false);
  const [addItm, SetaddItm] = useState<any>();

  const Update = (data: any) => {
    if (data.return_quantity == 0) {
      showToast('Return Quantity can not be blank', 'errorToast');
    } else {
      SetRetItem([...retItem, data]);
    }
  };

  const getCode = (code: string) => {
    let len = 9 - code.length;
    let cod: string = '000000000';
    return cod.slice(0, len) + code;
  };
  const ReturnBill = () => {
    setRetConfirm(true);
    // setRetRefund(true);
  };
  const okPress = () => {
    setRetConfirm(false);
    let payload: any = {
      order_no: returnDetails.order_no,
      bag_id: returnDetails.bag_id,
      customer_id: returnDetails.customer_id,
      order_id: returnDetails.order_id,
      origin_type: returnDetails.origin_type,
      items: retItem.map((item: any) => ({
        product_id: item.product_id,
        product_description: item.product_description,
        total_quantity: item.total_quantity,
        returnable_quantity: item.return_quantity,
        return_quantity: item.return_quantity,
        total_price: item.total_price,
        unit_price: item.unit_price,
        return_days: item.return_days,
        returnable: item.returnable,
        return_reason: item.return_reason,
      })),
    };
    ReturnBillDetails(payload);
  };
  const RemoveItems = (data: any) => {
    let rem = retItem.filter(item => item.product_id !== data.product_id);
    SetRetItem(prevItem => [...rem]);
  };
  const cancelPress = () => {
    setRetConfirm(false);
  };
  const savePress = () => {
    navigation.navigate('ReturnOrder');
  };
  const Back = () => {
    navigation.goBack();
  };
  React.useEffect(() => {
    if (!!bill_return_refund) {
      setRetRefund(true);
      SetRetItem([]);
    }
  }, [bill_return_refund]);

  const AddRetItem = (data: any) => {
    let notInBillItem = returnDetails.items.find(
      (m: any) => m.product_id == data.product_id,
    );
    if (notInBillItem == undefined) {
      showToast('Please select correct item', 'errorToast');
    } else {
      let checkAddItem = returnDetails.items.find(
        (m: any) => m.product_id == data.product_id,
      ).returnable;
      let presentInReturnList = retItem.find(
        item => item.product_id == data.product_id,
      );
      if (checkAddItem == false) {
        showToast('This Product cannot be returned', 'errorToast');
      } else if (presentInReturnList) {
        showToast(
          'This Product already present in the Return List',
          'errorToast',
        );
      } else {
        SetaddItm(
          returnDetails.items.find((m: any) => m.product_id == data.product_id),
        );
        SetFlag(true);
      }
    }
  };
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <QrCodeScanners
        CodeScan={(code: string) =>
          SetProductCode(code.length < 9 ? getCode(code) : code)
        }
        flag={qr}
        Setflag={Setqr}
      />
      <QubeAlert
        isVisible={retConfirm}
        title="Confirm Return"
        okPress={okPress}
        cancelPress={cancelPress}
        subTitle="Are you sure you want return those items"
        okText="Return"
        cancelText="Cancel"
        setIsVisible={setRetConfirm}
      />
      <ProductEditPopover
        flag={editFlag}
        SetFlag={SetFlag}
        Item={addItm}
        Update={Update}
      />
      {!!bill_return_refund && (
        <RefundModal
          isVisible={retRefund}
          setIsVisible={setRetRefund}
          bill_return_refund={bill_return_refund}
          savePress={savePress}
        />
      )}
      <View style={{flex: 6, flexDirection: 'column'}}>
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
              {returnDetails?.customer_name}
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
              {returnDetails?.phone_no}
            </Text>
          </View>
        </View>
        <View style={{flex: 6, flexDirection: 'row'}}>
          {/* <View
            style={{
              flex: 3,
              margin: 15,
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}>
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
                  height: 34,
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={{
                    fontSize: theme.fonts.smallFont,
                    width: '90%',
                    paddingTop: 5,
                  }}
                  keyboardType="number-pad"
                  editable={false}
                  value={ProductCode}
                  placeholder="Enter Product Code"></TextInput>
                <TouchableOpacity onPress={() => Setqr(true)}>
                  <Icon
                    name="qr-code-outline"
                    color={theme.colors.primary}
                    size={25}
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
                disabled={ProductCode.length <= 0}
                onPress={() => (
                  AddRetItem({
                    product_id:
                      ProductCode.length < 9
                        ? getCode(ProductCode)
                        : ProductCode,
                  }),
                  SetProductCode('')
                )}
                title="Add Return Item"></QubeButton>
            </View>
          </View> */}

          <View
            style={{
              flex: 5,
              borderLeftColor: theme.colors.inputBorder,
              borderLeftWidth: 0.5,
            }}>
            <Billing
              type={0}
              order_details={returnDetails}
              Update={Update}
              retItem={retItem}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 4,
          borderLeftColor: theme.colors.inputBorder,
          borderLeftWidth: 0.5,
        }}>
        <ActionArea retItem={retItem} RemoveItems={RemoveItems} />
        <View
          style={{height: '20%', justifyContent: 'space-between', padding: 10}}>
          <QubeButton
            disabled={retItem.length <= 0}
            color={'primary'}
            onPress={() => ReturnBill()}
            title="Return"></QubeButton>
          <QubeButton
            color={'placeholderText'}
            onPress={() => Back()}
            title="Back"></QubeButton>
        </View>
      </View>
    </View>
  );
};

export default ReturnOrderDetailsView;

interface ReturnOrderDetailsViewProps {
  returnDetails?: any;
  ReturnBillDetails?: any;
  ProductSearchAction?: any;
  bill_return_refund?: BillItemReturn;
  navigation?: any;
}
