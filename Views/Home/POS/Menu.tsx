import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThemeItem} from '../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {active_shift} from '../../../models/UserModel';
import {ScrollView} from 'react-native-gesture-handler';
const Menu = ({navigation, active_shift, listenRoute, EndShift}: MenuProps) => {
  const theme: ThemeItem = Object(useTheme());
  const SelsMenu: any[] = [
    {
      name: 'New Sell',
      icon: 'add-shopping-cart',
      url: 'CustomerAddNew',
      subUrl: ['posDashboard'],
    },
    {
      name: 'Hold Bills',
      icon: 'history',
      url: 'HoldBills',
      subUrl: [],
    },
    {
      name: 'Previous Orders',
      icon: 'receipt',
      url: 'ProductSearch',
      subUrl: [],
    },
    {
      name: 'Initiate Return',
      icon: 'undo',
      url: 'ReturnOrder',
      subUrl: [],
    },
    {
      name: 'Returned Order',
      icon: 'hourglass-full',
      url: 'Refund',
      subUrl: [],
    },
    // {
    //   name: 'Return Request',
    //   icon: 'assignment-return',
    //   url: 'ReturnReq',
    //   subUrl: [],
    // },
    {
      name: 'Online Sell',
      icon: 'shop',
      url: 'OnlineSell',
      subUrl: [],
    },
    {
      name: 'Shift Summery',
      icon: 'transfer-within-a-station',
      url: 'BalanceTransfer',
      subUrl: [],
    },
    // {
    //   name: 'Report',
    //   icon: 'report',
    //   url: 'Report',
    //   subUrl: [],
    // },
    {
      name: 'End Shift',
      icon: 'keyboard-return',
      url: '',
      subUrl: [],
    },
  ];
  return (
    <ScrollView style={{flexDirection: 'column'}}>
      {!!active_shift && (
        <View
          style={{
            height: 100,
            marginBottom: 20,
            borderBottomColor: '#f0efeb',
            borderBottomWidth: 2,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
          }}>
          <ImageBackground
            source={require('../../../Assets/drawerbg.jpg')}
            style={{height: '100%', width: '100%', justifyContent: 'center'}}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.background,
                    fontWeight: '600',
                  }}>
                  {active_shift.store_name}
                </Text>
              </View>
              <View>
                <Text style={{color: theme.colors.background, fontSize: 14}}>
                  {active_shift.unit_name}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
      {SelsMenu.map((m, index) => (
        <TouchableOpacity
          onPress={() =>
            !!m.url && m.url != ''
              ? navigation.reset({
                  index: 0,
                  routes: [{name: m.url}],
                })
              : EndShift()
          }
          key={index}
          style={{
            paddingVertical: 5,
            borderRadius: 5,
            backgroundColor:
              listenRoute === m.url ||
              m.subUrl.find((m: string) => m == listenRoute)
                ? theme.colors.primary
                : theme.colors.inputBorder,
            marginVertical: 5,
            marginHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <Icon
            name={m.icon}
            size={28}
            color={
              listenRoute === m.url
                ? theme.colors.background
                : theme.colors.darkTint
            }
          />
          <Text
            style={{
              fontSize: 16,
              color:
                listenRoute === m.url
                  ? theme.colors.background
                  : theme.colors.darkTint,
              fontWeight: '600',
              marginLeft: 20,
            }}>
            {m.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Menu;

interface MenuProps {
  navigation?: any;
  active_shift?: active_shift;
  listenRoute?: string;
  EndShift?: any;
}
