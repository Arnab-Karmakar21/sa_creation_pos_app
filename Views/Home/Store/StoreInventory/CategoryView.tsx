import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import SubCategoryView from './SubCategoryView';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {CategoryInfo, StockAddPayload} from '../../../../models/StoreModel';
import globalStyles from '../../../../GlobalStyle';

const CategoryView = ({
  category,
  storeId,
  onAddBrandClicked,
  qcPartnerId,
  onStockAddEvent,
  onModifyStockClick,
  onModifyProductClick,
  ShowQR,
  target,
  Settarget,
}: CategoryViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const scrollViewSubCat = useRef<any>(null);
  const styles = StyleSheet.create({
    categoryContainer: {
      height: '100%',
      width: 450,
    },
    categoryNameContainer: {
      width: '100%',
      padding: 15,
      paddingHorizontal: 10,
      backgroundColor: theme.colors.card,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: theme.roundness.smallRoundness,
    },
    categoryNameText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.primary,
      marginRight: 10,
    },
    subCategoryCountText: {
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.primary,
    },
  });

  const stockAddEvent = (payload: StockAddPayload) => {
    payload.category_id = category.template_item_id;
    payload.variants = category.variants;

    onStockAddEvent(payload);
  };
  useEffect(() => {
    if (!!target) {
      let find =
        !!category && category.subcategories.length > 0
          ? category.subcategories.findIndex(
              m => m.product_subcategory_id === target.subcatagory,
            )
          : -1;
      if (!!scrollViewSubCat && find >= 0) {
        scrollViewSubCat?.current?.scrollTo({
          x: 0,
          y: 50 * find,
          animated: true,
        });
      }
    }
  }, [target]);

  return (
    <View style={styles.categoryContainer}>
      <ScrollView stickyHeaderIndices={[0]} ref={scrollViewSubCat}>
        <View
          style={{
            paddingHorizontal: 5,
            paddingBottom: 10,
            marginTop: 10,
          }}>
          <View
            style={[
              styles.categoryNameContainer,
              globalStyles.highBoxShadow,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.categoryNameText, globalStyles.fontFamily]}>
              {category.product_category_name}
            </Text>
            <Text
              style={[
                styles.subCategoryCountText,
                globalStyles.fontFamily,
                {marginRight: 10},
              ]}>
              {category.subcategories.length}
            </Text>
          </View>
        </View>
        {category.subcategories.map((subcategory: any) => (
          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
            }}
            key={
              subcategory.product_subcategory_id + category.template_item_id
            }>
            <SubCategoryView
              storeId={storeId}
              Settarget={Settarget}
              subCategory={subcategory}
              onAddBrandClicked={onAddBrandClicked}
              qcPartnerId={qcPartnerId}
              onStockAddEvent={stockAddEvent}
              onModifyStockClick={onModifyStockClick}
              ShowQR={ShowQR}
              target={target}
              onModifyProductClick={onModifyProductClick}></SubCategoryView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

interface CategoryViewProps {
  category: CategoryInfo;
  storeId: number;
  onAddBrandClicked: any;
  qcPartnerId: number;
  onStockAddEvent: any;
  onModifyStockClick: any;
  onModifyProductClick: any;
  ShowQR?: any;
  target?: any;
  Settarget?: any;
}

export default CategoryView;
