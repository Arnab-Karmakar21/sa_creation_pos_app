import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import OrderDetailsView from './orderDetailView';
import {StoreState} from '../../../../models/reduxModel';
import {SingleOrder, UpdateOrderModel} from '../../../../models/OrderModel';
import {
  OrderDetailsLoad,
  UpDateOrder,
} from '../../../../Store/actions/OrderAction';
import {Billformater} from '../../../../Service/BillFormater';
import moment from 'moment';
import ThermalPrinterModule from 'react-native-thermal-printer';
const OrderDetails = (props: OrderDetailsProps) => {
  const [print, SetPrint] = useState<boolean>(false);
  useFocusEffect(
    React.useCallback(() => {
      props.OrderDetailsLoad(props.route.params.bag_id);
    }, []),
  );

  const RejectOrder = (data: UpdateOrderModel) => {
    if (data.bag_status == 1) {
      props.UpDateOrder({bag_id: data.bag_id, bag_status: 9});
    }
  };

  const UpdateItem = (data: UpdateOrderModel) => {
    props.UpDateOrder(data);
  };

  useEffect(() => {
    setTimeout(() => {
      SetPrint(false);
    }, 3000);
  }, [print]);
  const printBill = async () => {
    SetPrint(true);
    let item: any = props?.OrderDetails?.bag_details?.bag_items?.map(m => ({
      discount: !!m.discount ? m.discount.toFixed(2).toString() : '0.00',
      mrp: m.product_mrp.toFixed(2).toString(),
      product_name: m.product_description,
      quantity:
        m.required_quantity.toString() +
        (m.return_quantity
          ? ' > ' + (m.required_quantity - m.return_quantity).toString()
          : ''),
      selling_price: m.total_price.toFixed(2).toString(),
    }));
    let payload = await Billformater({
      address:
        props?.OrderDetails?.delivery_address[0].addressline1 +
        ', ' +
        props?.OrderDetails?.delivery_address[0].addressline2 +
        ', ' +
        props?.OrderDetails?.delivery_address[0].city +
        ', ' +
        props?.OrderDetails?.delivery_address[0].district_name +
        ', ' +
        props?.OrderDetails?.delivery_address[0].country_name +
        ' - ' +
        props?.OrderDetails?.delivery_address[0].pin +
        ' - ',
      customer_name:
        props?.OrderDetails?.delivery_address[0].first_name +
        ' ' +
        props?.OrderDetails?.delivery_address[0].last_name,
      title: 'SRISHTISHREE',
      invoice_no: props?.OrderDetails?.bag_details.order_ref_no,
      phone_no: props?.OrderDetails?.delivery_address[0].customer_phone,
      store: props?.OrderDetails?.bag_details.store_name,
      unit_name: props?.OrderDetails?.bag_details.unit_name,
      date: moment(props?.OrderDetails?.bag_details.order_created_at)
        .format('DD/MM/YYYY HH:MM a')
        .toString(),
      item: item,
      ammount_recived: props?.OrderDetails?.bag_details.total_price?.toString(),
      payment_type: props?.OrderDetails?.bag_details.payment_type_name,
      return_amount: '0.00',
      total: props?.OrderDetails?.bag_details.total_price?.toString(),
      bag_id: props?.OrderDetails?.bag_details.bag_ref_no,
    });
    setTimeout(() => {
      ThermalPrinterModule.printBluetooth({
        printerWidthMM: 55,
        mmFeedPaper: 55,
        printerNbrCharactersPerLine: 32,
        payload: payload,
      })
        .then(res => {})
        .catch(err => {});
    }, 800);
  };

  return (
    <OrderDetailsView
      OrderDetails={props.OrderDetails}
      UpdateItem={UpdateItem}
      RejectOrders={RejectOrder}
      printBill={printBill}
      print={print}
    />
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    OrderDetails: state.order?.SingleOrder,
  };
};

const mapDispatchToProps = {
  OrderDetailsLoad,
  UpDateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

interface OrderDetailsProps {
  OrderDetails: SingleOrder;
  OrderDetailsLoad?: any;
  UpDateOrder?: any;
  route?: any;
}
