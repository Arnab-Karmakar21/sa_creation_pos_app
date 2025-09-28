import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {PaymentSummery} from '../../../../models/PosModel';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from '@rneui/base';
import PaymentDetailPopOver from './PaymentDetailPopOver';

const Transaction = ({payment_summery}: TransactionProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View>
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.primaryTint,
          padding: 10,
        }}>
        <Text
          style={{
            color: theme.colors.background,
            fontSize: theme.fonts.bigFont,
            fontWeight: '800',
          }}>
          Transactions
        </Text>
      </View>
      <ScrollView horizontal={true}>
        {payment_summery?.payment_details.map((item, index) => (
          <TransactionCard key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Transaction;

interface TransactionProps {
  payment_summery?: PaymentSummery;
}

const TransactionCard = (porps: any) => {
  const theme: ThemeItem = Object(useTheme());
  const [flag, SetFlag] = useState<boolean>(false);
  return (
    <Card
      containerStyle={{
        height: 180,
        width: 260,
        borderRadius: theme.roundness.mediumRoundness,
        borderColor: theme.colors.inputBorder,
        marginHorizontal: 10,
      }}>
      <PaymentDetailPopOver
        name={porps.item.domain_value}
        flag={flag}
        Setflag={SetFlag}
        list={porps.item.list}
      />
      <TouchableOpacity
        onPress={() => SetFlag(true)}
        style={{height: '100%', width: '100%'}}>
        <View style={{position: 'absolute', top: 0, left: 0}}>
          <Text
            style={{
              fontSize: theme.fonts.bigFont,
              color: theme.colors.primary,
              fontWeight: '600',
              textDecorationLine: 'underline',
            }}>
            {porps.item.domain_value}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 30,
              color: theme.colors.primary,
              fontWeight: 'bold',
            }}>
            {'\u20B9'}
            {porps.item.amount?.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
