import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StoreCreatePayload,
  UnitItem,
  Units,
} from '../../../../Models/StoreModel';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import globalStyles from '../../../../GlobalStyle';
import HeaderStyle1 from '../../../../UILibrary/HeaderStyle1';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import QubeSelect from '../../../../UILibrary/QubeSelect';
import {
  decimalValidator,
  maxLengthValidator,
  numberValidator,
  pincodeValidator,
  requiredSelectValidator,
  requiredValidator,
} from '../../../../Validators';
import QubeButton from '../../../../UILibrary/QubeButton';
import moment from 'moment';
import {
  CityItem,
  CountryItem,
  DistrictItem,
  DomainData,
  StateItem,
} from '../../../../models/DomainModels';
import QubeSwitch from '../../../../UILibrary/QubeSwitch';
import CheckBox from '@react-native-community/checkbox';
import QubeInputPicture from '../../../../UILibrary/QubeInputPicture';
import QubeLocationInput from '../../../../UILibrary/QubeLocationInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Card} from '@rneui/base';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
import {RetrieveImageService_one} from '../../../../Service/S3';

const StoreAddView = ({
  cities,
  states,
  countries,
  storeCategories,
  onStoreAddAction,
  onStoreAddDone,
  pictureData,
  captureClicked,
  uploadClicked,
  districts,
  unit,
  navigation,
  DeleteImage,
  ChangeDefault,
}: StoreAddViewProps) => {
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
  useFocusEffect(
    React.useCallback(() => {
      if (
        states.length == 0 &&
        countries.length == 0 &&
        storeCategories.length == 0 &&
        unit.length == 0 &&
        districts.length == 0
      ) {
        reset();
        SetDays([
          {
            id: 7,
            key: 'Sunday',
            value: false,
          },
          {
            id: 1,
            key: 'Monday',
            value: false,
          },
          {
            id: 2,
            key: 'Tuesday',
            value: false,
          },
          {
            id: 3,
            key: 'Wednesday',
            value: false,
          },
          {
            id: 4,
            key: 'Thursday',
            value: false,
          },
          {
            id: 5,
            key: 'Friday',
            value: false,
          },
          {
            id: 6,
            key: 'Saturday',
            value: false,
          },
        ]);
      }
    }, [onStoreAddDone]),
  );
  const theme: ThemeItem = Object(useTheme());
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [startime, setStartTime] = useState<any>(
    new Date(new Date().setHours(10)).setMinutes(0),
  );
  const [endtime, setEndTime] = useState<any>(
    new Date(new Date().setHours(19)).setMinutes(0),
  );
  const [days, SetDays] = useState<daysProps[]>([
    {
      id: 7,
      key: 'Sunday',
      value: true,
    },
    {
      id: 1,
      key: 'Monday',
      value: true,
    },
    {
      id: 2,
      key: 'Tuesday',
      value: true,
    },
    {
      id: 3,
      key: 'Wednesday',
      value: true,
    },
    {
      id: 4,
      key: 'Thursday',
      value: true,
    },
    {
      id: 5,
      key: 'Friday',
      value: true,
    },
    {
      id: 6,
      key: 'Saturday',
      value: true,
    },
  ]);
  const ChooseDay = (id: number) => {
    let items: daysProps[] = days;
    items = JSON.parse(JSON.stringify(days));
    let selectedItem = items.find(m => m.id == id);
    if (!!selectedItem) {
      selectedItem.value = !selectedItem.value;
    }
    SetDays(items);
  };

  const styles = StyleSheet.create({
    formContainer: {
      paddingBottom: 15,
      paddingLeft: '5%',
      paddingRight: '5%',
    },
    spacingMargin: {
      paddingVertical: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelText: {
      color: theme.colors.primary,
      fontSize: theme.fonts.smallFont,
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
    image: {
      height: '100%',
      width: '100%',
      borderRadius: theme.roundness.mediumRoundness,
    },
  });

  const addressLine2Ref = useRef();
  const setAddressLine2Ref = (ref: any) => {
    addressLine2Ref.current = ref;
  };

  const latitudeRef = useRef();
  const setLatitudeRef = (ref: any) => {
    latitudeRef.current = ref;
  };

  const onSubmit = (data: StoreCreatePayload) => {
    var Opendays: number[] = [];
    days.forEach(m => (m.value ? Opendays.push(m.id) : ''));
    data.store_open_time = new Date(startime);
    data.store_close_time = new Date(endtime);
    data.store_days = Opendays;
    onStoreAddAction(data);
  };
  const SelectedEndDate = (data: any) => {
    setShowTwo(false);
    if (!!data.nativeEvent?.timestamp) {
      setEndTime(new Date(data.nativeEvent.timestamp));
    }
  };
  const SelectedStartDate = (data: any) => {
    setShowOne(false);
    if (!!data.nativeEvent?.timestamp) {
      setStartTime(new Date(data.nativeEvent.timestamp));
    }
  };
  let _renderItem = ({item}: any) => {
    return (
      <View style={{width: '100%'}}>
        <Image
          style={styles.image}
          source={{
            uri: item.thumb_doc_path, 
            // uri: RetrieveImageService_one(item.thumb_doc_path),
          }}></Image>
      </View>
    );
  };
  const UnitSelected = (id: number) => {
    let unist: Units | undefined = unit.find(m => m.unit_master_id === id);
    if (!!unist) {
      setValue('addressline1', unist.addressline1);
      setValue('addressline2', unist.addressline2);
      setValue('city', unist.city);
      setValue('district_id', unist.district_id);
      setValue('state_id', unist.state);
      setValue('country_id', unist.country);
      setValue('pin', unist.pin.toString());
    } else {
      setValue('addressline1', null);
      setValue('addressline2', null);
      setValue('city', null);
      setValue('district_id', null);
      setValue('state_id', null);
      setValue('country_id', null);
      setValue('pin', null);
    }
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={[{flex: 40}]}>
        <View style={[styles.upperGradient, {flexDirection: 'column'}]}>
          <ImageBackground
            source={require('../../../../Assets/store.jpg')}
            style={{height: '100%', width: '100%'}}
            imageStyle={{opacity: pictureData.length > 0 ? 0.3 : 1}}
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
                Create Store
              </Text>
            </View>
            <View>
              <Carousel
                loop
                width={600}
                height={400}
                autoPlay={true}
                data={pictureData}
                mode="parallax"
                scrollAnimationDuration={4000}
                renderItem={_renderItem}
              />
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
                  onPress={() => navigation.navigate('store_list')}>
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
                  Please Enter Your Store's Information Below!
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
            <View style={styles.spacingMargin}></View>
            {showOne && (
              <DateTimePicker
                testID="dateTimePicker"
                value={startime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={date => {
                  SelectedStartDate(date);
                }}
              />
            )}
            {showTwo && (
              <DateTimePicker
                testID="dateTimePicker2"
                value={endtime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={date => {
                  SelectedEndDate(date);
                }}
              />
            )}
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="store_name"
                control={control}
                defaultValue={null}
                placeholder="Enter Your Store's Name"
                refName={register}
                errors={errors}
                label="Store Name (*)"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeSelect
                rules={{...requiredSelectValidator}}
                name="store_category"
                control={control}
                defaultValue={null}
                placeholder="Select Inventory Type"
                refName={register}
                errors={errors}
                items={storeCategories}
                valueKey="domain_code"
                labelKey="domain_value"
                label="Select Inventory Type (*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
              <QubeSelect
                rules={{...requiredSelectValidator}}
                name="unit_id"
                control={control}
                defaultValue={null}
                placeholder="Select unit Name"
                refName={register}
                errors={errors}
                items={unit}
                valueKey="unit_master_id"
                labelKey="unit_name"
                onSelection={UnitSelected}
                label="Unit Name(*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator, ...maxLengthValidator(100)}}
                name="addressline1"
                control={control}
                defaultValue={null}
                placeholder="Enter Store's Address Line 1"
                refName={register}
                errors={errors}
                // nextRef={addressLine2Ref.current}
                blurOnSubmit={false}
                editable={false}
                label="Address Line 1 (*)"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...maxLengthValidator(60)}}
                name="addressline2"
                control={control}
                defaultValue={null}
                placeholder="Enter Store's Address Line 2"
                refName={register}
                errors={errors}
                editable={false}
                refCopy={setAddressLine2Ref}
                label="Address Line 2"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator}}
                name="city"
                control={control}
                defaultValue={null}
                placeholder="Select Store's City"
                refName={register}
                errors={errors}
                label="City (*)"
                editable={false}
                nextRef={latitudeRef.current}
                blurOnSubmit={false}
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
                enabled={false}
                label="District (*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
              <QubeSelect
                rules={{...requiredSelectValidator}}
                name="state_id"
                control={control}
                defaultValue={null}
                placeholder="Select Store's State"
                refName={register}
                errors={errors}
                items={states}
                valueKey="states_id"
                labelKey="states_name"
                enabled={false}
                label="State (*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
              <QubeSelect
                rules={{...requiredSelectValidator}}
                name="country_id"
                control={control}
                defaultValue={null}
                placeholder="Select Store's Country"
                refName={register}
                errors={errors}
                items={countries}
                valueKey="countries_id"
                labelKey="countries_name"
                enabled={false}
                label="Country (*)"></QubeSelect>
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator, ...pincodeValidator}}
                name="pin"
                control={control}
                defaultValue={null}
                placeholder="Enter Store's Pincode"
                refName={register}
                errors={errors}
                keyboardType="number-pad"
                label="Pincode (*)"
                // nextRef={latitudeRef.current}
                // blurOnSubmit={false}
                editable={false}
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeLocationInput
                rules={{...requiredValidator, ...decimalValidator}}
                latitudeName="latitude"
                longitudeName="longitude"
                control={control}
                defaultValue={null}
                refName={register}
                errors={errors}
                keyboardType="number-pad"
                label="Location (*)"
                setValue={setValue}
                refCopy={setLatitudeRef}
                navigation={navigation}
              />
            </View>
            <View style={[styles.spacingMargin]}>
              <Text
                style={{
                  fontSize: theme.fonts.smallFont,
                  color: theme.colors.primary,
                }}>
                Store Open days
              </Text>
              {days.map(item => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  key={item.id}>
                  <Text style={{width: '16%', color: theme.colors.primary}}>
                    {item.key}
                  </Text>
                  <CheckBox
                    tintColors={{
                      true: theme.colors.primary,
                      false: theme.colors.placeholderText,
                    }}
                    key={item.id}
                    style={{flex: 1, padding: 10}}
                    onValueChange={() => ChooseDay(item.id)}
                    // checkBoxColor={theme.colors.primary}
                    value={item.value}
                  />
                </View>
              ))}
            </View>
            <View style={[styles.spacingMargin]}>
              <Text
                style={{
                  fontSize: theme.fonts.smallFont,
                  color: theme.colors.primary,
                }}>
                Store Open/ Close time
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={[
                    {
                      padding: 10,
                      borderWidth: 0.5,
                      margin: 5,
                      width: '50%',
                      borderRadius: theme.roundness.mediumRoundness,
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.card,
                    },
                    globalStyles.boxShadow,
                  ]}
                  onPress={() => setShowOne(true)}>
                  <Text
                    style={{
                      fontSize: theme.fonts.smallFont,
                      color: theme.colors.placeholderText,
                    }}>
                    {!!startime
                      ? moment(startime).format('LT')
                      : 'Select open time'}
                  </Text>
                </TouchableOpacity>
                <View style={{width: '50%'}}>
                  <TouchableOpacity
                    style={[
                      {
                        padding: 10,
                        borderWidth: 0.5,
                        margin: 5,
                        width: '94%',
                        borderRadius: theme.roundness.mediumRoundness,
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.card,
                      },
                      globalStyles.boxShadow,
                    ]}
                    onPress={() => setShowTwo(true)}>
                    <Text
                      style={{
                        fontSize: theme.fonts.smallFont,
                        color: theme.colors.placeholderText,
                      }}>
                      {!!endtime
                        ? moment(endtime).format('LT')
                        : 'Select close time'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                name="store_policy"
                control={control}
                defaultValue={null}
                placeholder="Enter Policy"
                refName={register}
                errors={errors}
                label="Policy"
                nextRef={latitudeRef.current}
                multiline={true}
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator, ...maxLengthValidator(1500)}}
                name="store_desc"
                control={control}
                defaultValue={null}
                // style={{minHeight: 200}}
                placeholder="Store Description"
                refName={register}
                errors={errors}
                label="Store Description (*)"
                nextRef={latitudeRef.current}
                multiline={true}
                multilines={true}
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeInputPicture
                imageURI={pictureData}
                label="Store Image"
                captureClicked={captureClicked}
                DeleteImage={DeleteImage}
                ChangeDefault={ChangeDefault}
                uploadClicked={uploadClicked}></QubeInputPicture>
            </View>
            <View style={[{flexDirection: 'row'}, styles.spacingMargin]}>
              <View style={{flex: 1, paddingRight: 5}}>
                <QubeButton
                  onPress={onStoreAddDone}
                  title="Back"
                  color="secondary"></QubeButton>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <QubeButton
                  onPress={handleSubmit(onSubmit)}
                  title="Add Store"
                  color="primary"
                  disabled={
                    !!errors.addressline1 ||
                    !!errors.addressline2 ||
                    !!errors.store_name ||
                    !!errors.city ||
                    !!errors.store_category ||
                    !!errors.country_id ||
                    !!errors.pin ||
                    !!errors.state_id ||
                    !startime ||
                    !endtime
                  }></QubeButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

interface StoreAddViewProps {
  cities: CityItem[];
  states: StateItem[];
  countries: CountryItem[];
  storeCategories: DomainData[];
  onStoreAddAction: any;
  onStoreAddDone: any;
  pictureData: any[];
  captureClicked: any;
  uploadClicked: any;
  districts: DistrictItem[];
  unit: Units[];
  navigation?: any;
  DeleteImage?: any;
  ChangeDefault?: any;
}

export default StoreAddView;
interface daysProps {
  key: string;
  id: number;
  value: boolean;
}
