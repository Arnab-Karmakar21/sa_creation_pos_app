import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {BrandAddPayload} from '../../../../models/StoreModel';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import {requiredValidator} from '../../../../Validators';
import QubeButton from '../../../../UILibrary/QubeButton';

const BrandAddView = ({
  onBrandAddClick,
  subcategoryName,
  storeCategory,
}: BrandAddViewProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<BrandAddPayload>({
    mode: 'all',
  });
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    formContainer: {
      paddingBottom: 15,
      paddingLeft: '5%',
      paddingRight: '5%',
      width: '50%',
      backgroundColor: '#F1EFF1',
      borderRadius: 10,
      margin: 20,
    },
    spacingMargin: {
      paddingVertical: 10,
    },
  });
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={[styles.formContainer, globalStyles.highBoxShadow]}>
        <View style={styles.spacingMargin}>
          <QubeTextInput
            rules={{...requiredValidator}}
            name="brand_name"
            control={control}
            defaultValue={null}
            placeholder={'Enter Your Product Type'}
            refName={register}
            errors={errors}
            label={'Product Type (*)'}
          />
        </View>
        <View style={[{flexDirection: 'row'}, styles.spacingMargin]}>
          <QubeButton
            onPress={handleSubmit(onBrandAddClick)}
            title={'Add Product Type'}
            color="primary"
            disabled={!!errors.brand_name}></QubeButton>
        </View>
      </View>
    </View>
  );
};

interface BrandAddViewProps {
  onBrandAddClick: any;
  subcategoryName: string;
  storeCategory: number;
}

export default BrandAddView;
