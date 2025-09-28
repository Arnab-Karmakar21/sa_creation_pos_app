import {WSnackBar, ISnackBarOpts} from 'react-native-smart-tip';
import Toast from 'react-native-toast-message';

export const showToast = (message: string, color: string) => {
  Toast.show({
    type: color == 'errorToast' ? 'error' : 'success',
    text1: message,
    props: {
      text1NumberOfLines: 3,
    },
    // text2: 'This is some something 👋'
  });
};

export const showIndefiniteToast = (message: string, color: string) => {
  Toast.show({
    type: color == 'errorToast' ? 'error' : 'success',
    text1: message,
    props: {
      text1NumberOfLines: 3,
    },
    // text2: 'This is some something 👋'
  });
};
