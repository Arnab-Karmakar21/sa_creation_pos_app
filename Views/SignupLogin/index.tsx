import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './Signup';
import Login from './Login';
import SignupDetails from './SignupDetails';
const Stack = createNativeStackNavigator();
const SignupLogin = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'login'}>
      <Stack.Screen name="signupdetails" component={SignupDetails}/>
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

export default SignupLogin;
