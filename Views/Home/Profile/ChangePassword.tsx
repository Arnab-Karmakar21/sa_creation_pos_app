import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import React, {Component, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../Theme/LightTheme';
import QubeTextInput from '../../../UILibrary/QubeTextInput';
import QubeButton from '../../../UILibrary/QubeButton';
import globalStyles from '../../../GlobalStyle';
import {color} from '@rneui/base';
import {useForm} from 'react-hook-form';
import {requiredValidator} from '../../../Validators';
import {ChangePasswordPayload} from '../../../models/UserModel';

const ChangePassword = ({onSubmit}: ChangePasswordProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<any>({
    mode: 'all',
  });
  const theme: ThemeItem = Object(useTheme());
  const passwordRef = useRef();
  const setPasswordRef = (ref: any) => {
    passwordRef.current = ref;
  };
  const styles = StyleSheet.create({
    formContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      paddingTop: '5%',
      paddingBottom: '3%',
      paddingLeft: '5%',
      paddingRight: '5%',
      // alignSelf: 'center',
      width: '100%',
      justifyContent: 'center',
    },
  });

  return (
    <ScrollView>
      <View style={[styles.formContainer]}>
        <View style={{alignSelf: 'center', marginTop: '1%'}}>
          <Text style={{fontSize: 18}}>Let's create your new password</Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'column',
            width: '65%',
            alignSelf: 'center',
          }}>
          <QubeTextInput
            rules={{...requiredValidator}}
            name="old_password"
            control={control}
            secureTextEntry={true}
            defaultValue={null}
            placeholder="Current Password"
            refName={register}
            errors={errors}
            refCopy={setPasswordRef}
            label=" Current Password (*)"
          />
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'column',
            width: '65%',
            alignSelf: 'center',
          }}>
          <QubeTextInput
            rules={{...requiredValidator}}
            name="new_password"
            control={control}
            secureTextEntry={true}
            defaultValue={null}
            placeholder="New Password"
            refName={register}
            errors={errors}
            refCopy={setPasswordRef}
            label="New Password (*)"
          />
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'column',
            width: '65%',
            alignSelf: 'center',
          }}>
          <QubeTextInput
            rules={{
              ...requiredValidator,
              validate: (value: string) =>
                value === watch('new_password') || "Passwords Don't Match",
            }}
            name="Confirm password"
            control={control}
            secureTextEntry={true}
            defaultValue={null}
            placeholder=" Confirm Password"
            refName={register}
            errors={errors}
            refCopy={setPasswordRef}
            label=" Confirm Password (*)"
          />
        </View>
        <View style={{marginTop: 35, width: '40%', alignSelf: 'center'}}>
          <QubeButton
            title="Change Password"
            onPress={handleSubmit(onSubmit)}></QubeButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

interface ChangePasswordProps {
  onSubmit: any;
}
