import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {RefundList, Return} from '../../../../models/PosModel';
import {useForm} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {Card} from '@rneui/base';
import globalStyles from '../../../../GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import QubeButton from '../../../../UILibrary/QubeButton';
import DateTimePicker from '@react-native-community/datetimepicker';
const RefundView = ({
  refund_list,
  GetData,
  SearchAction,
  ClearData,
  onViewDetails,
}: RefundViewProps) => {
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
  const [expand, SetExpand] = useState<boolean>(false);
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
            Returned Order Lists
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
                    placeholder="Search by Order ID..."></TextInput>
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
                  disabled={!start && !end && !search && !watch('status_name')}
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
              Order ID
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
              Bag ID
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
              Return ID
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
              Return Date
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
              Return Amount
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
              Status
            </Text>
          </View>
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
          {!!refund_list && refund_list.returns.length > 0 && (
            <FlatList
              data={refund_list.returns}
              onEndReached={() =>
                GetData({
                  search_string: !!search && search != '' ? search : null,
                  start_date: !!start ? new Date(start) : null,
                  end_date: !!end ? new Date(end) : null,
                })
              }
              onEndReachedThreshold={0.8}
              renderItem={({item, index}) => (
                <ReturnItem
                  key={index}
                  item={item}
                  index={index}
                  onViewDetails={onViewDetails}
                />
              )}
              keyExtractor={item => item.return_ref_no}
            />
          )}

          {refund_list?.returns?.length == 0 && (
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
                No Item Found
              </Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RefundView;

interface RefundViewProps {
  refund_list: RefundList;
  GetData?: any;
  SearchAction?: any;
  ClearData?: any;
  onViewDetails?: any;
}

const ReturnItem = ({item, index, onViewDetails}: ReturntemProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      key={item.return_ref_no}
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
          {item.order_ref_no}
        </Text>
      </View>
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
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.return_ref_no}
        </Text>
      </View>
      <View
        style={{
          flex: 1.5,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {moment(item.return_date).format('DD/MM/YYYY')}
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
          {item.return_amount}
        </Text>
      </View>
      <View
        style={{flex: 1.5, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: theme.fonts.smallFont,
            fontWeight: '600',
            color:
              item.status == 'Successful'
                ? theme.colors.success
                : item.status == 'Failed' && theme.colors.danger,
          }}>
          {item.status}
        </Text>
      </View>
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => onViewDetails(item)}>
          <Ionicon
            name={'eye'}
            color={theme.colors.primary}
            size={theme.icons.bigIcon}></Ionicon>
        </TouchableOpacity>
      </View>
    </View>
  );
};
interface ReturntemProps {
  item: Return;
  index: number;
  onViewDetails?: any;
}
