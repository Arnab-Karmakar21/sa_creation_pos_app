import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import React, {useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import QubeTextInput from '../../../UILibrary/QubeTextInput';
import globalStyles from '../../../GlobalStyle';
import QubeButton from '../../../UILibrary/QubeButton';
import {
  emailValidator,
  phoneValidator,
  requiredSelectValidator,
  requiredValidator,
} from '../../../Validators';
import {useForm} from 'react-hook-form';
import {GenerateCodePayload} from '../../../Models/AuthenticationModels';
import QubeSelect from '../../../UILibrary/QubeSelect';
import LinearGradient from 'react-native-linear-gradient';
import {Card} from '@rneui/base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThemeItem} from '../../../Theme/LightTheme';
const SignupView = ({onSubmit,navigation}: any) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<GenerateCodePayload>({
    mode: 'all',
  });
  const partnerPhoneRef = useRef();
  const setPartnerPhoneRef = (ref: any) => {
    partnerPhoneRef.current = ref;
  };
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    formContainer: {
      paddingTop: 40,
      paddingBottom: '5%',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
    headerText: {
      fontSize: 35,
      fontWeight: 'bold',
      color:theme.colors.primary,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
      textAlign:'center'
    },
    headerSubText: {
      fontSize: 20,
      color: theme.colors.primary,
      textAlign:'center'
    },
    spacingMargin: {
      paddingTop: 20,
      paddingBottom: 20,
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
    upperGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "white",
    },
  });
  return (
    <View style={{flex: 1, flexDirection:"row"}}>
      
      <View style={[{flex: 40}]}>
          <View style={styles.upperGradient}>
            <ImageBackground source={require('../../../Assets/AboutUs.png')} style={{height:"100%",width:"100%",position:"absolute"}}/>
          </View>
      </View>
        <View style={[styles.lowerSection]}>
          <ImageBackground source={require('../../../Assets/bg.png')} style={{height:"100%",width:"100%"}} imageStyle={{opacity:0.4}}>
            <ScrollView>
              <View style={styles.formContainer}>
              <TouchableOpacity 
                style={{width:20}}
                onPress={() => navigation.navigate('login')}
                >
                  <Icon
                    name={'arrow-back-ios'}
                    size={theme.icons.mediumIcon}
                    color={theme.colors.darkTint}
                  />
                </TouchableOpacity>
                <View >
                    <Image source={require('../../../Assets/sa_logo.png')} style={{height:150,width:150,alignSelf:"center"}}></Image>
                </View>
                <View style={[{alignSelf: 'center'}]}>
                  {/* <Text style={[styles.headerText, globalStyles.fontFamily]}>
                    Create Account
                  </Text> */}
                  <Text style={[styles.headerSubText, globalStyles.fontFamily]}>
                    Sign Up To Get Started!
                  </Text>
                </View>
                <View style={{marginTop:20}}>
                  <QubeTextInput
                    rules={{...emailValidator}}
                    name="partner_email"
                    control={control}
                    defaultValue={''}
                    placeholder="Enter Your Email ID"
                    refName={register}
                    errors={errors}
                    keyboardType="email-address"
                    nextRef={partnerPhoneRef.current}
                    blurOnSubmit={false}
                    label="Email ID"
                  />
                </View>
                <View style={{marginTop:15}}>
                  <QubeTextInput
                    rules={{...requiredValidator, ...phoneValidator}}
                    name="partner_phone"
                    control={control}
                    defaultValue={null}
                    placeholder="Enter Your Phone Number"
                    refName={register}
                    errors={errors}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    refCopy={setPartnerPhoneRef}
                    label="Phone Number (*)"
                  />
                </View>
                <View style={{marginTop: 40}}>
                  <QubeButton
                    onPress={handleSubmit(onSubmit)}
                    title="Sign Up"
                    disabled={
                      !!errors.partner_email || !!errors.partner_phone
                    }></QubeButton>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
        </View>
  );
};

export default SignupView;
