import {View, Text} from 'react-native';
import React from 'react';
import StoreView from './StoreView';
import {StoreItem} from '../../../../Models/StoreModel';
import {StoreState} from '../../../../models/reduxModel';
import {connect} from 'react-redux';
import {StoreListLoad} from '../../../../Store/actions/storeAction';
import {User} from '../../../../models/UserModel';
import {useFocusEffect} from '@react-navigation/native';

const StoreList = (props: StoreListProps) => {
  const onAddStoreClick = () => {
    props.navigation.navigate('storeadd');
  };
  console.log(props.stores);

  const onUpdateStoreClick = (store_id: number, p: number) => {
    props.navigation.navigate('storeedit', {
      store_id: store_id,
      qc_partner_id: p,
    });
  };

  const onStoreDetailsClick = () => {};

  const onStoreCardClick = (store_id: number, p: number) => {
    props.navigation.navigate('storedetails', {
      store_id: store_id,
      qc_partner_id: p,
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      if (!!props.user) {
        props.StoreListLoad({
          qc_partner_id: props.user.partner_id,
          admn_user_id: props.user.admn_user_id,
        });
      }
    }, []),
  );
  const reloadData = () => {
    if (!!props.user) {
      props.StoreListLoad({
        qc_partner_id: props.user.partner_id,
        admn_user_id: props.user.admn_user_id,
      });
    }
  };

  return (
    <StoreView
      stores={props.stores}
      onAddStoreClick={onAddStoreClick}
      onUpdateStoreClick={onUpdateStoreClick}
      onStoreDetailsClick={onStoreDetailsClick}
      reloadData={reloadData}
      onStoreCardClick={onStoreCardClick}></StoreView>
  );
};
const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    user: state.user.user_detail,
    stores: state.store.storeList,
  };
};
const mapDispatchToProps = {
  StoreListLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);

interface StoreListProps {
  user?: User;
  stores: StoreItem[];
  StoreListLoad: any;
  navigation: any;
  ClearPictureData: any;
}
