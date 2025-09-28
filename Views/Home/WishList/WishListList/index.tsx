import {View, Text} from 'react-native';
import React, {useState} from 'react';
import WishListView from './WishListView';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {User} from '../../../../models/UserModel';
import {StoreW, WishListLists} from '../../../../models/WishListModels';
import {GetWishListAction} from '../../../../Store/actions/WishListActions';

const WishListList = ({
  navigation,
  route,
  user,
  wishListLists,
  GetWishListAction,
  no_wishlist,
  total,
}: WishListListProps) => {
  const [page_index, SetPageIndex] = useState<number>(0);
  const [page_size, SetPageSize] = useState<number>(20);
  useFocusEffect(
    React.useCallback(() => {
      SetPageIndex(0);
      GetWishListAction({page_index: 0, page_size: page_size, init: 0});
    }, []),
  );
  const AddWishList = (item: any) => {
    navigation.navigate('wish-list-add', {
      store_id: item.store_id,
      store_name: item.store_name,
      wishlist_id: item.wishlist_id,
      ref_no: item.ref_no,
      store_category: item.store_category,
      fulfilment_id: item?.fulfilment_id,
      fulfilment_ref_no: item?.fulfilment_ref_no,
      fulfilment_status: item?.fulfilment_status,
    });
  };
  const GetData = () => {
    if (!!total && total > wishListLists.length) {
      SetPageIndex(page_index + 1);
      GetWishListAction({
        page_size: page_size,
        page_index: page_index + 1,
        init: 1,
      });
    }
  };

  return (
    <WishListView
      no_wishlist={no_wishlist}
      wishListLists={wishListLists}
      AddWishList={AddWishList}
      GetData={GetData}
    />
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    user: state.user.user_detail,
    wishListLists: state.wish_list.wishListLists,
    no_wishlist: state.wish_list.no_wishlist,
    total: state.wish_list.total,
  };
};

const mapDispatchToProps = {
  GetWishListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishListList);
interface WishListListProps {
  navigation?: any;
  route?: any;
  wishListLists: WishListLists[];
  user?: User;
  GetWishListAction?: any;
  no_wishlist: StoreW[];
  total?: number;
}
