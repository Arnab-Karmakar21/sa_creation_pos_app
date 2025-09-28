import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import TemplateInfoView from './TemplateInfoView';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {Search, TemplateItem} from '../../../../models/StoreModel';
import QubeButton from '../../../../UILibrary/QubeButton';
import globalStyles from '../../../../GlobalStyle';
import {ProductSearch} from '../../../../Service/Partner';

const Tab = createMaterialTopTabNavigator();

const InventoryTemplateTabs = ({
  templates,
  storeId,
  onAddBrandClicked,
  qcPartnerId,
  onStockAddEvent,
  onModifyStockClick,
  onModifyProductClick,
  ShowQR,
  navigation,
}: InventoryTemplateTabsProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [searchString, SetSearchString] = useState<string>('');
  const [result, SetResult] = useState<Search[]>([]);
  const [target, Settarget] = useState<any>(undefined);
  useEffect(() => {
    let timmer = setTimeout(() => {
      Searchs();
    }, 800);
    return () => !!timmer && clearTimeout(timmer);
  }, [searchString]);
  useEffect(() => {
    if (target) {
      navigation.navigate(target.template);
    }
  }, [target]);
  const Searchs = () => {
    try {
      if (!!searchString && searchString != '') {
        ProductSearch({search_string: searchString})
          .then(response => {
            if (!!response?.data?.data && !response?.data?.exception) {
              SetResult(response.data.data);
            }
          })
          .catch(error => {});
      } else {
        SetSearchString('');
        SetResult([]);
      }
    } catch (err) {}
  };

  return !!templates ? (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 55,
          backgroundColor: '#ffff',
          borderBottomColor: theme.colors.inputBorder,
          borderBottomWidth: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '50%',
            borderColor: theme.colors.inputBorder,
            borderWidth: 1,
            borderRadius: theme.roundness.smallRoundness,
          }}>
          <TextInput
            style={{fontSize: theme.fonts.mediumFont}}
            value={searchString}
            onChangeText={value => SetSearchString(value)}
            placeholder="Search..."></TextInput>
        </View>
      </View>
      <View
        style={[
          {
            position: 'absolute',
            width: '50%',
            top: 55,
            left: '25%',
            backgroundColor: '#ffff',
            flexDirection: 'column',
            zIndex: 999,
          },
          globalStyles.boxShadow,
        ]}>
        {!!result &&
          result.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => (
                Settarget({
                  template: item.template_name,
                  catagory: item.category_id,
                  subcatagory: item.product_subcategory_id,
                  brand: item.product_brand_id,
                }),
                SetSearchString(''),
                SetResult([]),
                Keyboard.dismiss()
              )}
              style={{
                padding: 8,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.inputBorder,
              }}>
              <Text style={{fontSize: theme.fonts.bigFont}}>
                {item?.template_name}
                {item?.category_name && '>'}
                {item?.category_name} {item.subcategory_name && '>'}{' '}
                {item?.subcategory_name}
                {item?.product_brand_name && '>'} {item?.product_brand_name}{' '}
                {item?.product_description && '>'} {item?.product_description}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            textTransform: 'none',
            fontFamily: 'sans-serif-condensed',
            fontSize: theme.fonts.mediumFont,
          },
          tabBarStyle: {
            paddingHorizontal: 0,
            // width: 300,
          },
          tabBarScrollEnabled: true,
          swipeEnabled: false,
          lazy: true,
        }}
        backBehavior="none"
        initialRouteName={templates[0].template_name}>
        {templates.map(template => (
          <Tab.Screen
            name={template.template_name}
            key={template.template_id}
            children={() => (
              <TemplateInfoView
                template_id={template.template_id}
                onAddBrandClicked={onAddBrandClicked}
                storeId={storeId}
                qcPartnerId={qcPartnerId}
                onStockAddEvent={onStockAddEvent}
                ShowQR={ShowQR}
                onModifyStockClick={onModifyStockClick}
                target={target}
                Settarget={Settarget}
                onModifyProductClick={onModifyProductClick}></TemplateInfoView>
            )}
          />
        ))}
      </Tab.Navigator>
    </View>
  ) : (
    <></>
  );
};

interface InventoryTemplateTabsProps {
  templates: TemplateItem[];
  storeId: number;
  onAddBrandClicked: any;
  qcPartnerId: number;
  onStockAddEvent: any;
  onModifyStockClick: any;
  onModifyProductClick: any;
  ShowQR?: any;
  navigation?: any;
}

export default InventoryTemplateTabs;
