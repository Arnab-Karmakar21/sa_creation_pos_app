import React from 'react';
import {View, Text, SwitchProps, Switch, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import globalStyles from '../../GlobalStyle';
import {ThemeItem} from '../../Theme/LightTheme';

const QubeSwitch = ({
  label,
  name,
  control,
  defaultValue,
  trackColor,
  ios_backgroundColor,
  thumbColor,
  onValueChange,
  value,
  disabled,
  ...props
}: QubeSwitchProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelText: {
      color: theme.colors.primary,
      fontSize: theme.fonts.smallFont,
    },
  });
  return (
    <View style={styles.switchContainer}>
      <Text style={[styles.labelText, globalStyles.fontFamily]}>{label}</Text>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({field: {onChange, onBlur, value}}) => (
          <Switch
            trackColor={{
              false: theme.colors.secondary,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.secondaryTint}
            ios_backgroundColor={theme.colors.secondary}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
            {...props}
          />
        )}
      />
    </View>
  );
};

interface QubeSwitchProps extends SwitchProps {
  label: string;
  name: string;
  control: any;
  defaultValue: boolean;
  disabled?: any;
}

export default QubeSwitch;
