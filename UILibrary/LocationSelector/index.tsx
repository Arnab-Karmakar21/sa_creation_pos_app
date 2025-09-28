import {useNavigation, useTheme} from '@react-navigation/native';
import React, {Component, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import {event} from 'react-native-reanimated';
import {connect} from 'react-redux';
import globalStyles from '../../GlobalStyle';
import {ThemeItem} from '../../Theme/LightTheme';
import {StoreState} from '../../models/reduxModel';
import {SetLocationSuccess} from '../../Store/actions/LocationActions';

const LocationSelector = (props: any) => {
  const [map, setMap] = useState<MapView>();
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      flexDirection: 'column',
      bottom: 0,
      left: 0,
      width: '100%',
      margin: 10,
      padding: 10,
      borderRadius: theme.roundness.mediumRoundness,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
    },
    submitButton: {
      width: 100,
      height: 40,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.roundness.smallRoundness,
      marginVertical: 10,
    },
  });

  const hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow access to your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  useEffect(() => {
    const checkLocationPermission = async () => {
      if ((await hasLocationPermission()) && !props.location) {
        Geolocation.getCurrentPosition(
          position => {
            props.SetLocationSuccess({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {},
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      }
    };

    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (!!map && !!props.location) {
      map.animateCamera({
        center: {
          latitude: props.location.latitude,
          longitude: props.location.longitude,
        },
        zoom: 18,
      });
    }
  }, [map, props.location]);

  const OnSubmit = () => {
    props.navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => {
          if (!!map) {
            setMap(map);
          }
        }}
        style={{flex: 1}}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={event => {
          props.SetLocationSuccess({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
        }}
        onPoiClick={event => {
          props.SetLocationSuccess({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
        }}>
        {!!props.location && (
          <Marker
            coordinate={{
              latitude: props.location.latitude,
              longitude: props.location.longitude,
            }}></Marker>
        )}
      </MapView>
      <View style={[styles.overlay, globalStyles.boxShadow]}>
        <Text
          style={[
            globalStyles.fontFamily,
            {color: theme.colors.primary, fontSize: theme.fonts.mediumFont},
          ]}>
          Click anywhere in the map to select a location
        </Text>
        <TouchableOpacity style={styles.submitButton} onPress={OnSubmit}>
          <Text
            style={[
              globalStyles.fontFamily,
              {
                color: theme.colors.primaryConstrast,
                fontSize: theme.fonts.mediumFont,
              },
            ]}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    location: state.location,
  };
};

const mapDispatchToProps = {
  SetLocationSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelector);
