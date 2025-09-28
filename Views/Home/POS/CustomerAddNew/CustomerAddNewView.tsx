import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {Card} from '@rneui/base';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import {useForm} from 'react-hook-form';
import {
  emailValidator,
  phoneValidator,
  requiredValidator,
} from '../../../../Validators';
import QubeButton from '../../../../UILibrary/QubeButton';

const CustomerAddNewView = ({
  new_customer,
  SendData,
}: CustomerAddNewViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    mode: 'all',
  });
  const Submit = (data: any) => {
    SendData(data);
  };
  return (
    <View
      style={{
        flex: 1,
        borderLeftColor: theme.colors.inputBorder,
        borderLeftWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Card
        containerStyle={{
          width: '80%',
          borderRadius: 10,
          marginHorizontal: 10,
          minHeight: '50%',
          marginTop: -70,
        }}>
        <View
          style={{
            borderBottomColor: theme.colors.inputBorder,
            borderBottomWidth: 0.5,
            padding: 5,
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            Customer Information
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <QubeTextInput
            rules={{...phoneValidator, ...requiredValidator}}
            name="mobile"
            control={control}
            defaultValue={''}
            placeholder="Customer Mobile No."
            refName={register}
            errors={errors}
            keyboardType="phone-pad"
            blurOnSubmit={false}
            editable={!new_customer}
            label="Customer Mobile No. (*)"
          />
        </View>
        {new_customer && (
          <>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <QubeTextInput
                  rules={{...requiredValidator}}
                  name="f_name"
                  control={control}
                  defaultValue={''}
                  placeholder="Customer First Name"
                  refName={register}
                  errors={errors}
                  keyboardType="default"
                  blurOnSubmit={false}
                  label="Customer First Name (*)"
                />
              </View>
              <View style={{width: '45%'}}>
                <QubeTextInput
                  rules={{...requiredValidator}}
                  name="l_name"
                  control={control}
                  defaultValue={''}
                  placeholder="Customer Last Name"
                  refName={register}
                  errors={errors}
                  keyboardType="default"
                  blurOnSubmit={false}
                  label="Customer Last Name (*)"
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <QubeTextInput
                rules={{...emailValidator}}
                name="email"
                control={control}
                defaultValue={''}
                placeholder="Customer Email ID"
                refName={register}
                errors={errors}
                keyboardType="email-address"
                blurOnSubmit={false}
                label="Customer Email ID"
              />
            </View>
          </>
        )}

        <View style={{marginTop: 40}}>
          <QubeButton
            onPress={handleSubmit(Submit)}
            title="Next"
            disabled={
              !!errors.partner_email || !!errors.partner_phone
            }></QubeButton>
        </View>
      </Card>
    </View>
  );
};

export default CustomerAddNewView;

interface CustomerAddNewViewProps {
  new_customer?: boolean;
  SendData?: any;
}
