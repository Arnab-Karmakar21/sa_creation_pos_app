import {Text, View} from 'react-native';
import React, {Component} from 'react';
import SignupDetailsView from './SignupDetailsView';
import {SignUpPayload} from '../../../Models/AuthenticationModels';
import {connect} from 'react-redux';
import {SignUpAction, SignUpLoad} from '../../../Store/actions/userAction';
import {StoreState} from '../../../models/reduxModel';
import {useFocusEffect} from '@react-navigation/native';
import {
  CityItem,
  StateItem,
  CountryItem,
  DistrictItem,
} from '../../../models/DomainModels';

const SignupDetails = ({
  navigation,
  SignUpLoad,
  cities,
  countries,
  states,
  districts,
  SignUpAction,
}: SignupDetailsProps) => {
  const onSubmit = (payload: SignUpPayload) => {
    payload.confirm_password = undefined;
    let pay = {
      data: payload,
      navigation: navigation,
    };
    SignUpAction(pay);
  };
  const onNewSignUp = () => {
    navigation.replace('signup');
  };
  useFocusEffect(
    React.useCallback(() => {
      SignUpLoad();
    }, []),
  );
  return (
    <View>
      {/* <Text>SignupDetails</Text> */}
      <SignupDetailsView
        onSubmit={onSubmit}
        onNewSignUp={onNewSignUp}
        cities={cities}
        states={states}
        countries={countries}
        districts={districts}
        navigation={navigation}></SignupDetailsView>
    </View>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    cities: state.domain?.cities,
    states: state.domain?.states,
    countries: state.domain?.countries,
    districts: state.domain?.districts,
  };
};

const mapDispatchToProps = {
  SignUpLoad,
  SignUpAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupDetails);

interface SignupDetailsProps {
  navigation?: any;
  SignUpLoad?: any;
  cities: CityItem[];
  states: StateItem[];
  countries: CountryItem[];
  districts: DistrictItem[];
  SignUpAction?: any;
}
