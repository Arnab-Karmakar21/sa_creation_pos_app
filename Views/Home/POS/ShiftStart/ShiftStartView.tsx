import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import globalStyles from '../../../../GlobalStyle';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StoreItem} from '../../../../models/StoreModel';
import {RetrieveImageService_one} from '../../../../Service/S3';
import NoImage from '../../../../Assets/PlaceHolderStore.svg';
import QubeButton from '../../../../UILibrary/QubeButton';
import {useTheme} from '@react-navigation/native';
import {Card} from '@rneui/base';
const ShiftStartView = ({stores, ShiftStartAction}: ShiftStartViewProps) => {
  const [Selection, SetSelection] = useState<any>();
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    formContainer: {
      paddingBottom: 15,
      paddingLeft: '5%',
      paddingRight: '5%',
    },
    spacingMargin: {
      paddingVertical: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelText: {
      color: theme.colors.primary,
      fontSize: theme.fonts.smallFont,
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
    },
    headerSubText: {
      marginTop: '15%',
      marginBottom: 6,
      fontSize: 19,
      color: theme.colors.primary,
    },
    lowerSection: {
      backgroundColor: theme.colors.background,
      flex: 40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingTop: 20,
    },
    upperGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: theme.roundness.mediumRoundness,
    },
  });
  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={[{flex: 30}]}>
        <View style={[styles.upperGradient, {flexDirection: 'column'}]}>
          <ImageBackground
            source={require('../../../../Assets/store.jpg')}
            style={{height: '100%', width: '100%'}}
            imageStyle={{opacity: 1}}
            resizeMode="cover">
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.primary,
                width: 160,
                margin: 40,
                marginTop: '10%',
              }}>
              <Text
                style={[
                  styles.headerText,
                  globalStyles.fontFamily,
                  {opacity: 0.9},
                ]}>
                Start Shift
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View
        style={[
          styles.lowerSection,
          {height: '100%', justifyContent: 'space-around'},
        ]}>
        <View
          style={{
            width: 200,
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              color: '#ffff',
              fontWeight: 'bold',
              fontSize: theme.fonts.mediumFont,
            }}>
            Select Store
          </Text>
        </View>
        <View>
          {stores.length > 0 ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{width: '100%'}}>
              {stores.map((item, index) => (
                <StoreItems
                  key={index}
                  item={item}
                  SetSelection={SetSelection}
                  Selection={Selection}
                />
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  color: theme.colors.placeholderText,
                }}>
                No Store Found
              </Text>
            </View>
          )}
        </View>
        <View style={{padding: 30}}>
          <QubeButton
            onPress={() => ShiftStartAction(Selection)}
            title="Start Shift"
            color="primary"
            disabled={!Selection}></QubeButton>
        </View>
      </View>
    </View>
  );
};

export default ShiftStartView;
interface ShiftStartViewProps {
  stores: StoreItem[];
  ShiftStartAction?: any;
}
const StoreItems = React.memo(
  ({item, Selection, SetSelection}: StoresItemProps) => {
    const theme: ThemeItem = Object(useTheme());
    return (
      <Card
        containerStyle={{
          width: 500,
          height: 300,
          borderRadius: 10,
          marginHorizontal: 10,
        }}>
        {Selection?.store_id == item.store_id && (
          <Image
            style={{
              position: 'absolute',
              zIndex: 999,
              height: 100,
              width: 100,
              left: 200,
              top: 50,
            }}
            source={require('../../../../Assets/check-mark.png')}
          />
        )}

        <TouchableOpacity
          onPress={() =>
            SetSelection({store_id: item.store_id, unit_id: item.unit_id})
          }>
          <View
            style={{
              height: 200,
              width: '100%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}>
            {item.store_image.thumb_doc_path ? (
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                source={{
                  uri: RetrieveImageService_one(
                    item.store_image.thumb_doc_path,
                  ),
                }}></Image>
            ) : (
              <NoImage height={'100%'} />
            )}
          </View>
          <View style={{height: 200, width: '100%'}}>
            <Text
              style={{
                fontSize: theme.fonts.mediumFont,
                color: theme.colors.primary,
                fontWeight: 'bold',
                paddingHorizontal: 10,
              }}>
              {item.store_name}
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.smallFont,
                color: theme.colors.primary,
                fontWeight: '500',
                paddingHorizontal: 10,
              }}>
              {item.unit_name}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  },
);

interface StoresItemProps {
  item: StoreItem;
  SetSelection?: any;
  Selection?: any;
}
