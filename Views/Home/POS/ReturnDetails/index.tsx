import {View, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {
  RecivedGoodPosAction,
  ReturnDetailLoad,
} from '../../../../Store/actions/posActions';
import {useFocusEffect} from '@react-navigation/native';
import ReturnDetailsView from './ReturnDetailsView';
import {RentrnDet} from '../../../../models/PosModel';
import {User} from '../../../../models/UserModel';

const ReturnDetails = ({
  ReturnDetailLoad,
  route,
  return_det,
  navigation,
  userData,
  RecivedGoodPosAction,
}: ReturnDetailsProps) => {
  useFocusEffect(
    React.useCallback(() => {
      if (route.params.id) {
        ReturnDetailLoad(route.params.id);
      }
    }, []),
  );
  const GotoOrder = () => {
    navigation.navigate('OrderDetail', {
      order_no: return_det?.customer_details.order_ref_no,
      store_id: userData?.active_shift?.store_id,
    });
  };

  const RecivedGoods = () => {
    !!return_det?.return_list &&
      return_det?.return_list.length > 0 &&
      RecivedGoodPosAction({
        return_ref_no: return_det?.return_list[0].return_ref_no,
        received_flag: true,
      });
  };
  return (
    <ReturnDetailsView
      GotoOrder={GotoOrder}
      return_det={return_det}
      RecivedGoods={RecivedGoods}
    />
  );
};

const mapDispatchToProps = {
  ReturnDetailLoad,
  RecivedGoodPosAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
    return_det: state.pos.return_det,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnDetails);
interface ReturnDetailsProps {
  ReturnDetailLoad?: any;
  route?: any;
  return_det?: RentrnDet;
  navigation?: any;
  userData?: User;
  RecivedGoodPosAction?: any;
}
