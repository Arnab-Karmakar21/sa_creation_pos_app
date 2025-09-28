import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {OrderDetails, PriceBreakUp} from '../../../../models/PosModel';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
const PriceBrkUp = ({flag, SetFlag, price_breakup}: PriceBrkUpProps) => {
  const scrollViewSubCat = useRef<any>(null);
  const theme: ThemeItem = Object(useTheme());
  const [scrollOffset, SetOffSet] = useState<any>();
  const handleOnScroll = (event: any) => {
    SetOffSet(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p: any) => {
    if (scrollViewSubCat.current) {
      scrollViewSubCat.current.scrollTo(p);
    }
  };
  return (
    <Modal
      testID={'modal'}
      isVisible={flag}
      onSwipeComplete={() => SetFlag(false)}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={400 - 300}
      propagateSwipe={true}
      style={styles.modal}>
      <View style={styles.scrollableModal}>
        <ScrollView
          ref={scrollViewSubCat}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}>
          <View
            style={{
              backgroundColor: theme.colors.background,
              padding: 20,
              height: 1000,
            }}>
            <View
              style={{
                borderBottomColor: theme.colors.placeholderText,
                borderBottomWidth: 0.5,
                width: '100%',
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: theme.fonts.massiveFont,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}>
                Bill Details
              </Text>
            </View>
            {price_breakup.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderTopWidth: index + 1 === price_breakup.length ? 1 : 0.4,
                  borderTopColor:
                    index + 1 === price_breakup.length
                      ? theme.colors.placeholderText
                      : theme.colors.inputBorder,
                  borderBottomColor: theme.colors.placeholderText,
                  borderBottomWidth: index + 1 === price_breakup.length ? 1 : 0,
                  borderStyle:
                    index + 1 === price_breakup.length ? 'dashed' : 'solid',
                }}>
                <Text
                  style={{
                    fontSize:
                      index + 1 === price_breakup.length
                        ? theme.fonts.massiveFont
                        : theme.fonts.bigFont,
                    fontWeight: '700',
                    color:
                      index + 1 === price_breakup.length
                        ? theme.colors.danger
                        : theme.colors.textColor,
                  }}>
                  {item.type}
                </Text>
                <Text
                  style={{
                    fontSize:
                      index + 1 === price_breakup.length
                        ? theme.fonts.massiveFont
                        : theme.fonts.bigFont,
                    fontWeight: '800',
                    color:
                      index + 1 === price_breakup.length
                        ? theme.colors.danger
                        : theme.colors.textColor,
                  }}>
                  {'\u20B9'}
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PriceBrkUp;
interface PriceBrkUpProps {
  flag: boolean;
  SetFlag?: any;
  price_breakup: PriceBreakUp[];
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: '60%',
    width: '45%',
    marginLeft: '20%',
  },
});
