import {DefaultTheme} from '@react-navigation/native';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#33b8e8',
    primary: '#272663',
    primaryTint: '#126C8A',
    primaryShade: '#C8F1FA',
    primaryConstrast: '#FFFFFF',
    secondary: '#d14803',
    secondaryTint: '#923c02',
    secondaryShade: '#ffd9c0',
    secondaryConstrast: '#ffffff',
    // tertiary: '#76BA1B',
    // tertiaryTint: '#a1d45d',
    tertiaryShade: '#2A4A00',
    // tertiaryConstrast: 'rgb(255, 255, 255)',
    background: '#eeeeee',
    card: 'rgb(255, 255, 255)',
    cardalt: 'rgb(245, 245, 245)',
    cardprimary: '#525e75',
    border: 'rgb(194, 206, 209)',
    notification: 'rgb(255, 69, 58)',
    text: '#000000',
    dark: '#141414',
    darkTint: '#878686',
    darkShade: '#000000',
    transparent: 'rgba(0, 0, 0, 0)',
    danger: 'rgb(179, 40, 30)',
    success: '#76BA1B',
    placeholderText: 'rgb(141, 160, 166)',
    errorToast: '#b3281e',
    messageToast: '#707070',
    inputBorder: 'rgba(141, 160, 166, 0.4)',
    textColor: '#373737',
    warn: '#F7A201',
    addOn1: '#78938a',
    addon2: '#1b4552',
    addOn3: '#057dcd',
    btnClr: '#272663',
    primaryTransparent: 'rgba(51, 184, 232 , 0.2)',
  },
  fonts: {
    massiveFont: 26,
    bigFont: 20,
    mediumFont: 18,
    smallFont: 16,
    extraSmallFont: 14,
    extremeSmallFont: 12,
  },
  icons: {
    massiveIcon: 50,
    bigIcon: 36,
    mediumIcon: 26,
    smallIcon: 18,
    extraSmallIcon: 14,
  },
  roundness: {
    bigRoundness: 30,
    mediumRoundness: 12,
    smallRoundness: 5,
  },
};

export default LightTheme;

export interface ThemeItem {
  colors: Colors;
  fonts: Fonts;
  icons: Icons;
  roundness: Roundness;
}

interface Roundness {
  bigRoundness: number;
  mediumRoundness: number;
  smallRoundness: number;
}

interface Icons {
  massiveIcon: number;
  bigIcon: number;
  mediumIcon: number;
  smallIcon: number;
  extraSmallIcon: number;
}

interface Fonts {
  massiveFont: number;
  bigFont: number;
  mediumFont: number;
  smallFont: number;
  extraSmallFont: number;
  extremeSmallFont: number;
}

interface Colors {
  primary: string;
  primaryTint: string;
  primaryShade: string;
  primaryConstrast: string;
  secondary: string;
  secondaryTint: string;
  secondaryShade: string;
  secondaryConstrast: string;
  background: string;
  card: string;
  cardalt: string;
  cardprimary: string;
  border: string;
  notification: string;
  text: string;
  transparent: string;
  danger: string;
  success: string;
  placeholderText: string;
  errorToast: string;
  messageToast: string;
  inputBorder: string;
  dark: string;
  darkTint: string;
  darkShade: string;
  tertiary: string;
  tertiaryTint: string;
  tertiaryShade: string;
  tertiaryConstrast: string;
  textColor: string;
  warn: string;
  addOn1: string;
  addon2: string;
  addOn3: string;
  btnClr: string;
  primaryTransparent: string;
}
