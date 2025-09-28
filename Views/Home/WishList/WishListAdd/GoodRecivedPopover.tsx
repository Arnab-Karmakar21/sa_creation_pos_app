import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect} from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {ProductList} from '../../../../models/WishListModels';
import QubeSwitch from '../../../../UILibrary/QubeSwitch';
import {Controller, useForm} from 'react-hook-form';
import QubeButton from '../../../../UILibrary/QubeButton';
import {
  currencyValidator,
  numberValidator,
  requiredValidator,
} from '../../../../Validators';
import {showIndefiniteToast} from '../../../../Service/Toast';
import Toast from 'react-native-toast-message';
const GoodRecivedPopover = ({
  flag,
  SetFlag,
  ProductList,
  GoodRecivedAdd,
}: GoodRecivedPopoverProps) => {
  const theme: ThemeItem = Object(useTheme());
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
  const Submit = (data: any) => {
    GoodRecivedAdd(data);
  };
  useEffect(() => {
    reset();
  }, [flag]);

  const sellingPriceBlur = (price: number) => {
    let mrp = getValues('product_mrp');
    if (!!mrp) {
      let discount = mrp - price;
      let discountPercent = ((discount / mrp) * 100).toFixed(0);
      setValue('product_discount', discountPercent, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const discountBlur = (discount: number) => {
    let mrp = getValues('product_mrp');
    if (!!mrp) {
      let sellingPrice = (mrp - (mrp * discount) / 100)?.toFixed(2);
      setValue('product_selling_price', sellingPrice, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const sellingPriceBlur2 = (price: number) => {
    let mrp = getValues('online_mrp');
    if (!!mrp) {
      let discount = mrp - price;
      let discountPercent = ((discount / mrp) * 100).toFixed(0);
      setValue('online_discount', discountPercent, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const discountBlur2 = (discount: number) => {
    let mrp = getValues('online_mrp');
    if (!!mrp) {
      let sellingPrice = (mrp - (mrp * discount) / 100)?.toFixed(2);
      setValue('online_selling_price', sellingPrice, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };
  const onCheckQuantity = (qty: number, field: string) => {
    let total_count =
      (!!getValues('damaged') ? +getValues('damaged') : 0) +
      (!!getValues('returned') ? +getValues('returned') : 0) +
      (!!getValues('recieved') ? +getValues('recieved') : 0);
    if (!!ProductList?.quantity && total_count > +ProductList?.quantity) {
      showIndefiniteToast('Total quantity mismatch.', 'rgba(0, 0, 0, 0.7)');
      setValue(field, '0');
    }
  };

  return (
    <Modal
      style={{
        width: '90%',
        // position: 'absolute',
        // top: '-5%',
        // left: '5%',
        zIndex: 2,
        height: '80%',
        paddingLeft: '5%',
      }}
      testID={'modal'}
      onBackdropPress={() => SetFlag(false)}
      propagateSwipe={true}
      isVisible={flag}>
      {flag && <Toast />}
      <View
        style={{
          backgroundColor: '#ffff',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
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
            Update Goods
          </Text>
        </View>
        <ScrollView style={{paddingTop: 10}}>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Product Name
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '600',
                  color: theme.colors.textColor,
                }}>
                {!!ProductList?.new_product_description
                  ? ProductList?.new_product_description
                  : ProductList?.product_description}
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Quantity
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '600',
                  color: theme.colors.textColor,
                }}>
                {ProductList?.quantity}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Procurement Price
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '600',
                  color: theme.colors.textColor,
                }}>
                {ProductList?.procurement_price}
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                MRP (*)
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: errors.product_mrp ? 1.5 : 0.5,
                borderColor: errors.product_mrp
                  ? theme.colors.danger
                  : theme.colors.placeholderText,
                padding: 5,
              }}>
              <Controller
                control={control}
                rules={{...requiredValidator, ...currencyValidator}}
                name={'product_mrp'}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="MRP"
                    style={{
                      paddingVertical: 0,
                      fontWeight: 'bold',
                      fontSize: theme.fonts.mediumFont,
                    }}
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Selling Price (*)
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: errors.product_selling_price ? 1.5 : 0.5,
                borderColor: errors.product_selling_price
                  ? theme.colors.danger
                  : theme.colors.placeholderText,
                padding: 5,
              }}>
              <Controller
                control={control}
                name={'product_selling_price'}
                rules={{...requiredValidator, ...currencyValidator}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      paddingVertical: 0,
                      fontWeight: 'bold',
                      fontSize: theme.fonts.mediumFont,
                    }}
                    placeholder="Selling Price"
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onEndEditing={event => {
                      sellingPriceBlur(
                        !!event.nativeEvent.text ? +event.nativeEvent.text : 0,
                      );
                    }}
                  />
                )}
              />
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Discount (%) (*)
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: errors.product_discount ? 1.5 : 0.5,
                borderColor: errors.product_discount
                  ? theme.colors.danger
                  : theme.colors.placeholderText,
                padding: 5,
              }}>
              <Controller
                control={control}
                name={'product_discount'}
                rules={{...requiredValidator, ...numberValidator}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      paddingVertical: 0,
                      fontWeight: 'bold',
                      fontSize: theme.fonts.mediumFont,
                    }}
                    keyboardType="number-pad"
                    value={value}
                    placeholder="Discount"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onEndEditing={event => {
                      discountBlur(
                        !!event.nativeEvent.text ? +event.nativeEvent.text : 0,
                      );
                    }}
                  />
                )}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Enter GST Rate (*)
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: errors.product_gst_percentage ? 1.5 : 0.5,
                borderColor: errors.product_gst_percentage
                  ? theme.colors.danger
                  : theme.colors.placeholderText,
                padding: 5,
              }}>
              <Controller
                control={control}
                name={'product_gst_percentage'}
                rules={{...requiredValidator, ...numberValidator}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      paddingVertical: 0,
                      fontWeight: 'bold',
                      fontSize: theme.fonts.mediumFont,
                    }}
                    keyboardType="number-pad"
                    placeholder="Enter GST Rate"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Recieved Quantity (*)
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: errors.recieved ? 1.5 : 0.5,
                borderColor: errors.recieved
                  ? theme.colors.danger
                  : theme.colors.placeholderText,
                padding: 5,
              }}>
              <Controller
                control={control}
                name={'recieved'}
                rules={{...requiredValidator, ...numberValidator}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      paddingVertical: 0,
                      fontWeight: 'bold',
                      fontSize: theme.fonts.mediumFont,
                    }}
                    keyboardType="number-pad"
                    placeholder="Recieved Quantity"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onEndEditing={event => {
                      onCheckQuantity(
                        !!event.nativeEvent.text ? +event.nativeEvent.text : 0,
                        'recieved',
                      );
                    }}
                  />
                )}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Return Quantity (*)
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: errors.returned ? 1.5 : 0.5,
                borderColor: errors.returned
                  ? theme.colors.danger
                  : theme.colors.placeholderText,
                padding: 5,
              }}>
              <Controller
                control={control}
                name={'returned'}
                rules={{...requiredValidator, ...numberValidator}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      paddingVertical: 0,
                      fontWeight: 'bold',
                      fontSize: theme.fonts.mediumFont,
                    }}
                    keyboardType="number-pad"
                    placeholder="Return Quantity"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onEndEditing={event => {
                      onCheckQuantity(
                        !!event.nativeEvent.text ? +event.nativeEvent.text : 0,
                        'returned',
                      );
                    }}
                  />
                )}
              />
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: 0.5,
                borderColor: theme.colors.placeholderText,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  fontWeight: '800',
                  color: theme.colors.primary,
                }}>
                Damage Quantity (*)
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                borderWidth: errors.damaged ? 1.5 : 0.5,
                borderColor: errors.damaged
                  ? theme.colors.danger
                  : theme.colors.placeholderText,
                padding: 5,
              }}>
              <Controller
                control={control}
                name={'damaged'}
                rules={{...requiredValidator, ...numberValidator}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      paddingVertical: 0,
                      fontWeight: 'bold',
                      fontSize: theme.fonts.mediumFont,
                    }}
                    keyboardType="number-pad"
                    placeholder="Damage Quantity"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onEndEditing={event => {
                      onCheckQuantity(
                        !!event.nativeEvent.text ? +event.nativeEvent.text : 0,
                        'damaged',
                      );
                    }}
                  />
                )}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <QubeSwitch
              control={control}
              name={'online_flag'}
              defaultValue={false}
              label={'Visiable On Online Store'}
            />
          </View>
          {watch('online_flag') && (
            <>
              <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                <View
                  style={{
                    width: '25%',
                    borderWidth: 0.5,
                    borderColor: theme.colors.placeholderText,
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: theme.fonts.mediumFont,
                      fontWeight: '800',
                      color: theme.colors.primary,
                    }}>
                    Online MRP (*)
                  </Text>
                </View>
                <View
                  style={{
                    width: '25%',
                    borderWidth: errors.online_mrp ? 1.5 : 0.5,
                    borderColor: errors.online_mrp
                      ? theme.colors.danger
                      : theme.colors.placeholderText,
                    padding: 5,
                  }}>
                  <Controller
                    rules={{...requiredValidator, ...numberValidator}}
                    control={control}
                    name={'online_mrp'}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={{
                          paddingVertical: 0,
                          fontWeight: 'bold',
                          fontSize: theme.fonts.mediumFont,
                        }}
                        keyboardType="number-pad"
                        placeholder="Online MRP"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </View>
                <View
                  style={{
                    width: '25%',
                    borderWidth: 0.5,
                    borderColor: theme.colors.placeholderText,
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: theme.fonts.mediumFont,
                      fontWeight: '800',
                      color: theme.colors.primary,
                    }}>
                    Online Selling Price (*)
                  </Text>
                </View>
                <View
                  style={{
                    width: '25%',
                    borderWidth: errors.online_selling_price ? 1.5 : 0.5,
                    borderColor: errors.online_selling_price
                      ? theme.colors.danger
                      : theme.colors.placeholderText,
                    padding: 5,
                  }}>
                  <Controller
                    control={control}
                    rules={{...requiredValidator, ...numberValidator}}
                    name={'online_selling_price'}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={{
                          paddingVertical: 0,
                          fontWeight: 'bold',
                          fontSize: theme.fonts.mediumFont,
                        }}
                        keyboardType="number-pad"
                        placeholder="Online Selling Price"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        onEndEditing={event => {
                          sellingPriceBlur2(
                            !!event.nativeEvent.text
                              ? +event.nativeEvent.text
                              : 0,
                          );
                        }}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                <View
                  style={{
                    width: '25%',
                    borderWidth: 0.5,
                    borderColor: theme.colors.placeholderText,
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: theme.fonts.mediumFont,
                      fontWeight: '800',
                      color: theme.colors.primary,
                    }}>
                    Online Discount (%) (*)
                  </Text>
                </View>
                <View
                  style={{
                    width: '25%',
                    borderWidth: errors.online_discount ? 1.5 : 0.5,
                    borderColor: errors.online_discount
                      ? theme.colors.danger
                      : theme.colors.placeholderText,
                    padding: 5,
                  }}>
                  <Controller
                    control={control}
                    name={'online_discount'}
                    rules={{...requiredValidator, ...numberValidator}}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={{
                          paddingVertical: 0,
                          fontWeight: 'bold',
                          fontSize: theme.fonts.mediumFont,
                        }}
                        keyboardType="number-pad"
                        placeholder="Online Discount"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        onEndEditing={event => {
                          discountBlur(
                            !!event.nativeEvent.text
                              ? +event.nativeEvent.text
                              : 0,
                          );
                        }}
                      />
                    )}
                  />
                </View>
                <View
                  style={{
                    width: '25%',
                    borderWidth: 0.5,
                    borderColor: theme.colors.placeholderText,
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: theme.fonts.mediumFont,
                      fontWeight: '800',
                      color: theme.colors.primary,
                    }}>
                    Online Quantity (*)
                  </Text>
                </View>
                <View
                  style={{
                    width: '25%',
                    borderWidth: errors.online_qty ? 1.5 : 0.5,
                    borderColor: errors.online_qty
                      ? theme.colors.danger
                      : theme.colors.placeholderText,
                    padding: 5,
                  }}>
                  <Controller
                    control={control}
                    name={'online_qty'}
                    rules={{...requiredValidator, ...numberValidator}}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={{
                          paddingVertical: 0,
                          fontWeight: 'bold',
                          fontSize: theme.fonts.mediumFont,
                        }}
                        keyboardType="number-pad"
                        value={value}
                        placeholder="Online Quantity"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        onEndEditing={event => {
                          !!event.nativeEvent.text &&
                            !!getValues('stock_quantity') &&
                            +event.nativeEvent.text >
                              +getValues('stock_quantity') &&
                            (showIndefiniteToast(
                              'Online Stock Quantity can not grater than Stock Quantity',
                              'errorToast',
                            ),
                            setValue('online_qty', undefined));
                        }}
                      />
                    )}
                  />
                </View>
              </View>
            </>
          )}

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-evenly',
              padding: 10,
            }}>
            <View style={{width: '35%'}}>
              <QubeButton
                color={'placeholderText'}
                //   disabled={!start && !end && !search}
                onPress={() => SetFlag(false)}
                title="Close"></QubeButton>
            </View>
            <View style={{width: '35%'}}>
              <QubeButton
                color={'primary'}
                disabled={
                  (!!watch('damaged') ? +getValues('damaged') : 0) +
                    (!!watch('returned') ? +getValues('returned') : 0) +
                    (!!watch('recieved') ? +getValues('recieved') : 0) !=
                  ProductList?.quantity
                }
                onPress={handleSubmit(Submit)}
                title="Save"></QubeButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default GoodRecivedPopover;
interface GoodRecivedPopoverProps {
  flag: boolean;
  SetFlag?: any;
  ProductList?: ProductList;
  GoodRecivedAdd?: any;
}
