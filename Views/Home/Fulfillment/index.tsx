import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FulfillmentList from './FulfillmentList';
import FulfillmentDetail from './FulfillmentDetail';
import StockCreate from './StockCreate';
import BrandAdd from '../Store/BrandAdd';
const Stack = createNativeStackNavigator();
const Fulfillment = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'fulfillment-list'}>
      <Stack.Screen name="fulfillment-list" component={FulfillmentList} />
      <Stack.Screen name="fulfillment-detail" component={FulfillmentDetail} />
      <Stack.Screen name="stock-create" component={StockCreate} />
      <Stack.Screen name="brandadd" component={BrandAdd} />
    </Stack.Navigator>
  );
};

export default Fulfillment;
