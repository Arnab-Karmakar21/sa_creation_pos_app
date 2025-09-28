import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import Icon from 'react-native-vector-icons/Ionicons';

const ActionArea = ({retItem, RemoveItems}: ActionAreaProps) => {
  const theme: ThemeItem = Object(useTheme());

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'space-between',
          height: '11%',
          backgroundColor: theme.colors.primaryTint,
          alignItems: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: theme.fonts.bigFont,
            textDecorationLine: 'underline',
          }}>
          Return Item Details
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: theme.colors.inputBorder,
        }}>
        <View style={{flex: 4, padding: 5}}>
          <Text
            style={{
              fontSize: theme.fonts.extraSmallFont,
              fontWeight: '700',
              color: theme.colors.primary,
            }}>
            Item
          </Text>
        </View>
        <View style={{flex: 2, padding: 5}}>
          <Text
            style={{
              fontSize: theme.fonts.extraSmallFont,
              fontWeight: '700',
              color: theme.colors.primary,
            }}>
            Returned Qty
          </Text>
        </View>
        <View style={{flex: 3, padding: 5}}>
          <Text
            style={{
              fontSize: theme.fonts.extraSmallFont,
              fontWeight: '700',
              color: theme.colors.primary,
            }}>
            Refund Amt.
          </Text>
        </View>
        <View style={{flex: 2, padding: 5}}>
          <Text
            style={{
              fontSize: theme.fonts.extraSmallFont,
              fontWeight: '700',
              color: theme.colors.primary,
            }}>
            Action
          </Text>
        </View>
      </View>
      <ScrollView>
        {!!retItem &&
          retItem.map((item: any, index: any) => (
            <Items Item={item} key={index} RemoveItems={RemoveItems} />
          ))}
      </ScrollView>
    </View>
  );
};

export default ActionArea;
const Items = ({Item, RemoveItems}: ItemsProps) => {
  const theme: ThemeItem = Object(useTheme());

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: theme.colors.background,
        borderBottomColor: theme.colors.placeholderText,
        borderBottomWidth: 0.5,
      }}>
      <View style={{flex: 4, padding: 5}}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '500',
            color: theme.colors.textColor,
          }}>
          {Item?.product_description}
        </Text>
        {/* <Text
            style={{
              fontSize: theme.fonts.smallFont,
              fontWeight: '300',
              color: theme.colors.placeholderText,
            }}>
            #{Item?.qr_unique_code?.split('-')[5]}
          </Text> */}
      </View>
      <View style={{flex: 2, padding: 5}}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '500',
            color: theme.colors.success,
          }}>
          {Item?.return_quantity}
        </Text>
      </View>
      <View style={{flex: 3, padding: 5}}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '500',
            color: theme.colors.textColor,
          }}>
          {'\u20B9'}
          {(Item?.return_quantity * Item?.unit_price)?.toFixed(2)}
        </Text>
      </View>

      <View style={{flex: 2, padding: 5}}>
        <TouchableOpacity>
          <Icon
            name="trash-outline"
            onPress={() => RemoveItems(Item)}
            size={theme.fonts.massiveFont}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface ActionAreaProps {
  retItem?: any[];
  RemoveItems?: any;
}
interface ItemsProps {
  Item?: any;
  RemoveItems?: any;
}
