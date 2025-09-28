import {View, Text} from 'react-native';
import React from 'react';
import ShiftStartView from './ShiftStartView';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {User} from '../../../../models/UserModel';
import {StoreListLoad} from '../../../../Store/actions/storeAction';
import {StoreItem} from '../../../../models/StoreModel';
import {ShiftStartAction} from '../../../../Store/actions/posActions';

const ShiftStart = ({
  userData,
  StoreListLoad,
  stores,
  ShiftStartAction,
}: ShiftStartProps) => {
  useFocusEffect(
    React.useCallback(() => {
      if (!!userData) {
        StoreListLoad({
          qc_partner_id: userData.partner_id,
          admn_user_id: userData.admn_user_id,
        });
      }
    }, []),
  );
  return <ShiftStartView ShiftStartAction={ShiftStartAction} stores={stores} />;
};

const mapDispatchToProps = {
  StoreListLoad,
  ShiftStartAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
    stores: state.store.storeList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftStart);
interface ShiftStartProps {
  userData?: User;
  StoreListLoad?: any;
  stores: StoreItem[];
  ShiftStartAction?: any;
}
