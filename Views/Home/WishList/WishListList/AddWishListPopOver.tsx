import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import QubeButton from '../../../../UILibrary/QubeButton';
import {Image} from '@rneui/base';
import {StoreW} from '../../../../models/WishListModels';
import {RetrieveImageService_one} from '../../../../Service/S3';
import globalStyles from '../../../../GlobalStyle';

const AddWishListPopOver = ({
  flag,
  SetFlag,
  no_wishlist,
  Next,
}: AddWishListPopOverProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [ch, Setch] = useState<StoreW | undefined>(undefined);
  useEffect(() => {
    Setch(undefined);
  }, [flag]);
  return (
    <Modal
      style={{
        width: '50%',
        position: 'absolute',
        top: '5%',
        left: '22%',
        zIndex: 2,
      }}
      testID={'modal'}
      onBackdropPress={() => SetFlag(false)}
      isVisible={flag}>
      <View
        style={{
          backgroundColor: '#ffff',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            borderBottomColor: theme.colors.placeholderText,
            borderBottomWidth: 0.5,
            width: '100%',
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            Choose Store
          </Text>
        </View>
        <ScrollView horizontal={true} style={{marginVertical: 20}}>
          {no_wishlist.map((item, index) => (
            <TouchableOpacity
              onPress={() => Setch(item)}
              key={index}
              style={[
                {
                  height: 300,
                  width: 300,
                  backgroundColor: '#ffff',
                  borderRadius: theme.roundness.mediumRoundness,
                  borderColor:
                    ch?.store_id == item.store_id
                      ? theme.colors.success
                      : theme.colors.background,
                  borderWidth: 5,
                  margin: 15,
                },
                globalStyles.boxShadow,
              ]}>
              <Image
                style={{
                  height: 200,
                  width: 295,
                  zIndex: 2,
                  borderTopLeftRadius: theme.roundness.smallRoundness,
                  borderTopRightRadius: theme.roundness.smallRoundness,
                }}
                source={{uri: RetrieveImageService_one(item.store_image)}}
              />
              <View style={{padding: 5}}>
                <Text
                  style={{
                    fontSize: theme.fonts.bigFont,
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                  }}>
                  {item.store_name}
                </Text>
                <Text
                  style={{
                    fontSize: theme.fonts.smallFont,
                    color: theme.colors.placeholderText,
                  }}>
                  {item.unit_name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            padding: 20,
            justifyContent: 'space-evenly',
          }}>
          <View style={{width: '40%'}}>
            <QubeButton
              color={'placeholderText'}
              onPress={() => SetFlag(false)}
              title="Close"></QubeButton>
          </View>
          <View style={{width: '40%'}}>
            <QubeButton
              color={'primary'}
              disabled={!ch}
              onPress={() => (
                Next({
                  store_id: ch?.store_id,
                  store_name: ch?.store_name,
                  wishlist_id: null,
                  ref_no: null,
                  store_category: ch?.store_category,
                }),
                SetFlag(false)
              )}
              title="Next"></QubeButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddWishListPopOver;

interface AddWishListPopOverProps {
  flag: boolean;
  SetFlag?: any;
  no_wishlist: StoreW[];
  Next?: any;
}
