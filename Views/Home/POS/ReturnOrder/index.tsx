import React from 'react';
import ReturnOrderView from './ReturnOrderView';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {GetReturnProductDetailAction} from '../../../../Store/actions/posActions';
import {AllReturnDetails} from '../../../../models/PosModel';
import {User} from '../../../../models/UserModel';

const ReturnOrder = ({
  GetReturnProductDetailAction,
  all_return_details,
  userData,
  navigation,
}: ReturnOrderProps) => {
  const SearchAction = (payload: any) => {
    if (!!userData?.active_shift) {
      let data = {
        ...payload,
        store_id: userData?.active_shift.store_id,
      };
      GetReturnProductDetailAction({data: data, navigation: navigation});
    }
  };

  return <ReturnOrderView SearchAction={SearchAction} />;
};

const mapDispatchToProps = {
  GetReturnProductDetailAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    all_return_details: state.pos.all_return_details,
    userData: state.user.user_detail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnOrder);
interface ReturnOrderProps {
  GetReturnProductDetailAction?: any;
  all_return_details?: AllReturnDetails;
  userData?: User;
  navigation?: any;
}
