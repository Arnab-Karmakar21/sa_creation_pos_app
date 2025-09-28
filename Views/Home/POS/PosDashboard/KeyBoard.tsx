import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
const KeyBoard = ({string, setstring, currency = false}: KeyBoardPros) => {
  const theme: ThemeItem = Object(useTheme());
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2];
  const SetText = (key: number) => {
    if (key >= 0) {
      setstring(string + key.toString());
    } else if (key == -1) {
      currency && !string.includes('.') && setstring(string + '.');
    } else {
      string.length > 0 && setstring(string.slice(0, string.length - 1));
    }
  };
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: theme.colors.placeholderText,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}>
      {num.map((item, index) => (
        <TouchableOpacity
          onPress={() => SetText(item)}
          style={{
            width: '33.3%',
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: theme.colors.placeholderText,
            padding: 5,
          }}
          key={index}>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            {item == -2 ? (
              <Icon
                name="close-outline"
                style={{
                  fontSize: theme.fonts.massiveFont,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}
              />
            ) : item != -1 ? (
              item
            ) : (
              currency && '.'
            )}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default KeyBoard;

interface KeyBoardPros {
  setstring?: any;
  string: string;
  currency?: boolean;
}
