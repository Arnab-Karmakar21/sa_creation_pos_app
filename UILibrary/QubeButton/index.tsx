import {
  ButtonProps,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {useTheme} from '@react-navigation/native';
import globalStyles from '../../GlobalStyle';
import {showToast} from '../../Service/Toast';

const QubeButton = (props: ButtonProps) => {
  const theme = Object(useTheme());
  const styles = StyleSheet.create({
    buttonContainer: {
      width: '50%',
    },
    rounded: {
      borderRadius: theme.roundness.mediumRoundness,
    },
    buttonColor: {
      backgroundColor: theme.colors[!!props.color ? props.color : 'btnClr'],
    },
    disabledButtonColor: {
      backgroundColor:
        theme.colors[!!props.color ? 'placeholderText' : 'btnClr'],
    },
    button: {
      height: 42,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.colors.primaryConstrast,
      fontSize: theme.fonts.mediumFont,
    },
  });

  return (
    <View
      style={[
        styles.buttonContainer,
        !props.disabled && globalStyles.boxShadow,
        styles.rounded,
        {width: '100%'},
      ]}>
      <TouchableOpacity
        onPress={
          !props.disabled
            ? props.onPress
            : () =>
                showToast(
                  'Please fill up all the mandatory fields and resubmit the form.',
                  'rgba(179, 40, 30, 0.8)',
                )
        }
        style={styles.rounded}>
        <View
          style={[
            styles.button,
            styles.rounded,
            !props.disabled ? styles.buttonColor : styles.disabledButtonColor,
          ]}>
          <Text style={[styles.buttonText, globalStyles.fontFamily]}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QubeButton;
