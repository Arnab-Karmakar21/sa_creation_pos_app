import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BrandAdd from './BrandAdd';
import StockAdd from './StockAdd';
import StockModify from './StockModify';
import StoreAdd from './StoreAdd';
import StoreDetails from './StoreDetails';
import StoreEdit from './StoreEdit';
import StoreInventory from './StoreInventory';
import StoreList from './StoreList';
import ProductEdit from './ProductEdit';
const Stack = createNativeStackNavigator();
const Stores = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'store_list'}>
      <Stack.Screen name="store_list" component={StoreList} />
      <Stack.Screen name="storeadd" component={StoreAdd} />
      <Stack.Screen name="storeedit" component={StoreEdit} />
      <Stack.Screen name="storedetails" component={StoreDetails} />
      <Stack.Screen name="storeinventory" component={StoreInventory} />
      <Stack.Screen name="brandadd" component={BrandAdd} />
      <Stack.Screen name="stockadd" component={StockAdd} />
      <Stack.Screen name="stockmodify" component={StockModify} />
      <Stack.Screen name="productedit" component={ProductEdit} />
    </Stack.Navigator>
  );
};

export default Stores;
