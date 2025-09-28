import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {ProductList} from '../../../../models/WishListModels';
import QubeButton from '../../../../UILibrary/QubeButton';
const AddStockPopover = ({
  SetFlag,
  flag,
  item,
  AddItem,
}: AddStockPopoverPorps) => {
  const [quantity, Setquantity] = useState<string | undefined>('');
  const [procurementprice, Setprocurementprice] = useState<string | undefined>(
    '',
  );
  const theme: ThemeItem = Object(useTheme());
  useEffect(() => {
    if (flag) {
      Setquantity('');
      Setprocurementprice('');
    }
  }, [flag]);
  return (
    <Modal
      style={{
        width: '65%',
        position: 'absolute',
        top: '0%',
        left: '12%',
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
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                {!!item?.new_product_description
                  ? item?.new_product_description
                  : item?.product_description}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
                justifyContent: 'center',
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
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
              }}>
              <TextInput
                style={{fontSize: theme.fonts.bigFont, height: 45}}
                value={quantity}
                keyboardType="number-pad"
                placeholder="Quantity"
                onChangeText={text => Setquantity(text)}
              />
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Procurement Price
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                // padding: 5,
              }}>
              <TextInput
                style={{fontSize: theme.fonts.bigFont, height: 45}}
                value={procurementprice}
                keyboardType="numeric"
                placeholder="Procurement Price"
                onChangeText={text => Setprocurementprice(text)}
              />
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
                  !quantity ||
                  quantity == '' ||
                  !procurementprice ||
                  +procurementprice <= 0
                }
                onPress={() => (
                  AddItem({
                    fulfilment_item_id: null,
                    wishlist_item_id: item?.wishlist_item_id,
                    product_id: item?.product_id,
                    quantity: quantity,
                    requested: item?.requested,
                    procurement_price: procurementprice,
                    product_description: !!item?.new_product_description
                      ? item?.new_product_description
                      : item?.product_description,
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

export default AddStockPopover;

interface AddStockPopoverPorps {
  flag: boolean;
  SetFlag: any;
  item?: ProductList;
  AddItem?: any;
}
