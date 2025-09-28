import React, {useEffect} from 'react';
import StoreInventoryView from './StoreInventoryView';
import {connect} from 'react-redux';
import {
  ProductEditLoadPayload,
  StockAddPayload,
} from '../../../../models/StoreModel';
import {StoreState} from '../../../../models/reduxModel';
import {
  QrSetAction,
  StoreInventoryLoad,
} from '../../../../Store/actions/storeAction';
import {useFocusEffect} from '@react-navigation/native';

const StoreInventory = (props: any) => {
  useFocusEffect(
    React.useCallback(() => {
      props.StoreInventoryLoad(props.route.params.store_category);
    }, []),
  );
  const onAddBrandClicked = (
    subcategory_id: number,
    subcategory_name: string,
  ) => {
    props.navigation.navigate('brandadd', {
      subcategory_id,
      subcategory_name,
      store_category: props.route.params.store_category,
      qc_partner_id: +props.route.params.qc_partner_id,
    });
  };

  const onStockAddEvent = (payload: StockAddPayload) => {
    payload.store_id = props.route.params.store_id;
    payload.store_category = props.route.params.store_category;
    payload.qc_partner_id = +props.route.params.qc_partner_id;
    props.navigation.navigate('stockadd', payload);
  };

  const onModifyStockClick = (
    partner_product_id: number,
    product_description: string,
    type: number,
  ) => {
    props.navigation.navigate('stockmodify', {
      partner_product_id: partner_product_id,
      store_id: props.route.params.store_id,
      store_name: props.route.params.store_name,
      product_description: product_description,
      type: type,
    });
  };

  const onModifyProductClick = (
    partner_product_id: number,
    varients: any,
    product_brand_id: any,
    brand_created_by_role: any,
  ) => {
    let payload: any = {
      partner_product_id: partner_product_id,
      store_category: props.route.params.store_category,
      store_id: props.route.params.store_id,
      varients: varients,
      qc_partner_id: +props.route.params.qc_partner_id,
      product_brand_id: product_brand_id,
      brand_created_by_role: brand_created_by_role,
    };
    props.navigation.navigate('productedit', payload);
  };
  const ShowQR = (qr: string) => {
    props.QrSetAction({
      qr: qr,
      qr_flag: true,
    });
  };
  return (
    <StoreInventoryView
      templates={props.templates}
      onAddBrandClicked={onAddBrandClicked}
      storeId={props.route.params.store_id}
      storeName={props.route.params.store_name}
      categoryName={props.route.params.category_name}
      qcPartnerId={
        !!props.route.params.qc_partner_id
          ? +props.route.params.qc_partner_id
          : 0
      }
      onStockAddEvent={onStockAddEvent}
      onModifyStockClick={onModifyStockClick}
      navigation={props.navigation}
      ShowQR={ShowQR}
      onModifyProductClick={onModifyProductClick}></StoreInventoryView>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    qc_partner_id: state.user.user_detail?.partner_id,
    templates: state.store.templates,
  };
};

const mapDispatchToProps = {
  StoreInventoryLoad,
  QrSetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreInventory);
