/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import MainRoute from './Views';
import LightTheme from './Theme/LightTheme';
import ConfigureStore from './Store/configureStore';
import SpinnerView from './UILibrary/spinnerView';
import Toast from 'react-native-toast-message';
import {LoginSuccessAction} from './Store/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeGenerator from './UILibrary/QRCodeGenerator';

function App(): JSX.Element {
  const store = ConfigureStore();
  useEffect(() => {
    const retrieveUserData = async () => {
      let userData = await AsyncStorage.getItem('userData');
      if (!!userData) {
        store.dispatch(LoginSuccessAction(JSON.parse(userData)));
      }
    };
    retrieveUserData();
  }, []);
  return (
    <StoreProvider store={store}>
      <NavigationContainer theme={LightTheme}>
        <MainRoute />
        <SpinnerView></SpinnerView>
        <Toast />
        <QRCodeGenerator />
      </NavigationContainer>
    </StoreProvider>
  );
}
export default App;
