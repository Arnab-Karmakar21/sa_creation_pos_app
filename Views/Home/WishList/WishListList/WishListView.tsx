import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Card} from '@rneui/base';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import {StoreW, WishListLists} from '../../../../models/WishListModels';
import moment from 'moment';
import AddWishListPopOver from './AddWishListPopOver';
const WishListView = ({
  AddWishList,
  wishListLists,
  no_wishlist,
  GetData,
}: WishListViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [addw, Setaddw] = useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {borderRadius: 10},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6},
    datarowActive: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      width: '100%',
      backgroundColor: '#A0E4B0',
      alignItems: 'center',
    },
    datarowInactive: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      width: '100%',
      backgroundColor: '#FA7F7F',
      alignItems: 'center',
    },
  });
  return (
    <View>
      <AddWishListPopOver
        flag={addw}
        SetFlag={Setaddw}
        no_wishlist={no_wishlist}
        Next={AddWishList}
      />
      <Card containerStyle={[{borderRadius: 10}, globalStyles.boxShadow]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                fontWeight: '600',
              }}>
              Stock Requisition & Goods Received
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
        <View style={{width: 180, marginBottom: 10, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: theme.colors.tertiaryShade,
              padding: 5,
            }}
            onPress={() => Setaddw(true)}>
            <Icon
              name="basket-outline"
              size={theme.icons.smallIcon}
              color={theme.colors.tertiaryShade}></Icon>
            <Text
              style={{
                marginLeft: 5,
                fontSize: theme.fonts.smallFont,
                alignSelf: 'center',
                color: theme.colors.tertiaryShade,
              }}>
              New Stock Requisition
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          <View style={{flex: 1.5}}>
            <Text style={{color: 'white'}}>Ref No.</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Store Name</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Created On</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Requisition Status</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Fulfillment Status</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Good Recived Status</Text>
          </View>
          <View style={{flex: 0.8}}>
            <Text style={{color: 'white'}}>Action</Text>
          </View>
        </View>
        {!!wishListLists && wishListLists.length > 0 && (
          <FlatList
            style={{width: '100%', height: '85%'}}
            data={wishListLists}
            onEndReached={() => GetData()}
            onEndReachedThreshold={0.8}
            renderItem={({item, index}) => (
              <ItemS
                key={index}
                item={item}
                index={index}
                AddWishList={AddWishList}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {wishListLists?.length == 0 && (
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
      </Card>
    </View>
  );
};

export default WishListView;

interface WishListViewProps {
  AddWishList?: any;
  wishListLists: WishListLists[];
  no_wishlist: StoreW[];
  GetData?: any;
}

const ItemS = ({index, item, AddWishList}: ItemSProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      key={index}
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
      <View style={{flex: 1.5}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.ref_no}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.store_name}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {moment(item.created_on).format('DD/MM/YYYY')}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.wishlist_status_dtls}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.fulfilment_status_dtls}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.receive_master_status_name}
        </Text>
      </View>
      <View style={{flex: 0.8, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginLeft: 7}}
          onPress={() =>
            AddWishList({
              store_id: item?.store_id,
              store_name: item?.store_name,
              wishlist_id: item?.wishlist_id,
              ref_no: item?.ref_no,
              store_category: item.store_category,
              fulfilment_id: item.fulfilment_id,
              fulfilment_ref_no: item.fulfilment_ref_no,
              fulfilment_status: item.fulfilment_status,
            })
          }>
          <Icon name="eye" size={22}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface ItemSProps {
  item: WishListLists;
  AddWishList?: any;
  index: number;
}
