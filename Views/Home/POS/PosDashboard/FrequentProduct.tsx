import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {FrequentItems} from '../../../../models/PosModel';
import {ScrollView} from 'react-native-gesture-handler';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import QubeButton from '../../../../UILibrary/QubeButton';
import {RetrieveImageService_one} from '../../../../Service/S3';

const FrequentProduct = ({frequents, FeqBuy}: FrequentProductProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <ScrollView style={{height: '100%', width: '100%'}} horizontal={true}>
      {frequents.map((item, index) => (
        <View
          key={index}
          style={{
            height: '90%',
            width: 400,
            margin: 10,
            borderRadius: theme.roundness.mediumRoundness,
            borderColor: theme.colors.primary,
            borderWidth: 0.5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '40%',
              height: '100%',
              borderTopLeftRadius: theme.roundness.mediumRoundness,
              borderBottomLeftRadius: theme.roundness.mediumRoundness,
              borderRightColor: theme.colors.primary,
              borderRightWidth: 0.5,
            }}>
            {item.product_images.thumb_doc_path ? (
              <Image
                style={{
                  height: '100%',
                  borderTopLeftRadius: theme.roundness.mediumRoundness,
                  borderBottomLeftRadius: theme.roundness.mediumRoundness,
                }}
                source={{
                  uri: item.product_images.thumb_doc_path
                  // uri: RetrieveImageService_one(
                  //   item.product_images.thumb_doc_path,
                  // ),
                }}
              />
            ) : (
              <></>
            )}
          </View>
          <View style={{width: '60%', padding: 5}}>
            <View style={{flex: 2}}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  color: theme.colors.primary,
                }}>
                {item.product_description}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: theme.colors.placeholderText}}>
                #
                {
                  item?.qr_unique_code?.split('-')[
                    item?.qr_unique_code?.split('-').length - 1
                  ]
                }
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: theme.fonts.mediumFont,
                  color: theme.colors.primary,
                  fontWeight: '800',
                }}>
                No Of Sell : {item.quantity}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <QubeButton
                color={'primary'}
                onPress={() =>
                  FeqBuy({
                    product_id:
                      item.qr_unique_code.split('-')[
                        item.qr_unique_code.split('-').length - 1
                      ],
                  })
                }
                title="Add"></QubeButton>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FrequentProduct;

interface FrequentProductProps {
  frequents: FrequentItems[];
  FeqBuy?: any;
}
