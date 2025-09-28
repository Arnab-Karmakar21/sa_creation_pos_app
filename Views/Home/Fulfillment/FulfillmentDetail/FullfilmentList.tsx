import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {ProductList, RequsitionDetails} from '../../../../models/Stock';
import Ionicon from 'react-native-vector-icons/Ionicons';
import QubeAlert from '../../../../UILibrary/QubeAlert';
import {Goodproduct} from '../../../../models/WishListModels';
const FullfilmentList = ({
  requsition_detail,
  Delete,
  ShowProduct,
  w_f = 1,
  goodRecived,
  hasProduct,
  delRecv,
  rec_m = 1,
}: FullfilmentListProps) => {
  const [deletes, Setdelete] = useState<boolean>(false);
  const [id, Setid] = useState<number>(0);
  const theme: ThemeItem = Object(useTheme());
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
          Fulfillment
        </Text>
        <Text
          style={{
            color: theme.colors.background,
            paddingHorizontal: 3,
            fontSize: theme.fonts.mediumFont,
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}>
          {requsition_detail?.ref_no}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.placeholderText,
            padding: 3,
          }}>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Product Name
            </Text>
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Quantity
            </Text>
          </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Procurement Price
            </Text>
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Total Price
            </Text>
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
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
        {!!requsition_detail?.product_list &&
          requsition_detail?.product_list.length > 0 && (
            <FlatList
              data={requsition_detail?.product_list}
              renderItem={({item, index}) => (
                <Product
                  DeleteProduct={(item: ProductList) => (
                    !!item.fulfilment_item_id && Setid(item.fulfilment_item_id),
                    Setdelete(true)
                  )}
                  key={index}
                  item={item}
                  index={index}
                  status={requsition_detail.fulfilment_status}
                  ShowProduct={ShowProduct}
                  w_f={w_f}
                  goodRecived={goodRecived}
                  hasProduct={hasProduct}
                  delRecv={delRecv}
                  rec_m={rec_m}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}

        {(!requsition_detail ||
          requsition_detail?.product_list?.length == 0) && (
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
    </View>
  );
};

export default FullfilmentList;

interface FullfilmentListProps {
  requsition_detail?: RequsitionDetails;
  Delete?: any;
  ShowProduct?: any;
  w_f?: number;
  goodRecived?: any;
  hasProduct?: any;
  delRecv?: any;
  rec_m?: number;
}

const Product = ({
  item,
  index,
  DeleteProduct,
  status,
  ShowProduct,
  w_f,
  goodRecived,
  hasProduct,
  delRecv,
  rec_m,
}: ProductProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor:
          index % 2 == 0 ? theme.colors.background : theme.colors.inputBorder,
        padding: 5,
      }}>
      <View style={{flex: 3}}>
        <TouchableOpacity onPress={() => w_f && ShowProduct(item)}>
          <Text
            style={{
              color: theme.colors.textColor,
              fontWeight: 'bold',
              fontSize: theme.fonts.smallFont,
              textDecorationLine: 'underline',
            }}>
            {item.product_description}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: theme.fonts.smallFont,
          }}>
          {item?.quantity}
        </Text>
      </View>
      <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: theme.fonts.smallFont,
          }}>
          {'\u20B9'} {item?.procurement_price}
        </Text>
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: theme.fonts.smallFont,
          }}>
          {'\u20B9'} {item?.quantity * item?.procurement_price}
        </Text>
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        {status == 1 && (
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => DeleteProduct(item)}>
            <Ionicon
              name={'trash-outline'}
              color={theme.colors.danger}
              size={theme.icons.bigIcon}></Ionicon>
          </TouchableOpacity>
        )}
        {status == 2 && w_f == 0 && rec_m == 1 && (
          <>
            {hasProduct(item.product_id) ? (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => delRecv(item)}
                  style={{flexDirection: 'row'}}>
                  <Ionicon
                    name={'trash-outline'}
                    color={theme.colors.primary}
                    size={theme.icons.bigIcon}></Ionicon>
                </TouchableOpacity>
                <Ionicon
                  name={'checkmark-circle-outline'}
                  color={theme.colors.success}
                  size={theme.icons.bigIcon}></Ionicon>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => goodRecived(item)}
                style={{flexDirection: 'row'}}>
                <Ionicon
                  name={'repeat-outline'}
                  color={theme.colors.primary}
                  size={theme.icons.bigIcon}></Ionicon>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <View
        style={{
          width: 10,
          height: '115%',
          marginRight: -5,
          backgroundColor:
            item.requested == 1 ? theme.colors.success : theme.colors.primary,
          marginTop: -5,
        }}></View>
    </View>
  );
};

interface ProductProps {
  item: ProductList;
  index: number;
  DeleteProduct?: any;
  status?: number;
  ShowProduct?: any;
  w_f?: number;
  goodRecived?: any;
  hasProduct?: any;
  delRecv?: any;
  rec_m: number;
}
