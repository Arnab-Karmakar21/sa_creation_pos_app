import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {ProductItem} from '../../../../models/StoreModel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../../../GlobalStyle';
import {RetrieveImageService, S3Folder} from '../../../../Service/S3';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';

const StockItemView = ({
  stockItem,
  onModifyStockClick,
  onModifyProductClick,
}: StockItemViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.roundness.smallRoundness,
      borderColor:
        stockItem.stock_quantity > 0
          ? theme.colors.transparent
          : theme.colors.danger,
      borderWidth: 1,
    },
    imageContainer: {
      height: 140,
      width: '100%',
      backgroundColor: theme.colors.secondaryTint,
      borderTopLeftRadius: theme.roundness.smallRoundness,
      borderTopRightRadius: theme.roundness.smallRoundness,
    },
    image: {
      height: 140,
      width: '100%',
      borderTopLeftRadius: theme.roundness.smallRoundness,
      borderTopRightRadius: theme.roundness.smallRoundness,
    },
    replacementView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: theme.roundness.smallRoundness,
      borderTopRightRadius: theme.roundness.smallRoundness,
    },
    replacementText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.secondary,
    },
    textContianer: {
      padding: 5,
    },
    headerText: {
      color: theme.colors.primary,
      fontSize: theme.fonts.smallFont,
      fontWeight: 'bold',
    },
    subHeaderText: {
      color: theme.colors.primary,
      fontSize: theme.fonts.extraSmallFont,
      fontWeight: '200',
    },
    discountText: {
      color: theme.colors.secondaryConstrast,
      fontSize: theme.fonts.extraSmallFont,
      fontWeight: '200',
    },
    subHeaderText2: {
      color: theme.colors.secondaryTint,
      fontSize: theme.fonts.extraSmallFont,
      fontWeight: '200',
    },
    priceText: {
      color: theme.colors.primaryShade,
      fontSize: theme.fonts.bigFont,
      fontWeight: 'bold',
    },
    discountContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 3,
      backgroundColor: theme.colors.secondary,
      borderTopLeftRadius: theme.roundness.smallRoundness,
      borderBottomRightRadius: theme.roundness.smallRoundness,
      zIndex: 5,
    },
    editContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 3,
      backgroundColor: theme.colors.secondary,
      borderTopRightRadius: theme.roundness.smallRoundness,
      borderBottomLeftRadius: theme.roundness.smallRoundness,
      zIndex: 5,
    },
    stockDescContainer: {
      flexDirection: 'column',
    },
  });

  const stockEditEvent = () => {
    onModifyStockClick(
      stockItem.partner_product_id,
      stockItem.product_description,
    );
  };

  return (
    <View style={[globalStyles.boxShadow, styles.itemContainer]}>
      {!!stockItem.product_discount && (
        <View style={[styles.discountContainer]}>
          <Text style={[styles.discountText, globalStyles.fontFamily]}>
            {stockItem.product_discount}% OFF
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.editContainer}
        onPress={() => {
          onModifyProductClick(stockItem.partner_product_id);
        }}>
        <Icon
          name="edit"
          size={theme.icons.mediumIcon}
          color={theme.colors.secondaryConstrast}></Icon>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {!!stockItem.product_thumbnail ? (
          <Image
            style={styles.image}
            source={{
              uri: RetrieveImageService(
                S3Folder.PRODUCT,
                stockItem.product_thumbnail,
              ),
            }}></Image>
        ) : (
          <View style={styles.replacementView}>
            <Icon
              name="image"
              size={theme.icons.massiveIcon}
              color={theme.colors.secondary}></Icon>
            <Text style={[styles.replacementText, globalStyles.fontFamily]}>
              NO IMAGE
            </Text>
          </View>
        )}
      </View>
      <View style={styles.textContianer}>
        <Text style={[styles.subHeaderText, globalStyles.fontFamily]}>
          {stockItem.category_name}
          {' > '}
          {stockItem.subcategory_name}
          {' > '}
          {stockItem.brand_name}
        </Text>
        {/* <Text style={[styles.headerText, globalStyles.fontFamily]}>
          {stockItem.product_title}
        </Text> */}
        <Text style={[styles.headerText, globalStyles.fontFamily]}>
          {stockItem.product_description}
        </Text>
        <Text style={[styles.subHeaderText, globalStyles.fontFamily]}>
          {stockItem.packaged_product ? stockItem.product_quantity : 'Per'}{' '}
          {stockItem.unit_short}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={styles.stockDescContainer}
            onPress={stockEditEvent}>
            <Text
              style={[
                styles.subHeaderText,
                {
                  textTransform: 'uppercase',
                  color:
                    stockItem.stock_quantity > 0
                      ? theme.colors.primary
                      : theme.colors.danger,
                },
                globalStyles.fontFamily,
              ]}>
              {stockItem.stock_statement}{' '}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.subHeaderText,
                  globalStyles.fontFamily,
                  {fontWeight: 'bold', fontSize: theme.fonts.smallFont},
                ]}>
                {stockItem.stock_quantity}
              </Text>
              <Icon
                name="local-mall"
                color={
                  stockItem.stock_quantity == 0
                    ? theme.colors.danger
                    : theme.colors.primary
                }
                size={theme.icons.smallIcon}></Icon>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            {!!stockItem.product_selling_price && (
              <Text
                style={[
                  styles.subHeaderText2,
                  {textDecorationLine: 'line-through'},
                  globalStyles.fontFamily,
                ]}>
                {'\u20B9'} {stockItem.product_mrp}
              </Text>
            )}
            <Text style={[styles.priceText, globalStyles.fontFamily]}>
              {'\u20B9'}{' '}
              {!!stockItem.product_selling_price
                ? stockItem.product_selling_price
                : stockItem.product_mrp}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StockItemView;
interface StockItemViewProps {
  stockItem: ProductItem;
  onModifyStockClick: any;
  onModifyProductClick: any;
}
