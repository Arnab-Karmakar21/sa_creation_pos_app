import { View, Text } from 'react-native'
import React from 'react'
import { ThemeItem } from '../../../Theme/LightTheme';
import { useTheme } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderDetails from './OrderDetail';
import OrderLists from './OrderList';

const orderNav = createNativeStackNavigator();
const Order = () => {
    const theme: ThemeItem = Object(useTheme());
    return (
      <orderNav.Navigator
        screenOptions={{
          headerShown: false }}
          initialRouteName={'orderlist'}
        >
        <orderNav.Screen name="orderlist" component={OrderLists} />
        <orderNav.Screen name="orderdetail" component={OrderDetails} />
      </orderNav.Navigator>
    );
}

export default Order;