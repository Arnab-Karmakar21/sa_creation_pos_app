import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {User} from '../../../../models/UserModel';
import {ReturnListLoad} from '../../../../Store/actions/posActions';
import {StoreState} from '../../../../models/reduxModel';
import {useFocusEffect} from '@react-navigation/native';
import RefundView from './RefundView';
import {RefundList, Return} from '../../../../models/PosModel';

const Refund = ({
  ReturnListLoad,
  userData,
  refund_list,
  navigation,
}: ReturnProps) => {
  const [page_index, SetPageIndex] = useState<number>(0);
  const [page_size, SetPageSize] = useState<number>(10);

  useFocusEffect(
    React.useCallback(() => {
      ReturnListLoad({
        init: 0,
        page_size: page_size,
        page_index: 0,
        store_id: userData?.active_shift?.store_id,
        search_string: null,
        start_date: null,
        end_date: null,
      });
    }, []),
  );
  const ClearData = () => {
    SetPageIndex(0);
    ReturnListLoad({
      init: 0,
      page_size: page_size,
      page_index: 0,
      store_id: userData?.active_shift?.store_id,
      search_string: null,
      start_date: null,
      end_date: null,
    });
  };
  const SearchAction = (payload: any) => {
    SetPageIndex(0);
    ReturnListLoad({
      init: 0,
      page_size: page_size,
      page_index: 0,
      store_id: userData?.active_shift?.store_id,
      search_string: payload.search_string,
      start_date: payload.start_date,
      end_date: payload.end_date,
    });
  };
  const GetData = (payload: any) => {
    if (
      !!refund_list?.total_count &&
      refund_list.total_count > refund_list.returns.length
    ) {
      SetPageIndex(page_index + 1);
      ReturnListLoad({
        init: 1,
        page_size: page_size,
        page_index: page_index + 1,
        store_id: userData?.active_shift?.store_id,
        search_string: payload.search_string,
        start_date: payload.start_date,
        end_date: payload.end_date,
      });
    }
  };
  const onViewDetails = (payload: Return) => {
    navigation.navigate('ReturnDetails', {id: payload.return_ref_no});
  };
  return (
    <RefundView
      refund_list={refund_list}
      ClearData={ClearData}
      GetData={GetData}
      SearchAction={SearchAction}
      onViewDetails={onViewDetails}
    />
  );
};

const mapDispatchToProps = {
  ReturnListLoad,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
    refund_list: state.pos.refund_list,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Refund);
interface ReturnProps {
  userData?: User;
  ReturnListLoad?: any;
  refund_list: RefundList;
  navigation?: any;
}
