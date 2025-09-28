import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlightComponent,
  Button,
  Image,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import HeaderStyle1 from '../../../../UILibrary/HeaderStyle1';
import QubeButton from '../../../../UILibrary/QubeButton';
import {BagItem, SingleOrder} from '../../../../models/OrderModel';
import Order from '..';
import SecretCodePopover from './SecretCodePopover';
import {Card} from '@rneui/base';
import ReadyForDispatchPopover from './ReadyForDispatchPopover';
import ShippingDetails from './ShippingDetails';

const OrderDetailsView = ({
  OrderDetails,
  UpdateItem,
  RejectOrders,
  printBill,
  print,
}: OrderDetailsViewProps) => {
  const [flag, setflag] = useState<boolean>(false);
  const [flag1, setflag1] = useState<boolean>(false);
  const theme: ThemeItem = Object(useTheme());
  // var title = '';
  // if (!!OrderDetails?.bag_details && OrderDetails.bag_details.bag_status == 1) {
  //   title = 'Accept';
  // } else if (
  //   !!OrderDetails?.bag_details &&
  //   OrderDetails.bag_details.bag_status == 2
  // ) {
  //   title = 'Packaging In Progress';
  // } else if (
  //   !!OrderDetails?.bag_details &&
  //   OrderDetails.bag_details.bag_status == 4
  // ) {
  //   title = 'Ready To Dispatch';
  // }
  const styles = StyleSheet.create({
    profileImg: {
      height: 100,
      width: 100,
      display: 'flex',
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    container: {
      paddingBottom: 15,
      flex: 1,
    },
    headerText: {
      fontSize: theme.fonts.massiveFont,
      fontWeight: 'bold',
      color: theme.colors.primaryConstrast,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
    },
    spacing: {
      paddingVertical: 10,
    },
    sectionSubHeader: {
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.primaryShade,
      fontWeight: 'bold',
    },
    Date: {
      paddingTop: 1,
      fontSize: theme.fonts.extraSmallFont,
      color: theme.colors.danger,
    },
    Price: {
      paddingTop: 1,
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.primary,
    },
    Status: {
      fontSize: theme.fonts.mediumFont,
      color: theme.colors.messageToast,
      fontWeight: 'bold',
    },
    card_1: {
      width: '90%',
      borderRadius: 10,
      marginVertical: 12,
      marginHorizontal: 16,
      display: 'flex',
      alignSelf: 'center',
    },
    card_2: {
      width: '90%',
      borderRadius: 10,
      // marginVertical:12,
      // marginHorizontal:16,
      display: 'flex',
      alignSelf: 'center',
    },
    card_3: {
      width: '90%',
      borderRadius: 10,
      marginVertical: 12,
      marginHorizontal: 16,
      display: 'flex',
      alignSelf: 'center',
    },
    cardElevated: {
      backgroundColor: 'white',
      elevation: 1,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
    cardBody: {
      flex: 1,
      flexGrow: 1,
      paddingHorizontal: 12,
      marginTop: 5,
      backgroundColor: theme.colors.card,
      borderRadius: 10,
      justifyContent: 'space-evenly',
      padding: 30,
    },
    cardBody_1: {
      flex: 1,
      flexGrow: 1,
      paddingHorizontal: 12,
      padding: 30,

      backgroundColor: theme.colors.card,
      borderRadius: 10,
    },
    cardTitle_1: {
      color: theme.colors.text,
      fontSize: theme.fonts.bigFont,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginVertical: 10,
      marginTop: 10,
      marginLeft: 25,
    },
    cardTitle_2: {
      color: theme.colors.text,
      fontSize: theme.fonts.bigFont,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginTop: 2,
      marginLeft: 25,
    },
    cardTitle_3: {
      color: theme.colors.text,
      fontSize: theme.fonts.bigFont,
      fontWeight: 'bold',
      marginBottom: 4,
      alignSelf: 'flex-start',
      marginVertical: 10,
      marginLeft: 25,
    },
    cardTitle_4: {
      color: theme.colors.text,
      fontSize: theme.fonts.bigFont,
      fontWeight: 'bold',

      alignSelf: 'center',
      marginLeft: 25,
    },
  });

  function mapBagStatus(id: number) {
    switch (id) {
      case 1:
        return 'Order Placed';
      case 2:
        return 'Order Accepted';
      case 4:
        return 'Ready For Pickup';
      case 8:
        return 'Delivered';
      case 9:
        return 'Rejected';
      case 10:
        return 'Cancelled';
      case 5:
        return 'Ready For Pickup';
      case 6:
        return 'Picked Up';
      default:
        return 'No Value';
    }
  }
  console.log(OrderDetails?.dtdc_tracker);

  return (
    <View style={{padding: 20}}>
      <SecretCodePopover
        flag={flag}
        Setflag={setflag}
        onUpdateItem={(otp: string) => (
          UpdateItem({
            bag_id: OrderDetails?.bag_details?.bag_id,
            bag_status: 8,
            secret_code: otp,
          }),
          setflag(false)
        )}
      />
      <ReadyForDispatchPopover
        flag={flag1}
        Setflag={setflag1}
        submit={(data: any) => {
          UpdateItem({
            ...data,
            bag_id: OrderDetails?.bag_details?.bag_id,
            bag_status: 5,
          });
          setflag1(false);
        }}
      />
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: theme.colors.darkTint,
          paddingVertical: 5,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              marginBottom: 5,
              color: theme.colors.darkShade,
            }}>
            <Text style={{fontWeight: 'bold'}}>ORDER ID </Text>#{' '}
            {OrderDetails?.bag_details.order_ref_no}
          </Text>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              marginBottom: 5,
              color: theme.colors.darkShade,
            }}>
            <Text style={{fontWeight: 'bold'}}>BAG ID </Text>#
            {OrderDetails?.bag_details?.bag_ref_no}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 17,
              color: theme.colors.placeholderText,
            }}>
            Order Details
          </Text>
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          {!!OrderDetails?.bag_details &&
            OrderDetails?.bag_details?.bag_status == 1 && (
              <>
                <View style={{width: '30%', marginRight: 20}}>
                  <Button
                    title="Accept"
                    color="#76BA1B"
                    onPress={() =>
                      UpdateItem({
                        bag_id: OrderDetails?.bag_details?.bag_id,
                        bag_status: 2,
                      })
                    }></Button>
                </View>
                <View style={{width: '30%'}}>
                  <Button
                    title="Reject"
                    color="rgb(179, 40, 30)"
                    onPress={() =>
                      UpdateItem({
                        bag_id: OrderDetails?.bag_details?.bag_id,
                        bag_status: 10,
                      })
                    }></Button>
                </View>
              </>
            )}
          {!!OrderDetails?.bag_details &&
            OrderDetails?.bag_details?.bag_status == 2 && (
              <>
                <View style={{width: '30%', marginHorizontal: 50}}>
                  <Button
                    title={
                      OrderDetails?.bag_details.order_delivery_type == 2
                        ? 'Ready for dispatch'
                        : 'Ready For Pickup'
                    }
                    color="#272663"
                    onPress={() => {
                      OrderDetails?.bag_details?.order_delivery_type == 1
                        ? UpdateItem({
                            bag_id: OrderDetails?.bag_details?.bag_id,
                            bag_status: 4,
                          })
                        : setflag1(true);
                    }}></Button>
                </View>
              </>
            )}
          {!!OrderDetails?.bag_details &&
            OrderDetails?.bag_details?.bag_status == 4 &&
            OrderDetails?.bag_details.payment_type != 1 && (
              <>
                <View style={{width: '30%', marginHorizontal: 50}}>
                  <Button
                    title="Delivered"
                    color="#272663"
                    onPress={() => setflag(true)}></Button>
                </View>
              </>
            )}
          {!!OrderDetails?.bag_details &&
            OrderDetails?.bag_details?.bag_status == 5 && (
              <>
                <View style={{width: '30%', marginHorizontal: 50}}>
                  <QubeButton
                    color={'primary'}
                    onPress={() =>
                      UpdateItem({
                        bag_id: OrderDetails?.bag_details?.bag_id,
                        bag_status: 6,
                      })
                    }
                    title="Picked up"></QubeButton>
                </View>
              </>
            )}
          {!!OrderDetails?.bag_details &&
            OrderDetails?.bag_details?.bag_status == 8 && (
              <>
                <View style={{width: '30%', marginHorizontal: 50}}>
                  <QubeButton
                    color={'primary'}
                    disabled={print}
                    onPress={() => printBill()}
                    title="Print"></QubeButton>
                </View>
              </>
            )}
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        {/* left */}
        <View style={{flex: 2}}>
          <ScrollView style={{height: '86%'}}>
            <Card containerStyle={{marginBottom: 10}}>
              <View
                style={{
                  width: '100%',
                  borderWidth: 2,
                  backgroundColor: theme.colors.primary,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  padding: 3,
                  marginTop: 6,
                  borderRadius: 2,
                }}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: theme.fonts.mediumFont}}>
                    Product Code
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: theme.fonts.mediumFont,
                    }}>
                    Item Name
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: theme.fonts.mediumFont}}>
                    Quantity
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: theme.fonts.mediumFont}}>
                    Amount
                  </Text>
                </View>
              </View>
              {OrderDetails?.bag_details?.bag_items.map((item, index) => (
                <View
                  key={index}
                  style={{
                    borderBottomColor: theme.colors.inputBorder,
                    borderBottomWidth: 0.5,
                    backgroundColor:
                      item.return_quantity > 0 ? '#f5a9a9' : '#ffff',
                    marginBottom: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      width: '100%',
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontSize: theme.fonts.smallFont,
                          color: theme.colors.text,
                          fontWeight: 'bold',
                        }}>
                        #
                        {
                          item?.qr_unique_code?.split('-')[
                            item?.qr_unique_code?.split('-').length - 1
                          ]
                        }
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: theme.fonts.smallFont,
                          color: theme.colors.text,
                          fontWeight: 'bold',
                          paddingHorizontal: 5,
                        }}>
                        {item.product_description}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: theme.fonts.smallFont,
                          color:
                            item.return_quantity > 0
                              ? theme.colors.danger
                              : theme.colors.text,
                          fontWeight: 'bold',
                          textDecorationLine:
                            item.return_quantity > 0 ? 'line-through' : 'none',
                          paddingRight: 5,
                        }}>
                        {item.required_quantity}
                      </Text>
                      {item.return_quantity > 0 && (
                        <Text
                          style={{
                            fontSize: theme.fonts.smallFont,
                            color: theme.colors.text,
                            fontWeight: 'bold',
                          }}>
                          {item.required_quantity - item.return_quantity}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontSize: theme.fonts.smallFont,
                          color: theme.colors.text,
                          fontWeight: 'bold',
                        }}>
                        {'\u20B9'} {item.online_selling_price}
                      </Text>
                    </View>
                  </View>
                  {item.return_quantity > 0 && (
                    <View>
                      <Text style={{color: theme.colors.danger}}>
                        **Return amount added in the cash voucher/ Same as
                        Payment Mode of the customer.
                      </Text>
                    </View>
                  )}
                </View>
              ))}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                  padding: 4,
                  borderColor: theme.colors.border,
                  borderWidth: 2,
                  borderRadius: 1,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: theme.fonts.bigFont,
                    color: theme.colors.danger,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    flex: 3,
                  }}>
                  Total Amount
                </Text>
                <Text
                  style={{
                    fontSize: theme.fonts.bigFont,
                    color: theme.colors.danger,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    flex: 1,
                  }}>
                  {' '}
                  {'\u20B9'}
                  {OrderDetails?.bag_details?.total_price}
                </Text>
              </View>
              {/* Order status */}
              <View style={{backgroundColor: '#f3f4f8', marginTop: 30}}>
                <View style={{padding: 15, marginVertical: 10}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 20,
                      color: theme.colors.placeholderText,
                    }}>
                    Order Status
                  </Text>
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontWeight: 'bold',
                          width: 150,
                        }}>
                        Order Created at: {'   '}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 'bold',
                        }}>
                        {' '}
                        {OrderDetails?.bag_details
                          ? moment(
                              OrderDetails?.bag_details.order_created_at,
                            ).format('DD/MM/YYYY hh:mm a')
                          : ''}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontWeight: 'bold',
                          width: 150,
                        }}>
                        Payement Type:{'      '}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 'bold',
                        }}>
                        {OrderDetails?.bag_details?.payment_type_name}
                      </Text>
                    </View>
                    {!!OrderDetails?.bag_details?.bank_return_ref_no && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            color: theme.colors.text,
                            fontWeight: 'bold',
                            width: 150,
                          }}>
                          Payment Referance No:{'      '}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                          }}>
                          {OrderDetails?.bag_details?.bank_return_ref_no}
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontWeight: 'bold',
                          width: 150,
                        }}>
                        Bag Status: {'           '}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.primary,
                          fontWeight: 'bold',
                        }}>
                        {mapBagStatus(
                          OrderDetails?.bag_details
                            ? OrderDetails?.bag_details?.bag_status
                            : 0,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
            {!!OrderDetails?.bag_details &&
              (OrderDetails?.bag_details?.bag_status == 6 ||
                OrderDetails?.bag_details?.bag_status == 8) &&
              OrderDetails.bag_details.order_delivery_type == 2 &&
              !!OrderDetails?.dtdc_tracker && (
                <ShippingDetails trackingDef={OrderDetails.dtdc_tracker} />
              )}
          </ScrollView>
        </View>
        {/* right */}
        {!!OrderDetails &&
          OrderDetails?.delivery_address.map((item, index) => (
            <View style={{flex: 1}} key={index}>
              <Card>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 20,
                      color: theme.colors.placeholderText,
                    }}>
                    Customer
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#f3f4f8',
                    padding: 15,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={styles.profileImg}
                      source={require('../../../../Assets/profile.png')}
                    />
                    <View
                      style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        padding: 20,
                      }}>
                      <Text style={{fontSize: 20, fontWeight: '600'}}>
                        {item.first_name + ' ' + item.last_name}
                      </Text>
                      <Text>{item.customer_phone}</Text>
                    </View>
                  </View>
                </View>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 18,
                      color: theme.colors.placeholderText,
                    }}>
                    Shipping address
                  </Text>
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        marginTop: 5,
                        color: theme.colors.primary,
                      }}>
                      {OrderDetails?.bag_details?.order_delivery_type_name}
                    </Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={{fontWeight: '600', marginTop: 5}}>
                      {item?.addressline1 +
                        (!!item?.addressline2 ? ',' + item?.addressline2 : '') +
                        (!!item.district_name ? ',' + item.district_name : '') +
                        (!!item?.state_name ? ',' + item?.state_name : '') +
                        (!!item?.country_name ? ',' + item?.country_name : '')}
                    </Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={{fontWeight: '600', marginTop: 5}}>
                      Pincode - {item?.pin}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          ))}
      </View>
    </View>
  );
};

export default OrderDetailsView;

interface OrderDetailsViewProps {
  OrderDetails?: SingleOrder;
  UpdateItem?: any;
  RejectOrders?: any;
  printBill?: any;
  print: boolean;
}
interface SectionProps {
  Header: string;
  subtext: string;
}
interface ItemProps {
  BagItem: BagItem;
  index: number;
}
