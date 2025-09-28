import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {Marker} from 'react-native-maps';
import globalStyles from '../../../../GlobalStyle';
import {
  RetrieveImageService,
  RetrieveImageService_one,
  S3Folder,
} from '../../../../Service/S3';
import HeaderStyle1 from '../../../../UILibrary/HeaderStyle1';
import StockItemView from './StockItemView';
import {
  ProductItem,
  SingleStoreDetails,
  StoreItem,
} from '../../../../models/StoreModel';
import {Card} from '@rneui/base';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';
const StoreDetailsView = ({
  store,
  stock,
  onModifyProductClick,
  onModifyStockClick,
  onManageInventoryClick,
  refreshStore,
  navigation,
}: StoreDetailsViewProps) => {
  const [map, setMap] = useState<MapView>();
  const theme: ThemeItem = Object(useTheme());

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  let _renderItem = ({item}: any) => {
    return (
      <View style={{width: '100%'}}>
        <Image
          style={styles.image}
          source={{
            uri: RetrieveImageService_one(item.thumb_doc_path),
          }}></Image>
      </View>
    );
  };

  const styles = StyleSheet.create({
    storeDetails: {
      flex: 1,
      paddingLeft: '2%',
      paddingRight: '2%',
      flexDirection: 'column',
      width: '100%',
    },
    sectionSubHeader: {
      fontSize: theme.fonts.massiveFont,
      color: theme.colors.primary,
      fontWeight: '200',
    },
    sectionText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.darkTint,
    },
    imageContainer: {
      marginTop: 10,
      height: '43%',
      maxHeight: '52%',
      width: '100%',
      overflow: 'hidden',
      // justifyContent: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness.mediumRoundness,
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: theme.roundness.mediumRoundness,
    },
    replacementView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    replacementText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.text,
    },
    mapContainer: {
      flex: 1,
      height: 160,
      width: '100%',
      borderRadius: theme.roundness.smallRoundness,
    },
    mapImage: {
      maxHeight: '100%',
      maxWidth: '100%',
    },
    spacing: {
      paddingVertical: 5,
    },
    itemList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    itemContainer: {
      width: '50%',
      padding: 5,
    },
    addButton: {
      zIndex: 5,
    },
    addressBox: {
      height: 283,
      marginTop: 10,
      backgroundColor: theme.colors.card,
      padding: 10,
      borderRadius: theme.roundness.mediumRoundness,
      width: '100%',
    },
    manageInventoryText: {
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.primary,
    },
  });

  useEffect(() => {
    if (!!map && !!store && !!store.latitude && !!store.longitude) {
      map.animateCamera({
        center: {
          latitude: store.latitude,
          longitude: store.longitude,
        },
        zoom: 15,
      });
    }
  }, [map, store]);

  return (
    <ScrollView style={{marginBottom: 15}}>
      <View style={[styles.storeDetails, styles.spacing]}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{width: 20}}
              onPress={() => navigation.goBack()}>
              <Icon
                name={'arrow-back-ios'}
                size={theme.icons.mediumIcon}
                color={theme.colors.darkTint}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                padding: 5,
                marginRight: 16,
                width: 180,
                flexDirection: 'row',
              }}
              onPress={onManageInventoryClick}>
              <Text
                style={[
                  styles.manageInventoryText,
                  globalStyles.fontFamily,
                  {
                    textDecorationLine: 'underline',
                    textAlign: 'right',
                    fontSize: 20,
                  },
                ]}>
                Manage Inventory
              </Text>
              <Icon
                name={'settings'}
                size={theme.icons.mediumIcon}
                color={theme.colors.primary}
                style={{marginLeft: 5, marginTop: 2}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, minHeight: 550}}>
            <View style={[styles.imageContainer, globalStyles.boxShadow]}>
              {!!store?.store_image && store?.store_image.length > 0 ? (
                <Carousel
                  loop
                  width={600}
                  autoPlay={true}
                  data={store.store_image}
                  mode="parallax"
                  scrollAnimationDuration={3000}
                  renderItem={_renderItem}
                />
              ) : (
                <View style={styles.replacementView}>
                  <Icon
                    name="store"
                    size={theme.icons.massiveIcon}
                    color={theme.colors.messageToast}></Icon>
                  <Text
                    style={[styles.replacementText, globalStyles.fontFamily]}>
                    NO IMAGE
                  </Text>
                </View>
              )}
            </View>
            <View style={[styles.addressBox, globalStyles.boxShadow]}>
              <Text
                numberOfLines={3}
                style={[
                  styles.sectionSubHeader,
                  styles.spacing,
                  globalStyles.fontFamily,
                ]}>
                Address :
              </Text>
              <Text
                style={[
                  styles.sectionText,
                  styles.spacing,
                  globalStyles.fontFamily,
                ]}>
                {store.addressline1 + ', '}
                {!!store.addressline2 && store.addressline2 + ', '}
                {store.city + ', '}
                {store.states_name + ', '}
                {store.countries_name + ', '}
                {'Pincode: ' + store.pin}
              </Text>
              <View style={[styles.mapContainer, styles.spacing]}>
                {!!store.latitude && !!store.longitude && (
                  <MapView
                    ref={map => {
                      if (!!map) {
                        setMap(map);
                      }
                    }}
                    style={{
                      flex: 1,
                      borderRadius: theme.roundness.smallRoundness,
                    }}>
                    <Marker
                      coordinate={{
                        latitude: store.latitude,
                        longitude: store.longitude,
                      }}></Marker>
                  </MapView>
                )}
              </View>
            </View>
          </View>

          <View style={{flex: 1}}>
            <Card containerStyle={{height: 530, borderRadius: 15}}>
              <View style={{padding: 5}}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                  }}>
                  {store.store_name}
                </Text>
                <Text style={{fontSize: 15}}>{store.unit_name}</Text>
                <View style={{marginTop: 30}}>
                  <View>
                    <Text
                      style={[
                        styles.sectionSubHeader,
                        styles.spacing,
                        globalStyles.fontFamily,
                      ]}>
                      Description :
                    </Text>
                    <Text numberOfLines={10}>{store.store_desc}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={[
                          styles.sectionSubHeader,
                          styles.spacing,
                          globalStyles.fontFamily,
                          {fontSize: 18},
                        ]}>
                        Store Opening Time:{' '}
                      </Text>
                      <Text>
                        {moment(store.store_open_time).format('h:mm A')}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.sectionSubHeader,
                          styles.spacing,
                          globalStyles.fontFamily,
                          {fontSize: 18},
                        ]}>
                        Store Closing Time:{' '}
                      </Text>
                      <Text>
                        {moment(store.store_close_time).format('h:mm A')}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.sectionSubHeader,
                        styles.spacing,
                        globalStyles.fontFamily,
                        {fontSize: 18, marginTop: 20},
                      ]}>
                      Store Open Days :
                    </Text>
                    <Text>
                      {store.store_days.map(index =>
                        daysOfWeek[index - 1].concat('   '),
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </View>
        {/* <View style={styles.itemList}>
        {!!stock &&
          stock.length > 0 &&
          stock.map((item) => (
            <View style={styles.itemContainer} key={item.partner_product_id}>
              <StockItemView
                stockItem={item}
                key={item.partner_product_id}
                onModifyStockClick={onModifyStockClick}
                onModifyProductClick={onModifyProductClick}
              />
            </View>
          ))}
      </View> */}
      </View>
    </ScrollView>
  );
};

export default StoreDetailsView;

interface StoreDetailsViewProps {
  store: SingleStoreDetails;
  stock?: ProductItem[];
  onModifyStockClick: any;
  onModifyProductClick: any;
  onManageInventoryClick: any;
  refreshStore: any;
  navigation: any;
}
