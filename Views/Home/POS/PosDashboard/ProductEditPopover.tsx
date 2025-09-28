import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import Modal from 'react-native-modal';
import {Item} from '../../../../models/PosModel';
import {RetrieveImageService_one} from '../../../../Service/S3';
import Icon from 'react-native-vector-icons/Ionicons';
import QubeButton from '../../../../UILibrary/QubeButton';
const ProductEditPopover = ({
  flag,
  SetFlag,
  Item,
  Update,
}: ProductEditPopoverProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [itm, SetItm] = useState<Item | undefined>(undefined);
  useEffect(() => {
    if (!!Item) {
      SetItm(Item);
    }
  }, [Item]);
  const Add = () => {
    if (!!Item && !!itm && itm?.required_quantity < Item?.required_quantity) {
      let temp = JSON.parse(JSON.stringify(itm));
      temp.required_quantity = temp.required_quantity + 1;
      SetItm(temp);
    }
  };
  const Remove = () => {
    if (!!itm && itm?.required_quantity > 1) {
      let temp = JSON.parse(JSON.stringify(itm));
      temp.required_quantity = temp.required_quantity - 1;
      SetItm(temp);
    }
  };
  return (
    <Modal
      style={{
        width: '50%',
        position: 'absolute',
        top: '22%',
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
            Update Item
          </Text>
        </View>
        <View
          style={{
            margin: 10,
            minHeight: 140,
            borderWidth: 1,
            width: '90%',
            borderColor: theme.colors.primary,
            borderRadius: theme.roundness.mediumRoundness,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '30%',
              minHeight: 140,
              borderRightColor: theme.colors.primary,
              borderRightWidth: 1,
            }}>
            {!!Item?.product_images?.thumb_doc_path ? (
              <Image
                style={{
                  minHeight: 140,
                  width: '100%',
                  borderTopLeftRadius: theme.roundness.mediumRoundness,
                  borderBottomLeftRadius: theme.roundness.mediumRoundness,
                }}
                source={{
                  uri: RetrieveImageService_one(
                    Item?.product_images.thumb_doc_path,
                  ),
                }}
              />
            ) : (
              <></>
            )}
          </View>
          <View style={{width: '70%', padding: 10}}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                fontWeight: 'bold',
              }}>
              {itm?.product_description}
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.extraSmallFont,
                color: theme.colors.placeholderText,
              }}>
              #
              {
                itm?.qr_unique_code?.split('-')[
                  itm?.qr_unique_code?.split('-').length - 1
                ]
              }
            </Text>
            <View
              style={{
                borderColor: theme.colors.placeholderText,
                flexDirection: 'row',
                borderWidth: 2,
                width: 120,
                padding: 2,
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => Remove()}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  size={theme.fonts.massiveFont}
                  color={theme.colors.danger}
                  name="remove-outline"
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: theme.fonts.mediumFont,
                    fontWeight: '800',
                  }}>
                  {itm?.required_quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => Add()}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  color={theme.colors.success}
                  size={theme.fonts.massiveFont}
                  name="add-outline"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{padding: 10}}>
          <QubeButton
            color={'primary'}
            onPress={() => (Update(itm), SetFlag(false))}
            title="Update"></QubeButton>
        </View>
      </View>
    </Modal>
  );
};

export default ProductEditPopover;
interface ProductEditPopoverProps {
  flag: boolean;
  SetFlag?: any;
  Item?: Item;
  Update?: any;
}
