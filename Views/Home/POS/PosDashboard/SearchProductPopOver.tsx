import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SerchProduct} from '../../../../models/PosModel';
import Modal from 'react-native-modal';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import KeyBoard from './KeyBoard';
import QubeButton from '../../../../UILibrary/QubeButton';
import {Image} from '@rneui/themed/dist/Image';
import {RetrieveImageService_one} from '../../../../Service/S3';
const SearchProductPopOver = ({
  search_flag,
  search_product,
  ProductSearchSuccessAction,
  ProductAdd,
}: SearchProductPopOverProps) => {
  useEffect(() => {
    SetProductCode('');
  }, [search_flag]);

  const theme: ThemeItem = Object(useTheme());
  const [ProductCode, SetProductCode] = useState<string>('');
  return (
    <Modal
      style={{width: '50%', position: 'absolute', left: '22%', zIndex: 2}}
      testID={'modal'}
      onBackdropPress={() =>
        ProductSearchSuccessAction({data: undefined, flag: false})
      }
      isVisible={search_flag}>
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
            Product Detail
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
            {!!search_product?.product_images?.thumb_doc_path ? (
              <Image
                style={{
                  minHeight: 140,
                  width: '100%',
                  borderTopLeftRadius: theme.roundness.mediumRoundness,
                  borderBottomLeftRadius: theme.roundness.mediumRoundness,
                }}
                source={{
                  uri: search_product?.product_images.thumb_doc_path
                  // uri: RetrieveImageService_one(
                  //   search_product?.product_images.thumb_doc_path,
                  // ),
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
              {search_product?.product_description}
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.extraSmallFont,
                color: theme.colors.placeholderText,
              }}>
              #
              {
                search_product?.qr_unique_code?.split('-')[
                  search_product?.qr_unique_code?.split('-').length - 1
                ]
              }
            </Text>
            {!!search_product?.product_mrp &&
              !!search_product?.product_selling_price &&
              search_product?.product_mrp >
                search_product?.product_selling_price && (
                <Text
                  style={{
                    fontSize: theme.fonts.mediumFont,
                    fontWeight: 'bold',
                    color: theme.colors.danger,
                    textDecorationLine: 'line-through',
                  }}>
                  {'\u20B9'}
                  {search_product?.product_mrp?.toFixed(2)}
                </Text>
              )}

            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                fontWeight: 'bold',
                color: theme.colors.textColor,
              }}>
              {'\u20B9'}
              {search_product?.product_selling_price?.toFixed(2)}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            Quantity : {ProductCode}
          </Text>
        </View>
        <View
          style={{
            margin: 10,
            width: '90%',
          }}>
          <KeyBoard string={ProductCode} setstring={SetProductCode} />
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={{width: '40%', marginBottom: 10}}>
            <QubeButton
              color={'danger'}
              onPress={() =>
                ProductSearchSuccessAction({data: undefined, flag: false})
              }
              title="Close"></QubeButton>
          </View>
          <View style={{width: '40%', marginBottom: 10}}>
            <QubeButton
              color={'primary'}
              disabled={+ProductCode <= 0}
              onPress={() =>
                ProductAdd(+ProductCode, search_product?.qr_unique_code)
              }
              title="Add"></QubeButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SearchProductPopOver;

interface SearchProductPopOverProps {
  search_flag: boolean;
  search_product?: SerchProduct;
  ProductSearchSuccessAction?: any;
  ProductAdd?: any;
}
