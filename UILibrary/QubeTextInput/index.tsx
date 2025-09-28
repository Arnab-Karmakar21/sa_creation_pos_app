import React from 'react';
import {TextInput, StyleSheet, TextInputProps, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import globalStyles from '../../GlobalStyle';
import {Controller} from 'react-hook-form';

const QubeTextInput = ({
  name,
  rules,
  control,
  defaultValue,
  errors,
  refName,
  autoCapitalize,
  refCopy,
  nextRef,
  submitAction,
  label,
  editable,
  focusable,
  style,
  multilines = false,
  maxLength,
  ...props
}: QubeTextInputProps) => {
  const theme = Object(useTheme());
  const styles = StyleSheet.create({
    input: {
      borderRadius: theme.roundness.mediumRoundness,
      borderWidth: !errors[name] ? 0.6 : 2,
      borderColor: !errors[name]
        ? theme.colors.inputBorder
        : theme.colors.danger,
      borderStyle: 'solid',
      width: '100%',
      backgroundColor: theme.colors.card,
      paddingLeft: 15,
      paddingRight: 15,
      fontSize: theme.fonts.smallFont,
      minHeight: multilines ? 120 : 'auto',
    },
    error: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.danger,
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
      defaultValue={!!defaultValue ? defaultValue.toString() : defaultValue}
      rules={rules}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={style}>
          <Text style={[styles.label, globalStyles.fontFamily]}>{label}</Text>
          <TextInput
            maxLength={maxLength}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            style={[
              styles.input,
              globalStyles.boxShadow,
              globalStyles.fontFamily,
            ]}
            selectionColor={theme.colors.primary}
            // ref={
            //   !!refCopy
            //     ? e => {
            //         refName(e);
            //         refCopy(e);
            //       }
            //     : refName
            // }
            autoCapitalize="none"
            placeholderTextColor={theme.colors.placeholderText}
            onSubmitEditing={() => {
              if (!!nextRef) {
                nextRef.focus();
              } else if (!!submitAction) {
                submitAction();
              }
            }}
            editable={editable}
            focusable={focusable}
            {...props}
          />
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

interface QubeTextInputProps extends TextInputProps {
  name: any;
  rules?: any;
  control: any;
  defaultValue?: any;
  errors: any;
  refName: any;
  refCopy?: any;
  nextRef?: any;
  submitAction?: any;
  label?: string;
  editable?: any;
  focusable?: any;
  style?: any;
  multilines?: any;
  maxLength?: number
}

export default QubeTextInput;
