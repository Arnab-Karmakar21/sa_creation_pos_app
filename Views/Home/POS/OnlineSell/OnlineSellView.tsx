import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {DomainData} from '../../../../models/DomainModels';
import {orders} from '../../../../models/OrderModel';
import {StoreItem} from '../../../../models/StoreModel';
import {useTheme} from '@react-navigation/native';
import {Card} from '@rneui/base';
import moment from 'moment';
import {useForm} from 'react-hook-form';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../../../GlobalStyle';
import {ThemeItem} from '../../../../Theme/LightTheme';
import QubeButton from '../../../../UILibrary/QubeButton';
import QubeSelectAlt from '../../../../UILibrary/QubeSelectAlt';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicon from 'react-native-vector-icons/Ionicons';
const OnlineSellView = ({
  ClearData,
  SearchAction,
  navigation,
  oderList,
  onViewOrderDetails,
  orderStatusList,
  route,
  stores,
  GetData,
}: OderListViewProps) => {
  const [expand, SetExpand] = useState<boolean>(false);

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<any>({
    mode: 'all',
  });
  const theme: ThemeItem = Object(useTheme());
  const [showOne, SetshowOne] = useState<boolean>(false);
  const [showTwo, SetshowTwo] = useState<boolean>(false);
  const [start, SetStart] = useState<any>(undefined);
  const [end, SetEnd] = useState<any>(undefined);
  const [search, SetSearch] = useState<string>('');

  const ClearAll = () => {
    SetStart(undefined);
    SetEnd(undefined);
    SetSearch('');
    ClearData();
    reset();
  };
  const Search = () => {
    SearchAction({
      search_string: !!search && search != '' ? search : null,
      start_date: !!start ? new Date(start) : null,
      end_date: !!end ? new Date(end) : null,
      order_status: !!getValues('status_name')
        ? getValues('status_name')
        : null,
      store_id: !!getValues('store_id') ? getValues('store_id') : null,
    });
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Card
        containerStyle={[
          {borderRadius: 10, marginBottom: 10},
          globalStyles.boxShadow,
        ]}>
        {showOne && (
          <DateTimePicker
            testID="dateTimePicker"
            value={!!start ? new Date(start) : new Date()}
            mode={'date'}
            is24Hour={false}
            maximumDate={new Date()}
            display="default"
            onChange={date => (
              SetshowOne(false),
              !!date.nativeEvent.timestamp &&
                SetStart(date.nativeEvent.timestamp)
            )}
          />
        )}
        {showTwo && (
          <DateTimePicker
            testID="dateTimePicker2"
            value={!!end ? new Date(end) : new Date()}
            mode={'date'}
            is24Hour={false}
            maximumDate={new Date()}
            display="default"
            onChange={date => (
              SetshowTwo(false),
              !!date.nativeEvent.timestamp &&
                SetEnd(new Date(date.nativeEvent.timestamp))
            )}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              color: theme.colors.primary,
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Online Order Lists
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => SetExpand(!expand)}>
            <Text style={{color: theme.colors.primary, paddingHorizontal: 3}}>
              Filter
            </Text>
            <Ionicon
              name={
                expand
                  ? 'chevron-up-circle-outline'
                  : 'chevron-down-circle-outline'
              }
              color={theme.colors.primary}
              size={theme.icons.smallIcon}></Ionicon>
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={expand}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 10}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => SetshowOne(true)}
                  style={{
                    height: 52,
                    borderWidth: 0.5,
                    flex: 1,
                    margin: 5,
                    borderColor: theme.colors.inputBorder,
                    borderRadius: theme.roundness.smallRoundness,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: theme.fonts.mediumFont, flex: 1}}>
                    {!!start
                      ? moment(start).format('DD/MM/YYYY')
                      : 'Filter Start Date'}
                  </Text>
                  <Icon name={'calendar-outline'} size={theme.fonts.bigFont} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => SetshowTwo(true)}
                  style={{
                    height: 52,
                    borderWidth: 0.5,
                    flex: 1,
                    margin: 5,
                    borderColor: theme.colors.inputBorder,
                    borderRadius: theme.roundness.smallRoundness,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: theme.fonts.mediumFont, flex: 1}}>
                    {!!end
                      ? moment(end).format('DD/MM/YYYY')
                      : 'Filter End Date'}
                  </Text>
                  <Icon name={'calendar-outline'} size={theme.fonts.bigFont} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                {/* <View style={{flex: 1}}>
                  <QubeSelectAlt
                    name="store_id"
                    placeholder="Select your store"
                    control={control}
                    errors={errors}
                    refName={register}
                    items={stores}
                    valueKey="store_id"
                    labelKey="store_name"></QubeSelectAlt>
                </View> */}
                {/* <View style={{flex: 1}}>
                  <QubeSelectAlt
                    name="status_name"
                    placeholder="Select your status"
                    control={control}
                    errors={errors}
                    refName={register}
                    items={orderStatusList}
                    valueKey="domain_code"
                    labelKey="domain_value"></QubeSelectAlt>
                </View> */}
                <View
                  style={{
                    flex: 1,
                    height: 52,
                    borderWidth: 0.5,
                    margin: 5,
                    borderColor: theme.colors.inputBorder,
                    borderRadius: theme.roundness.smallRoundness,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    value={search}
                    onChangeText={text => SetSearch(text)}
                    style={{fontSize: theme.fonts.mediumFont, flex: 1}}
                    placeholder="Search by Bag ID / Customer Name..."></TextInput>
                  <Icon name={'search'} size={theme.fonts.bigFont} />
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View>
                <QubeButton
                  color={'primary'}
                  disabled={
                    !start &&
                    !end &&
                    !search &&
                    !watch('status_name') &&
                    !watch('store_id')
                  }
                  onPress={() => Search()}
                  title="Filter"></QubeButton>
              </View>
              <View>
                <QubeButton
                  color={'placeholderText'}
                  onPress={() => ClearAll()}
                  title="Clear"></QubeButton>
              </View>
            </View>
          </View>
        </Collapsible>
      </Card>
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.smallFont,
              }}>
              Bag ID
            </Text>
          </View>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.smallFont,
              }}>
              Customer Name
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.smallFont,
              }}>
              Payment Type
            </Text>
          </View>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.smallFont,
              }}>
              Delivery Date
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.smallFont,
              }}>
              Total Price
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.smallFont,
              }}>
              Order Placed At
            </Text>
          </View>
          {/* <View style={{flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.smallFont,
              }}>
              Status
            </Text>
          </View> */}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.smallFont,
              }}>
              Action
            </Text>
          </View>
        </View>
        <View style={{height: '90%'}}>
          {!!oderList && oderList.length > 0 && (
            <FlatList
              data={oderList}
              onEndReached={() => {
                GetData({
                  search_string: !!search && search != '' ? search : null,
                  start_date: !!start ? new Date(start) : null,
                  end_date: !!end ? new Date(end) : null,
                  order_status: !!getValues('status_name')
                    ? getValues('status_name')
                    : null,
                  store_id: !!getValues('store_id')
                    ? getValues('store_id')
                    : null,
                });
              }}
              onEndReachedThreshold={0.8}
              renderItem={({item, index}) => (
                <OrderItem
                  onViewOrderDetails={onViewOrderDetails}
                  key={index}
                  item={item}
                  index={index}
                />
              )}
              keyExtractor={item => item.bag_ref_no}
            />
          )}

          {oderList.length == 0 && (
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 20,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  color: theme.colors.placeholderText,
                }}>
                {' '}
                No Order Found
              </Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OnlineSellView;

export interface OderListViewProps {
  route: any;
  navigation: any;
  ClearData: any;
  SearchAction: any;
  onViewOrderDetails: any;
  oderList: orders[];
  orderStatusList: DomainData[];
  GetData?: any;
  stores: StoreItem[];
}

const OrderItem = ({item, index, onViewOrderDetails}: OrdertemProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      key={item.bag_id}
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.placeholderText,
        paddingVertical: 10,
        backgroundColor:
          index % 2 == 0 ? theme.colors.background : theme.colors.inputBorder,
      }}>
      <View
        style={{
          flex: 1.5,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.bag_ref_no}
        </Text>
      </View>
      <View
        style={{
          flex: 1.5,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.customer_name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.payment_type_name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {moment(item.scheduled_delivery_date).format('DD/MM/YYYY')}
        </Text>
      </View>
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: theme.fonts.smallFont,
            fontWeight: '600',
            color: theme.colors.danger,
          }}>
          {'\u20B9'}
          {item.total_price}
        </Text>
      </View>
      <View
        style={{flex: 2, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {moment(item.order_created_at).format('DD/MM/YYYY hh: mm a')}
        </Text>
      </View>
      {/* <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.bag_status_name}
        </Text>
      </View> */}
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => onViewOrderDetails(item)}>
          <Ionicon
            name={'eye'}
            color={theme.colors.primary}
            size={theme.icons.bigIcon}></Ionicon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface OrdertemProps {
  item: orders;
  index: number;
  onViewOrderDetails?: any;
}
