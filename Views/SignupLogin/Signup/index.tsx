import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import QubeTextInput from '../../../UILibrary/QubeTextInput';
import globalStyles from '../../../GlobalStyle';
import QubeButton from '../../../UILibrary/QubeButton';
import {
  emailValidator,
  phoneValidator,
  requiredSelectValidator,
  requiredValidator,
} from '../../../Validators';
import {useForm} from 'react-hook-form';
import {GenerateCodePayload} from '../../../Models/AuthenticationModels';
import QubeSelect from '../../../UILibrary/QubeSelect';
import LinearGradient from 'react-native-linear-gradient';
import {Card} from '@rneui/base';
import SignupView from './SignupView';
import {GenerateCode} from '../../../Store/actions/userAction';
import {connect} from 'react-redux';
import {StoreState} from '../../../models/reduxModel';

const Signup = ({navigation, GenerateCode}: SignupProps) => {
  const theme = Object(useTheme());

  const onSubmit = async (payload: GenerateCodePayload) => {
    let servicepayload = {
      data: payload,
      navigation: navigation,
    };
    GenerateCode(servicepayload);
  };
  return <SignupView onSubmit={onSubmit} navigation={navigation} />;
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {};
};

const mapDispatchToProps = {
  GenerateCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

interface SignupProps {
  navigation?: any;
  GenerateCode?: any;
}
