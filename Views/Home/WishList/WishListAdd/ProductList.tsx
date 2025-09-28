import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {
  SearchProductList,
  WishListPayload,
} from '../../../../models/WishListModels';
import {
  ProductBrandItem,
  ProductCategoryItem,
  ProductSubCategoryItem,
  TemplateItem,
} from '../../../../models/StoreModel';
import QubeSelectAlt from '../../../../UILibrary/QubeSelectAlt';
import {requiredSelectValidator} from '../../../../Validators';
import {Controller, useForm} from 'react-hook-form';
import QubeButton from '../../../../UILibrary/QubeButton';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import {TextInput} from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import Ionicon from 'react-native-vector-icons/Ionicons';
const ProductLists = ({
  product_list,
  GetData,
  templates,
  onCategorySelection,
  onSubCategorySelection,
  onTemplateSelection,
  productBrands,
  productCategories,
  productSubCategories,
  ClearData,
  SearchAction,
  AddProduct,
  wishlist_detail,
  req_flag = 0,
  back,
}: ProductListProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
    watch,
    getValues,
    reset,
  } = useForm<any>({
    mode: 'all',
  });
  const theme: ThemeItem = Object(useTheme());
  const [expand, SetExpand] = useState<boolean>(false);
  const templateSelection = (template_id: number) => {
    setValue('category_id', 0, {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('subcategory_id', 0, {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('brand_id', 0, {
      shouldDirty: false,
      shouldValidate: false,
    });
    if (template_id > 0) {
      onTemplateSelection(template_id);
    }
  };

  const categorySelection = (category_id: number) => {
    setValue('subcategory_id', 0, {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('brand_id', 0, {
      shouldDirty: false,
      shouldValidate: false,
    });
    onCategorySelection(category_id);
  };

  const subCategorySelection = (subcategory_id: number) => {
    setValue('brand_id', 0, {
      shouldDirty: false,
      shouldValidate: false,
    });
    onSubCategorySelection(subcategory_id);
  };
  const FindProduct = (id: number) => {
    return !!wishlist_detail &&
      !!wishlist_detail.product_list &&
      !!wishlist_detail.product_list.find(m => m.product_id === id)
      ? true
      : false;
  };
  const AddNew = () => {
    let payload: SearchProductList = {
      brand_created_by_role:
        !!getValues('brand_id') && !!productBrands && productBrands.length > 0
          ? productBrands.find(m => m.brand_id === +getValues('brand_id'))
              ?.created_by_role
          : undefined,
      category_id: !!getValues('category_id') ? getValues('category_id') : null,
      category_name:
        !!productCategories && productCategories.length > 0
          ? productCategories.find(
              m => m.template_item_id === +getValues('category_id'),
            )?.product_category_name
          : undefined,
      product_id: undefined,
      template_id: !!getValues('template_id') ? getValues('template_id') : null,
      template_name:
        !!templates && templates.length > 0
          ? templates.find(m => m.template_id === +getValues('template_id'))
              ?.template_name
          : undefined,
      subcategory_name:
        !!productSubCategories && productSubCategories.length > 0
          ? productSubCategories.find(
              m => m.product_subcategory_id === +getValues('subcategory_id'),
            )?.subcategory_name
          : undefined,
      subcategory_id: !!getValues('subcategory_id')
        ? getValues('subcategory_id')
        : null,
      brand_name:
        !!productBrands && productBrands.length > 0
          ? productBrands.find(m => m.brand_id === +getValues('brand_id'))
              ?.brand_name
          : undefined,
      product_brand_id: !!getValues('brand_id') ? getValues('brand_id') : null,
      product_description: '',
    };
    AddProduct(payload);
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          padding: 5,
          backgroundColor: theme.colors.primaryTint,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: '#ffff',
            fontSize: theme.fonts.mediumFont,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}>
          Products
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => SetExpand(!expand)}>
          <Text style={{color: theme.colors.background, paddingHorizontal: 3}}>
            Filter
          </Text>
          <Ionicon
            name={
              expand
                ? 'chevron-up-circle-outline'
                : 'chevron-down-circle-outline'
            }
            color={theme.colors.background}
            size={theme.icons.smallIcon}></Ionicon>
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={expand}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <View style={{flex: 1}}>
            <QubeSelectAlt
              rules={{...requiredSelectValidator}}
              name="template_id"
              control={control}
              placeholder="Select Template"
              refName={register}
              errors={errors}
              items={templates}
              valueKey="template_id"
              labelKey="template_name"
              label="Filter Template"
              onSelection={(template_id: number) => {
                templateSelection(template_id);
              }}></QubeSelectAlt>
          </View>
          <View style={{flex: 1}}>
            <QubeSelectAlt
              rules={{...requiredSelectValidator}}
              name="category_id"
              control={control}
              placeholder="Select Category"
              refName={register}
              errors={errors}
              items={productCategories}
              valueKey="template_item_id"
              labelKey="product_category_name"
              label="Filter Category"
              onSelection={(template_item_id: number) => {
                categorySelection(template_item_id);
              }}></QubeSelectAlt>
          </View>
        </View>
        <View
          style={[
            {flexDirection: 'row', alignItems: 'center', paddingBottom: 5},
          ]}>
          <View style={{flex: 1}}>
            <QubeSelectAlt
              rules={{...requiredSelectValidator}}
              name="subcategory_id"
              control={control}
              placeholder="Select Sub-Category"
              refName={register}
              errors={errors}
              items={productSubCategories}
              valueKey="product_subcategory_id"
              labelKey="subcategory_name"
              label="Filter Sub-Category"
              onSelection={(product_subcategory_id: number) => {
                subCategorySelection(product_subcategory_id);
              }}></QubeSelectAlt>
          </View>

          <View style={{flex: 1}}>
            <QubeSelectAlt
              rules={{...requiredSelectValidator}}
              name="brand_id"
              control={control}
              placeholder={'Select Product Type'}
              refName={register}
              errors={errors}
              items={productBrands}
              valueKey="brand_id"
              labelKey="brand_name"
              label={'Filter Product Type'}></QubeSelectAlt>
          </View>
        </View>
        <View style={{}}>
          <Controller
            control={control}
            name={'searching'}
            render={({field: {onChange, onBlur, value}}) => (
              <View
                style={{
                  borderColor: theme.colors.primary,
                  borderWidth: 0.3,
                  width: '100%',
                  padding: 3,
                }}>
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Search..."
                  style={{
                    width: '100%',
                    backgroundColor: theme.colors.card,
                    fontSize: theme.fonts.smallFont,
                    borderWidth: 0.5,
                    borderColor: theme.colors.inputBorder,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                  }}></TextInput>
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 5,
          }}>
          <View style={{width: '30%', paddingHorizontal: 10}}>
            <QubeButton
              color={'placeholderText'}
              onPress={() => (ClearData(), reset())}
              title="Clear Filter"></QubeButton>
          </View>
          <View style={{width: '30%', paddingHorizontal: 10}}>
            <QubeButton
              color={'primary'}
              //   disabled={!start && !end && !search}
              onPress={handleSubmit(SearchAction)}
              title="Filter"></QubeButton>
          </View>
          {req_flag == 0 && (
            <View style={{width: '30%', paddingHorizontal: 10}}>
              <QubeButton
                color={'primary'}
                disabled={!watch('template_id') || !watch('category_id')}
                onPress={() => AddNew()}
                title="New"></QubeButton>
            </View>
          )}
          {req_flag == 1 && (
            <View style={{width: '30%', paddingHorizontal: 10}}>
              <QubeButton
                color={'placeholderText'}
                onPress={() => back()}
                title="Back"></QubeButton>
            </View>
          )}
        </View>
      </Collapsible>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.placeholderText,
            padding: 3,
          }}>
          <View style={{flex: 4}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Product Name
            </Text>
          </View>
          <View style={{flex: 3}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Product Code
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: theme.fonts.smallFont,
              }}>
              Action
            </Text>
          </View>
        </View>
        {!!product_list && product_list.length > 0 && (
          <FlatList
            data={product_list}
            onEndReached={() => GetData()}
            onEndReachedThreshold={0.8}
            renderItem={({item, index}) => (
              <Product
                AddProduct={AddProduct}
                key={index}
                item={item}
                index={index}
                FindProduct={FindProduct}
                req_flag={req_flag}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {product_list?.length == 0 && (
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 20,
            }}>
            <Text
              style={{
                fontSize: theme.fonts.mediumFont,
                color: theme.colors.placeholderText,
              }}>
              {' '}
              No Product Found
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductLists;

interface ProductListProps {
  GetData?: any;
  product_list: SearchProductList[];
  templates: TemplateItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  productBrands: ProductBrandItem[];
  onTemplateSelection: any;
  onCategorySelection: any;
  onSubCategorySelection: any;
  SearchAction?: any;
  ClearData?: any;
  AddProduct?: any;
  wishlist_detail?: WishListPayload;
  req_flag: number;
  back?: any;
}

const Product = ({
  item,
  index,
  AddProduct,
  FindProduct,
  req_flag,
}: ProductProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor:
          index % 2 == 0 ? theme.colors.background : theme.colors.inputBorder,
        padding: 10,
      }}>
      <View style={{flex: 4}}>
        <Text
          style={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: theme.fonts.smallFont,
          }}>
          {item.product_description}
        </Text>
      </View>
      <View style={{flex: 3}}>
        <Text
          style={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: theme.fonts.smallFont,
          }}>
          {
            item?.qr_unique_code?.split('-')[
              item?.qr_unique_code?.split('-').length - 1
            ]
          }
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {req_flag == 0 && FindProduct(item.product_id) ? (
          <Ionicon
            name={'checkmark-circle-outline'}
            color={theme.colors.success}
            size={theme.icons.bigIcon}></Ionicon>
        ) : (
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => AddProduct(item)}>
            <Ionicon
              name={'add-circle-outline'}
              color={theme.colors.primary}
              size={theme.icons.bigIcon}></Ionicon>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

interface ProductProps {
  item: SearchProductList;
  index: number;
  AddProduct?: any;
  FindProduct?: any;
  req_flag: number;
}
