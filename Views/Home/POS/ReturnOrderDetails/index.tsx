import React from 'react';
import ReturnOrderDetailsView from './ReturnOrderDetailsView';
import {
  BillItemReturnAction,
  GetReturnProductDetailAction,
  ProductSearchAction,
} from '../../../../Store/actions/posActions';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import ReturnOrder from '../ReturnOrder';
import {useFocusEffect} from '@react-navigation/native';
import {User} from '../../../../models/UserModel';
import {AllReturnDetails, BillItemReturn} from '../../../../models/PosModel';

const ReturnOrderDetails = ({
  navigation,
  route,
  userData,
  GetReturnProductDetailAction,
  all_return_details,
  BillItemReturnAction,
  bill_return_refund,
  ProductSearchAction,
}: ReturnOrderDetailsProps) => {
  // const {returnDetails} = route.params;
  const ReturnBillDetails = (data: any) => {
    if (!!userData?.active_shift) {
      BillItemReturnAction({
        ...data,
        store_id: userData?.active_shift.store_id,
      });
    }
  };

  return (
    <ReturnOrderDetailsView
      returnDetails={all_return_details}
      ReturnBillDetails={ReturnBillDetails}
      ProductSearchAction={ProductSearchAction}
      bill_return_refund={bill_return_refund}
      navigation={navigation}
    />
  );
};

const mapDispatchToProps = {
  GetReturnProductDetailAction,
  BillItemReturnAction,
  ProductSearchAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    all_return_details: state.pos.all_return_details,
    userData: state.user.user_detail,
    bill_return_refund: state.pos.bill_return_refund,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnOrderDetails);
interface ReturnOrderDetailsProps {
  route?: any;
  navigation?: any;
  userData?: User;
  GetReturnProductDetailAction?: any;
  all_return_details?: AllReturnDetails;
  BillItemReturnAction?: any;
  bill_return_refund?: BillItemReturn;
  ProductSearchAction?: any;
}
