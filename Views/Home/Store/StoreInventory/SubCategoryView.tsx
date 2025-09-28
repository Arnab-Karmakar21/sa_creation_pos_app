import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import * as Progress from 'react-native-progress';
import Ionicon from 'react-native-vector-icons/Ionicons';
import BrandView from './BrandView';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {
  ProductBrandItem,
  StockAddPayload,
  SubcategoryInfo,
} from '../../../../models/StoreModel';
import globalStyles from '../../../../GlobalStyle';
import {GetBrandProductsService} from '../../../../Service/Partner';

const SubCategoryView = ({
  subCategory,
  storeId,
  onAddBrandClicked,
  qcPartnerId,
  onStockAddEvent,
  onModifyStockClick,
  onModifyProductClick,
  ShowQR,
  target,
  Settarget,
}: SubCategoryViewProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState<ProductBrandItem[] | undefined>(
    undefined,
  );
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    subCategoryContainer: {
      width: '100%',
      backgroundColor: theme.colors.cardalt,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brandContainer: {
      backgroundColor: theme.colors.cardalt,
    },
    subCategoryNameText: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.primaryTint,
    },
    brandCountText: {
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.primaryTint,
      marginRight: 10,
    },
    upperRoundness: {
      borderTopLeftRadius: theme.roundness.smallRoundness,
      borderTopRightRadius: theme.roundness.smallRoundness,
    },
    bottomRoundness: {
      borderBottomLeftRadius: theme.roundness.smallRoundness,
      borderBottomRightRadius: theme.roundness.smallRoundness,
    },
    spacing: {
      paddingVertical: 15,
      paddingHorizontal: 5,
    },
  });

  const expansionPanelToggle = () => {
    if (isCollapsed && !brands) {
      refreshData();
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      let response = await GetBrandProductsService({
        store_id: storeId,
        subcategory_id: subCategory.product_subcategory_id,
        qc_partner_id: qcPartnerId,
      });
      if (response.data.exception) {
        setIsLoading(false);
      } else {
        setBrands(response.data.data);
        setIsLoading(false);
        setIsCollapsed(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onRefreshClick = (event: GestureResponderEvent) => {
    event.preventDefault();
    refreshData();
  };

  const addBrandClick = (event: GestureResponderEvent) => {
    event.preventDefault();
    onAddBrandClicked(
      subCategory.product_subcategory_id,
      subCategory.subcategory_name,
    );
  };

  const stockAddEvent = (payload: StockAddPayload) => {
    payload.subcategory_id = subCategory.product_subcategory_id;
    onStockAddEvent(payload);
  };
  useEffect(() => {
    if (!!target && subCategory.product_subcategory_id === target.subcatagory) {
      refreshData();
      Settarget(undefined);
    } else {
      setIsCollapsed(true);
    }
  }, [target]);
  return (
    <>
      <TouchableOpacity
        style={styles.upperRoundness}
        onPress={expansionPanelToggle}>
        <View
          style={[
            styles.subCategoryContainer,
            styles.upperRoundness,
            isCollapsed && !isLoading && styles.bottomRoundness,
          ]}>
          <Text
            style={[
              styles.subCategoryNameText,
              globalStyles.fontFamily,
              styles.spacing,
              {
                maxWidth: '60%',
              },
            ]}
            numberOfLines={1}>
            {subCategory.subcategory_name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.brandCountText,
                globalStyles.fontFamily,
                styles.spacing,
              ]}>
              {subCategory.brands.length}
            </Text>
            <TouchableOpacity onPress={onRefreshClick}>
              <Ionicon
                name="refresh-circle"
                color={theme.colors.primary}
                size={theme.icons.mediumIcon}
                style={styles.spacing}></Ionicon>
            </TouchableOpacity>
            <TouchableOpacity onPress={addBrandClick}>
              <Ionicon
                name="add-circle"
                color={theme.colors.primary}
                size={theme.icons.mediumIcon}
                style={styles.spacing}></Ionicon>
            </TouchableOpacity>
            {isCollapsed ? (
              <Ionicon
                name="chevron-down"
                color={theme.colors.primary}
                size={theme.icons.mediumIcon}
                style={styles.spacing}></Ionicon>
            ) : (
              <Ionicon
                name="chevron-up"
                color={theme.colors.primary}
                size={theme.icons.mediumIcon}
                style={styles.spacing}></Ionicon>
            )}
          </View>
        </View>
      </TouchableOpacity>
      {isLoading && (
        <Progress.Bar
          indeterminate={true}
          borderWidth={0}
          borderRadius={0}
          width={null}
          height={3}
          color={theme.colors.primary}
          unfilledColor={theme.colors.cardalt}></Progress.Bar>
      )}
      <Collapsible collapsed={isCollapsed}>
        <View style={[styles.brandContainer, styles.bottomRoundness]}>
          {!!brands &&
            brands.map(brand => (
              <BrandView
                brand={brand}
                key={brand.brand_id + brand.created_by_role}
                onStockAddEvent={stockAddEvent}
                onModifyStockClick={onModifyStockClick}
                ShowQR={ShowQR}
                onModifyProductClick={onModifyProductClick}></BrandView>
            ))}
        </View>
      </Collapsible>
    </>
  );
};

interface SubCategoryViewProps {
  subCategory: SubcategoryInfo;
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

export default SubCategoryView;
