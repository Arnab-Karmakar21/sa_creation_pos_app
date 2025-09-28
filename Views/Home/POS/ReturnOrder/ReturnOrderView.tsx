import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import globalStyles from '../../../../GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {Card} from '@rneui/base';
import moment from 'moment';
import {ThemeItem} from '../../../../Theme/LightTheme';
import QubeButton from '../../../../UILibrary/QubeButton';
import QrCodeScanners from '../PosDashboard/QrCodeScanner';

function ReturnOrderView({SearchAction}: ReturnOrderViewProps) {
  const theme: ThemeItem = Object(useTheme());
  const [search, SetSearch] = useState<string>('');
  const [qr, setQr] = useState<boolean>(false);
  const ClearAll = () => {
    SetSearch('');
  };
  const Search = () => {
    SearchAction(
      //   search,
      {
        order_no: search,
      },
    );
  };
  return (
    <View style={{flex: 1}}>
      <QrCodeScanners
        CodeScan={(code: string) => SetSearch(code)}
        flag={qr}
        Setflag={setQr}
      />
      <KeyboardAvoidingView>
        <Card
          containerStyle={[
            {borderRadius: 10, height: 160},
            globalStyles.boxShadow,
          ]}>
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
                  Return Order
                </Text>
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
                  disabled={!search}
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
    </View>
  );
}

export default ReturnOrderView;
interface ReturnOrderViewProps {
  SearchAction?: any;
}
