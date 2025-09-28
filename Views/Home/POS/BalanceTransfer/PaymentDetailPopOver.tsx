import {View, Text} from 'react-native';
import React from 'react';
import {List} from '../../../../models/PosModel';
import Modal from 'react-native-modal';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import QubeButton from '../../../../UILibrary/QubeButton';
const PaymentDetailPopOver = ({
  flag,
  Setflag,
  list,
  name,
}: PaymentDetailPopOverProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <Modal
      style={{
        width: '80%',
        position: 'absolute',
        top: '5%',
        left: '5%',
        zIndex: 2,
        height: '80%',
      }}
      testID={'modal'}
      onBackdropPress={() => Setflag(false)}
      isVisible={flag}>
      <View
        style={{
          backgroundColor: '#ffff',
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          flex: 1,
        }}>
        <View
          style={{
            borderBottomColor: theme.colors.placeholderText,
            borderBottomWidth: 0.5,
            width: '100%',
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            {name} Payment History
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              backgroundColor: theme.colors.primary,
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: theme.fonts.mediumFont,
                }}>
                Order ID
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: theme.fonts.mediumFont,
                }}>
                Payment ID
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: theme.fonts.mediumFont,
                }}>
                Order Date
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: theme.fonts.mediumFont,
                }}>
                Amount
              </Text>
            </View>
          </View>
          <ScrollView>
            {list.map((item, index) => (
              <Items key={index} item={item} index={index} />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            padding: 5,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <QubeButton
            color={'placeholderText'}
            onPress={() => Setflag(false)}
            title="Close"></QubeButton>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentDetailPopOver;
interface PaymentDetailPopOverProps {
  flag: boolean;
  Setflag?: any;
  list: List[];
  name: string;
}
interface itemsProps {
  index: number;
  item: List;
}

const Items = ({item, index}: itemsProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.placeholderText,
        paddingVertical: 15,
        backgroundColor:
          index % 2 == 0 ? theme.colors.background : theme.colors.inputBorder,
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.order_ref_no}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.payment_ref_no}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}></Text>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: theme.fonts.smallFont,
            color: theme.colors.danger,
            fontWeight: '600',
          }}>
          {'\u20B9'} {item.amount?.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
