import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import InventoryTemplateTabs from './InventoryTemplateTabs';
import TemplateInfoView from './TemplateInfoView';
import {useTheme} from '@react-navigation/native';
import {template} from '@babel/core';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import {TemplateItem} from '../../../../models/StoreModel';

const StoreInventoryView = ({
  templates,
  storeName,
  categoryName,
  storeId,
  onAddBrandClicked,
  qcPartnerId,
  onStockAddEvent,
  onModifyStockClick,
  onModifyProductClick,
  ShowQR,
  navigation,
}: StoreInventoryViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    noTemplateContainer: {
      height: 80,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    noTemplateText: {
      fontSize: theme.fonts.bigFont,
      color: theme.colors.secondaryTint,
    },
  });
  return (
    <View style={{flex: 1, paddingBottom: 15, zIndex: 0}}>
      {!!templates && templates.length != 0 ? (
        <InventoryTemplateTabs
          templates={templates}
          onAddBrandClicked={onAddBrandClicked}
          storeId={storeId}
          qcPartnerId={qcPartnerId}
          onStockAddEvent={onStockAddEvent}
          onModifyStockClick={onModifyStockClick}
          ShowQR={ShowQR}
          navigation={navigation}
          onModifyProductClick={onModifyProductClick}></InventoryTemplateTabs>
      ) : (
        <View style={styles.noTemplateContainer}>
          <Text style={[styles.noTemplateText, globalStyles.fontFamily]}>
            No Templates Found
          </Text>
        </View>
      )}
    </View>
  );
};

interface StoreInventoryViewProps {
  templates: TemplateItem[];
  storeName: string;
  categoryName: string;
  storeId: number;
  onAddBrandClicked: any;
  qcPartnerId: number;
  onStockAddEvent: any;
  onModifyStockClick: any;
  onModifyProductClick: any;
  ShowQR?: any;
  navigation?: any;
}

export default StoreInventoryView;
