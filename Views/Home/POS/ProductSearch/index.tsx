import {View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import PreviousOrderView from './PreviousOrderView';
import {useFocusEffect} from '@react-navigation/native';
import {PreviousOrder} from '../../../../models/PosModel';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {User} from '../../../../models/UserModel';
import {GetCompleteOrderHistoryAction} from '../../../../Store/actions/posActions';
const ProductSearch = ({
  PreviousOrder,
  navigation,
  userData,
  GetCompleteOrderHistoryAction,
  total_count,
}: ProductSearchProps) => {
  const [page_index, SetPageIndex] = useState<number>(0);
  const [page_size, SetPageSize] = useState<number>(10);
  useFocusEffect(
    React.useCallback(() => {
      if (!!userData?.active_shift) {
        SetPageIndex(0);
        GetCompleteOrderHistoryAction({
          store_id: userData?.active_shift.store_id,
          page_index: 0,
          page_size: page_size,
          search_string: null,
          start_date: null,
          end_date: null,
          init: 0,
        });
      }
    }, []),
  );
  const GotoOrder = (data: PreviousOrder) => {
    navigation.navigate('OrderDetail', {
      order_no: data.order_ref_no,
      store_id: userData?.active_shift?.store_id,
    });
  };
  const SearchAction = (payload: any) => {
    if (!!userData?.active_shift) {
      SetPageIndex(0);
      GetCompleteOrderHistoryAction({
        ...payload,
        store_id: userData?.active_shift.store_id,
        page_index: 0,
        page_size: page_size,
        init: 0,
      });
    }
  };
  const ClearData = () => {
    if (!!userData?.active_shift) {
      SetPageIndex(0);
      GetCompleteOrderHistoryAction({
        store_id: userData?.active_shift.store_id,
        page_index: 0,
        page_size: page_size,
        search_string: null,
        start_date: null,
        end_date: null,
        init: 0,
      });
    }
  };
  const ProductScanner = (code: string) => {
    navigation.navigate('OrderDetail', {
      order_no: code.slice(3, code.length),
      store_id: userData?.active_shift?.store_id,
    });
  };
  const GetData = (payload: any) => {
    if (
      !!userData?.active_shift &&
      !!total_count &&
      total_count > PreviousOrder.length
    ) {
      SetPageIndex(page_index + 1);
      GetCompleteOrderHistoryAction({
        ...payload,
        store_id: userData?.active_shift.store_id,
        page_index: page_index + 1,
        page_size: page_size,
        init: 1,
      });
    }
  };
  return (
    <PreviousOrderView
      GotoOrder={GotoOrder}
      SearchAction={SearchAction}
      bills={PreviousOrder}
      ClearData={ClearData}
      GetData={GetData}
      ProductScanner={ProductScanner}
    />
  );
};

const mapDispatchToProps = {
  GetCompleteOrderHistoryAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
    PreviousOrder: state.pos.PreviousOrder,
    total_count: state.pos.total_count,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch);
interface ProductSearchProps {
  navigation?: any;
  PreviousOrder: PreviousOrder[];
  userData?: User;
  GetCompleteOrderHistoryAction?: any;
  total_count?: number;
}
