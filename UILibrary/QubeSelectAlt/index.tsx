import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import globalStyles from '../../GlobalStyle';
import {Controller} from 'react-hook-form';
import {Picker, PickerProps} from '@react-native-picker/picker';
import {ThemeItem} from '../../Theme/LightTheme';

const QubeSelectAlt = ({
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
  ...props
}: QubeSelectProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    container: {
      borderColor: theme.colors.primary,
      borderWidth: 0.3,
      width: '100%',
      padding: 3,
    },
    selectContainer: {
      width: '100%',
      backgroundColor: theme.colors.card,
      fontSize: theme.fonts.smallFont,
      borderWidth: 0.5,
      borderColor: theme.colors.inputBorder,
      borderRadius: 5,
      paddingHorizontal: 5,
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
      fontSize: theme.fonts.smallFont,
      position: 'absolute',
      top: 2,
      left: 8,
      zIndex: 10,
    },
  });

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.container}>
          <Text style={[styles.label, globalStyles.fontFamily]}>{label}</Text>
          <View style={[{width: '100%'}, styles.selectContainer]}>
            <Picker
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
              {items.map((m: any) => (
                <Picker.Item
                  label={m[labelKey]}
                  value={m[valueKey]}
                  key={m[valueKey]}
                />
              ))}
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
}

export default QubeSelectAlt;
