import {View, Text} from 'react-native';
import React from 'react';
import CustomerAddNewView from './CustomerAddNewView';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {User} from '../../../../models/UserModel';
import {
  CustomerRegistrationAction,
  CustomerSeatchAction,
  CustomerSeatchSuccessAction,
} from '../../../../Store/actions/posActions';
import {useFocusEffect} from '@react-navigation/native';

const CustomerAddNew = ({
  new_customer,
  CustomerSeatchAction,
  navigation,
  CustomerRegistrationAction,
  CustomerSeatchSuccessAction,
}: CustomerAddNewProps) => {
  useFocusEffect(
    React.useCallback(() => {
      CustomerSeatchSuccessAction(false);
    }, []),
  );

  const SendData = (data: any) => {
    if (!new_customer) {
      CustomerSeatchAction({
        data: data,
        navigation: navigation,
      });
    } else {
      CustomerRegistrationAction({
        data: data,
        navigation: navigation,
      });
    }
  };
  return <CustomerAddNewView new_customer={new_customer} SendData={SendData} />;
};

const mapDispatchToProps = {
  CustomerSeatchAction,
  CustomerRegistrationAction,
  CustomerSeatchSuccessAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
    new_customer: state.pos.new_customer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddNew);
interface CustomerAddNewProps {
  userData?: User;
  navigation?: any;
  new_customer?: boolean;
  CustomerSeatchAction?: any;
  CustomerRegistrationAction?: any;
  CustomerSeatchSuccessAction?: any;
}
