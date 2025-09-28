import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import StockModifyView from './StockModifyView';

import {connect} from 'react-redux';
import {StockModifyPayload} from '../../../../models/StoreModel';
import {StoreState} from '../../../../models/reduxModel';
import {
  ResetStockUpdateDone,
  StockModifyAction,
  StockModifyLoad,
} from '../../../../Store/actions/storeAction';

const StockModify = (props: any) => {
  useEffect(() => {
    if (!props.txnTypes || props.txnTypes.length == 0) {
      props.StockModifyLoad();
    }
    return () => {
      props.ResetStockUpdateDone(false);
    };
  }, []);

  useEffect(() => {
    if (props.updateStockDone) {
      props.navigation.goBack();
    }
  }, [props.updateStockDone]);

  const onSubmit = (payload: StockModifyPayload) => {
    payload.store_id = props.route.params.store_id;
    payload.partner_product_id = props.route.params.partner_product_id;
    payload.stock_quantity = +payload.stock_quantity;
    payload.online_flag = props.route.params.type;
    payload.procurement_price = !!payload?.procurement_price
      ? payload?.procurement_price
      : undefined;
    props.StockModifyAction(payload);
  };

  return (
    <StockModifyView
      partner_product_id={props.route.params.partner_product_id}
      store_id={props.route.params.store_id}
      store_name={props.route.params.store_name}
      product_description={props.route.params.product_description}
      txnTypes={props.txnTypes}
      online={props.route.params.type}
      onSubmit={onSubmit}></StockModifyView>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    txnTypes: state.store.txnTypes,
    updateStockDone: state.store.updateStockDone,
  };
};

const mapDispatchToProps = {
  StockModifyLoad,
  StockModifyAction,
  ResetStockUpdateDone,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockModify);
