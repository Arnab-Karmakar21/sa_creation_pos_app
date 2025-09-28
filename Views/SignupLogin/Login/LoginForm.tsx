import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {Component, useRef, useState} from 'react';
import globalStyles from '../../../GlobalStyle';
import {useTheme} from '@react-navigation/native';
import QubeButton from '../../../UILibrary/QubeButton';
import QubeTextInput from '../../../UILibrary/QubeTextInput';
import {useForm} from 'react-hook-form';
import {LoginPayload} from '../../../Models/AuthenticationModels';
import {phoneValidator, requiredValidator} from '../../../Validators';
import ForgotPasswordPopover from './ForgotPaaswordPopover';
import CredentialsModal from './CredentialsModal';

const LoginForm = ({
  onSignUpClick,
  onSubmit,
  generateOtp,
  changePassword,
}: any) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginPayload>({
    mode: 'all',
  });

  const theme = Object(useTheme());
  const passwordRef = useRef();
  const [firstModal, setFirstModal] = useState<boolean>(false);
  const [secondModal, setSecondModal] = useState<boolean>(false);
  const setPasswordRef = (ref: any) => {
    passwordRef.current = ref;
  };
  const openCredentialsModal = () => {
    setFirstModal(false);
    setSecondModal(true);
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
    headerText: {
      fontSize: 45,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
    },
    headerSubText: {
      fontSize: 20,
      color: theme.colors.primary,
    },
  });
  return (
    <ScrollView>
      <View style={[styles.formContainer]}>
        <ForgotPasswordPopover
          flag={firstModal}
          Setflag={setFirstModal}
          onGenerateCode={generateOtp}
          onClose={openCredentialsModal}
        />
        <CredentialsModal
          flag={secondModal}
          Setflag={setSecondModal}
          changePassword={changePassword}
        />
        <View style={{alignSelf: 'center', marginTop: '15%'}}>
          <View>
            <Image
              source={require('../../../Assets/sa_logo.png')}
              style={{height: 150, width: 150, alignSelf: 'center'}}></Image>
          </View>
          {/* <Text
            style={[
              styles.headerText,
              globalStyles.fontFamily,
              {textAlign: 'center'},
            ]}>
            Welcome,
          </Text> */}
          <Text style={[styles.headerSubText, globalStyles.fontFamily]}>
            Please Sign In To Continue!
          </Text>
        </View>
        <View style={{marginTop: 20, flexDirection: 'column', width: '100%'}}>
          <QubeTextInput
            rules={{...requiredValidator}}
            name="username"
            control={control}
            defaultValue={null}
            placeholder="Enter Phone Number"
            refName={register}
            errors={errors}
            keyboardType="number-pad"
            nextRef={passwordRef.current}
            blurOnSubmit={false}
            label="Phone Number (*)"
            maxLength={10}
          />
        </View>
        <View style={{marginTop: 20, flexDirection: 'column', width: '100%'}}>
          <QubeTextInput
            rules={{...requiredValidator}}
            name="password"
            control={control}
            secureTextEntry={true}
            defaultValue={null}
            placeholder="Enter Your Password"
            refName={register}
            errors={errors}
            refCopy={setPasswordRef}
            submitAction={handleSubmit(onSubmit)}
            label="Password (*)"
          />
        </View>
        <View style={{marginTop: 35}}>
          <QubeButton
            onPress={handleSubmit(onSubmit)}
            title="Login"
            disabled={!!errors.username || !!errors.password}></QubeButton>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text
              style={[
                {
                  color: theme.colors.darkTint,
                  fontSize: theme.fonts.mediumFont,
                },
                globalStyles.fontFamily,
              ]}>
              Don't Have An Account?
            </Text>
            <TouchableOpacity onPress={onSignUpClick}>
              <Text
                style={[
                  {
                    color: theme.colors.primary,
                    fontWeight: 'bold',
                    fontSize: theme.fonts.mediumFont,
                    paddingLeft: 4,
                  },
                  globalStyles.fontFamily,
                ]}>
                Sign Up Here
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setFirstModal(true)}>
            <Text
              style={[
                {
                  color: theme.colors.darkTint,
                  alignSelf: 'flex-end',
                  fontSize: theme.fonts.smallFont,
                },
                globalStyles.fontFamily,
              ]}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginForm;

// export interface LoginFormProps{
//   generateOtp: any;
// }
