import React, {useEffect} from 'react';
import BrandAddView from './BrandAddView';

import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {BrandAddPayload} from '../../../../models/StoreModel';
import {
  BrandAddAction,
  BrandAddActionSuccess,
  ResetBrandAddDone,
} from '../../../../Store/actions/storeAction';

const BrandAdd = (props: any) => {
  const onBrandAddClick = (payload: BrandAddPayload) => {
    payload.qc_partner_id = +props.route.params.qc_partner_id;
    payload.subcategory_id = props.route.params.subcategory_id;
    props.BrandAddAction(payload);
  };

  useEffect(() => {
    if (props.brandAddDone) {
      props.navigation.goBack();
    }

    return () => {
      props.ResetBrandAddDone(false);
    };
  }, [props.brandAddDone]);

  return (
    <BrandAddView
      onBrandAddClick={onBrandAddClick}
      subcategoryName={props.route.params.subcategory_name}
      storeCategory={props.route.params.store_category}></BrandAddView>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    qc_partner_id: state.user.user_detail?.partner_id,
    brandAddDone: state.store.brandAddDone,
  };
};

const mapDispatchToProps = {
  BrandAddAction,
  BrandAddActionSuccess,
  ResetBrandAddDone,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandAdd);
