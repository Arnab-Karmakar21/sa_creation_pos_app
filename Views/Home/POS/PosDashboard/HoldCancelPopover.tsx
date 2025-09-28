import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import QubeButton from '../../../../UILibrary/QubeButton';
const HoldCancelPopover = ({
  flag,
  Setflag,
  HoldBill,
  CancelOrder,
}: HoldCancelPopoverProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <Modal
      style={{
        width: '50%',
        position: 'absolute',
        top: '22%',
        left: '22%',
        zIndex: 2,
      }}
      testID={'modal'}
      onBackdropPress={() => Setflag(false)}
      isVisible={flag}>
      <View
        style={{
          backgroundColor: '#ffff',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
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
            Update Status
          </Text>
        </View>
        <View style={{padding: 20}}>
          <View style={{padding: 10}}>
            <QubeButton
              color={'primary'}
              onPress={() => HoldBill()}
              title="Hold This Bill"></QubeButton>
          </View>
          <View style={{padding: 10}}>
            <QubeButton
              color={'danger'}
              onPress={() => CancelOrder()}
              title="Cancel This Order"></QubeButton>
          </View>
          <View style={{padding: 10}}>
            <QubeButton
              color={'placeholderText'}
              onPress={() => Setflag(false)}
              title="Close"></QubeButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HoldCancelPopover;

interface HoldCancelPopoverProps {
  flag: boolean;
  Setflag?: any;
  HoldBill?: any;
  CancelOrder?: any;
}
