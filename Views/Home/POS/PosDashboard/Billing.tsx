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
} from '../../../../models/PosModel';
import ProductEditPopover from './ProductEditPopover';
const Billing = ({
  order_details,
  RemoveItems,
  Update,
  type = 1,
}: BillingProps) => {
  const [editFlag, SetFlag] = useState<boolean>(false);
  const [Item, SetItem] = useState<Item | undefined>(undefined);
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
            Price
          </Text>
        </View>
        <View style={{flex: 2, padding: 5}}>
          <Text
            style={{
              fontSize: theme.fonts.extraSmallFont,
              fontWeight: '700',
              color: theme.colors.primary,
            }}>
            Qty
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
        {type == 1 && (
          <View style={{flex: 1, padding: 5}}>
            <Text
              style={{
                fontSize: theme.fonts.extraSmallFont,
                fontWeight: '700',
                color: theme.colors.primary,
              }}>
              Action
            </Text>
          </View>
        )}
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
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default Billing;

const Items = ({Item, RemoveItems, SetItem, SetFlag, type}: ItemsProps) => {
  const theme: ThemeItem = Object(useTheme());

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.colors.background,
        borderBottomColor: theme.colors.placeholderText,
        borderBottomWidth: 0.5,
      }}>
      <View
        style={{
          flexDirection: 'row',
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
          <Text
            style={{
              fontSize: theme.fonts.smallFont,
              fontWeight: '300',
              color: theme.colors.placeholderText,
            }}>
            #
            {
              Item?.qr_unique_code?.split('-')[
                Item?.qr_unique_code?.split('-').length - 1
              ]
            }
          </Text>
        </View>
        <View style={{flex: 2, padding: 5}}>
          {!!Item?.product_mrp &&
            Item?.selling_price &&
            Item?.selling_price < Item?.product_mrp && (
              <Text
                style={{
                  fontSize: theme.fonts.smallFont,
                  fontWeight: '500',
                  color: theme.colors.danger,
                  textDecorationLine: 'line-through',
                }}>
                {'\u20B9'}
                {Item?.product_mrp?.toFixed(2)}
              </Text>
            )}

          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              color: theme.colors.textColor,
            }}>
            {'\u20B9'}
            {Item?.selling_price?.toFixed(2)}
          </Text>
        </View>
        <View style={{flex: 2, padding: 5, flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              fontWeight: '500',
              textDecorationLine: !!Item?.return_quantity
                ? 'line-through'
                : 'none',
              color: !!Item?.return_quantity
                ? theme.colors.secondary
                : theme.colors.success,
              paddingRight: 5,
            }}>
            {Item?.required_quantity}
          </Text>
          {type == 0 && !!Item?.return_quantity && (
            <Text
              style={{
                fontSize: theme.fonts.mediumFont,
                fontWeight: '500',
                color: theme.colors.success,
              }}>
              {Item?.required_quantity - Item.return_quantity}
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
            {Item?.required_quantity && Item?.total_price?.toFixed(2)}
          </Text>
        </View>
        {type == 1 && (
          <View style={{flex: 1, padding: 5, justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={() => RemoveItems(Item)}>
              <Icon
                name="trash-outline"
                size={theme.fonts.massiveFont}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="create-outline"
                onPress={() => (SetItem(Item), SetFlag(true))}
                size={theme.fonts.massiveFont}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {!!Item?.return_quantity && (
        <View>
          <Text style={{color: theme.colors.danger}}>
            **Return amount added in the cash voucher or Same as Payment Mode of
            the customer.
          </Text>
        </View>
      )}
    </View>
  );
};

interface BillingProps {
  order_details?: OrderDetails | OrderDetailsHistry;
  RemoveItems?: any;
  Update?: any;
  type?: number;
}

interface ItemsProps {
  Item?: Item | Item2;
  RemoveItems?: any;
  SetItem?: any;
  SetFlag?: any;
  type?: number;
}
