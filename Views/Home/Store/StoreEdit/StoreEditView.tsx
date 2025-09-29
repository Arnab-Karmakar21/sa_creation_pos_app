import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import globalStyles from '../../../../GlobalStyle';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import {Card} from '@rneui/base';
import moment from 'moment';
import {Controller, useForm} from 'react-hook-form';
import {
  RetrieveImageService,
  RetrieveImageService_one,
  S3Folder,
} from '../../../../Service/S3';
import QubeButton from '../../../../UILibrary/QubeButton';
import QubeInputPicture from '../../../../UILibrary/QubeInputPicture';
import QubeLocationInput from '../../../../UILibrary/QubeLocationInput';
import QubeSelect from '../../../../UILibrary/QubeSelect';
import QubeSwitch from '../../../../UILibrary/QubeSwitch';
import {
  requiredValidator,
  requiredSelectValidator,
  maxLengthValidator,
  pincodeValidator,
  decimalValidator,
  numberValidator,
} from '../../../../Validators';
import {
  StoreItem,
  StoreUpdatePayload,
  Units,
} from '../../../../models/StoreModel';
import {
  CityItem,
  CountryItem,
  DistrictItem,
  DomainData,
  StateItem,
} from '../../../../models/DomainModels';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
const StoreEditView = ({
  states,
  countries,
  storeCategories,
  onStoreUpdateAction,
  singleStore,
  captureClicked,
  uploadClicked,
  pictureData,
  SetLocationSuccess,
  unit,
  districts,
  ChangeDefault,
  DeleteImage,
  navigation,
  Setimage,
}: StoreEditViewProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<StoreUpdatePayload>({
    mode: 'all',
  });
  const theme = Object(useTheme());
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [prebooking_status, setPrebookingStatus] = useState(false);
  const [startime, setStartTime] = useState<any>(new Date());
  const [endtime, setEndTime] = useState<any>(new Date());
  const [days, SetDays] = useState<daysProps[]>([
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
      fontSize: 40,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
    },
    headerSubText: {
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
  const ChooseDay = (id: number) => {
    let items: daysProps[] = days;
    items = JSON.parse(JSON.stringify(days));
    let selectedItem = items.find(m => m.id == id);
    if (!!selectedItem) {
      selectedItem.value = !selectedItem.value;
    }
    SetDays(items);
  };
  useEffect(() => {
    if (!!singleStore) {
      setValue('addressline1', singleStore.addressline1, {
        shouldValidate: true,
      });
      setValue('addressline2', singleStore.addressline2, {
        shouldValidate: true,
      });
      setValue('unit_id', singleStore.unit_id, {shouldValidate: true});
      setValue('city', singleStore.city, {shouldValidate: true});
      setValue('district_id', singleStore.district_id, {shouldValidate: true});
      setValue('state_id', singleStore.state, {shouldValidate: true});
      setValue('country_id', singleStore.country, {shouldValidate: true});
      setValue('pin', singleStore.pin.toString(), {shouldValidate: true});
      setValue('store_name', singleStore.store_name, {shouldValidate: true});
      setValue('store_policy', singleStore.store_policy, {
        shouldValidate: true,
      });
      setValue('store_desc', singleStore.store_desc, {
        shouldValidate: true,
      });
      setValue('store_category', singleStore.store_category, {
        shouldValidate: true,
      });
      if (!!singleStore.store_open_time) {
        setStartTime(new Date(singleStore.store_open_time));
      }
      if (!!singleStore.store_close_time) {
        setEndTime(new Date(singleStore.store_close_time));
      }
      if (!!singleStore.store_days) {
        let items: daysProps[] = days;
        items = JSON.parse(JSON.stringify(days));
        items.forEach(m => {
          if (singleStore.store_days?.includes(m.id)) {
            m.value = true;
          } else {
            m.value = false;
          }
        });
        SetDays(items);
      }

      Setimage(singleStore.store_image);
      if (!!singleStore.latitude && !!singleStore.longitude) {
        SetLocationSuccess({
          latitude: singleStore.latitude,
          longitude: singleStore.longitude,
        });
      }
    }
  }, [singleStore]);
  const onSubmit = (data: StoreUpdatePayload) => {
    var Opendays: number[] = [];
    days.forEach(m => (m.value ? Opendays.push(m.id) : ''));
    data.store_open_time = startime;
    data.store_close_time = endtime;
    data.store_days = Opendays;
    onStoreUpdateAction(data);
  };
  const latitudeRef = useRef();
  const setLatitudeRef = (ref: any) => {
    latitudeRef.current = ref;
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
            uri: item.thumb_doc_path
            // uri: RetrieveImageService_one(item.thumb_doc_path),
          }}></Image>
      </View>
    );
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={[{flex: 40}]}>
        <View style={[styles.upperGradient, {flexDirection: 'column'}]}>
          <ImageBackground
            source={require('../../../../Assets/mandal2.jpg')}
            style={{height: '100%', width: '100%'}}
            resizeMode="cover"
            imageStyle={{opacity: pictureData.length > 0 ? 0.8 : 1}}>
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
                Edit Store
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
                nextRef={latitudeRef.current}
                blurOnSubmit={false}
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
                  <Text style={{width: '15%', color: theme.colors.primary}}>
                    {item.key}
                  </Text>
                  <CheckBox
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
                      width: 150,
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
                <View>
                  <TouchableOpacity
                    style={[
                      {
                        padding: 10,
                        borderWidth: 0.5,
                        margin: 5,
                        width: 150,
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
                  // onPress={onStoreAddDone}
                  title="Back"
                  color="secondary"></QubeButton>
              </View>
              <View style={{flex: 1, paddingLeft: 5}}>
                <QubeButton
                  onPress={handleSubmit(onSubmit)}
                  title="Update Store"
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

export default StoreEditView;

interface StoreEditViewProps {
  states: StateItem[];
  countries: CountryItem[];
  storeCategories: DomainData[];
  singleStore: StoreItem;
  onStoreUpdateAction: any;
  pictureData: any[];
  SetLocationSuccess: any;
  districts: DistrictItem[];
  unit: Units[];
  DeleteImage?: any;
  ChangeDefault?: any;
  captureClicked: any;
  uploadClicked: any;
  navigation?: any;
  Setimage?: any;
}

interface daysProps {
  key: string;
  id: number;
  value: boolean;
}
