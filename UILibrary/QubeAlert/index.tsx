import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import {ThemeItem} from '../../Theme/LightTheme';
import globalStyles from '../../GlobalStyle';

const QubeAlert = ({
  isVisible,
  setIsVisible,
  okText,
  cancelText,
  title,
  subTitle,
  okPress,
  cancelPress,
}: QubeAlertProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    centerModal: {
      justifyContent: 'center',
      margin: 15,
    },
    modalCard: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.roundness.smallRoundness,
      overflow: 'hidden',
      padding: 10,
      minHeight: 150,
      width: 500,
      position: 'absolute',
      top: '30%',
      left: '25%',
      justifyContent: 'space-between',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    okButtonContainer: {
      flex: 1,
      paddingLeft: 5,
    },
    cancelButtonContainer: {
      flex: 1,
      paddingRight: 5,
    },
    whiteCircle: {
      backgroundColor: theme.colors.primaryConstrast,
      opacity: 0.5,
      position: 'absolute',
      top: -60,
      right: -60,
      height: 200,
      width: 200,
      borderRadius: 1000,
      zIndex: -2,
    },
    button: {
      height: 40,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.roundness.smallRoundness,
    },
    okButton: {
      backgroundColor: theme.colors.secondary,
      height: 40,
    },
    cancelButton: {
      backgroundColor: theme.colors.transparent,
      borderRadius: theme.roundness.smallRoundness,
      height: 40,
      borderColor: theme.colors.secondary,
      borderWidth: 1,
    },
    okButtonText: {
      color: theme.colors.secondaryConstrast,
      fontSize: theme.fonts.smallFont,
    },
    cancelButtonText: {
      color: theme.colors.secondary,
      fontSize: theme.fonts.smallFont,
    },
    textContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    titleText: {
      color: theme.colors.primaryConstrast,
      fontSize: theme.fonts.mediumFont,
      fontWeight: 'bold',
    },
    subTitleText: {
      color: theme.colors.primaryConstrast,
      fontSize: theme.fonts.extraSmallFont,
    },
  });
  return (
    <Modal
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      backdropOpacity={0.4}
      animationInTiming={400}
      animationOutTiming={400}
      collapsable={true}
      style={styles.centerModal}>
      <View style={styles.modalCard}>
        <View style={styles.textContainer}>
          {!!title && (
            <Text style={[globalStyles.fontFamily, styles.titleText]}>
              {title}
            </Text>
          )}
          {!!subTitle && (
            <Text style={[globalStyles.fontFamily, styles.subTitleText]}>
              {subTitle}
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.cancelButtonContainer}>
            {!!cancelText && !!cancelPress && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={cancelPress}>
                <Text
                  style={[globalStyles.fontFamily, styles.cancelButtonText]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.okButtonContainer}>
            {!!okPress && !!okText && (
              <TouchableOpacity
                style={[styles.button, styles.okButton]}
                onPress={okPress}>
                <Text style={[globalStyles.fontFamily, styles.okButtonText]}>
                  {okText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface QubeAlertProps {
  isVisible: boolean;
  setIsVisible: any;
  okText: string;
  cancelText?: string;
  okPress: any;
  cancelPress?: any;
  title: string;
  subTitle?: string;
}

export default QubeAlert;
