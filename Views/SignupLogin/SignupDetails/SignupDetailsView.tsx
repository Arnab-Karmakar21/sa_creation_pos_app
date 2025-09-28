import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {SignUpPayload} from '../../../Models/AuthenticationModels';
import {useTheme} from '@react-navigation/native';
import QubeTextInput from '../../../UILibrary/QubeTextInput';
import {
  requiredValidator,
  maxLengthValidator,
  pincodeValidator,
  requiredSelectValidator,
} from '../../../Validators';
import QubeButton from '../../../UILibrary/QubeButton';
import QubeSelect from '../../../UILibrary/QubeSelect';
import globalStyles from '../../../GlobalStyle';
import {Card, Icon} from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';

const SignupDetailsView = ({
  onSubmit,
  onNewSignUp,
  cities,
  states,
  countries,
  districts,
  navigation,
}: any) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<SignUpPayload>({
    mode: 'all',
  });
  const theme = Object(useTheme());
  const styles = StyleSheet.create({
    formContainer: {
      alignSelf: 'center',
      width: '90%',
      paddingTop: 40,
      paddingBottom: '5%',
      paddingLeft: '5%',
      paddingRight: '5%',
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
      fontSize: 18,
      color: theme.colors.darkTint,
    },
    spacingMargin: {
      paddingTop: 10,
      paddingBottom: 10,
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
      backgroundColor: 'white',
    },
  });

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const designationRef = useRef();
  const addressLine1Ref = useRef();
  const addressLine2Ref = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const companyNameRef = useRef();
  const billingNameRef = useRef();
  const city_idRef = useRef();
  const gstRef = useRef();
  const panRef = useRef();
  const accountHolderRef = useRef();
  const accountNoRef = useRef();
  const ifscCodeRef = useRef();
  const bankNameRef = useRef();

  const setFirstNameRef = (ref: any) => {
    firstNameRef.current = ref;
  };
  const setCity = (ref: any) => {
    city_idRef.current = ref;
  };
  const setLastNameRef = (ref: any) => {
    lastNameRef.current = ref;
  };
  const setDesignationRef = (ref: any) => {
    designationRef.current = ref;
  };
  const setAddressLine1Ref = (ref: any) => {
    addressLine1Ref.current = ref;
  };
  const setAddressLine2Ref = (ref: any) => {
    addressLine2Ref.current = ref;
  };
  const setPasswordRef = (ref: any) => {
    passwordRef.current = ref;
  };
  const setConfirmPasswordRef = (ref: any) => {
    confirmPasswordRef.current = ref;
  };
  const setCompanyNameRef = (ref: any) => {
    companyNameRef.current = ref;
  };
  const setBillingNameRef = (ref: any) => {
    billingNameRef.current = ref;
  };
  const setGstRef = (ref: any) => {
    gstRef.current = ref;
  };
  const setPanRef = (ref: any) => {
    panRef.current = ref;
  };
  const setAccountHolderRef = (ref: any) => {
    accountHolderRef.current = ref;
  };
  const setAccountNoRef = (ref: any) => {
    accountNoRef.current = ref;
  };
  const setIfscCodeRef = (ref: any) => {
    ifscCodeRef.current = ref;
  };
  const setBankNameRef = (ref: any) => {
    bankNameRef.current = ref;
  };

  return (
    <ScrollView>
      <View style={{}}>
        <View style={[styles.lowerSection]}>
          <ImageBackground
            source={require('../../../Assets/bg5.jpg')}
            style={{height: '100%', width: '100%'}}
            imageStyle={{opacity: 0.5}}>
            <View style={styles.formContainer}>
              <TouchableOpacity
                style={{width: 20}}
                onPress={() => navigation.navigate('signup')}>
                <Icon
                  name={'arrow-back-ios'}
                  size={theme.icons.mediumIcon}
                  color={theme.colors.darkTint}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View
                  style={[
                    {alignSelf: 'flex-start', marginBottom: 10},
                    styles.spacingMargin,
                  ]}>
                  <Text style={[styles.headerText, globalStyles.fontFamily]}>
                    Complete Your Info...
                  </Text>
                  <Text style={[styles.headerSubText, globalStyles.fontFamily]}>
                    Sign Up Code has been sent to you via SMS!
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Image
                    source={require('../../../Assets/sa_logo.png')}
                    style={{
                      height: 130,
                      width: 130,
                      marginTop: -30,
                      alignSelf: 'flex-end',
                      position: 'absolute',
                    }}></Image>
                </View>
              </View>
              <View
                style={[
                  styles.spacingMargin,
                  {flexDirection: 'row', width: '100%'},
                ]}>
                <QubeTextInput
                  rules={{...requiredValidator}}
                  name="partner_code"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your Sign Up Code"
                  refName={register}
                  errors={errors}
                  nextRef={firstNameRef.current}
                  blurOnSubmit={false}
                  label="Code (*)"
                  style={{width: '50%', marginRight: 10}}
                />

                <QubeTextInput
                  rules={{...requiredValidator}}
                  name="company_name"
                  control={control}
                  defaultValue={null}
                  placeholder="Marketing Sangha Name"
                  refName={register}
                  errors={errors}
                  refCopy={setCompanyNameRef}
                  nextRef={billingNameRef.current}
                  blurOnSubmit={false}
                  label="Marketing Sangha Name (*)"
                  style={{width: '49%'}}
                />
              </View>
              <View
                style={[
                  styles.spacingMargin,
                  {flexDirection: 'row', width: '100%'},
                ]}>
                <QubeTextInput
                  rules={{...requiredValidator, ...maxLengthValidator(100)}}
                  name="firstname"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your First Name"
                  refName={register}
                  errors={errors}
                  refCopy={setFirstNameRef}
                  nextRef={lastNameRef.current}
                  blurOnSubmit={false}
                  label="First Name (*)"
                  style={{width: '50%', marginRight: 10}}
                />

                <QubeTextInput
                  rules={{...requiredValidator, ...maxLengthValidator(100)}}
                  name="lastname"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your Last Name"
                  refName={register}
                  errors={errors}
                  refCopy={setLastNameRef}
                  nextRef={designationRef.current}
                  blurOnSubmit={false}
                  label="Last Name (*)"
                  style={{width: '49%'}}
                />
              </View>
              <View style={styles.spacingMargin}>
                <QubeTextInput
                  rules={{...requiredValidator, ...maxLengthValidator(100)}}
                  name="designation"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your Designation"
                  refName={register}
                  errors={errors}
                  refCopy={setDesignationRef}
                  nextRef={addressLine1Ref.current}
                  blurOnSubmit={false}
                  label="Designation (*)"
                  style={{}}
                />
              </View>
              <View style={styles.spacingMargin}>
                <QubeTextInput
                  rules={{...requiredValidator, ...maxLengthValidator(100)}}
                  name="addressline1"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your Address Line 1"
                  refName={register}
                  errors={errors}
                  refCopy={setAddressLine1Ref}
                  nextRef={addressLine2Ref.current}
                  blurOnSubmit={false}
                  label="Address Line 1 (*)"
                />
              </View>
              <View style={styles.spacingMargin}>
                <QubeTextInput
                  rules={{...maxLengthValidator(60)}}
                  name="addressline2"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your Address Line 2"
                  refName={register}
                  errors={errors}
                  refCopy={setAddressLine2Ref}
                  label="Address Line 2"
                />
              </View>
              <View
                style={[
                  styles.spacingMargin,
                  {flexDirection: 'row', width: '100%'},
                ]}>
                <QubeTextInput
                  rules={{...requiredValidator, ...maxLengthValidator(20)}}
                  name="city_id"
                  control={control}
                  defaultValue={null}
                  placeholder="Select Your City / Block"
                  refName={register}
                  refCopy={setCity}
                  errors={errors}
                  // items={citie
                  // valueKey="city_id"
                  // labelKey="city_name"
                  label="City / Block (*)"
                  style={{width: '50%', marginRight: 10}}></QubeTextInput>

                <QubeSelect
                  rules={{...requiredSelectValidator}}
                  name="district_id"
                  control={control}
                  defaultValue={null}
                  placeholder="Select Your District"
                  refName={register}
                  errors={errors}
                  items={districts}
                  valueKey="district_id"
                  labelKey="district_name"
                  label="District (*)"
                  style={{width: '49%'}}></QubeSelect>
              </View>

              <View
                style={[
                  styles.spacingMargin,
                  {flexDirection: 'row', width: '100%'},
                ]}>
                <QubeSelect
                  rules={{...requiredSelectValidator}}
                  name="state_id"
                  control={control}
                  defaultValue={null}
                  placeholder="Select Your State"
                  refName={register}
                  errors={errors}
                  items={states}
                  valueKey="states_id"
                  labelKey="states_name"
                  label="State (*)"
                  style={{width: '33%', marginRight: 10}}></QubeSelect>

                <QubeSelect
                  rules={{...requiredSelectValidator}}
                  name="country_id"
                  control={control}
                  defaultValue={null}
                  placeholder="Select Your Country"
                  refName={register}
                  errors={errors}
                  items={countries}
                  valueKey="countries_id"
                  labelKey="countries_name"
                  label="Country (*)"
                  style={{width: '33%', marginRight: 10}}></QubeSelect>

                <QubeTextInput
                  rules={{...requiredValidator, ...pincodeValidator}}
                  name="pin"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your Pincode"
                  refName={register}
                  errors={errors}
                  nextRef={passwordRef.current}
                  blurOnSubmit={false}
                  keyboardType="number-pad"
                  label="Pincode (*)"
                  style={{width: '32%'}}
                />
              </View>
              <View
                style={[
                  styles.spacingMargin,
                  {flexDirection: 'row', width: '100%'},
                ]}>
                <QubeTextInput
                  rules={{...requiredValidator}}
                  name="password"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your Password"
                  refName={register}
                  errors={errors}
                  secureTextEntry={true}
                  refCopy={setPasswordRef}
                  nextRef={confirmPasswordRef.current}
                  blurOnSubmit={false}
                  label="Password (*)"
                  style={{width: '50%', marginRight: 10}}
                />
                <QubeTextInput
                  rules={{
                    ...requiredValidator,
                    validate: (value: string) =>
                      value === watch('password') || "Passwords Don't Match",
                  }}
                  name="confirm_password"
                  control={control}
                  defaultValue={null}
                  placeholder="Confirm Your Password"
                  refName={register}
                  errors={errors}
                  secureTextEntry={true}
                  refCopy={setConfirmPasswordRef}
                  nextRef={companyNameRef.current}
                  blurOnSubmit={false}
                  label="Confirm Password (*)"
                  style={{width: '49%'}}
                />
              </View>
              <View style={styles.spacingMargin}>
                <QubeTextInput
                  rules={{...requiredValidator}}
                  name="billing_name"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Your Billing Name"
                  refName={register}
                  errors={errors}
                  refCopy={setBillingNameRef}
                  nextRef={gstRef.current}
                  blurOnSubmit={false}
                  label="Billing Name (*)"
                />
              </View>
              <View style={styles.spacingMargin}>
                <QubeTextInput
                  name="gst_numbers"
                  control={control}
                  defaultValue={''}
                  placeholder="Enter Your GST Number"
                  refName={register}
                  errors={errors}
                  refCopy={setGstRef}
                  nextRef={panRef.current}
                  blurOnSubmit={false}
                  autoCapitalize="characters"
                  label="GST"
                />
              </View>
              <View style={styles.spacingMargin}>
                <QubeTextInput
                  name="pan"
                  control={control}
                  defaultValue={''}
                  placeholder="Enter Your PAN Number"
                  refName={register}
                  errors={errors}
                  refCopy={setPanRef}
                  nextRef={accountHolderRef.current}
                  blurOnSubmit={false}
                  autoCapitalize="characters"
                  label="PAN"
                />
              </View>
              <View
                style={[
                  styles.spacingMargin,
                  {flexDirection: 'row', width: '100%'},
                ]}>
                <QubeTextInput
                  name="account_holder_name"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Account Holder Name"
                  refName={register}
                  errors={errors}
                  refCopy={setAccountHolderRef}
                  nextRef={accountNoRef.current}
                  blurOnSubmit={false}
                  label="Account Holder Name"
                  style={{width: '50%', marginRight: 10}}
                />
                <QubeTextInput
                  name="account_no"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Account Number"
                  refName={register}
                  errors={errors}
                  refCopy={setAccountNoRef}
                  nextRef={ifscCodeRef.current}
                  blurOnSubmit={false}
                  label="Account Number"
                  style={{width: '49%'}}
                />
              </View>
              <View style={styles.spacingMargin}>
                <QubeTextInput
                  name="ifsc_code"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter IFSC Code"
                  refName={register}
                  errors={errors}
                  refCopy={setIfscCodeRef}
                  nextRef={bankNameRef.current}
                  blurOnSubmit={false}
                  label="IFSC Code"
                  submitAction={handleSubmit(onSubmit)}
                />
              </View>
              <View style={[styles.spacingMargin, {marginBottom: 40}]}>
                <QubeTextInput
                  name="bank_name"
                  control={control}
                  defaultValue={null}
                  placeholder="Enter Bank Name"
                  refName={register}
                  errors={errors}
                  refCopy={setBankNameRef}
                  label="Bank Name"
                  submitAction={handleSubmit(onSubmit)}
                />
              </View>
              <View style={styles.spacingMargin}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{marginRight: 10, width: '50%'}}>
                    <QubeButton
                      onPress={handleSubmit(onSubmit)}
                      title="Submit"
                      disabled={
                        !!errors.addressline1 ||
                        !!errors.addressline2 ||
                        !!errors.billing_name ||
                        !!errors.city_id ||
                        !!errors.company_name ||
                        !!errors.confirm_password ||
                        !!errors.country_id ||
                        !!errors.designation ||
                        !!errors.firstname ||
                        !!errors.gst_numbers ||
                        !!errors.lastname ||
                        !!errors.pan ||
                        !!errors.partner_code ||
                        !!errors.password ||
                        !!errors.pin ||
                        !!errors.state_id
                      }></QubeButton>
                  </View>
                  <View style={{width: '49%'}}>
                    <QubeButton
                      onPress={onNewSignUp}
                      title="Sign Up With Different Email Or Phone"
                      color="secondary"></QubeButton>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupDetailsView;
