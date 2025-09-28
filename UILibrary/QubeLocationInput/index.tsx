import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../GlobalStyle';
import QubeTextInput from '../QubeTextInput';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {ThemeItem} from '../../Theme/LightTheme';
import {StoreState} from '../../models/reduxModel';
import {connect} from 'react-redux';
import {LocationItem} from '../../Models/LocationModels';

const QubeLocationInput = ({
  latitudeName,
  longitudeName,
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
  location,
  setValue,
  navigation,
  ...props
}: QubeLocationInputProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    label: {
      color: theme.colors.primary,
      paddingBottom: 5,
      fontSize: theme.fonts.smallFont,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    mapButton: {
      height: 50,
      flex: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: theme.roundness.smallRoundness,
      marginTop: 20,
      borderWidth: 0.4,
      borderColor: theme.colors.inputBorder,
    },
  });
  // const navigation = useNavigation();

  const longitudeRef = useRef();
  const setLongitudeRef = (ref: any) => {
    longitudeRef.current = ref;
  };

  const RedirectToMap = () => {
    navigation.navigate('locationSelector');
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!!location && location.latitude && location.longitude) {
        setValue(latitudeName, location.latitude.toFixed(6));
        setValue(longitudeName, location.longitude.toFixed(6));
      }
    }, [location]),
  );

  return (
    <View style={{width: '100%'}}>
      <Text style={[styles.label, globalStyles.fontFamily]}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={{flex: 45}}>
          <QubeTextInput
            control={control}
            errors={errors}
            name={latitudeName}
            refName={refName}
            rules={rules}
            defaultValue={defaultValue}
            refCopy={refCopy}
            nextRef={longitudeRef.current}
            label={'Latitude'}
            placeholder={'Enter Latitude'}
            blurOnSubmit={false}
            {...props}></QubeTextInput>
        </View>
        <View style={{flex: 45, paddingHorizontal: 5}}>
          <QubeTextInput
            control={control}
            errors={errors}
            name={longitudeName}
            refName={refName}
            rules={rules}
            defaultValue={defaultValue}
            refCopy={setLongitudeRef}
            nextRef={nextRef}
            submitAction={submitAction}
            label={'Longitude'}
            placeholder={'Enter Longitude'}
            {...props}></QubeTextInput>
        </View>
        <TouchableOpacity
          style={[styles.mapButton, globalStyles.boxShadow]}
          onPress={RedirectToMap}>
          <Ionicon
            name="map"
            color={theme.colors.primary}
            size={theme.icons.smallIcon}></Ionicon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface QubeLocationInputProps extends TextInputProps {
  latitudeName: any;
  longitudeName: any;
  rules?: any;
  control: any;
  defaultValue?: any;
  errors: any;
  refName: any;
  refCopy?: any;
  nextRef?: any;
  submitAction?: any;
  label?: string;
  setValue: any;
  location: LocationItem | null;
  navigation?: any;
}

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    location: state.location,
  };
};

export default connect(mapStateToProps)(QubeLocationInput);
