import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {useForm, Controller} from 'react-hook-form';
import {
  ProductBrandItem,
  ProductCategoryItem,
  ProductEditPayload,
  ProductSubCategoryItem,
  StockAddLoadPayload,
  StockAddPayload,
  TemplateItem,
  UnitItem,
  Variant,
  VariantImage,
  Variants,
} from '../../../../models/StoreModel';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import QubeSelectAlt from '../../../../UILibrary/QubeSelectAlt';
import {
  currencyValidator,
  decimalValidator,
  numberValidator,
  requiredSelectValidator,
  requiredValidator,
} from '../../../../Validators';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import QubeSelect from '../../../../UILibrary/QubeSelect';
import QubeButton from '../../../../UILibrary/QubeButton';
import QubeInputPicture from '../../../../UILibrary/QubeInputPicture';
import QubeSwitch from '../../../../UILibrary/QubeSwitch';
import {Card, Icon} from '@rneui/base';
import {showToast} from '../../../../Service/Toast';
import Carousel from 'react-native-reanimated-carousel';
import {RetrieveImageService_one} from '../../../../Service/S3';
import RichTextEditor from '../../../../UILibrary/RichTextEditor';

const StockAddView = ({
  templates,
  units,
  onTemplateSelection,
  productCategories,
  productSubCategories,
  productBrands,
  onCategorySelection,
  onSubCategorySelection,
  onStockAddAction,
  pictureData,
  variantImage,
  captureClicked,
  uploadClicked,
  patchData,
  onBrandSelection,
  singleProductDetail,
  DeleteImage,
  ChangeDefault,
  varients,
  patchProductInfo,
  similar_product,
  Setimage,
  ApiCallSuccessAction,
  BeginApiCallAction,
}: StockAddViewProps) => {
  console.log("image variant :: ", variantImage.map(v => v.variantId))
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
  const [t, Sett] = useState<number>(0);
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

  const MRPRef = useRef();
  const setMRPRef = (ref: any) => {
    MRPRef.current = ref;
  };
  const ProcurementRef = useRef();
  const setProcurementRef = (ref: any) => {
    ProcurementRef.current = ref;
  };

  const sellingPriceRef = useRef();
  const setSellingPriceRef = (ref: any) => {
    sellingPriceRef.current = ref;
  };

  const GSTPercentageRef = useRef();
  const setGSTPercentageRef = (ref: any) => {
    GSTPercentageRef.current = ref;
  };

  const productDiscountRef = useRef();
  const setProductDiscountRef = (ref: any) => {
    productDiscountRef.current = ref;
  };

  const stockAmountRef = useRef();
  const setStockAmountRef = (ref: any) => {
    stockAmountRef.current = ref;
  };

  const [variantBlocks, setVariantBlocks] = useState([{ id: Date.now() }]);

  // Add new block
  const addBlock = () => {
    setVariantBlocks([...variantBlocks, { id: Date.now() }]);
  };

  // Remove block by id
  const removeBlock = (id: number) => {
    if (variantBlocks.length > 1) {
      setVariantBlocks(variantBlocks.filter(block => block.id !== id));
    }
  };

  const transformPayload = (payload: any, block_id: number) => {
    // extract the base product info
    const {
      brand_id,
      product_description,
      unit,
      return_days,
      long_desc,
      template_id,
      category_id,
      subcategory_id,
      created_by_role
    } = payload;

    const actualVariant = {
      procurement_price: Number(payload[`procurement_price_${block_id}`]),
      product_mrp: Number(payload[`product_mrp_${block_id}`]),
      product_selling_price: Number(payload[`product_selling_price_${block_id}`]),
      product_discount: payload[`product_discount_${block_id}`] 
        ? Number(payload[`product_discount_${block_id}`]) 
        : 0,
      product_gst_percentage: payload[`product_gst_percentage_${block_id}`] ? Number(payload[`product_gst_percentage_${block_id}`]) : 0 , 
      stock_quantity: Number(payload[`stock_quantity_${block_id}`]),
      online_flag: payload[`online_flag_${block_id}`],
      approx_weight: Number(payload[`approx_weight_${block_id}`]) || null ,
      online_mrp: Number(payload[`online_mrp_${block_id}`]) || null ,
      online_selling_price: Number(payload[`online_selling_price_${block_id}`]) || null,
      online_discount: Number(payload[`online_discount_${block_id}`]) || null,
      online_gst_percentage: Number(payload[`online_gst_percentage_${block_id}`]) || null ,
      online_qty: Number(payload[`online_qty_${block_id}`]) || null
    };

    return actualVariant;
  }

  const onSubmit = (payload: StockAddPayload) => {
    let brand = productBrands.find((m: any) => m.brand_id === payload.brand_id);
    payload.created_by_role = brand?.created_by_role;
    if (!payload.product_description || payload.product_description == '') {
      let subCategory = productSubCategories.find(
        (m: any) => m.product_subcategory_id == payload.subcategory_id,
      );
      payload.product_description =
        brand?.brand_name + ' ' + subCategory?.subcategory_name;
    }
    console.log('Product add payload ================ >>>>>>>>>>>>>>> ')
    console.log(JSON.stringify(payload))
    payload.variants = [];
    // varients.forEach(m => {
    //   !!payload[m.variant_type.toString()] &&
    //     +payload[m.variant_type.toString()] > 0 &&
    //     payload.variants?.push(payload[m.variant_type.toString()]);
    //   delete payload[m.variant_type.toString()];
    // });

    // console.log('payload :: ', JSON.stringify(payload));

    // Group variant selections block by block
    let newPayload: any = payload;
    variantBlocks.forEach(block => {
      const selected: number[] = [];

      varients.forEach((v, i) => {
        const key = `${v.variant_type}_${i}_${block.id}`;
        if (newPayload[key]) {
          selected.push(+newPayload[key]); // ensure number
          delete newPayload[key]; // clean up
        }
      });

      const actualVariant = transformPayload(newPayload, block.id);

      // let d = variantImage.find(vi => vi.variantId == block.id)?.images || [];
      // console.log("Image fields :: ", Object.keys(d[0]))

      if (selected.length > 0) {
        payload.variants?.push({
          ...actualVariant , 
          productOption: selected,
          productImages: (variantImage.find(vi => vi.variantId == block.id)?.images || []).map(m => ({
            default: m.default,
            doc_name: m.doc_name,
            doc_path: m.doc_path , 
            thum_doc_name: m.thum_doc_name,
            thum_doc_path: m.thumb_doc_path,
            scr_doc_name: m.scr_doc_name,
            scr_doc_path: m.scr_doc_path,
            doc_id: m.doc_id,
          }))
        });
      }
    });

    if (payload.variants.length <= 0)
      return showToast('Atleast one variant required.', 'error');
    onStockAddAction(payload);

    console.log("Updated payload >>>>>>>>>>>>>>>>>>>>>>>")
    console.log(JSON.stringify(payload))
  };

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

  const brandSelection = (brand_id: number) => {
    if (!!brand_id && brand_id > 0) {
      onBrandSelection(
        brand_id,
        productBrands.find(m => m.brand_id == brand_id)?.created_by_role,
      );
      setValue('parent_product_id', 0, {
        shouldDirty: false,
        shouldValidate: false,
      });
    }
  };
  useEffect(() => {
    if (
      !!singleProductDetail &&
      singleProductDetail?.partner_product_id &&
      singleProductDetail?.partner_product_id > 0
    ) {
      setValue('product_description', singleProductDetail.product_description, {
        shouldValidate: true,
      });
      setValue('unit', singleProductDetail.unit, {
        shouldValidate: true,
      });
      setValue('packaged_product', !!singleProductDetail.packaged_product, {
        shouldValidate: true,
      });
      setValue(
        'procurement_price',
        +singleProductDetail?.procurement_price?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue('product_mrp', +singleProductDetail.product_mrp?.toString(), {
        shouldValidate: true,
      });
      setValue(
        'product_selling_price',
        +singleProductDetail.product_selling_price?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue(
        'product_gst_percentage',
        +singleProductDetail.product_gst_percentage?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue(
        'product_discount',
        !!singleProductDetail.product_discount ||
          singleProductDetail.product_discount == 0
          ? +singleProductDetail.product_discount?.toString()
          : undefined,
        {
          shouldValidate: true,
        },
      );
    }
  }, [singleProductDetail]);

  const sellingPriceBlur = (price: number, block_id: number) => {
    let mrp = getValues(`product_mrp_${block_id}`);
    if (!!mrp) {
      let discount = mrp - price;
      let discountPercent = ((discount / mrp) * 100).toFixed(0);
      setValue(`product_discount_${block_id}`, discountPercent, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const discountBlur = (discount: number, block_id: number) => {
    let mrp = getValues(`product_mrp_${block_id}`);
    if (!!mrp) {
      let sellingPrice = (mrp - (mrp * discount) / 100)?.toFixed(2);
      setValue(`product_selling_price_${block_id}`, sellingPrice, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const sellingPriceBlur2 = (price: number, block_id: number) => {
    let mrp = getValues(`online_mrp_${block_id}`);
    if (!!mrp) {
      let discount = mrp - price;
      let discountPercent = ((discount / mrp) * 100).toFixed(0);
      setValue(`online_discount_${block_id}`, discountPercent, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const discountBlur2 = (discount: number, block_id: number) => {
    let mrp = getValues(`online_mrp_${block_id}`);
    if (!!mrp) {
      let sellingPrice = (mrp - (mrp * discount) / 100)?.toFixed(2);
      setValue(`online_selling_price_${block_id}`, sellingPrice, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
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
    let verient: string[] = [];
    !!varients &&
      varients.length > 0 &&
      varients.forEach(m => {
        let temp = getValues(m.variant_type.toString());
        if (!!temp && !!m.variants) {
          verient.push(
            m.variants.find(m => m.variant_types_id == +temp)?.variant_name,
          );
        }
      });
    let count = 0;
    if (!!getValues('packaged_product')) {
      count = getValues('product_quantity');
    }
    let p =
      verient.join(' ') +
      ' ' +
      catagory_name +
      ' ' +
      subcatagory_name +
      ' ' +
      brand_name +
      (count > 0 ? '(with the pack of ' + count + ')' : '');
    setValue('product_description', p);
  };
  // useEffect(() => {
  //   ProductNameCreator();
  // }, [
  //   watch('brand_id'),
  //   watch('category_id'),
  //   watch('subcategory_id'),
  //   watch('packaged_product'),
  //   watch('product_quantity'),
  //   varients.map(m => watch(m.variant_type.toString())),
  // ]);
  let _renderItem = ({item}: any) => {
    return (
      <View style={{width: '100%'}}>
        <Image
          style={styles.image}
          source={{
            uri: RetrieveImageService_one(item.thumb_doc_path),
          }}></Image>
      </View>
    );
  };
  const PatchDesc = (data: string) => {
    setTimeout(() => {
      setValue('product_description', data);
    }, 1000);
  };

  const selectParent = (product_id: number) => {
    BeginApiCallAction({
      count: 1,
      message: 'Fatching. Plase wait...',
    });

    let tp: ProductEditPayload | undefined = similar_product.find(
      m => m.partner_product_id === product_id,
    );
    if (!!tp) {
      setValue('unit', tp.product_unit, {
        shouldValidate: true,
      });
      console.log(tp.packaged_product, tp.online_flag, 'hsdhjgdhjgs');

      setValue('packaged_product', !!tp?.packaged_product ? true : false, {
        shouldValidate: true,
      });
      setValue('procurement_price', tp.procurement_price?.toString(), {
        shouldValidate: true,
      });
      setValue('product_mrp', tp.product_mrp?.toString(), {
        shouldValidate: true,
      });
      setValue('product_selling_price', tp.product_selling_price?.toString(), {
        shouldValidate: true,
      });
      setValue(
        'product_gst_percentage',
        tp.product_gst_percentage?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue('online_flag', tp.online_flag ? true : false, {
        shouldValidate: true,
      });

      setValue('online_discount', tp.online_discount?.toString(), {
        shouldValidate: true,
      });
      setValue('online_gst_percentage', tp.online_gst_percentage?.toString(), {
        shouldValidate: true,
      });
      setValue('online_selling_price', tp.online_selling_price?.toString(), {
        shouldValidate: true,
      });
      setValue('online_mrp', tp.online_mrp?.toString(), {
        shouldValidate: true,
      });
      setValue('approx_weight', tp.approx_weight?.toString(), {
        shouldValidate: true,
      });
      setValue('return_days', tp.return_days?.toString(), {
        shouldValidate: true,
      });
      setValue('long_desc', tp.product_long_description, {
        shouldValidate: true,
      });
      setValue(
        'product_discount',
        !!tp.product_discount || tp.product_discount == 0
          ? tp.product_discount?.toString()
          : null,
        {
          shouldValidate: true,
        },
      );
      tp.variant.forEach((m, index) => {
        setValue(m.product_variant_type?.toString(), +m.product_variant, {
          shouldValidate: true,
        });
        !!tp &&
          index == tp.variant.length - 1 &&
          PatchDesc(tp.product_description);
      });
      Setimage(
        tp.product_images.map((m: any) => ({
          ...m,
          id: Math.random(),
        })),
      );
      Sett(Math.random());
    } else {
      setValue('unit', undefined, {
        shouldValidate: true,
      });
      setValue('packaged_product', false, {
        shouldValidate: true,
      });
      setValue('procurement_price', undefined, {
        shouldValidate: true,
      });
      setValue('product_mrp', undefined, {
        shouldValidate: true,
      });
      setValue('product_selling_price', undefined, {
        shouldValidate: true,
      });
      setValue('product_gst_percentage', undefined, {
        shouldValidate: true,
      });
      setValue('online_flag', false, {
        shouldValidate: true,
      });

      setValue('online_discount', undefined, {
        shouldValidate: true,
      });
      setValue('online_gst_percentage', undefined, {
        shouldValidate: true,
      });
      setValue('approx_weight', undefined, {
        shouldValidate: true,
      });
      setValue('online_selling_price', undefined, {
        shouldValidate: true,
      });
      setValue('online_mrp', undefined, {
        shouldValidate: true,
      });
      setValue('return_days', undefined, {
        shouldValidate: true,
      });
      setValue('long_desc', undefined, {
        shouldValidate: true,
      });
      setValue('product_discount', undefined, {
        shouldValidate: true,
      });
      varients.forEach((element: any) => {
        setValue(element.variant_type.toString(), undefined, {
          shouldValidate: true,
        });
      });
      Setimage([]);
      ApiCallSuccessAction();
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={[{flex: 35}]}>
        <View style={[styles.upperGradient, {flexDirection: 'column'}]}>
          <ImageBackground
            source={require('../../../../Assets/store.jpg')}
            style={{height: '100%', width: '100%'}}
            imageStyle={{opacity: pictureData.length > 0 ? 0.3 : 1}}
            resizeMode="cover">
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.primary,
                width: 150,
                margin: 40,
                // marginTop: '10%',
              }}>
              <Text
                style={[
                  styles.headerText,
                  globalStyles.fontFamily,
                  {opacity: 0.9},
                ]}>
                Add Product
              </Text>
            </View>
            <View>
              <Carousel
                loop
                width={600}
                height={400}
                autoPlay={true}
                data={pictureData}
                mode="parallax"
                scrollAnimationDuration={4000}
                renderItem={_renderItem}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={[styles.lowerSection]}>
        <ScrollView>
          <View style={globalStyles.highBoxShadow}></View>
          <View style={styles.formContainer}>
            <View
              style={[
                {flexDirection: 'row', width: '100%'},
                styles.spacingMargin,
              ]}>
              <View
                style={{
                  width: '60%',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.primary,
                }}>
                {/* <TouchableOpacity
                  style={{width: 20, marginTop: '3%'}}
                  onPress={() => navigation.navigate('store_list')}>
                  <Icon
                    name={'arrow-back-ios'}
                    size={theme.icons.mediumIcon}
                    color={theme.colors.darkTint}
                  />
                </TouchableOpacity> */}
                <Text
                  style={[
                    styles.headerSubText,
                    globalStyles.fontFamily,
                    {marginTop: 20},
                  ]}>
                  Please Enter Your Product's Information Below!
                </Text>
              </View>
              <View style={{width: '40%'}}>
                <Image
                  source={require('../../../../Assets/sa_logo.png')}
                  style={{
                    height: 100,
                    width: 100,
                    alignSelf: 'flex-end',
                    position: 'absolute',
                  }}></Image>
              </View>
            </View>
            <View style={styles.spacingMargin}></View>
            <View
              style={[
                {flexDirection: 'row', alignItems: 'center', marginTop: 40},
              ]}>
              {!!templates && templates.length != 0 && (
                <View style={{flex: 1}}>
                  <QubeSelectAlt
                    rules={{...requiredSelectValidator}}
                    name="template_id"
                    control={control}
                    defaultValue={patchData.template_id}
                    placeholder="Select Template"
                    refName={register}
                    errors={errors}
                    items={templates}
                    valueKey="template_id"
                    labelKey="template_name"
                    label="Template (*)"
                    onSelection={(template_id: number) => {
                      templateSelection(template_id);
                    }}></QubeSelectAlt>
                </View>
              )}
              {!!productCategories && productCategories.length != 0 && (
                <View style={{flex: 1}}>
                  <QubeSelectAlt
                    rules={{...requiredSelectValidator}}
                    name="category_id"
                    control={control}
                    defaultValue={patchData.category_id}
                    placeholder="Select Category"
                    refName={register}
                    errors={errors}
                    items={productCategories}
                    valueKey="template_item_id"
                    labelKey="product_category_name"
                    label="Category (*)"
                    onSelection={(template_item_id: number) => {
                      categorySelection(template_item_id);
                    }}></QubeSelectAlt>
                </View>
              )}
            </View>
            <View
              style={[
                {flexDirection: 'row', alignItems: 'center', paddingBottom: 5},
              ]}>
              {!!productSubCategories && productSubCategories.length != 0 && (
                <View style={{flex: 1}}>
                  <QubeSelectAlt
                    rules={{...requiredSelectValidator}}
                    name="subcategory_id"
                    control={control}
                    defaultValue={patchData.subcategory_id}
                    placeholder="Select Sub-Category"
                    refName={register}
                    errors={errors}
                    items={productSubCategories}
                    valueKey="product_subcategory_id"
                    labelKey="subcategory_name"
                    label="Sub-Category (*)"
                    onSelection={(product_subcategory_id: number) => {
                      subCategorySelection(product_subcategory_id);
                    }}></QubeSelectAlt>
                </View>
              )}
              {
                <View style={{flex: 1}}>
                  <QubeSelectAlt
                    name="brand_id"
                    control={control}
                    defaultValue={patchData.brand_id}
                    placeholder={'Select Product Type'}
                    refName={register}
                    errors={errors}
                    items={productBrands}
                    valueKey="brand_id"
                    labelKey="brand_name"
                    label={'Product Type (*)'}
                    onSelection={(brand_id: number) => {
                      if (brand_id > 0) {
                        brandSelection(brand_id);
                      }
                    }}></QubeSelectAlt>
                </View>
              }
            </View>
            <View style={styles.spacingMargin}>
              <QubeSelectAlt
                rules={{...requiredSelectValidator}}
                name="parent_product_id"
                control={control}
                placeholder={'Select Similar Product'}
                refName={register}
                errors={errors}
                items={similar_product}
                valueKey="partner_product_id"
                labelKey="product_description"
                label={'Select Similar Product'}
                onSelection={(product_id: number) => {
                  selectParent(product_id);
                }}></QubeSelectAlt>
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                name="product_description"
                control={control}
                defaultValue={''}
                placeholder={'Enter Product Title'}
                refName={register}
                errors={errors}
                label={'Product Title'}
                editable={!singleProductDetail}
                // focusable={!singleProductDetail}
              />
            </View>
            {/* {
              varients.map(item => (
                <View key={item.variant_type} style={styles.spacingMargin}>
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
                    label={'Select ' + item.variant_type_name}
                    enabled={!singleProductDetail}></QubeSelect>
                </View>
              ))

              // Add varients functionality need to incorporate here.
            } */}

            <Text
              style={[
                styles.headerSubText,
                globalStyles.fontFamily,
                {marginTop: 20, color: theme.colors.primary},
              ]}>
              Add Variant Details
            </Text>
            {variantBlocks.map(block => (
              <View key={block.id} style={{ marginBottom: 20, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 15, backgroundColor: "#fafafa", }}>
                {varients.map((item, vIndex) => (
                  <View key={`${item.variant_type}_${block.id}`} style={styles.spacingMargin}>
                    <QubeSelect 
                      name={`${item.variant_type}_${vIndex}_${block.id}`} // unique field name
                      control={control}
                      defaultValue={null}
                      placeholder={"Select " + item.variant_type_name}
                      refName={register}
                      errors={errors}
                      items={item.variants}
                      valueKey="variant_types_id"
                      labelKey="variant_name"
                      label={"Select " + item.variant_type_name}
                      enabled={!singleProductDetail}
                    />
                  </View>
                ))}

                <View style={styles.spacingMargin}>
                  <QubeTextInput
                    rules={{...requiredValidator, ...currencyValidator}}
                    name={`procurement_price_${block.id}`}
                    control={control}
                    defaultValue={null}
                    placeholder="Enter Procurement Price"
                    refName={register}
                    errors={errors}
                    label="Procurement Price (*)"
                    refCopy={setProcurementRef}
                    nextRef={sellingPriceRef.current}
                    blurOnSubmit={false}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.spacingMargin}>
                  <QubeTextInput
                    rules={{...requiredValidator, ...currencyValidator}}
                    name={`product_mrp_${block.id}`}
                    control={control}
                    defaultValue={null}
                    placeholder="Enter MRP"
                    refName={register}
                    errors={errors}
                    label="MRP (*)"
                    refCopy={setMRPRef}
                    nextRef={sellingPriceRef.current}
                    blurOnSubmit={false}
                    keyboardType="number-pad"
                  />
                </View>

                <View
                  style={[
                    styles.spacingMargin,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <View style={{flex: 1}}>
                    <QubeTextInput
                      rules={{...currencyValidator}}
                      name={`product_selling_price_${block.id}`}
                      control={control}
                      defaultValue={null}
                      placeholder="Enter Selling Price"
                      refName={register}
                      errors={errors}
                      label="Selling Price (*)"
                      refCopy={setSellingPriceRef}
                      nextRef={GSTPercentageRef.current}
                      keyboardType="number-pad"
                      onEndEditing={event => {
                        sellingPriceBlur(
                          !!event.nativeEvent.text ? +event.nativeEvent.text : 0,
                          block.id
                        );
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      {
                        fontSize: theme.fonts.smallFont,
                        color: theme.colors.primary,
                        flexShrink: 1,
                        paddingHorizontal: 4,
                        paddingTop: 20,
                      },
                      globalStyles.fontFamily,
                    ]}>
                    OR
                  </Text>
                  <View style={{flex: 1}}>
                    <QubeTextInput
                      rules={{...numberValidator}}
                      name={`product_discount_${block.id}`}
                      control={control}
                      defaultValue={null}
                      placeholder="Enter Discount Rate"
                      refName={register}
                      errors={errors}
                      label="Discount (%) (*)"
                      refCopy={setProductDiscountRef}
                      nextRef={GSTPercentageRef.current}
                      keyboardType="number-pad"
                      onEndEditing={event => {
                        discountBlur(
                          !!event.nativeEvent.text ? +event.nativeEvent.text : 0,
                          block.id
                        );
                      }}
                    />
                  </View>
                </View>
                <View style={styles.spacingMargin}>
                  <QubeTextInput
                    rules={{...requiredValidator, ...numberValidator}}
                    name={`product_gst_percentage_${block.id}`}
                    control={control}
                    defaultValue={null}
                    placeholder="Enter GST Rate"
                    refName={register}
                    errors={errors}
                    label="GST Rate (%) (*)"
                    refCopy={setGSTPercentageRef}
                    nextRef={stockAmountRef.current}
                    blurOnSubmit={false}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.spacingMargin}>
                  <QubeTextInput
                    rules={{...requiredValidator, ...numberValidator}}
                    name={`stock_quantity_${block.id}`}
                    control={control}
                    defaultValue={null}
                    placeholder="Enter Stock Quantity"
                    refName={register}
                    errors={errors}
                    label="Stock Quantity (*)"
                    keyboardType="number-pad"
                    refCopy={setStockAmountRef}
                  />
                </View>
                <View style={styles.spacingMargin}>
                  <QubeSwitch
                    control={control}
                    name={`online_flag_${block.id}`}
                    defaultValue={false}
                    disabled={!!singleProductDetail}
                    label={'Visiable On Online Store'}
                  />
                </View>
                {watch(`online_flag_${block.id}`) && (
                  <>
                    <View style={styles.spacingMargin}>
                      <QubeTextInput
                        rules={{...requiredValidator, ...decimalValidator}}
                        name={`approx_weight_${block.id}`}
                        control={control}
                        defaultValue={null}
                        placeholder="Approx Weight (KG)"
                        refName={register}
                        errors={errors}
                        label="Approx Weight (KG) (*)"
                        blurOnSubmit={false}
                        keyboardType="number-pad"
                      />
                    </View>
                    <View style={styles.spacingMargin}>
                      <QubeTextInput
                        rules={{...requiredValidator, ...currencyValidator}}
                        name={`online_mrp_${block.id}`}
                        control={control}
                        defaultValue={null}
                        placeholder="Enter Online MRP"
                        refName={register}
                        errors={errors}
                        label="Online MRP (*)"
                        refCopy={setMRPRef}
                        nextRef={sellingPriceRef.current}
                        blurOnSubmit={false}
                        keyboardType="number-pad"
                      />
                    </View>
                    <View
                      style={[
                        styles.spacingMargin,
                        {flexDirection: 'row', alignItems: 'center'},
                      ]}>
                      <View style={{flex: 1}}>
                        <QubeTextInput
                          rules={{...currencyValidator}}
                          name={`online_selling_price_${block.id}`}
                          control={control}
                          defaultValue={null}
                          placeholder="Enter Online Selling Price"
                          refName={register}
                          errors={errors}
                          label="Online Selling Price (*)"
                          refCopy={setSellingPriceRef}
                          nextRef={GSTPercentageRef.current}
                          keyboardType="number-pad"
                          onEndEditing={event => {
                            sellingPriceBlur2(
                              !!event.nativeEvent.text
                                ? +event.nativeEvent.text
                                : 0,
                              block.id
                            );
                          }}
                        />
                      </View>
                      <Text
                        style={[
                          {
                            fontSize: theme.fonts.smallFont,
                            color: theme.colors.primary,
                            flexShrink: 1,
                            paddingHorizontal: 4,
                            paddingTop: 20,
                          },
                          globalStyles.fontFamily,
                        ]}>
                        OR
                      </Text>
                      <View style={{flex: 1}}>
                        <QubeTextInput
                          rules={{...numberValidator}}
                          name={`online_discount_${block.id}`}
                          control={control}
                          defaultValue={null}
                          placeholder="Enter Online Discount Rate"
                          refName={register}
                          errors={errors}
                          label="Online Discount (%) (*)"
                          refCopy={setProductDiscountRef}
                          nextRef={GSTPercentageRef.current}
                          keyboardType="number-pad"
                          onEndEditing={event => {
                            discountBlur2(
                              !!event.nativeEvent.text
                                ? +event.nativeEvent.text
                                : 0,
                              block.id
                            );
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.spacingMargin}>
                      <QubeTextInput
                        rules={{...requiredValidator, ...numberValidator}}
                        name={`online_gst_percentage_${block.id}`}
                        control={control}
                        defaultValue={null}
                        placeholder="Enter Online GST Rate"
                        refName={register}
                        errors={errors}
                        label="Online GST Rate (%) (*)"
                        refCopy={setGSTPercentageRef}
                        nextRef={stockAmountRef.current}
                        blurOnSubmit={false}
                        keyboardType="number-pad"
                      />
                    </View>
                    <View style={styles.spacingMargin}>
                      <QubeTextInput
                        rules={{...requiredValidator, ...numberValidator}}
                        name={`online_qty_${block.id}`}
                        control={control}
                        defaultValue={null}
                        placeholder="Enter Online Stock Quantity"
                        refName={register}
                        errors={errors}
                        label="Online Stock Quantity (*)"
                        keyboardType="number-pad"
                        onEndEditing={event => {
                          !!event.nativeEvent.text &&
                            !!getValues('stock_quantity') &&
                            +event.nativeEvent.text >
                              +getValues('stock_quantity') &&
                            (showToast(
                              'Online Stock Quantity can not grater than Stock Quantity',
                              'errorToast',
                            ),
                            setValue('online_qty', undefined));
                        }}
                        refCopy={setStockAmountRef}
                      />
                    </View>
                  </>
                )}

                <View style={styles.spacingMargin}>
                  <QubeInputPicture
                    blockId={block.id}
                    // imageURI={pictureData}
                    imageURI={variantImage.find(variant => variant.variantId == block.id)?.images || []}
                    label="Product Image"
                    captureClicked={captureClicked}
                    DeleteImage={DeleteImage}
                    ChangeDefault={ChangeDefault}
                    uploadClicked={uploadClicked}></QubeInputPicture>
                </View>

                {/* Remove button */}
                {variantBlocks.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeBlock(block.id)}
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      marginTop: 10,
                      alignSelf: "flex-end",
                    }}
                  >
                    {/* <Text style={{ color: "white", textAlign: "center" }}>Remove</Text> */}
                    <Icon name="delete" size={22} color="#f00" />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {/* Add button */}
            <TouchableOpacity
              onPress={addBlock}
              style={{
                alignSelf: "flex-end",
                backgroundColor: theme.colors.primary,
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>+ Add Variant</Text>
            </TouchableOpacity>

            <View style={styles.spacingMargin}>
              <QubeSelect
                rules={{...requiredValidator, ...numberValidator}}
                name="unit"
                control={control}
                defaultValue={null}
                placeholder="Select measurement unit"
                refName={register}
                errors={errors}
                items={units}
                valueKey="unit_id"
                labelKey="unit_long"
                label="Measurement unit (*)"
                enabled={!singleProductDetail}></QubeSelect>
            </View>
            {/* <View style={styles.spacingMargin}>
              <QubeSwitch
                control={control}
                name={'packaged_product'}
                defaultValue={false}
                disabled={!!singleProductDetail}
                label={'Packaged/ Combo Product?'}
              />
            </View> */}
            {/* {watch('packaged_product') && (
              <View style={styles.spacingMargin}>
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
                  errors={errors}
                  label={'Quantity/Combo Count (*)'}
                  nextRef={MRPRef.current}
                  blurOnSubmit={false}
                  keyboardType="number-pad"
                />
              </View>
            )} */}
            
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator, ...numberValidator}}
                name="return_days"
                control={control}
                defaultValue={null}
                placeholder="Days limits for Return (in Days)"
                refName={register}
                errors={errors}
                label="Days limits for Return (*)"
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.spacingMargin}>
              <RichTextEditor
                name="long_desc"
                control={control}
                defaultValue={''}
                errors={errors}
                label="Product description"
                dependancy={t}
              />
            </View>
            {/*
              <View style={styles.spacingMargin}>
                <QubeInputPicture
                  imageURI={pictureData}
                  label="Product Image"
                  captureClicked={captureClicked}
                  DeleteImage={DeleteImage}
                  ChangeDefault={ChangeDefault}
                  uploadClicked={uploadClicked}></QubeInputPicture>
              </View>
            */}
            <View style={styles.spacingMargin}>
              <View style={{flex: 1}}>
                <QubeButton
                  onPress={handleSubmit(onSubmit)}
                  title="Add Stock"
                  color="primary"
                  // disabled={
                  //   !!errors.brand_id ||
                  //   !!errors.product_description ||
                  //   !!errors.unit ||
                  //   !!errors.product_quantity ||
                  //   !!errors.product_mrp ||
                  //   !!errors.product_selling_price ||
                  //   !!errors.product_gst_percentage ||
                  //   !!errors.product_discount ||
                  //   !!errors.stock_quantity
                  // }
                ></QubeButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

interface StockAddViewProps {
  templates: TemplateItem[];
  units: UnitItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  productBrands: ProductBrandItem[];
  onTemplateSelection: any;
  onCategorySelection: any;
  onSubCategorySelection: any;
  onStockAddAction: any;
  patchData: StockAddLoadPayload;
  onBrandSelection: any;
  patchProductInfo: any;
  singleProductDetail: ProductEditPayload;
  DeleteImage?: any;
  ChangeDefault?: any;
  pictureData: any[];
  variantImage: VariantImage[];
  captureClicked: any;
  uploadClicked: any;
  varients: Variants[];
  similar_product: ProductEditPayload[];
  Setimage?: any;
  ApiCallSuccessAction?: any;
  BeginApiCallAction?: any;
}

export default StockAddView;
