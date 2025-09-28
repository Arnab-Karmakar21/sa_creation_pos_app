import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {SearchProductList} from '../../../../models/WishListModels';
import {TextInput} from 'react-native-gesture-handler';
import QubeButton from '../../../../UILibrary/QubeButton';
const AddRequsitPopover = ({
  flag,
  SetFlag,
  item,
  CreateWish,
}: AddRequsitPopover) => {
  const [description, Setdescription] = useState<string>('');
  const [quantity, Setquantity] = useState<string | undefined>('');
  const theme: ThemeItem = Object(useTheme());
  useEffect(() => {
    if (!!flag) {
      !!item?.product_description
        ? Setdescription(item?.product_description)
        : Setdescription('');
      Setquantity(undefined);
    }
  }, [flag]);
  return (
    <Modal
      style={{
        width: '60%',
        position: 'absolute',
        top: '0%',
        left: '15%',
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
            Confirm & Add
          </Text>
        </View>
        <View style={{paddingTop: 10}}>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Template
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '600',
                  color: theme.colors.textColor,
                }}>
                {item?.template_name}
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Category
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '600',
                  color: theme.colors.textColor,
                }}>
                {item?.category_name}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Sub category
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '600',
                  color: theme.colors.textColor,
                }}>
                {!!item?.subcategory_name ? item?.subcategory_name : 'N/A'}
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Brand
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '600',
                  color: theme.colors.textColor,
                }}>
                {!!item?.brand_name ? item?.brand_name : 'N/A'}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                borderWidth: 1,
                width: '50%',
                height: 100,
                justifyContent: 'center',
                borderColor: theme.colors.inputBorder,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Product Detail
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: '50%',
                height: 100,
                justifyContent: 'flex-start',
                borderColor: theme.colors.inputBorder,
                padding: 5,
              }}>
              <TextInput
                value={description}
                onChangeText={Setdescription}
                placeholder="Type Product description..."
                style={{fontSize: theme.fonts.mediumFont, fontWeight: '600'}}
                scrollEnabled={true}
                multiline></TextInput>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                borderWidth: 1,
                width: '50%',
                height: 48,
                justifyContent: 'center',
                borderColor: theme.colors.inputBorder,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Quantity
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: '50%',
                height: 48,
                justifyContent: 'flex-start',
                borderColor: theme.colors.inputBorder,
              }}>
              <TextInput
                value={quantity}
                onChangeText={Setquantity}
                keyboardType="number-pad"
                placeholder="Quantity"
                style={{fontSize: theme.fonts.mediumFont, fontWeight: '600'}}
                multiline></TextInput>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-evenly',
              padding: 10,
            }}>
            <View style={{width: '35%'}}>
              <QubeButton
                color={'placeholderText'}
                //   disabled={!start && !end && !search}
                onPress={() => SetFlag(false)}
                title="Close"></QubeButton>
            </View>
            <View style={{width: '35%'}}>
              <QubeButton
                color={'primary'}
                disabled={
                  !description ||
                  description == '' ||
                  !quantity ||
                  +quantity <= 0
                }
                onPress={() => (
                  CreateWish({
                    wishlist_item_id: null,
                    product_id: !!item?.product_id ? item?.product_id : null,
                    product_brand_id: !!item?.product_brand_id
                      ? item?.product_brand_id
                      : null,
                    brand_created_by_role: !!item?.brand_created_by_role
                      ? item?.brand_created_by_role
                      : null,
                    product_description: description,
                    subcategory_id: !!item?.subcategory_id
                      ? item.subcategory_id
                      : null,
                    category_id: !!item?.category_id ? item?.category_id : null,
                    template_id: !!item?.template_id ? item?.template_id : null,
                    quantity: quantity,
                    id: !!item?.product_id ? item?.product_id : Math.random(),
                  }),
                  SetFlag(false)
                )}
                title="Add"></QubeButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddRequsitPopover;

interface AddRequsitPopover {
  flag: boolean;
  SetFlag?: any;
  item?: SearchProductList;
  CreateWish?: any;
}
