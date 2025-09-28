import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import globalStyles from '../../../../GlobalStyle';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import Modal from 'react-native-modal/dist/modal';
import {BillItemReturn} from '../../../../models/PosModel';
import {useForm, useWatch} from 'react-hook-form';

const RefundModal = ({
  isVisible,
  setIsVisible,
  bill_return_refund,
  savePress,
}: RefundModalProps) => {
  const [refu, setRefu] = useState<any>('');
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    centerModal: {
      justifyContent: 'center',
      margin: 15,
    },
    modalCard: {
      backgroundColor: theme.colors.cardalt,
      borderRadius: theme.roundness.smallRoundness,
      overflow: 'hidden',
      padding: 10,
      minHeight: 150,
      width: 500,
      position: 'absolute',
      top: '30%',
      left: '25%',
      justifyContent: 'space-between',
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    okButtonContainer: {
      flex: 1,
      paddingLeft: 5,
    },
    button: {
      height: 40,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.roundness.smallRoundness,
    },
    okButton: {
      backgroundColor: theme.colors.secondary,
      height: 40,
    },
    okButtonText: {
      color: theme.colors.secondaryConstrast,
      fontSize: theme.fonts.smallFont,
    },
    image: {
      height: 150,
      width: 150,
      zIndex: 999,
    },
    amtText: {
      fontSize: theme.fonts.massiveFont,
      fontWeight: '800',
    },
    amtConditionText: {
      fontSize: theme.fonts.extraSmallFont,
      marginBottom: 10,
    },
  });

  React.useEffect(() => {
    if (!!bill_return_refund) {
      setRefu(bill_return_refund?.refund_amount);
    }
  }, [bill_return_refund]);

  return (
    <Modal
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      backdropOpacity={0.4}
      animationInTiming={400}
      animationOutTiming={400}
      collapsable={true}
      style={styles.centerModal}>
      <View style={styles.modalCard}>
        <View style={styles.textContainer}>
          <Image
            source={require('../../../../Assets/return.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[globalStyles.fontFamily, styles.amtText]}>
            {'\u20B9'} {refu} /-
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[globalStyles.fontFamily, styles.amtConditionText]}>
            ** This amount is added in the cash voucher of the customer.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.okButtonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.okButton]}
              onPress={savePress}>
              <Text style={[globalStyles.fontFamily, styles.okButtonText]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RefundModal;
interface RefundModalProps {
  isVisible: boolean;
  setIsVisible: any;
  bill_return_refund?: BillItemReturn;
  savePress?: any;
}
