import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card} from '@rneui/base';
import globalStyles from '../../../../GlobalStyle';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {HoldProduct, PreviousOrder} from '../../../../models/PosModel';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import QubeButton from '../../../../UILibrary/QubeButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import QrCodeScanners from '../PosDashboard/QrCodeScanner';
const PreviousOrderView = ({
  bills,
  GotoOrder,
  SearchAction,
  ClearData,
  GetData,
  ProductScanner,
}: HoldBillsViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [showOne, SetshowOne] = useState<boolean>(false);
  const [showTwo, SetshowTwo] = useState<boolean>(false);
  const [start, SetStart] = useState<any>(undefined);
  const [end, SetEnd] = useState<any>(undefined);
  const [search, SetSearch] = useState<string>('');
  const [qr, setQr] = useState<boolean>(false);
  const styles = StyleSheet.create({
    container: {borderRadius: 10},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6},
  });

  const ClearAll = () => {
    SetStart(undefined);
    SetEnd(undefined);
    SetSearch('');
    ClearData();
  };
  const Search = () => {
    SearchAction({
      search_string: !!search && search != '' ? search : null,
      start_date: !!start ? new Date(start) : null,
      end_date: !!end ? new Date(end) : null,
    });
  };
  return (
    <View style={{flex: 1}}>
      <QrCodeScanners
        flag={qr}
        Setflag={setQr}
        CodeScan={(code: any) => ProductScanner(code)}
      />
      <KeyboardAvoidingView>
        <Card
          containerStyle={[
            {borderRadius: 10, height: 160},
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
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 10,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: theme.fonts.mediumFont,
                    color: theme.colors.primary,
                    fontWeight: '600',
                  }}>
                  Previous Orders
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => SetshowOne(true)}
                  style={{
                    height: 42,
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
                    height: 42,
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: 42,
                    borderWidth: 0.5,
                    flex: 1,
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
                <TouchableOpacity onPress={() => setQr(true)}>
                  <Icon
                    name={'qr-code-outline'}
                    size={theme.fonts.massiveFont}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <View style={{paddingTop: 25}}>
                <QubeButton
                  color={'primary'}
                  disabled={!start && !end && !search}
                  onPress={() => Search()}
                  title="Filter"></QubeButton>
              </View>
              <View style={{paddingTop: 18}}>
                <QubeButton
                  color={'placeholderText'}
                  onPress={() => ClearAll()}
                  title="Clear"></QubeButton>
              </View>
            </View>
          </View>
        </Card>
      </KeyboardAvoidingView>
      <Card
        containerStyle={[
          styles.container,
          globalStyles.boxShadow,
          {height: 450, marginBottom: 20},
        ]}>
        <View
          style={{
            width: '100%',
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.mediumFont,
              }}>
              Order ID
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.mediumFont,
              }}>
              Customer Name
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.mediumFont,
              }}>
              Customer Phone No.
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.mediumFont,
              }}>
              Order Date
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: theme.fonts.mediumFont,
              }}>
              Action
            </Text>
          </View>
        </View>
        <View style={{height: '90%'}}>
          {!!bills && bills.length > 0 && (
            <FlatList
              style={{height: '100%'}}
              data={bills}
              onEndReached={() => {
                GetData({
                  search_string: !!search && search != '' ? search : null,
                  start_date: !!start ? new Date(start) : null,
                  end_date: !!end ? new Date(end) : null,
                });
              }}
              onEndReachedThreshold={0.8}
              renderItem={({item, index}) => (
                <HoldItem
                  GotoOrder={GotoOrder}
                  key={index}
                  item={item}
                  index={index}
                />
              )}
              keyExtractor={item => item.order_ref_no}
            />
          )}

          {bills.length == 0 && (
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
      </Card>
    </View>
  );
};

export default PreviousOrderView;

interface HoldBillsViewProps {
  bills: PreviousOrder[];
  GotoOrder?: any;
  SearchAction?: any;
  ClearData?: any;
  GetData?: any;
  ProductScanner?: any;
}

const HoldItem = ({item, index, GotoOrder}: HoldItemProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.placeholderText,
        paddingVertical: 15,
        backgroundColor:
          index % 2 == 0 ? theme.colors.background : theme.colors.inputBorder,
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.order_ref_no}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.name}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.mobile}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {moment(item.order_created_at).format('DD-MM-YYYY hh:MM a')}
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => GotoOrder(item)}
          style={{marginLeft: 7}}>
          <Icon name="eye" size={28}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface HoldItemProps {
  item: PreviousOrder;
  index: number;
  GotoOrder?: any;
}
