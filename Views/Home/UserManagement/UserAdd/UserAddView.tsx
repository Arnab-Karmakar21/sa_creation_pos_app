import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import globalStyles from '../../../../GlobalStyle';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import {
  decimalValidator,
  maxLengthValidator,
  pincodeValidator,
  requiredSelectValidator,
  requiredValidator,
} from '../../../../Validators';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import QubeSelect from '../../../../UILibrary/QubeSelect';
import QubeButton from '../../../../UILibrary/QubeButton';
import {DistrictItem} from '../../../../models/DomainModels';
import {CheckBox} from '@rneui/base';
import moment from 'moment';
import QubeInputPicture from '../../../../UILibrary/QubeInputPicture';
import QubeLocationInput from '../../../../UILibrary/QubeLocationInput';
import {SafeAreaFrameContext} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CreateUserPayload} from '../../../../models/UserManagementModel';

const UserAddView = ({
  stores,
  roles,
  districts,
  cities,
  states,
  entity,
  countries,
  navigation,
  onAddUserAction,
  onRoleLoad,
}: any) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<any>({
    mode: 'all',
  });
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    lowerSection: {
      backgroundColor: theme.colors.background,
      flex: 40,
      //borderTopLeftRadius: theme.roundness.bigRoundness,
      //borderTopRightRadius: theme.roundness.bigRoundness,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      padding: 15,
    },
    upperGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
    },
    headerSubText: {
      marginTop: '15%',
      marginBottom: 6,
      fontSize: 19,
      color: theme.colors.primary,
    },
    spacingMargin: {
      paddingVertical: 10,
    },
    formContainer: {
      paddingBottom: 15,
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  });

  const onSubmit = (data: CreateUserPayload) => {
    onAddUserAction(data);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={[{flex: 40}]}>
        <View style={[styles.upperGradient, {flexDirection: 'column'}]}>
          <ImageBackground
            source={require('../../../../Assets/userAdd.jpg')}
            style={{height: '100%', width: '100%'}}
            resizeMode="cover">
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.primary,
                width: 160,
                margin: 40,
                marginTop: '10%',
              }}>
              <Text
                style={[
                  styles.headerText,
                  globalStyles.fontFamily,
                  {opacity: 0.9},
                ]}>
                ADD USER
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={[styles.lowerSection]}>
        <ScrollView>
          <View style={[styles.formContainer]}>
            <View
              style={[
                {flexDirection: 'row', width: '100%'},
                styles.spacingMargin,
              ]}>
              <View
                style={{
                  width: '60%',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.primary,
                }}>
                <TouchableOpacity
                  style={{width: 20, marginTop: '3%'}}
                  onPress={() => navigation.navigate('user-list')}>
                  <Icon
                    name={'arrow-back-ios'}
                    size={theme.icons.mediumIcon}
                    color={theme.colors.darkTint}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.headerSubText,
                    globalStyles.fontFamily,
                    {marginTop: 8},
                  ]}>
                  Please Enter Your User Information Below!
                </Text>
              </View>
              <View style={{width: '40%'}}>
                <Image
                  source={require('../../../../Assets/sa_logo.png')}
                  style={{
                    height: 100,
                    width: 100,
                    alignSelf: 'flex-end',
                    position: 'absolute',
                  }}></Image>
              </View>
            </View>

            {/* <View style={styles.spacingMargin}>
                <QubeTextInput
                rules={{...requiredValidator}}
                name="user_name"
                control={control}
                defaultValue={null}
                placeholder="Enter Your Username"
                refName={register}
                errors={errors}
                label="Username (*)"
            />
         </View>
         <View style={styles.spacingMargin}>
               <QubeTextInput
                 rules={{...requiredValidator}}
                    name="password"
                    control={control}
                    defaultValue={null}
                    placeholder="Enter Your Password"
                    refName={register}
                    errors={errors}
                    label="Password(*)"
                />
            </View> */}
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="firstname"
                control={control}
                defaultValue={null}
                placeholder="Enter Your First Name"
                refName={register}
                errors={errors}
                label="Firstname(*)"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="lastname"
                control={control}
                defaultValue={null}
                placeholder="Enter Your Last Name"
                refName={register}
                errors={errors}
                label="Lastname(*)"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeSelect
                rules={{...requiredSelectValidator}}
                name="entity_type"
                control={control}
                defaultValue={null}
                placeholder="Select Your Entity"
                refName={register}
                errors={errors}
                items={entity}
                valueKey="entity_type"
                labelKey="entity_type_name"
                label="Entity (*)"
                onSelection={(id: any) =>
                  onRoleLoad({entity_type: +id})
                }></QubeSelect>
            </View>
            {!!watch('entity_type') && +watch('entity_type') === 5 && (
              <View style={styles.spacingMargin}>
                <QubeSelect
                  rules={{...requiredSelectValidator}}
                  name="entity_id"
                  control={control}
                  defaultValue={null}
                  placeholder="Select Your Store"
                  refName={register}
                  errors={errors}
                  items={stores}
                  valueKey="store_id"
                  labelKey="store_name"
                  label="Store (*)"></QubeSelect>
              </View>
            )}
            <View style={styles.spacingMargin}>
              <QubeSelect
                rules={{...requiredSelectValidator}}
                name="role_id"
                control={control}
                defaultValue={null}
                placeholder="Select Your Role"
                refName={register}
                errors={errors}
                items={roles}
                valueKey="admn_role_id"
                labelKey="role_name"
                label="Roles (*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="email_id"
                control={control}
                defaultValue={null}
                placeholder="Enter Your Email"
                refName={register}
                errors={errors}
                label="Email(*)"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="contact_phone"
                control={control}
                defaultValue={null}
                placeholder="Enter Your Contact Phone"
                refName={register}
                errors={errors}
                label="Contact Phone(*)"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="addressline1"
                control={control}
                defaultValue={null}
                placeholder="Enter Your Address"
                refName={register}
                errors={errors}
                label="Address Line 1(*)"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="addressline2"
                control={control}
                defaultValue={null}
                placeholder="Enter Your Address"
                refName={register}
                errors={errors}
                label="Address Line 2(*)"
              />
            </View>
            <View style={styles.spacingMargin}>
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
                label="State (*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
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
                label="Country (*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="pin"
                control={control}
                defaultValue={null}
                placeholder="Enter Your Pin"
                refName={register}
                errors={errors}
                label="Pin(*)"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="city"
                control={control}
                defaultValue={null}
                placeholder="Enter Your City"
                refName={register}
                errors={errors}
                label="City(*)"
              />
            </View>
            <View style={styles.spacingMargin}>
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
                label="District (*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
              <QubeButton
                title="Submit"
                onPress={handleSubmit(onSubmit)}></QubeButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UserAddView;
