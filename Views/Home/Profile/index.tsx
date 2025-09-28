import {View, Text} from 'react-native';
import React from 'react';
import ProfileView from './ProfileView';
import {connect} from 'react-redux';
import {StoreState} from '../../../models/reduxModel';
import {ChangePasswordPayload, User} from '../../../models/UserModel';
import {ChangePasswordAction} from '../../../Store/actions/userAction';

const Profile = ({
  navigation,
  userData,
  ChangePasswordAction,
}: ProfileProps) => {
  const onSubmit = (payload: ChangePasswordPayload) => {
    let pay = {
      data: payload,
    };
    ChangePasswordAction(pay);
  };
  return <ProfileView userData={userData} onSubmit={onSubmit} />;
};

const mapDispatchToProps = {
  ChangePasswordAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
interface ProfileProps {
  navigation: any;
  userData?: User;
  ChangePasswordAction: any;
}
