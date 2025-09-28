import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../../GlobalStyle';
import { ThemeItem } from '../../Theme/LightTheme';


const HeaderStyle1 = (props: HeaderInterface) => {
  const styles = StyleSheet.create({
    headerContainer: {
      paddingTop: 10,
      paddingHorizontal: '5%',
      backgroundColor: props.backgroundColor,
      borderBottomRightRadius: props.theme.roundness.bigRoundness,
    },
    headerText: {
      fontSize: props.theme.fonts.massiveFont,
      fontWeight: 'bold',
      color: props.headerColor,
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: {height: 3, width: 0},
      textShadowRadius: 2.5,
    },
    headerSubText: {
      fontSize: props.theme.fonts.mediumFont,
      color: props.subHeaderColor,
    },
    spacingMargin: {
      paddingVertical: 10,
    },
  });
  return (
    <View style={[styles.spacingMargin, styles.headerContainer]}>
      <Text style={[styles.headerText, globalStyles.fontFamily]}>
        {props.headerText}
      </Text>
      <Text style={[styles.headerSubText, globalStyles.fontFamily]}>
        {props.subHeaderText}
      </Text>
    </View>
  );
};

interface HeaderInterface {
  headerText: string;
  subHeaderText: string;
  headerColor: string;
  subHeaderColor: string;
  backgroundColor: string;
  theme: ThemeItem;
}

export default HeaderStyle1;
