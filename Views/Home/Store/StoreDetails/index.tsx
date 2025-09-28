import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';
import {StoreState} from '../../../../models/reduxModel';
import {connect} from 'react-redux';
import {
  ProductItem,
  SingleStoreDetails,
  StoreItem,
} from '../../../../models/StoreModel';
import {StoreDetailsLoad} from '../../../../Store/actions/storeAction';
import {useFocusEffect} from '@react-navigation/native';
import StoreDetailsView from './StoreDetailsView';

const StoreDetails = (props: StoreDetailsProps) => {
  useFocusEffect(
    React.useCallback(() => {
      refreshStore();
    }, [props.route]),
  );

  const refreshStore = () => {
    props.StoreDetailsLoad(props.route.params.store_id);
  };

  const onModifyProductClick = () => {};

  const onModifyStockClick = () => {};

  const onManageInventoryClick = () => {
    props.navigation.navigate('storeinventory', {
      store_id: props.store?.store_id,
      store_category: props.store?.store_category,
      store_name: props.store?.store_name,
      category_name: props.store?.store_category_dtls,
      qc_partner_id: props.store?.qc_partner_id,
    });
  };

  return !!props.store ? (
    // <View>
    //   <Text>StoreDetails</Text>
    //   <TouchableOpacity
    //     onPress={() => props.navigation.navigate('storeinventory')}>
    //     <Text>Manageinventory</Text>
    //   </TouchableOpacity>
    // </View>
    <ImageBackground
      source={require('../../../../Assets/bg5.jpg')}
      style={{height: '100%', width: '100%'}}
      imageStyle={{opacity: 0.5}}>
      <StoreDetailsView
        store={props.store}
        stock={props.stock}
        onModifyStockClick={onModifyStockClick}
        onModifyProductClick={onModifyProductClick}
        refreshStore={refreshStore}
        onManageInventoryClick={onManageInventoryClick}
        navigation={props.navigation}></StoreDetailsView>
    </ImageBackground>
  ) : (
    <></>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    store: state.store.singleStore,
    stock: state.store.storeStock,
  };
};
const mapDispatchToProps = {
  StoreDetailsLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetails);

interface StoreDetailsProps {
  store?: SingleStoreDetails;
  stock?: ProductItem[];
  StoreDetailsLoad: any;
  navigation: any;
  route: any;
}
