import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {useForm} from 'react-hook-form';
import {StockModifyPayload} from '../../../../models/StoreModel';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import {
  decimalValidator,
  numberValidator,
  requiredSelectValidator,
  requiredValidator,
} from '../../../../Validators';
import QubeSelect from '../../../../UILibrary/QubeSelect';
import QubeButton from '../../../../UILibrary/QubeButton';
import {DomainData} from '../../../../models/DomainModels';
import {Card} from '@rneui/base';

const StockModifyView = ({
  store_id,
  store_name,
  partner_product_id,
  product_description,
  txnTypes,
  onSubmit,
  online,
}: StockModifyViewProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<StockModifyPayload>({
    mode: 'all',
  });
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
  });
  useEffect(() => {
    setValue('procurement_price', undefined);
  }, [watch('txn_type')]);
  return (
    <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <Card
        containerStyle={{
          alignSelf: 'center',
          width: '60%',
          elevation: 20,
          marginBottom: '1.5%',
          borderRadius: 10,
        }}>
        <View style={styles.formContainer}>
          <View style={styles.spacingMargin}>
            <QubeTextInput
              rules={{...requiredValidator, ...numberValidator}}
              name="stock_quantity"
              control={control}
              defaultValue={null}
              placeholder="Enter Quantity"
              refName={register}
              errors={errors}
              label="Quantity (*)"
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.spacingMargin}>
            <QubeSelect
              rules={{...requiredSelectValidator}}
              name="txn_type"
              control={control}
              defaultValue={null}
              placeholder="Select Transaction Type"
              refName={register}
              errors={errors}
              items={txnTypes}
              valueKey="domain_code"
              labelKey="domain_value"
              label="Transaction Type (*)"></QubeSelect>
          </View>
          {watch('txn_type') === 1 && online == 0 && (
            <View style={styles.spacingMargin}>
              <QubeTextInput
                rules={{...requiredValidator, ...decimalValidator}}
                name="procurement_price"
                control={control}
                defaultValue={null}
                placeholder="Enter Procurement Price"
                refName={register}
                errors={errors}
                label="Procurement Price (*)"
                blurOnSubmit={false}
                keyboardType="number-pad"
              />
            </View>
          )}

          <View style={styles.spacingMargin}>
            <View style={{flex: 1}}>
              <QubeButton
                onPress={handleSubmit(onSubmit)}
                title="Update Stock"
                color="primary"
                disabled={
                  !!errors.txn_type || !!errors.stock_quantity
                }></QubeButton>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

interface StockModifyViewProps {
  store_id: number;
  store_name: string;
  partner_product_id: number;
  product_description: string;
  txnTypes: DomainData[];
  onSubmit: any;
  online?: number;
}

export default StockModifyView;
