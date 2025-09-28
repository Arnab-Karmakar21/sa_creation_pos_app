import {View, Text} from 'react-native';
import React, {useState} from 'react';
import FullfillmentListView from './FullfillmentListView';
import {StoreState} from '../../../../models/reduxModel';
import {StockListLoad} from '../../../../Store/actions/StockAction';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {RequisitionItem} from '../../../../models/Stock';

const FulfillmentList = ({
  navigation,
  route,
  StockListLoad,
  StockFullfillmentList,
  total,
}: FullfillmentListProps) => {
  const [page_index, SetPageIndex] = useState<number>(0);
  const [page_size, SetPageSize] = useState<number>(20);
  useFocusEffect(
    React.useCallback(() => {
      SetPageIndex(0);
      StockListLoad({page_index: 0, page_size: page_size, init: 0});
    }, []),
  );

  function navToFulfillmentDetailsPage(
    fullfillmentId: number,
    wishListId: number,
  ) {
    navigation.navigate('fulfillment-detail', {
      fullfillmentId: fullfillmentId,
      wishListId: wishListId,
    });
  }

  const GetData = () => {
    if (!!total && total > StockFullfillmentList.length) {
      SetPageIndex(page_index + 1);
      StockListLoad({
        page_size: page_size,
        page_index: page_index + 1,
        init: 1,
      });
    }
  };
  return (
    <View>
      <FullfillmentListView
        fullfillmentList={StockFullfillmentList}
        navigation={navigation}
        route={route}
        onFullFilmentDetailsView={navToFulfillmentDetailsPage}
        GetData={GetData}
      />
    </View>
  );
};
const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    StockFullfillmentList: state.stock?.requisitionList,
    total: state.stock.total,
  };
};
const mapDispatchToProps = {
  StockListLoad,
};
export default connect(mapStateToProps, mapDispatchToProps)(FulfillmentList);

interface FullfillmentListProps {
  navigation: any;
  route: any;
  StockListLoad: any;
  StockFullfillmentList: RequisitionItem[];
  total?: number;
}
