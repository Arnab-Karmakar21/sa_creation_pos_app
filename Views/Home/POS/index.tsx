import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShiftStart from './ShiftStart';
import {connect} from 'react-redux';
import {StoreState} from '../../../models/reduxModel';
import {User} from '../../../models/UserModel';
import Menu from './Menu';
import HoldBills from './HoldBills';
import BalanceTransfer from './BalanceTransfer';
import ProductSearch from './ProductSearch';
import Report from './Report';
import CustomerAddNew from './CustomerAddNew';
import {ShiftEndAction} from '../../../Store/actions/posActions';
import PosDashboard from './PosDashboard';
import Payment from './Payment';
import OrderDetail from './OrderDetails';
import ReturnOrder from './ReturnOrder';
import ReturnOrderDetails from './ReturnOrderDetails';
import OnlineSell from './OnlineSell';
import Refund from './Refund';
import ReturnDetails from './ReturnDetails';
const Stack = createNativeStackNavigator();
const POS = ({userData, navigation, ShiftEndAction}: POSProps) => {
  const [listenRoute, SetlistenRoute] = useState<any>();
  const EndShift = () => {
    if (
      !!userData?.active_shift?.store_id &&
      !!userData?.active_shift?.unit_id
    ) {
      ShiftEndAction({
        store_id: userData?.active_shift?.store_id,
        unit_id: userData?.active_shift?.unit_id,
      });
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {userData?.active_shift && (
        <View style={{flex: 2.2, height: '100%'}}>
          <Menu
            listenRoute={listenRoute}
            active_shift={userData.active_shift}
            navigation={navigation}
            EndShift={EndShift}
          />
        </View>
      )}
      <View style={{flex: 9.7, height: '100%'}}>
        <Stack.Navigator
          screenListeners={{
            state: (data: any) =>
              SetlistenRoute(data?.data?.state?.routes[0].name),
          }}
          screenOptions={{headerShown: false}}
          initialRouteName={'CustomerAddNew'}>
          {userData?.active_shift ? (
            <>
              <Stack.Screen name="posDashboard" component={PosDashboard} />
              <Stack.Screen name="HoldBills" component={HoldBills} />
              <Stack.Screen
                name="BalanceTransfer"
                component={BalanceTransfer}
              />
              <Stack.Screen name="ProductSearch" component={ProductSearch} />
              <Stack.Screen name="Report" component={Report} />
              <Stack.Screen name="CustomerAddNew" component={CustomerAddNew} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="OrderDetail" component={OrderDetail} />
              <Stack.Screen name="ReturnOrder" component={ReturnOrder} />
              <Stack.Screen name="OnlineSell" component={OnlineSell} />
              <Stack.Screen name="Refund" component={Refund} />
              <Stack.Screen name="ReturnDetails" component={ReturnDetails} />
              <Stack.Screen
                name="ReturnOrderDetails"
                component={ReturnOrderDetails}
              />
            </>
          ) : (
            <Stack.Screen name="shiftStart" component={ShiftStart} />
          )}
        </Stack.Navigator>
      </View>
    </View>
  );
};
const mapDispatchToProps = {
  ShiftEndAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(POS);
interface POSProps {
  userData?: User;
  navigation?: any;
  ShiftEndAction?: any;
}
