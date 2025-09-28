import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {ReturnList} from '../../../../models/PosModel';

const ReturnItemList = ({return_list}: ReturnItemListProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
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
            Item
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
            Return Quantity
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
            Return Amount
          </Text>
        </View>
      </View>
      <View style={{height: '90%'}}>
        {!!return_list &&
          return_list.length > 0 &&
          return_list.map((item, index) => (
            <ReturnItem key={index} item={item} index={index} />
          ))}
        {return_list.length == 0 && (
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
  );
};

export default ReturnItemList;

interface ReturnItemListProps {
  return_list: ReturnList[];
}

const ReturnItem = ({index, item}: ReturntemProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      key={item.product_id}
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
          {item.product_description}
        </Text>
        <Text style={{fontSize: theme.fonts.extraSmallFont, fontWeight: '600'}}>
          #
          {
            item?.qr_unique_code?.split('-')[
              item?.qr_unique_code?.split('-').length - 1
            ]
          }
        </Text>
      </View>
      <View
        style={{
          flex: 1.5,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.return_quantity}
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
            fontSize: theme.fonts.smallFont,
            fontWeight: 'bold',
            color: theme.colors.danger,
          }}>
          {'\u20B9'}
          {item.return_amount}
        </Text>
      </View>
    </View>
  );
};
interface ReturntemProps {
  item: ReturnList;
  index: number;
}
