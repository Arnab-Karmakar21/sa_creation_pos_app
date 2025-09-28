import {View, Text, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../Theme/LightTheme';
import QubeButton from '../../../UILibrary/QubeButton';

const CredentialsModal = ({
  flag,
  Setflag,
  changePassword,
}: CredentialsModalProps) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const theme: ThemeItem = Object(useTheme());

  useEffect(() => {
    setNewPassword('');
    setOtp('');
  }, [flag]);

  const onSubmit = (newPassword: string, otp: string) => {
    changePassword(newPassword, otp);
  };
  return (
    <Modal
      style={{
        width: '30%',
        position: 'absolute',
        top: '30%',
        left: '30%',
        zIndex: 2,
      }}
      testID={'modal'}
      onBackdropPress={() => Setflag(false)}
      isVisible={flag}>
      <View
        style={{
          backgroundColor: '#ffff',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
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
            Enter New Credentials
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.colors.placeholderText,
              marginVertical: 20,
            }}>
            <TextInput
              placeholder="Enter new password"
              style={{fontSize: theme.fonts.mediumFont}}
              value={newPassword}
              onChangeText={setNewPassword}></TextInput>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.colors.placeholderText,
              marginVertical: 20,
            }}>
            <TextInput
              placeholder="Enter OTP"
              style={{fontSize: theme.fonts.mediumFont}}
              value={otp}
              keyboardType="number-pad"
              onChangeText={setOtp}></TextInput>
          </View>
        </View>
        <View style={{padding: 10}}>
          <View style={{padding: 10}}>
            <QubeButton
              color={'primary'}
              onPress={() => onSubmit(newPassword, otp)}
              title="Change Password"></QubeButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CredentialsModal;

interface CredentialsModalProps {
  flag: boolean;
  Setflag?: any;
  changePassword: any;
}
