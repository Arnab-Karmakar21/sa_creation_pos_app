import {View, Text} from 'react-native';
import React from 'react';
import {Card} from '@rneui/base';
import {trackerDetails} from '../../../../models/OrderModel';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';

interface ShippingDetailsProps {
  trackingDef: trackerDetails;
}

const ShippingDetails = ({trackingDef}: ShippingDetailsProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <Card>
      <View style={{padding: 10}}>
        <View style={{marginBottom: 5}}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            Shipping Details
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 4, flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', marginTop: 20}}>
              {trackingDef?.trackDetails?.map((m, index) => (
                <View style={{height: 80, flexDirection: 'row'}} key={index}>
                  <View style={{flexDirection: 'column'}}>
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: 'green',
                      }}></View>
                    {index < trackingDef.trackDetails.length - 1 && (
                      <View
                        style={{
                          flex: 1,
                          width: 2,
                          backgroundColor: 'gray',
                          marginLeft: 4,
                        }}></View>
                    )}
                  </View>
                  <View style={{marginTop: -8, marginHorizontal: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                      {m.strOrigin}
                    </Text>
                    <Text
                      style={{color: 'green', fontWeight: '500', fontSize: 16}}>
                      {m.strAction}
                    </Text>
                    <Text style={{fontWeight: '500', fontSize: 14}}>
                      {m.strActionDate.slice(0, 2)}-
                      {m.strActionDate.slice(2, 4)}-
                      {m.strActionDate.slice(4, 8)}{' '}
                      {m.strActionTime.slice(0, 2)}:
                      {m.strActionTime.slice(2, 4)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {!!trackingDef.trackHeader && (
            <View style={{flex: 8, padding: 5}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 6}}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontWeight: '800',
                      fontSize: 18,
                    }}>
                    Expected Delivery Date
                  </Text>
                </View>
                <View style={{flex: 6}}>
                  <Text style={{fontWeight: '800', fontSize: 18}}>
                    {trackingDef.trackHeader.strRevExpectedDeliveryDate.slice(
                      0,
                      2,
                    )}
                    -
                    {trackingDef.trackHeader.strRevExpectedDeliveryDate.slice(
                      2,
                      4,
                    )}
                    -
                    {trackingDef.trackHeader.strRevExpectedDeliveryDate.slice(
                      4,
                      8,
                    )}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View style={{flex: 6}}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontWeight: '800',
                      fontSize: 18,
                    }}>
                    Shipment No
                  </Text>
                </View>
                <View style={{flex: 6}}>
                  <Text style={{fontWeight: '800', fontSize: 18}}>
                    {trackingDef.trackHeader.strShipmentNo}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View style={{flex: 6}}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontWeight: '800',
                      fontSize: 18,
                    }}>
                    Shipment Ref No
                  </Text>
                </View>
                <View style={{flex: 6}}>
                  <Text style={{fontWeight: '800', fontSize: 18}}>
                    {trackingDef.trackHeader.strRefNo}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View style={{flex: 6}}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontWeight: '800',
                      fontSize: 18,
                    }}>
                    Bag Weight
                  </Text>
                </View>
                <View style={{flex: 6}}>
                  <Text style={{fontWeight: '800', fontSize: 18}}>
                    {trackingDef.trackHeader.strWeight}{' '}
                    {trackingDef.trackHeader.strWeightUnit}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View style={{flex: 6}}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontWeight: '800',
                      fontSize: 18,
                    }}>
                    Current Status
                  </Text>
                </View>
                <View style={{flex: 6}}>
                  <Text style={{fontWeight: '800', fontSize: 18}}>
                    {trackingDef.trackHeader.strStatus}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

export default ShippingDetails;
