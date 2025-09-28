import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserListView from './UserListView';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {
  BeginApiCallAction,
  ApiCallSuccessAction,
} from '../../../../Store/actions/apiStatusActions';
import {
  UpdateUserStatusAction,
  UserAddLoad,
  userList,
} from '../../../../Store/actions/userManagementAction';
import {useFocusEffect} from '@react-navigation/native';
import {User} from '../../../../models/UserModel';
import {StoreItem} from '../../../../models/StoreModel';
import {UserDetails} from '../../../../models/UserManagementModel';

const UserList = ({
  createUser,
  navigation,
  userList,
  user,
  userlist,
  UpdateUserStatusAction,
}: UserListProps) => {
  createUser = () => {
    navigation.navigate('add-user');
  };
  useFocusEffect(
    React.useCallback(() => {
      userList({
        page_index: 0,
        page_size: 10,
        partner_id: user?.partner_id,
        store_id: null,
      });
    }, []),
  );

  const viewUserDetails = (admn_user_id: number) => {
    navigation.navigate('user-details', {
      user_id: admn_user_id,
    });
  };

  const changeUserStatus = async (admn_usr_id: number, status: number) => {
    UpdateUserStatusAction({
      statusPayload: {
        admin_user_id: admn_usr_id,
        user_status: status,
      },
      userListPayload: {
        page_index: 0,
        page_size: 10,
        partner_id: user?.partner_id,
        store_id: null,
      },
    });
  };

  return (
    <View>
      <UserListView
        createUser={createUser}
        userlist={userlist}
        onUpdateStatus={changeUserStatus}
        user={user}
        onViewUserDetails={viewUserDetails}
      />
    </View>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    user: state.user.user_detail,
    userlist: state.usermanagement.userList,
  };
};

const mapDispatchToProps = {
  UpdateUserStatusAction,
  userList,
  BeginApiCallAction,
  ApiCallSuccessAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

interface UserListProps {
  navigation: any;
  route: any;
  createUser: any;
  userList: any;
  user?: User;
  userlist: UserDetails[];
  UpdateUserStatusAction: any;
}
