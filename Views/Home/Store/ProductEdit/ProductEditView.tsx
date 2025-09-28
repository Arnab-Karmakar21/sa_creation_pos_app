import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  ImageBackground,
  Image,
} from 'react-native';
import {
  ProductEditPayload,
  UnitItem,
  Variants,
} from '../../../../models/StoreModel';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import {Card} from '@rneui/base';
import QubeButton from '../../../../UILibrary/QubeButton';
import QubeInputPicture from '../../../../UILibrary/QubeInputPicture';
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
import QubeSwitch from '../../../../UILibrary/QubeSwitch';
import {DomainData} from '../../../../models/DomainModels';
import {showToast} from '../../../../Service/Toast';
import Carousel from 'react-native-reanimated-carousel';
import {RetrieveImageService_one} from '../../../../Service/S3';
import RichTextEditor from '../../../../UILibrary/RichTextEditor';
import {Base64} from 'base64-string';
const ProductEditView = ({
  units,
  singleProductDetail,
  captureClicked,
  uploadClicked,
  pictureData,
  onProductEditEvent,
  varients,
  ChangeDefault,
  DeleteImage,
  Setimage,
  similar_product,
}: ProductEditViewProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
    getValues,
    watch,
    reset,
  } = useForm<any>({
    mode: 'all',
  });
  const enc = new Base64();
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
      fontSize: 40,
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

  const sellingPriceBlur = (price: number) => {
    let mrp = getValues('product_mrp');
    if (!!mrp) {
      let discount = mrp - price;
      let discountPercent = ((discount / mrp) * 100).toFixed(0);
      setValue('product_discount', +discountPercent, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const discountBlur = (discount: number) => {
    let mrp = getValues('product_mrp');
    if (!!mrp) {
      let sellingPrice = (mrp - (mrp * discount) / 100).toFixed(0);
      setValue('product_selling_price', +sellingPrice, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (payload: ProductEditPayload) => {
    payload = {...singleProductDetail, ...payload};
    payload.variants = [];
    varients.forEach(m => {
      !!payload[m.variant_type.toString()] &&
        +payload[m.variant_type.toString()] > 0 &&
        payload.variants?.push(payload[m.variant_type.toString()]);
      delete payload[m.variant_type.toString()];
    });
    if (payload.variants.length <= 0)
      return showToast('Atleast one variant required.', 'error');
    onProductEditEvent(payload);
  };
  const isBase64 = (value: string) => !value.includes(' ');
  useEffect(() => {
    if (!!singleProductDetail) {
      if (!!singleProductDetail && singleProductDetail.parent_product_id) {
        setValue('parent_product_id', singleProductDetail.parent_product_id, {
          shouldValidate: true,
        });
      }
      setValue('unit', singleProductDetail.product_unit, {
        shouldValidate: true,
      });
      setValue(
        'packaged_product',
        !!singleProductDetail.packaged_product ? 1 : 0,
        {
          shouldValidate: true,
        },
      );

      setValue('product_mrp', singleProductDetail.product_mrp?.toString(), {
        shouldValidate: true,
      });
      setValue(
        'product_selling_price',
        singleProductDetail.product_selling_price?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue(
        'product_gst_percentage',
        singleProductDetail.product_gst_percentage?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue('online_flag', singleProductDetail.online_flag ? true : false, {
        shouldValidate: true,
      });

      setValue(
        'online_discount',
        singleProductDetail.online_discount?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue(
        'online_gst_percentage',
        singleProductDetail.online_gst_percentage?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue('online_qty', singleProductDetail.online_quantity?.toString(), {
        shouldValidate: true,
      });
      setValue('approx_weight', singleProductDetail.approx_weight?.toString(), {
        shouldValidate: true,
      });
      setValue(
        'online_selling_price',
        singleProductDetail.online_selling_price?.toString(),
        {
          shouldValidate: true,
        },
      );
      setValue('online_mrp', singleProductDetail.online_mrp?.toString(), {
        shouldValidate: true,
      });
      setValue('return_days', singleProductDetail.return_days?.toString(), {
        shouldValidate: true,
      });
      setValue(
        'long_desc',
        !!singleProductDetail.product_long_description &&
          isBase64(singleProductDetail.product_long_description)
          ? enc.decode(singleProductDetail.product_long_description)
          : '',
        {
          shouldValidate: true,
        },
      );
      setValue(
        'product_discount',
        !!singleProductDetail.product_discount ||
          singleProductDetail.product_discount == 0
          ? singleProductDetail.product_discount?.toString()
          : null,
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
  }, [singleProductDetail]);
  const PatchDesc = (data: string) => {
    setTimeout(() => {
      setValue('product_description', data);
    }, 1000);
  };

  useEffect(() => {
    if (!!singleProductDetail && !!singleProductDetail.packaged_product) {
      setValue(
        'product_quantity',
        singleProductDetail.product_quantity?.toString(),
        {
          shouldValidate: true,
        },
      );
    }
  }, [watch('packaged_product')]);
  const sellingPriceBlur2 = (price: number) => {
    let mrp = +getValues('online_mrp');
    if (!!mrp) {
      let discount = mrp - price;
      let discountPercent = ((discount / mrp) * 100).toFixed(0);
      setValue('online_discount', discountPercent.toString(), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const discountBlur2 = (discount: number) => {
    console.log(discount);

    let mrp = +getValues('online_mrp');
    if (!!mrp) {
      let sellingPrice = (mrp - (mrp * discount) / 100)?.toFixed(2);
      setValue('online_selling_price', sellingPrice.toString(), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };
  // const ProductNameCreator = () => {
  //   if (!!singleProductDetail) {
  //     let verient: string[] = [];
  //     varients.forEach(m => {
  //       let temp = getValues(m.variant_type?.toString());
  //       if (!!temp) {
  //         verient.push(
  //           m?.variants.find(m => m?.variant_types_id == +temp)?.variant_name,
  //         );
  //       }
  //     });
  //     let count = 0;
  //     if (!!getValues('packaged_product')) {
  //       count = getValues('product_quantity');
  //     }
  //     let p =
  //       verient.join(' ') +
  //       ' ' +
  //       singleProductDetail.product_category_name +
  //       ' ' +
  //       singleProductDetail.subcategory_name +
  //       ' ' +
  //       singleProductDetail.product_brand_name +
  //       (count > 0 ? '(with the pack of ' + count + ')' : '');
  //     setValue('product_description', p);
  //   }
  // };
  // useEffect(() => {
  //   // ProductNameCreator();
  // }, [
  //   watch('packaged_product'),
  //   watch('product_quantity'),
  //   [...varients.map(m => watch(m.variant_type?.toString()))],
  // ]);

  let _renderItem = ({item}: any) => {
    console.log('item.thumb_doc_path :: ', item.thumb_doc_path); 
    return (
      <View style={{width: '100%'}}>
        <Image
          style={styles.image}
          source={{
            // uri: RetrieveImageService_one(item.thumb_doc_path),  // Change the S3 signed url to image url path from sacreation.co.in server 
            uri: item.thumb_doc_path,
          }}></Image>
      </View>
    );
  };

  console.log('pictureData :: ', pictureData);
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={[{flex: 40}]}>
        <View style={[styles.upperGradient, {flexDirection: 'column'}]}>
          <ImageBackground
            source={require('../../../../Assets/mandal2.jpg')}
            style={{height: '100%', width: '100%'}}
            imageStyle={{opacity: pictureData.length > 0 ? 0.8 : 1}}
            resizeMode="cover">
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.primary,
                width: 260,
                margin: 40,
                // marginTop: '10%',
              }}>
              <Text
                style={[
                  styles.headerText,
                  globalStyles.fontFamily,
                  {opacity: 0.9},
                ]}>
                Update Product
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
          <View style={styles.formContainer}>
            <View style={[{alignSelf: 'flex-start'}, styles.spacingMargin]}>
              <Text style={[styles.headerSubText, globalStyles.fontFamily]}>
                Please Enter Your Product's Information Below!
              </Text>
            </View>
            {!!singleProductDetail && singleProductDetail.parent_product_id && (
              <View style={styles.spacingMargin}>
                <QubeSelect
                  rules={{...requiredSelectValidator}}
                  name="parent_product_id"
                  control={control}
                  placeholder={'Select Similar Product'}
                  refName={register}
                  errors={errors}
                  enabled={false}
                  items={similar_product}
                  valueKey="partner_product_id"
                  labelKey="product_description"
                  label={'Select Similar Product'}></QubeSelect>
              </View>
            )}

            <View style={styles.spacingMargin}>
              <QubeTextInput
                name="product_description"
                control={control}
                defaultValue={''}
                placeholder={'Enter Product Title'}
                refName={register}
                errors={errors}
                label={'Product Title'}
                // editable={!singleProductDetail}
                focusable={!singleProductDetail}
              />
            </View>
            {varients.map(item => (
              <View key={item.variant_type} style={styles.spacingMargin}>
                <QubeSelect
                  rules={{...requiredSelectValidator}}
                  name={item.variant_type?.toString()}
                  control={control}
                  defaultValue={null}
                  placeholder={'Select ' + item.variant_type_name}
                  refName={register}
                  errors={errors}
                  items={item.variants}
                  valueKey="variant_types_id"
                  labelKey="variant_name"
                  label={'Select ' + item.variant_type_name + ' (*)'}
                  // enabled={!singleProductDetail}
                ></QubeSelect>
              </View>
            ))}
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
            <View style={styles.spacingMargin}>
              <QubeSwitch
                control={control}
                name={'packaged_product'}
                defaultValue={true}
                disabled={!!singleProductDetail}
                label={'Packaged/ Combo Product?'}
              />
            </View>
            {!!watch('packaged_product') && (
              <View style={styles.spacingMargin}>
                <QubeTextInput
                  rules={{...requiredValidator, ...numberValidator}}
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
            )}
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator, ...currencyValidator}}
                name="product_mrp"
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
                  name="product_selling_price"
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
                  name="product_discount"
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
                    );
                  }}
                />
              </View>
            </View>
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator, ...numberValidator}}
                name="product_gst_percentage"
                control={control}
                defaultValue={null}
                placeholder="Enter GST Rate"
                refName={register}
                errors={errors}
                label="GST Rate (%) (*)"
                refCopy={setGSTPercentageRef}
                nextRef={GSTPercentageRef.current}
                blurOnSubmit={false}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeSwitch
                control={control}
                name={'online_flag'}
                defaultValue={true}
                disabled={!singleProductDetail}
                label={'Visiable On Online Store'}
              />
            </View>
            {watch('online_flag') && (
              <>
                <View style={styles.spacingMargin}>
                  <QubeTextInput
                    rules={{...requiredValidator, ...currencyValidator}}
                    name="approx_weight"
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
                    rules={{...requiredValidator, ...decimalValidator}}
                    name="online_mrp"
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
                      name="online_selling_price"
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
                      name="online_discount"
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
                        );
                      }}
                    />
                  </View>
                </View>
                <View style={styles.spacingMargin}>
                  <QubeTextInput
                    rules={{...requiredValidator, ...numberValidator}}
                    name="online_gst_percentage"
                    control={control}
                    defaultValue={null}
                    placeholder="Enter Online GST Rate"
                    refName={register}
                    errors={errors}
                    label="Online GST Rate (%) (*)"
                    refCopy={setGSTPercentageRef}
                    // nextRef={stockAmountRef.current}
                    blurOnSubmit={false}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.spacingMargin}>
                  <QubeTextInput
                    rules={{...requiredValidator, ...numberValidator}}
                    name="online_qty"
                    control={control}
                    defaultValue={null}
                    placeholder="Enter Online Stock Quantity"
                    refName={register}
                    errors={errors}
                    label="Online Stock Quantity (*)"
                    keyboardType="number-pad"
                    onEndEditing={event => {
                      !!event.nativeEvent.text &&
                        !!singleProductDetail.product_quantity &&
                        +event.nativeEvent.text >
                          singleProductDetail.product_quantity &&
                        (showToast(
                          'Online Stock Quantity can not grater than Stock Quantity',
                          'errorToast',
                        ),
                        setValue('online_qty', undefined));
                    }}
                    // refCopy={setStockAmountRef}
                  />
                </View>
              </>
            )}
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
                dependancy={
                  !!singleProductDetail?.product_long_description &&
                  isBase64(singleProductDetail?.product_long_description)
                    ? enc.decode(singleProductDetail?.product_long_description)
                    : ''
                }
              />
            </View>
            <View style={styles.spacingMargin}>
              <QubeInputPicture
                imageURI={pictureData}
                label="Store Image"
                captureClicked={captureClicked}
                DeleteImage={DeleteImage}
                ChangeDefault={ChangeDefault}
                uploadClicked={uploadClicked}></QubeInputPicture>
            </View>
            <View style={styles.spacingMargin}>
              <View style={{flex: 1}}>
                <QubeButton
                  onPress={handleSubmit(onSubmit)}
                  title="Update Product"
                  color="primary"
                  disabled={
                    !!errors.product_description ||
                    !!errors.product_quantity ||
                    !!errors.product_mrp ||
                    !!errors.product_selling_price ||
                    !!errors.product_gst_percentage ||
                    !!errors.product_discount
                  }></QubeButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

interface ProductEditViewProps {
  units: UnitItem[];
  singleProductDetail: ProductEditPayload;
  captureClicked: any;
  uploadClicked: any;
  pictureData: any;
  onProductEditEvent: any;
  storeCategory: number;
  routeParams: any;
  DeleteImage?: any;
  ChangeDefault?: any;
  varients: Variants[];
  similar_product: ProductEditPayload[];
  Setimage?: any;
}

export default ProductEditView;
