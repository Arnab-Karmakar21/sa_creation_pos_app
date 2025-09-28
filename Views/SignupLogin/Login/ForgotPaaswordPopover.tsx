import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {useForm} from 'react-hook-form';
import {ThemeItem} from '../../../Theme/LightTheme';
import QubeButton from '../../../UILibrary/QubeButton';

const ForgotPasswordPopover = ({
  flag,
  Setflag,
  onGenerateCode,
  onClose,
}: ForgotPasswordPopoverProps) => {
  const [mobile, setMobile] = useState<string>('');
  const theme: ThemeItem = Object(useTheme());

  useEffect(() => {
    setMobile('');
  }, [flag]);

  const onSubmit = (mobile: any) => {
    onGenerateCode(mobile);
    onClose();
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
            Reset Your Password
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.colors.placeholderText,
              marginVertical: 20,
            }}>
            <TextInput
              placeholder="Enter mobile no"
              style={{fontSize: theme.fonts.mediumFont}}
              value={mobile}
              keyboardType="number-pad"
              onChangeText={setMobile}></TextInput>
          </View>
        </View>
        <View style={{padding: 10}}>
          <View style={{padding: 10}}>
            <QubeButton
              disabled={!mobile || mobile == ''}
              color={'primary'}
              onPress={() => onSubmit(mobile)}
              title="Generate OTP"></QubeButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ForgotPasswordPopover;

interface ForgotPasswordPopoverProps {
  flag: boolean;
  Setflag?: any;
  onGenerateCode: any;
  onClose: any;
}
