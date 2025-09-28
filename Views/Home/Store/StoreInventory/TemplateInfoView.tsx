import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {useFocusEffect, useTheme} from '@react-navigation/native';

import CategoryView from './CategoryView';
import * as Progress from 'react-native-progress';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {StockAddPayload, TemplateInfoItem} from '../../../../models/StoreModel';
import globalStyles from '../../../../GlobalStyle';
import {TemplateInfoService} from '../../../../Service/Partner';

const TemplateInfoView = ({
  template_id,
  storeId,
  onAddBrandClicked,
  qcPartnerId,
  onStockAddEvent,
  onModifyStockClick,
  onModifyProductClick,
  ShowQR,
  target,
  Settarget,
}: TemplateInfoViewProps) => {
  const scrollViewCat = useRef<any>(null);
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
  const [templateInfo, setTemplateInfo] = useState<TemplateInfoItem>();
  const [isLoading, setIsLoading] = useState(false);

  const stockAddEvent = (payload: StockAddPayload) => {
    payload.template_id = template_id;
    onStockAddEvent(payload);
  };

  const LoadTemplateInfo = async (template_id: number) => {
    setIsLoading(true);
    try {
      let response = await TemplateInfoService(template_id);
      if (response.data.exception) {
        setIsLoading(false);
      } else {
        setTemplateInfo(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      LoadTemplateInfo(template_id);
    }, []),
  );
  useEffect(() => {
    if (!!target) {
      let find =
        !!templateInfo && templateInfo.categories.length > 0
          ? templateInfo.categories.findIndex(
              m => m.template_item_id === target.catagory,
            )
          : -1;
      if (!!scrollViewCat && find >= 0) {
        scrollViewCat?.current?.scrollTo({
          x: 450 * find,
          y: 0,
          animated: true,
        });
      }
    }
  }, [target, templateInfo]);

  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <Progress.Bar
          indeterminate={true}
          borderWidth={0}
          borderRadius={0}
          width={null}
          height={3}
          color={theme.colors.primary}
          unfilledColor={theme.colors.card}></Progress.Bar>
      )}
      {!!templateInfo && templateInfo.categories.length != 0 ? (
        <ScrollView horizontal={true} ref={scrollViewCat}>
          {templateInfo.categories.map(category => (
            <CategoryView
              key={category.template_item_id}
              storeId={storeId}
              category={category}
              onAddBrandClicked={onAddBrandClicked}
              qcPartnerId={qcPartnerId}
              onStockAddEvent={stockAddEvent}
              ShowQR={ShowQR}
              Settarget={Settarget}
              onModifyStockClick={onModifyStockClick}
              target={target}
              onModifyProductClick={onModifyProductClick}></CategoryView>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noTemplateContainer}>
          <Text style={[styles.noTemplateText, globalStyles.fontFamily]}>
            No Categories Found
          </Text>
        </View>
      )}
    </View>
  );
};

interface TemplateInfoViewProps {
  template_id: number;
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

const MemoizedTemplateInfoView = React.memo(TemplateInfoView);

export default MemoizedTemplateInfoView;
