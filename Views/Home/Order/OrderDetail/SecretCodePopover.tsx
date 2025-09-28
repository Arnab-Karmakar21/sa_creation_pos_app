import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import QubeButton from '../../../../UILibrary/QubeButton';
import Modal from 'react-native-modal';
import {useForm} from 'react-hook-form';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import {requiredValidator} from '../../../../Validators';
import {TextInput} from 'react-native-gesture-handler';
const SecretCodePopover = ({
  flag,
  Setflag,
  onUpdateItem,
}: SecretCodePopoverProps) => {
  const [otp, setOtp] = useState<string>('');
  const theme: ThemeItem = Object(useTheme());
  const onSubmit = (otp: any) => {
    onUpdateItem(otp);
  };
  useEffect(() => {
    setOtp('');
  }, [flag]);
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
            Enter Secret Code
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.colors.placeholderText,
              marginVertical: 20,
            }}>
            <TextInput
              placeholder="Enter secret key"
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
              onPress={() => onSubmit(otp)}
              title="Submit"></QubeButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SecretCodePopover;

interface SecretCodePopoverProps {
  flag: boolean;
  Setflag?: any;
  onUpdateItem: any;
}
