import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {ProductList, WishListPayload} from '../../../../models/WishListModels';
import Ionicon from 'react-native-vector-icons/Ionicons';
import QubeAlert from '../../../../UILibrary/QubeAlert';
import QubeButton from '../../../../UILibrary/QubeButton';
const WishList = ({
  wishlist_detail,
  Delete,
  SendWishList,
  fulfilment = false,
  AddProduct,
  findProduct,
  createProduct,
}: WishListProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [deletes, Setdelete] = useState<boolean>(false);
  const [id, Setid] = useState<number>(0);
  const [send, SetSend] = useState<boolean>(false);
  return (
    <View style={{flex: 1}}>
      <QubeAlert
        isVisible={deletes}
        setIsVisible={Setdelete}
        title={'Are you sure you want to delete this item?'}
        okPress={() => (Delete(id), Setdelete(false))}
        cancelPress={() => Setdelete(false)}
        okText={'Yes'}
        cancelText={'No'}
      />
      <QubeAlert
        isVisible={send}
        setIsVisible={Setdelete}
        title={'Are you sure you want to submit?'}
        okPress={() => (SetSend(false), SendWishList())}
        cancelPress={() => SetSend(false)}
        okText={'Yes'}
        cancelText={'No'}
      />
      <View
        style={{
          padding: 5,
          backgroundColor: theme.colors.primaryTint,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: '#ffff',
            fontSize: theme.fonts.mediumFont,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}>
          Requisition
        </Text>
        <Text
          style={{
            color: theme.colors.background,
            paddingHorizontal: 3,
            fontSize: theme.fonts.mediumFont,
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}>
          {wishlist_detail?.ref_no}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.placeholderText,
            padding: 3,
          }}>
          <View style={{flex: 4, alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Product Name
            </Text>
          </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Quantity
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Action
            </Text>
          </View>
        </View>
        {!!wishlist_detail?.product_list &&
          wishlist_detail?.product_list.length > 0 && (
            <FlatList
              data={wishlist_detail?.product_list}
              renderItem={({item, index}) => (
                <Product
                  DeleteProduct={(item: ProductList) => (
                    Setid(!!item?.product_id ? item.product_id : item.id),
                    Setdelete(true)
                  )}
                  key={index}
                  AddProduct={AddProduct}
                  item={item}
                  index={index}
                  fulfilment={fulfilment}
                  wishlist_status={wishlist_detail?.wishlist_status}
                  findProduct={findProduct}
                  createProduct={createProduct}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}

        {(!wishlist_detail || wishlist_detail?.product_list?.length == 0) &&
          !fulfilment && (
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
                No Product Found
              </Text>
            </View>
          )}
      </View>
      {wishlist_detail?.wishlist_status == 1 && !fulfilment && (
        <View style={{padding: 10}}>
          <QubeButton
            color={'primary'}
            disabled={
              !wishlist_detail?.product_list ||
              wishlist_detail?.product_list?.length <= 0
            }
            onPress={() => SetSend(true)}
            title="Send Requisition"></QubeButton>
        </View>
      )}
    </View>
  );
};

export default WishList;

interface WishListProps {
  wishlist_detail?: WishListPayload;
  Delete?: any;
  SendWishList?: any;
  fulfilment?: boolean;
  AddProduct?: any;
  findProduct?: any;
  createProduct?: any;
}

const Product = ({
  item,
  index,
  DeleteProduct,
  wishlist_status,
  fulfilment,
  AddProduct,
  findProduct,
  createProduct,
}: ProductProps) => {
  const theme: ThemeItem = Object(useTheme());

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor:
          index % 2 == 0 ? theme.colors.background : theme.colors.inputBorder,
        padding: 10,
      }}>
      <View style={{flex: 4, alignItems: 'flex-start'}}>
        <Text
          style={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: theme.fonts.smallFont,
          }}>
          {item.product_description}{' '}
          {item.new_product_description &&
            fulfilment &&
            ' => ' + item.new_product_description}
        </Text>
      </View>
      <View style={{flex: 3, alignItems: 'center'}}>
        <Text
          style={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: theme.fonts.smallFont,
          }}>
          {item.quantity}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {(!wishlist_status || wishlist_status == 1) && !fulfilment && (
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => DeleteProduct(item)}>
            <Ionicon
              name={'trash-outline'}
              color={theme.colors.danger}
              size={theme.icons.bigIcon}></Ionicon>
          </TouchableOpacity>
        )}
        {fulfilment && !!findProduct(item.product_id) ? (
          <Ionicon
            name={'checkmark-circle-outline'}
            color={theme.colors.success}
            size={theme.icons.bigIcon}></Ionicon>
        ) : (
          !!item.product_id &&
          fulfilment && (
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => AddProduct(item)}>
              <Ionicon
                name={'add-circle-outline'}
                color={theme.colors.primary}
                size={theme.icons.bigIcon}></Ionicon>
            </TouchableOpacity>
          )
        )}
        {fulfilment && item.is_product_id_available == 0 && (
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => createProduct(item)}>
            <Ionicon
              name={'create-outline'}
              color={theme.colors.primary}
              size={theme.icons.bigIcon}></Ionicon>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

interface ProductProps {
  item: ProductList;
  index: number;
  DeleteProduct?: any;
  wishlist_status?: any;
  fulfilment: boolean;
  AddProduct?: any;
  findProduct?: any;
  createProduct?: any;
}
