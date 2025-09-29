import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {useTheme} from '@react-navigation/native';
import globalStyles from '../../../../GlobalStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import NoImage from '../../../../Assets/PlaceHolderStore.svg';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  RetrieveImageService,
  RetrieveImageService_one,
  S3Folder,
} from '../../../../Service/S3';

import {ThemeItem} from '../../../../Theme/LightTheme';
import {showToast} from '../../../../Service/Toast';
import {StoreItem} from '../../../../Models/StoreModel';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from '@rneui/base';
import QubeButton from '../../../../UILibrary/QubeButton';

const StoreCard = ({
  store,
  onUpdateStoreClick,
  onStoreDetailsClick,
  onStoreCardClick,
}: StoreCardProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    spacing: {
      paddingVertical: 10,
      paddingHorizontal: '2%',
    },
    storeCard: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.colors.card,
      maxHeight: 500,
      width: '100%',
      borderRadius: theme.roundness.mediumRoundness,
    },
    imageContainer: {
      height: 200,
      backgroundColor: theme.colors.darkTint,
      borderRadius: theme.roundness.mediumRoundness,
      // borderTopRightRadius: theme.roundness.mediumRoundness,
      justifyContent: 'center',
    },
    image: {
      maxHeight: '100%',
      maxWidth: '100%',
      height: '100%',
      width: '100%',
      borderRadius: theme.roundness.mediumRoundness,
      // borderTopRightRadius: theme.roundness.mediumRoundness,
      // borderBottomLeftRadius: theme.roundness.mediumRoundness,
    },
    replacementView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderTopLeftRadius: theme.roundness.mediumRoundness,

      borderBottomLeftRadius: theme.roundness.mediumRoundness,
    },
    replacementText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.secondary,
    },
    infoContainer: {
      height: 300,
      paddingHorizontal: 10,
      paddingVertical: 15,
      justifyContent: 'space-between',
    },
    storeName: {
      fontSize: theme.fonts.massiveFont,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    storeAddress: {
      marginTop: 10,
      fontSize: theme.fonts.smallFont,
      color: theme.colors.darkTint,
    },
    pendingApproval: {
      paddingTop: 1,
      fontSize: theme.fonts.extraSmallFont,
      color: theme.colors.danger,
      // textAlign: 'center',
    },
    storeCaterogy: {
      paddingTop: 1,
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.darkTint,
    },
    moreButton: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    menuOption: {
      fontSize: theme.fonts.smallFont,
      padding: 5,
      color: theme.colors.secondary,
    },
    TouchableOpacity: {
      height: '100%',
      width: '100%',
      borderRadius: theme.roundness.mediumRoundness,
      // flexDirection: 'row',
    },
    Image: {
      width: '100%',
      height: ' 100%',
      resizeMode: 'stretch',
      borderTopLeftRadius: theme.roundness.mediumRoundness,
      borderBottomLeftRadius: theme.roundness.mediumRoundness,
    },
  });
  const onMenuSelection = (option_id: number) => {
    // if (option_id == 1) {
    //   onStoreDetailsClick(store.store_id);
    // } else
    if (option_id == 2) {
      onUpdateStoreClick(store.store_id);
    }
  };

  const TriggerToast = () => {
    if (store.store_status == 1) {
      showToast(
        "Can't perform any operation until store is approved.",
        'rgba(179, 40, 30, 0.8)',
      );
    } else if (store.store_status == 3) {
      showToast(
        "Can't perform any operation on a rejected store.",
        'rgba(179, 40, 30, 0.8)',
      );
    } else {
      showToast(
        "Can't perform any operation on an inactive store.",
        'rgba(179, 40, 30, 0.8)',
      );
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => {
          store.store_status == 2
            ? onStoreCardClick(store.store_id)
            : TriggerToast();
        }}
        style={styles.TouchableOpacity}>
        <Card
          containerStyle={[
            {
              borderRadius: theme.roundness.mediumRoundness,
              backgroundColor: '#f4e1c7',
              height: 460,
            },
          ]}>
          <ImageBackground
            source={require('../../../../Assets/bg5.jpg')}
            style={{height: '100%', width: '100%'}}
            imageStyle={{opacity: 0.9}}>
            <View style={styles.imageContainer}>
              {!!store?.store_image?.thumb_doc_path ? (
                <Image
                  style={styles.image}
                  source={{
                    uri: store.store_image.thumb_doc_path
                    // uri: RetrieveImageService_one(
                    //   store.store_image.thumb_doc_path,
                    // ),
                  }}></Image>
              ) : (
                <View style={styles.replacementView}>
                  <NoImage height={'100%'} />
                </View>
              )}
            </View>
            <View style={{margin: 10, marginVertical: 20}}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {store.store_name}
              </Text>
              <Text
                style={{
                  fontSize: theme.fonts.extraSmallFont,
                  fontWeight: 'bold',
                  color: theme.colors.placeholderText,
                }}>
                {store.unit_name}
              </Text>
            </View>
            <View style={{margin: 10, marginTop: -2, height: 40}}>
              <Text style={{fontSize: theme.fonts.smallFont}} numberOfLines={2}>
                {store.store_desc}
              </Text>
            </View>
            <View style={{margin: 10, marginTop: 20, width: 100}}>
              <QubeButton
                onPress={() =>
                  onUpdateStoreClick(store.store_id, store.qc_partner_id)
                }
                title="Edit Store"
                color="primary"></QubeButton>
            </View>

            {store.store_status == 1 && (
              <View style={{paddingHorizontal: 5}}>
                <Text style={[styles.pendingApproval, globalStyles.fontFamily]}>
                  (Pending Approval from Admin)
                </Text>
              </View>
            )}
            {store.store_status == 3 && (
              <View style={{paddingHorizontal: 5}}>
                <Text style={[styles.pendingApproval, globalStyles.fontFamily]}>
                  (Store Rejected by Admin)
                </Text>
              </View>
            )}
            {store.store_status == 4 && (
              <View style={{paddingHorizontal: 5}}>
                <Text style={[styles.pendingApproval, globalStyles.fontFamily]}>
                  (Inactive Store)
                </Text>
              </View>
            )}
          </ImageBackground>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

interface StoreCardProps {
  store: StoreItem;
  onUpdateStoreClick: any;
  onStoreDetailsClick: any;
  onStoreCardClick: any;
}

export default StoreCard;
