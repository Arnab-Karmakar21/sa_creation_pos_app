import {View, Text} from 'react-native';
import React, {useState} from 'react';
import LoginView from './LoginView';
import {connect} from 'react-redux';
import {StoreState} from '../../../models/reduxModel';
import {
  ForgotPasswordAction,
  GenerateOTP,
  LoginAction,
} from '../../../Store/actions/userAction';

const Login = ({
  user,
  navigation,
  LoginAction,
  GenerateOTP,
  ForgotPasswordAction,
}: LoginProps) => {
  const [mobileNo, setMobileNo] = useState<string>('');
  const onSignUpClick = () => {
    navigation.navigate('signup');
  };
  const onSubmit = (data: any) => {
    LoginAction(data);
  };
  const generateOtp = (mobile: any) => {
    setMobileNo(mobile);
    GenerateOTP({
      mobile_no: mobile,
      key: '',
    });
  };

  const changePassword = (newPassword: string, otp: string) => {
    ForgotPasswordAction({
      mobile_no: mobileNo,
      otp: otp,
      new_password: newPassword,
    });
  };

  return (
    <LoginView
      onSignUpClick={onSignUpClick}
      onSubmit={onSubmit}
      generateOtp={generateOtp}
      changePassword={changePassword}
    />
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.user_detail,
  };
};
const mapDispatchToProps = {
  LoginAction,
  GenerateOTP,
  ForgotPasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
interface LoginProps {
  navigation?: any;
  route?: any;
  user?: any;
  LoginAction?: any;
  GenerateOTP: any;
  ForgotPasswordAction: any;
}
