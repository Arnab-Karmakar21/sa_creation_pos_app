import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {Card} from '@rneui/base';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import QubeButton from '../../../../UILibrary/QubeButton';
import HoldBills from '.';
import {ScrollView} from 'react-native-gesture-handler';
import {HoldProduct} from '../../../../models/PosModel';
import moment from 'moment';

const HoldBillsView = ({
  holdbill,
  GotoOrder,
  DeleteOrder,
}: HoldBillsViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    container: {borderRadius: 10},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6},
  });
  return (
    <View>
      <Card containerStyle={[{borderRadius: 10}, globalStyles.boxShadow]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                fontWeight: '600',
              }}>
              Hold Bills
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Image
              source={require('../../../../Assets/sa_logo.png')}
              style={{height: 80, width: 80, alignSelf: 'flex-end'}}></Image>
          </View>
        </View>
      </Card>
      <Card
        containerStyle={[
          styles.container,
          globalStyles.boxShadow,
          {height: '78%'},
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
          <ScrollView showsVerticalScrollIndicator={true}>
            {holdbill.map((item, index) => (
              <HoldItem
                GotoOrder={GotoOrder}
                key={index}
                item={item}
                index={index}
                DeleteOrder={DeleteOrder}
              />
            ))}
          </ScrollView>
        </View>
      </Card>
    </View>
  );
};

export default HoldBillsView;

interface HoldBillsViewProps {
  holdbill: HoldProduct[];
  GotoOrder?: any;
  DeleteOrder?: any;
}

const HoldItem = ({item, index, GotoOrder, DeleteOrder}: HoldItemProps) => {
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
          {moment(item.order_created_at).format('DD-MM-YYYY HH:MM a')}
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginLeft: 7}}
          onPress={() => DeleteOrder(item)}>
          <Icon
            name="trash-outline"
            size={28}
            color={theme.colors.secondary}></Icon>
        </TouchableOpacity>
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
  item: HoldProduct;
  index: number;
  GotoOrder?: any;
  DeleteOrder?: any;
}
