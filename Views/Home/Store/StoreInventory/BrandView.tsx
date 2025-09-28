import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ProductView from './ProductView';
import globalStyles from '../../../../GlobalStyle';
import {ProductBrandItem, StockAddPayload} from '../../../../models/StoreModel';
import {ThemeItem} from '../../../../Theme/LightTheme';

const BrandView = ({
  brand,
  onStockAddEvent,
  onModifyStockClick,
  onModifyProductClick,
  ShowQR,
}: BrandViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    brandItemContainer: {
      padding: 10,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderRadius: theme.roundness.smallRoundness,
    },
    spacing: {
      paddingBottom: 10,
      paddingHorizontal: 10,
    },
    brandNameContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    brandNameText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.primary,
    },
  });

  const stockAddEvent = () => {
    let payload: StockAddPayload = {};
    payload.brand_id = brand.brand_id;
    payload.created_by_role = brand.created_by_role;
    onStockAddEvent(payload);
  };

  return (
    <View style={styles.spacing}>
      <View
        style={[
          styles.brandItemContainer,
          globalStyles.boxShadow,
          +brand.created_by_role == 1
            ? {backgroundColor: theme.colors.card}
            : {backgroundColor: theme.colors.cardprimary},
        ]}>
        <View style={styles.brandNameContainer}>
          <Text style={[styles.brandNameText, globalStyles.fontFamily]}>
            {brand.brand_name} {+brand.created_by_role != 1 && '*'}
          </Text>
          <Ionicon
            name="add-circle"
            color={theme.colors.primary}
            size={theme.icons.mediumIcon}
            onPress={stockAddEvent}></Ionicon>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.cardalt,
            width: '100%',
            borderRadius: theme.roundness.smallRoundness,
          }}>
          {brand.products.map((product: any, index: number) => (
            <ProductView
              key={product.partner_product_id}
              lastIndex={index == brand.products.length - 1}
              ShowQR={ShowQR}
              product={product}
              onModifyStockClick={onModifyStockClick}
              onModifyProductClick={onModifyProductClick}></ProductView>
          ))}
        </View>
      </View>
    </View>
  );
};

interface BrandViewProps {
  brand: ProductBrandItem;
  onStockAddEvent: any;
  onModifyStockClick: any;
  onModifyProductClick: any;
  ShowQR?: any;
}

export default BrandView;
