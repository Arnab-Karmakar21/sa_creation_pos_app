import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import globalStyles from '../../GlobalStyle';
import {Controller} from 'react-hook-form';
import {Picker, PickerProps} from '@react-native-picker/picker';

const QubeSelect = ({
  name,
  rules,
  control,
  defaultValue,
  errors,
  refName,
  placeholder,
  items,
  valueKey,
  labelKey,
  labelKeys,
  style,
  label,
  onSelection,
  enabled,
  ...props
}: QubeSelectProps) => {
  const theme = Object(useTheme());
  const styles = StyleSheet.create({
    selectContainer: {
      borderRadius: theme.roundness.mediumRoundness,
      borderWidth: !errors[name] ? 0.6 : 2,
      borderColor: !errors[name]
        ? theme.colors.inputBorder
        : theme.colors.danger,
      borderStyle: 'solid',
      width: '100%',
      backgroundColor: theme.colors.card,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: theme.fonts.smallFont,
    },
    error: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.danger,
    },
    floatingLabel: {
      position: 'absolute',
      left: 10,
      top: 10,
      backgroundColor: theme.colors.background,
    },
    label: {
      color: theme.colors.primary,
      paddingBottom: 5,
      fontSize: theme.fonts.smallFont,
    },
  });

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={style}>
          <Text style={[styles.label, globalStyles.fontFamily]}>{label}</Text>
          <View
            style={[
              {width: '100%'},
              styles.selectContainer,
              globalStyles.boxShadow,
            ]}>
            <Picker
              onBlur={onBlur}
              // ref={refName}
              onValueChange={(itemValue, itemIndex) => {
                !!onSelection && onSelection(itemValue);
                onChange(itemValue);
              }}
              selectedValue={value}
              itemStyle={[
                {fontSize: theme.fonts.smallFont},
                globalStyles.fontFamily,
              ]}
              enabled={enabled}
              mode="dropdown"
              {...props}>
              {!!placeholder && (
                <Picker.Item
                  label={placeholder}
                  value={-1}
                  key={-1}
                  color={theme.colors.placeholderText}
                />
              )}
              {items.map((m: any) =>
                !!labelKeys ? (
                  <Picker.Item
                    label={labelKeys?.reduce((total, value) => {
                      return total + ' ' + m[value];
                    }, '')}
                    value={m[valueKey]}
                    key={m[valueKey]}
                  />
                ) : (
                  <Picker.Item
                    label={m[labelKey]}
                    value={m[valueKey]}
                    key={m[valueKey]}
                  />
                ),
              )}
            </Picker>
          </View>
          <Text
            style={[
              !!errors[name] ? styles.error : {display: 'none'},
              globalStyles.fontFamily,
            ]}>
            {!!errors[name] && '* ' + errors[name].message.toString()}
          </Text>
        </View>
      )}
    />
  );
};

interface QubeSelectProps extends PickerProps {
  name: any;
  rules?: any;
  control: any;
  defaultValue?: any;
  errors: any;
  refName: any;
  placeholder?: string;
  items: any[];
  valueKey: string;
  labelKey: string;
  labelKeys?: string[];
  style?: any;
  label?: string;
  onSelection?: any;
  enabled?: any;
}

export default QubeSelect;
