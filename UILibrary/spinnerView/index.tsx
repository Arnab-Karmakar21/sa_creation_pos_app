import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import {showToast} from '../../Service/Toast';
import {ThemeItem} from '../../Theme/LightTheme';
import {ErrorModel} from '../../models/errorModels';
import {StoreState} from '../../models/reduxModel';

const SpinnerView = (props: LoadingStateprops) => {
  const theme: ThemeItem = Object(useTheme());
  useEffect(() => {
    if (!!props.error) {
      const errorData = getErrorMessage(props.error);

      if (!!errorData.error_message) {
        showToast(errorData.error_message, errorData.error_color);
      }
    }
  }, [props.error]);
  const getErrorMessage = (Errors: ErrorModel) => {
    if (!!Errors) {
      if (!!Errors.Business_Errors && Errors.Business_Errors.length != 0) {
        return {
          error_message: Errors.Business_Errors[0]?.MESSAGE,
          error_color: 'errorToast',
        };
      } else if (!!Errors.System_Errors && Errors.System_Errors.length != 0) {
        return {
          error_message: Errors.System_Errors[0]?.MESSAGE,
          error_color: 'errorToast',
        };
      } else if (!!Errors.Info && Errors.Info.length != 0) {
        return {
          error_message: Errors.Info[0]?.MESSAGE,
          error_color: 'messageToast',
        };
      } else if (!!Errors.Warnings && Errors.Warnings.length != 0) {
        return {
          error_message: Errors.Warnings[0]?.MESSAGE,
          error_color: 'messageToast',
        };
      } else {
        return {
          error_message: 'Error encountered. Please try again.',
          error_color: 'errorToast',
        };
      }
    } else {
      return {
        error_message: undefined,
        error_color: 'errorToast',
      };
    }
  };
  const styles = StyleSheet.create({
    spinnerContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 999,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      fontSize: theme.fonts.mediumFont,
      color: '#FFF',
    },
  });

  return props.count > 0 ? (
    <View style={styles.spinnerContainer}>
      <View>
        <Spinner
          color="#FFF"
          size={120}
          type="ThreeBounce"
          isVisible={props.count > 0}
        />
      </View>
      <Text style={styles.loadingText}>{props.message}</Text>
    </View>
  ) : (
    <></>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    count: state.loading.count,
    message: state.loading.message,
    error: state.error.error,
  };
};

export default connect(mapStateToProps)(SpinnerView);

interface LoadingStateprops {
  count: number;
  message: string;
  error?: ErrorModel;
}
