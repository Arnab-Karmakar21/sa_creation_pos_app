import {View, Text} from 'react-native';
import React from 'react';
import WishListList from './WishListList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WishListAdd from './WishListAdd';
const Stack = createNativeStackNavigator();
const WishList = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'wish-list-list'}>
      <Stack.Screen name="wish-list-list" component={WishListList} />
      <Stack.Screen name="wish-list-add" component={WishListAdd} />
    </Stack.Navigator>
  );
};

export default WishList;
