import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {
  TemplateItem,
  ProductCategoryItem,
  ProductSubCategoryItem,
  ProductBrandItem,
  Variants,
  UnitItem,
  ProductEditPayload,
} from '../../../../models/StoreModel';
import {ProductList, WishListPayload} from '../../../../models/WishListModels';
import {useForm} from 'react-hook-form';
import QubeSelectAlt from '../../../../UILibrary/QubeSelectAlt';
import {
  currencyValidator,
  numberValidator,
  requiredSelectValidator,
  requiredValidator,
} from '../../../../Validators';
import QubeInputPicture from '../../../../UILibrary/QubeInputPicture';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import QubeSelect from '../../../../UILibrary/QubeSelect';
import globalStyles from '../../../../GlobalStyle';
import {showToast} from '../../../../Service/Toast';
import {RetrieveImageService_one} from '../../../../Service/S3';
import QubeSwitch from '../../../../UILibrary/QubeSwitch';
import QubeButton from '../../../../UILibrary/QubeButton';
import Ionicon from 'react-native-vector-icons/Ionicons';
const StockCreateView = ({
  onCategorySelection,
  onSubCategorySelection,
  onTemplateSelection,
  productBrands,
  productCategories,
  productSubCategories,
  templates,
  varients,
  units,
  captureClicked,
  pictureData,
  uploadClicked,
  ChangeDefault,
  DeleteImage,
  patchData,
  onProductAddEditEvent,
  AddBrand,
  singleProductDetail,
  editable,
  Back,
}: StockCreateViewPros) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    formContainer: {
      paddingBottom: 15,
      paddingLeft: '5%',
      paddingRight: '5%',
    },
    spacingMargin: {
      paddingVertical: 10,
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.colors.addon2,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
    },
    headerSubText: {
      fontSize: 18,
      color: theme.colors.darkTint,
    },
    lowerSection: {
      backgroundColor: theme.colors.background,
      flex: 40,
      // borderTopLeftRadius: theme.roundness.bigRoundness,
      // borderTopRightRadius: theme.roundness.bigRoundness,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    upperGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    image: {
      height: '100%',
      aspectRatio: 1,
      width: undefined,
      borderRadius: theme.roundness.mediumRoundness,
    },
  });
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
  const templateSelection = (template_id: number) => {
    setValue('category_id', 0, {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue('subcategory_id', 0, {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('brand_id', 0, {
      shouldDirty: false,
      shouldValidate: true,
    });
    if (template_id > 0) {
      onTemplateSelection(template_id);
    }
  };

  const categorySelection = (category_id: number) => {
    setValue('subcategory_id', 0, {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue('brand_id', 0, {
      shouldDirty: false,
      shouldValidate: true,
    });
    onCategorySelection(category_id);
  };

  const subCategorySelection = (subcategory_id: number) => {
    setValue('brand_id', 0, {
      shouldDirty: false,
      shouldValidate: true,
    });
    onSubCategorySelection(subcategory_id);
  };

  useEffect(() => {
    if (!!patchData && !patchData?.partner_product_id && !singleProductDetail) {
      !!patchData.template_id && setValue('template_id', patchData.template_id);
      !!patchData.category_id && setValue('category_id', patchData.category_id);
      !!patchData.subcategory_id &&
        setValue('subcategory_id', patchData.subcategory_id);
      !!patchData.template_id && setValue('brand_id', patchData.brand_id);
    } else if (!!singleProductDetail) {
      setValue(
        'packaged_product',
        !!singleProductDetail.packaged_product ? true : false,
        {
          shouldValidate: true,
        },
      );
      setValue('product_unit', singleProductDetail.product_unit, {
        shouldValidate: true,
      });
      setValue('template_id', singleProductDetail.template_id, {
        shouldValidate: true,
      });
      setValue('category_id', singleProductDetail.product_category_id, {
        shouldValidate: true,
      });
      setValue('subcategory_id', singleProductDetail?.product_subcategory_id, {
        shouldValidate: true,
      });
      setValue('brand_id', singleProductDetail?.product_brand_id, {
        shouldValidate: true,
      });
      !!singleProductDetail.product_quantity &&
        setValue(
          'product_quantity',
          singleProductDetail?.product_quantity?.toString(),
          {
            shouldValidate: true,
          },
        );
      singleProductDetail.variant.forEach((m, index) => {
        setValue(m.product_variant_type?.toString(), m.product_variant, {
          shouldValidate: true,
        });
        index == singleProductDetail.variant.length - 1 &&
          PatchDesc(singleProductDetail.product_description);
      });
    }
  }, [patchData, singleProductDetail]);

  const PatchDesc = (data: string) => {
    setTimeout(() => {
      setValue('product_description', singleProductDetail?.product_description);
    }, 1000);
  };
  const onSubmit = (payload: any) => {
    payload.product_quantity = !!payload.packaged_product
      ? payload.product_quantity
      : null;
    payload.variants = [];
    varients.forEach(m => {
      !!payload[m.variant_type.toString()] &&
        payload.variants?.push(payload[m.variant_type.toString()]);
      delete payload[m.variant_type.toString()];
    });
    onProductAddEditEvent(payload);
  };
  const ProductNameCreator = () => {
    let brand = getValues('brand_id');
    let brand_name: any = '';
    if (!!brand)
      brand_name = productBrands.find(m => m.brand_id == brand)?.brand_name;
    let catagory = getValues('category_id');
    let catagory_name: any = '';
    if (!!catagory)
      catagory_name = productCategories.find(
        m => m.template_item_id == catagory,
      )?.product_category_name;
    let sub_cat = getValues('subcategory_id');
    let subcatagory_name: any = '';
    if (!!sub_cat)
      subcatagory_name = productSubCategories.find(
        m => m.product_subcategory_id == sub_cat,
      )?.subcategory_name;
    let verient: any[] = [];
    !!varients &&
      varients.length > 0 &&
      varients.forEach(m => {
        let temp = getValues(m.variant_type.toString());
        if (!!temp && !!m.variants) {
          verient.push(
            m?.variants?.find(m => m?.variant_types_id == +temp)?.variant_name,
          );
        }
      });
    let count = 0;
    if (!!getValues('packaged_product')) {
      count = getValues('product_quantity');
    }
    let p =
      (!!verient && verient.length > 0 ? verient.join(' ') : '') +
      (!!catagory_name ? ' ' : '') +
      catagory_name +
      (!!subcatagory_name ? ' ' : '') +
      subcatagory_name +
      (!!brand_name ? ' ' : '') +
      brand_name +
      (count > 0 ? '(with the pack of ' + count + ')' : '');
    setValue('product_description', p);
  };
  useEffect(() => {
    ProductNameCreator();
  }, [
    watch('template_id'),
    watch('brand_id'),
    watch('category_id'),
    watch('subcategory_id'),
    watch('packaged_product'),
    watch('product_quantity'),
    varients.map(m => watch(m.variant_type.toString())),
  ]);
  return (
    <View
      style={{
        backgroundColor: '#ffff',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: '100%',
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
          Add Product
        </Text>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            flexWrap: 'wrap',
          }}>
          <View style={[styles.spacingMargin, {width: '48%'}]}>
            <QubeSelect
              rules={{...requiredValidator}}
              name="template_id"
              control={control}
              placeholder="Select Template"
              refName={register}
              errors={errors}
              items={templates}
              valueKey="template_id"
              labelKey="template_name"
              label="Template (*)"
              enabled={editable}
              onSelection={(template_id: number) => {
                templateSelection(template_id);
              }}></QubeSelect>
          </View>
          <View style={[styles.spacingMargin, {width: '48%'}]}>
            <QubeSelect
              rules={{...requiredValidator}}
              name="category_id"
              control={control}
              placeholder="Select Category"
              refName={register}
              errors={errors}
              items={productCategories}
              valueKey="template_item_id"
              labelKey="product_category_name"
              label="Category (*)"
              enabled={editable}
              onSelection={(template_item_id: number) => {
                categorySelection(template_item_id);
              }}></QubeSelect>
          </View>
          <View style={[styles.spacingMargin, {width: '48%'}]}>
            <QubeSelect
              rules={{...requiredValidator}}
              name="subcategory_id"
              control={control}
              placeholder="Select Sub-Category"
              refName={register}
              errors={errors}
              items={productSubCategories}
              valueKey="product_subcategory_id"
              labelKey="subcategory_name"
              label="Sub-Category (*)"
              enabled={editable}
              onSelection={(product_subcategory_id: number) => {
                subCategorySelection(product_subcategory_id);
              }}></QubeSelect>
          </View>

          <View
            style={[
              styles.spacingMargin,
              {width: '48%', flexDirection: 'row'},
            ]}>
            <View style={{flex: 1}}>
              <QubeSelect
                rules={{...requiredValidator}}
                name="brand_id"
                control={control}
                placeholder={'Select Brand'}
                refName={register}
                errors={errors}
                items={productBrands}
                valueKey="brand_id"
                labelKey="brand_name"
                enabled={editable}
                label={'Brand (*)'}></QubeSelect>
            </View>
            {!!watch('subcategory_id') &&
              watch('subcategory_id') > 0 &&
              !!editable && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 25,
                    paddingLeft: 5,
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => AddBrand(+getValues('subcategory_id'))}>
                    <Ionicon
                      name={'add-circle'}
                      color={theme.colors.primary}
                      size={theme.icons.bigIcon}></Ionicon>
                  </TouchableOpacity>
                </View>
              )}
          </View>
          {varients.map(item => (
            <View
              key={item.variant_type}
              style={[styles.spacingMargin, {width: '48%'}]}>
              <QubeSelect
                // rules={{...requiredSelectValidator}}
                name={item.variant_type.toString()}
                control={control}
                defaultValue={null}
                placeholder={'Select ' + item.variant_type_name}
                refName={register}
                errors={errors}
                items={item.variants}
                valueKey="variant_types_id"
                labelKey="variant_name"
                enabled={editable}
                label={'Select ' + item.variant_type_name}></QubeSelect>
            </View>
          ))}
          <View style={[styles.spacingMargin, {width: '48%'}]}>
            <QubeSelect
              rules={{...requiredValidator}}
              name="product_unit"
              control={control}
              defaultValue={null}
              placeholder="Select measurement unit"
              refName={register}
              errors={errors}
              items={units}
              enabled={editable}
              valueKey="unit_id"
              labelKey="unit_long"
              label="Measurement unit (*)"></QubeSelect>
          </View>
          <View
            style={[
              styles.spacingMargin,
              {width: '48%', justifyContent: 'center'},
            ]}>
            <QubeSwitch
              control={control}
              disabled={!editable}
              name={'packaged_product'}
              defaultValue={false}
              label={'Packaged/ Combo Product?'}
            />
          </View>

          {watch('packaged_product') && (
            <View style={[styles.spacingMargin, {width: '48%'}]}>
              <QubeTextInput
                rules={
                  watch('packaged_product')
                    ? {...requiredValidator, ...numberValidator}
                    : {}
                }
                name="product_quantity"
                control={control}
                defaultValue={null}
                placeholder="Enter Quantity/Combo Count"
                refName={register}
                editable={editable}
                errors={errors}
                label={'Quantity/Combo Count (*)'}
                blurOnSubmit={false}
                keyboardType="number-pad"
              />
            </View>
          )}
          <View style={[styles.spacingMargin, {width: '48%'}]}>
            <QubeTextInput
              name="product_description"
              control={control}
              defaultValue={''}
              placeholder={"Enter Product's Title"}
              refName={register}
              errors={errors}
              editable={editable}
              label={'Product Title (*)'}
              // editable={!singleProductDetail}
              // focusable={!singleProductDetail}
            />
          </View>
          <View style={[styles.spacingMargin, {width: '100%'}]}>
            <QubeInputPicture
              imageURI={pictureData}
              label="Store Image"
              captureClicked={captureClicked}
              DeleteImage={DeleteImage}
              ChangeDefault={ChangeDefault}
              disabled={!editable}
              uploadClicked={uploadClicked}></QubeInputPicture>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{width: '45%'}}>
              <QubeButton
                onPress={() => Back()}
                title="Back"
                color="placeholderText"></QubeButton>
            </View>
            {editable && (
              <View style={{width: '45%'}}>
                <QubeButton
                  onPress={handleSubmit(onSubmit)}
                  title="Create Product"
                  color="primary"
                  disabled={
                    !!errors.template_id ||
                    !!errors.product_description ||
                    !!errors.product_unit ||
                    !!errors.brand_id ||
                    !!errors.subcategory_name ||
                    !!errors.category_id
                  }></QubeButton>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StockCreateView;

interface StockCreateViewPros {
  templates: TemplateItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  productBrands: ProductBrandItem[];
  onTemplateSelection: any;
  onCategorySelection: any;
  onSubCategorySelection: any;
  varients: Variants[];
  units: UnitItem[];
  DeleteImage?: any;
  ChangeDefault?: any;
  captureClicked: any;
  uploadClicked: any;
  pictureData: any;
  patchData?: any;
  onProductAddEditEvent?: any;
  AddBrand?: any;
  singleProductDetail?: ProductEditPayload;
  editable?: boolean;
  Back?: any;
}
