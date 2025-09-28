import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import {ProductItem} from '../../../../models/StoreModel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ProductView = ({
  product,
  lastIndex,
  onModifyStockClick,
  onModifyProductClick,
  ShowQR,
}: ProductViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    productContainer: {
      padding: 15,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    bottomBorderStyle: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 0.5,
    },
    descriptionText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.primaryTint,
      textDecorationLine: 'underline',
      textDecorationColor: theme.colors.primary,
    },
    mrpText: {
      fontSize: theme.fonts.extraSmallFont,
      color: theme.colors.secondaryTint,
      textDecorationLine: 'line-through',
    },
    sellingPriceText: {
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.secondary,
    },
    priceContainer: {
      flexShrink: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 2,
    },
    stockContainer: {
      flexShrink: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 3,
    },
    stockText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.secondary,
      fontWeight: 'bold',
    },
    spacing: {
      paddingHorizontal: 3,
      paddingVertical: 5,
    },
    descriptionContainer: {
      flexShrink: 1,
      maxWidth: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    specificationText: {
      marginTop: 10,
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

  const modifyStockClick = (type: number) => {
    onModifyStockClick(
      product.partner_product_id,
      product.product_description,
      type,
    );
  };

  const modifyProductClick = () => {
    onModifyProductClick(
      product.partner_product_id,
      product.product_variants_type,
      product.product_brand_id,
      product.brand_created_by_role,
    );
  };

  return (
    <View
      style={[
        styles.productContainer,
        !lastIndex && styles.bottomBorderStyle,
        {paddingHorizontal: 7},
      ]}>
      <View style={[styles.descriptionContainer, styles.spacing]}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={modifyProductClick}>
          <Text
            numberOfLines={2}
            style={[
              styles.descriptionText,
              globalStyles.fontFamily,
              {alignSelf: 'center'},
            ]}>
            {product.product_description}
          </Text>
          <Ionicon
            name="create-outline"
            color={theme.colors.primary}
            size={theme.icons.mediumIcon}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingTop: 10, flexDirection: 'row'}}
          onPress={() => ShowQR(product.qr_unique_code)}>
          <Text
            numberOfLines={2}
            style={[
              styles.descriptionText,
              globalStyles.fontFamily,
              {alignSelf: 'center'},
            ]}>
            {
              product?.qr_unique_code?.split('-')[
                product?.qr_unique_code?.split('-').length - 1
              ]
            }
          </Text>
          <Ionicon
            name="qr-code-outline"
            color={theme.colors.primary}
            size={theme.icons.bigIcon}
            style={{marginLeft: 10}}></Ionicon>
        </TouchableOpacity>
        <Text style={[styles.specificationText, globalStyles.fontFamily]}>
          {product.packaged_product ? product.product_quantity : 'Per'}{' '}
          {product.unit_short}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <View style={{flexDirection: 'column', marginTop: 10}}>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.smallFont,
                color: theme.colors.primary,
                borderBottomWidth: 1,
              }}>
              Outlet Stock Price
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => modifyStockClick(0)}>
              <View style={[styles.stockContainer, styles.spacing]}>
                <Text
                  numberOfLines={1}
                  style={[globalStyles.fontFamily, styles.stockText]}>
                  {product.stock_quantity}
                </Text>
                <Icon
                  name="local-mall"
                  color={
                    product.stock_quantity == 0
                      ? theme.colors.danger
                      : theme.colors.primary
                  }
                  size={theme.icons.mediumIcon}></Icon>
              </View>
            </TouchableOpacity>
            <View style={[styles.priceContainer, styles.spacing]}>
              {!!product.product_selling_price && (
                <Text
                  numberOfLines={1}
                  style={[styles.mrpText, globalStyles.fontFamily]}>
                  {'\u20B9'} {product.product_mrp}
                </Text>
              )}
              <Text
                numberOfLines={1}
                style={[styles.sellingPriceText, globalStyles.fontFamily]}>
                {'\u20B9'}{' '}
                {!!product.product_selling_price
                  ? product.product_selling_price
                  : product.product_mrp}
              </Text>
            </View>
          </View>
        </View>
        {!!product.online_flag && (
          <View style={{flexDirection: 'column', marginTop: 10}}>
            <View>
              <Text
                style={{
                  fontSize: theme.fonts.smallFont,
                  color: theme.colors.primary,
                  borderBottomWidth: 1,
                }}>
                Online Stock Price
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => modifyStockClick(1)}>
                <View style={[styles.stockContainer, styles.spacing]}>
                  <Text
                    numberOfLines={1}
                    style={[globalStyles.fontFamily, styles.stockText]}>
                    {product.online_qty}
                  </Text>
                  <Icon
                    name="local-mall"
                    color={
                      product.stock_quantity == 0
                        ? theme.colors.danger
                        : theme.colors.tertiaryShade
                    }
                    size={theme.icons.mediumIcon}></Icon>
                </View>
              </TouchableOpacity>
              <View style={[styles.priceContainer, styles.spacing]}>
                {!!product.online_selling_price && (
                  <Text
                    numberOfLines={1}
                    style={[styles.mrpText, globalStyles.fontFamily]}>
                    {'\u20B9'} {product.online_product_mrp}
                  </Text>
                )}
                <Text
                  numberOfLines={1}
                  style={[styles.sellingPriceText, globalStyles.fontFamily]}>
                  {'\u20B9'}{' '}
                  {!!product.online_selling_price
                    ? product.online_selling_price
                    : product.online_product_mrp}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

interface ProductViewProps {
  product: ProductItem;
  lastIndex: boolean;
  onModifyStockClick: any;
  onModifyProductClick: any;
  ShowQR?: any;
}

export default ProductView;
