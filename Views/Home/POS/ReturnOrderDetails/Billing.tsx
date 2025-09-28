import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Item,
  Item2,
  OrderDetails,
  OrderDetailsHistry,
  ReturnProductItemwiseDetails,
} from '../../../../models/PosModel';
import ProductEditPopover from './ProductEditPopover';
const Billing = ({
  order_details,
  RemoveItems,
  Update,
  type = 1,
  retItem,
}: BillingProps) => {
  const [editFlag, SetFlag] = useState<boolean>(false);
  const [Item, SetItem] = useState<any>(undefined);
  const theme: ThemeItem = Object(useTheme());

  return (
    <View style={{flex: 1}}>
      <ProductEditPopover
        flag={editFlag}
        SetFlag={SetFlag}
        Item={Item}
        Update={Update}
      />
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
          Invoice
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: theme.fonts.bigFont,
            textDecorationLine: 'underline',
          }}>
          {order_details?.order_no && '#' + order_details?.order_no}
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
            Unit Price
          </Text>
        </View>
        <View style={{flex: 2, padding: 5}}>
          <Text
            style={{
              fontSize: theme.fonts.extraSmallFont,
              fontWeight: '700',
              color: theme.colors.primary,
            }}>
            Billed Qty
          </Text>
        </View>
        <View style={{flex: 3, padding: 5}}>
          <Text
            style={{
              fontSize: theme.fonts.extraSmallFont,
              fontWeight: '700',
              color: theme.colors.primary,
            }}>
            Total
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
        {!!order_details &&
          order_details?.items.map((item, index) => (
            <Items
              Item={item}
              key={index}
              RemoveItems={RemoveItems}
              SetItem={SetItem}
              SetFlag={SetFlag}
              type={type}
              retItem={retItem}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default Billing;

const Items = ({
  Item,
  RemoveItems,
  SetItem,
  SetFlag,
  type,
  retItem,
}: ItemsProps) => {
  const theme: ThemeItem = Object(useTheme());

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        backgroundColor:
          Item?.returnable === true ? theme.colors.background : '#F7CDCA',
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
            fontWeight: '400',
            color: theme.colors.placeholderText,
          }}>
          #{Item?.product_id}
        </Text> */}
      </View>
      <View style={{flex: 2, padding: 5}}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '500',
            color: theme.colors.textColor,
          }}>
          {'\u20B9'}
          {Item?.unit_price?.toFixed(2)}
        </Text>
      </View>
      <View style={{flex: 2, padding: 5, flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '600',
            color:
              !!Item && Item?.returnable_quantity < Item?.total_quantity
                ? theme.colors.secondary
                : theme.colors.success,
            textDecorationLine:
              !!Item && Item?.returnable_quantity < Item?.total_quantity
                ? 'line-through'
                : 'none',
          }}>
          {Item?.total_quantity}
        </Text>
        {!!Item && Item?.returnable_quantity < Item?.total_quantity && (
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '600',
              color: theme.colors.success,
              paddingLeft: 8,
            }}>
            {Item?.returnable_quantity}
          </Text>
        )}
      </View>
      <View style={{flex: 3, padding: 5}}>
        <Text
          style={{
            fontSize: theme.fonts.mediumFont,
            fontWeight: '500',
            color: theme.colors.textColor,
          }}>
          {'\u20B9'}
          {Item?.total_quantity && Item?.total_price?.toFixed(2)}
        </Text>
      </View>

      <View style={{flex: 2, padding: 5}}>
        {!!Item &&
          !!Item?.returnable &&
          !retItem.find((item: any) => item.product_id == Item?.product_id) && (
            <TouchableOpacity>
              <Icon
                name="create-outline"
                onPress={() => (SetItem(Item), SetFlag(true))}
                size={theme.fonts.massiveFont}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
};

interface BillingProps {
  order_details?: OrderDetails | OrderDetailsHistry;
  RemoveItems?: any;
  Update?: any;
  type?: number;
  retItem?: any;
}

interface ItemsProps {
  Item?: ReturnProductItemwiseDetails;
  RemoveItems?: any;
  SetItem?: any;
  SetFlag?: any;
  type?: number;
  retItem?: any;
}
