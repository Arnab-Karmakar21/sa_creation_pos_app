import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import LoginForm from './LoginForm';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../Assets/Logo.svg';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {Image} from '@rneui/base';
import ForgotPasswordPopover from './ForgotPaaswordPopover';

const LoginView = ({
  onSignUpClick,
  onSubmit,
  generateOtp,
  changePassword,
}: any) => {
  const theme = Object(useTheme());
  const [keyboardShowing, setKeyboardShowing] = useState(false);
  const [flag, setflag] = useState<boolean>(true);

  const styles = StyleSheet.create({
    logoSection: {
      backgroundColor: 'white',
      width: '25%',
      borderRadius: 10,
    },
    logo: {
      // maxHeight: '80%',
      // maxWidth: '80%',
      color: theme.colors.text,
      fontWeight: '500',
      fontSize: 40,
      alignSelf: 'center',
    },
    upperGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    lowerSection: {
      backgroundColor: theme.colors.background,
      flex: 40,
      // borderTopLeftRadius: theme.roundness.bigRoundness,
      // borderTopRightRadius: theme.roundness.bigRoundness,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      setKeyboardShowing(false);
      Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardShowing(true);
      });

      Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardShowing(false);
      });

      return () => {
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');
      };
    }, []),
  );

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={[{flex: 40}]}>
        <View style={[styles.upperGradient]}>
          <ImageBackground
            source={require('../../../Assets/Banner.png')}
            style={{height: '100%', width: '100%', position: 'absolute'}}
          />
        </View>
      </View>
      <View style={[styles.lowerSection]}>
        <ImageBackground
          source={require('../../../Assets/bg.png')}
          style={{height: '100%', width: '100%'}}
          imageStyle={{opacity: 0.4}}>
          <LoginForm
            onSubmit={onSubmit}
            onSignUpClick={onSignUpClick}
            generateOtp={generateOtp}
            changePassword={changePassword}></LoginForm>
        </ImageBackground>
      </View>
    </View>
  );
};

export default LoginView;
