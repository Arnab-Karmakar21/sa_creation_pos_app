import {View, Text} from 'react-native';
import React from 'react';
import DashboardView from './DashboardView';
import {connect} from 'react-redux';
import {StoreState} from '../../../models/reduxModel';
import {User} from '../../../models/UserModel';

const Dashboard = (props: DashboardListProps) => {
  const onDashboardCardClick = (url: any) => {
    props.navigation.navigate(url);
  };
  return (
    <View>
      <DashboardView
        userData={props.userData}
        onDashboardCardClick={onDashboardCardClick}
      />
    </View>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
interface DashboardListProps {
  navigation: any;
  userData?: User;
}
