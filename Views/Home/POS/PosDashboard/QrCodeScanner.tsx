import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import {Camera, CameraScreen, CameraType} from 'react-native-camera-kit';
import QubeButton from '../../../../UILibrary/QubeButton';
const QrCodeScanners = ({flag, Setflag, CodeScan}: QrCodeScannerProps) => {
  const [scan, SetScan] = useState<boolean>(false);
  const [permission, SetPermission] = useState<boolean>(false);
  const theme: ThemeItem = Object(useTheme());
  useEffect(() => {
    setTimeout(() => {
      SetScan(flag);
    }, 500);
  }, [flag]);
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        SetPermission(true);
      } else {
        SetPermission(false);
      }
    } catch (err) {
      console.warn(err);
      SetPermission(false);
    }
  };
  return (
    <Modal
      style={{width: '60%', position: 'absolute', left: '22%', zIndex: 2}}
      testID={'modal'}
      onBackdropPress={() => Setflag({data: undefined, flag: false})}
      isVisible={flag}>
      <View
        style={{
          backgroundColor: '#ffff',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            borderBottomColor: theme.colors.placeholderText,
            borderBottomWidth: 0.5,
            width: '100%',
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            Scan Product
          </Text>
        </View>
        <View style={{height: 380, width: '100%'}}>
          {scan && permission && (
            <Camera
              style={{height: '100%'}}
              cameraType={CameraType.Back} // front/back(default)
              flashMode="auto"
              scanBarcode={true}
              onReadCode={(event: any) => (
                SetScan(false),
                CodeScan(
                  event?.nativeEvent?.codeStringValue?.slice(
                    3,
                    event?.nativeEvent?.codeStringValue?.length,
                  ),
                ),
                Setflag(false)
              )}
            />
          )}
        </View>
        <View style={{margin: 10}}>
          <QubeButton
            color={'primary'}
            onPress={() => Setflag(false)}
            title="Close"></QubeButton>
        </View>
        <View
          style={{
            height: 200,
            width: 200,
            position: 'absolute',
            top: 120,
            zIndex: 999,
            borderWidth: 4,
            borderColor: '#fff',
          }}></View>
      </View>
    </Modal>
  );
};

export default QrCodeScanners;
interface QrCodeScannerProps {
  flag: boolean;
  Setflag?: any;
  CodeScan?: any;
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
