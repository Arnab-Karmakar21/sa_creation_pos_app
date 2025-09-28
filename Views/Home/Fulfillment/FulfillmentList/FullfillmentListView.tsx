import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {Card} from '@rneui/base';
import globalStyles from '../../../../GlobalStyle';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {RequisitionItem} from '../../../../models/Stock';
import moment from 'moment';

const FullfillmentListView = ({
  navigation,
  route,
  fullfillmentList,
  onFullFilmentDetailsView,
  GetData,
}: FullfillmentListViewProps) => {
  const theme: ThemeItem = Object(useTheme());
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
              Stock Fullfilment List
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Image
              source={require('../../../../Assets/sa_logo.png')}
              style={{height: 80, width: 80, alignSelf: 'flex-end'}}></Image>
          </View>
        </View>
      </Card>
      <Card containerStyle={{}}>
        <View
          style={{
            width: '100%',
            backgroundColor: theme.colors.primaryTint,
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          <View style={{flex: 2}}>
            <Text style={{color: 'white'}}>Requisition Ref No.</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={{color: 'white'}}>Fullfillment Ref No.</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Store Name</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Unit Name</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Created By</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Created On</Text>
          </View>
          <View style={{flex: 1.5}}>
            <Text style={{color: 'white'}}>Status</Text>
          </View>
          <View style={{flex: 1, marginLeft: 20}}>
            <Text style={{color: 'white'}}>Action</Text>
          </View>
        </View>
        {!!fullfillmentList && fullfillmentList.length > 0 && (
          <FlatList
            style={{width: '100%', height: '78%'}}
            data={fullfillmentList}
            onEndReached={() => GetData()}
            onEndReachedThreshold={0.8}
            renderItem={({item, index}) => (
              <ItemS
                key={index}
                item={item}
                index={index}
                onFullFilmentDetailsView={onFullFilmentDetailsView}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {fullfillmentList?.length == 0 && (
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

export default FullfillmentListView;

interface FullfillmentListViewProps {
  navigation: any;
  route: any;
  fullfillmentList: RequisitionItem[];
  onFullFilmentDetailsView: any;
  GetData?: any;
}

const ItemS = ({index, item, onFullFilmentDetailsView}: ItemSProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        backgroundColor:
          index % 2 == 0 ? theme.colors.background : theme.colors.inputBorder,
      }}
      key={index}>
      <View style={{flex: 2}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.ref_no}
        </Text>
      </View>
      <View style={{flex: 2}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.fulfilment_ref_no}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.store_name}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.unit_name}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {item.createdby_fullname}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {moment(item.created_on).format('ll')}
        </Text>
      </View>
      <View style={{flex: 1.5}}>
        <Text style={{fontSize: theme.fonts.smallFont, fontWeight: '600'}}>
          {!!item.fulfilment_status_dtls
            ? item.fulfilment_status_dtls
            : 'Pending'}
        </Text>
      </View>
      <View style={{flex: 1, marginLeft: 20}}>
        <TouchableOpacity
          style={{marginLeft: 7}}
          onPress={() => {
            onFullFilmentDetailsView(item.fulfilment_id, item.wishlist_id);
          }}>
          <Icon name="eye" size={theme.fonts.massiveFont}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface ItemSProps {
  item: RequisitionItem;
  onFullFilmentDetailsView?: any;
  index: number;
}
