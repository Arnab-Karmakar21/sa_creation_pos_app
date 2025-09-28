import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserList from './UserList';
import UserAdd from './UserAdd';
import UserDetails from './UserDetails';
const Stack = createNativeStackNavigator();
const UserManagements = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'user-list'}>
      <Stack.Screen name="user-list" component={UserList} />
      <Stack.Screen name="add-user" component={UserAdd} />
      <Stack.Screen name='user-details' component={UserDetails}/>
    </Stack.Navigator>
  );
};

export default UserManagements;
