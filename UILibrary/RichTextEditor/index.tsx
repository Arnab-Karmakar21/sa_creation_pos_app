import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Controller} from 'react-hook-form';
import globalStyles from '../../GlobalStyle';
import {ThemeItem} from '../../Theme/LightTheme';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import Ionicon from 'react-native-vector-icons/Ionicons';
const RichTextEditor = ({
  control,
  errors,
  name,
  defaultValue,
  editable,
  label,
  rules,
  style,
  dependancy,
}: RichEditors) => {
  const richText: any = useRef();
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    error: {
      fontSize: theme.fonts.smallFont,
      color: theme.colors.danger,
    },
    label: {
      color: theme.colors.primary,
      paddingBottom: 5,
      fontSize: theme.fonts.smallFont,
    },
    input: {
      borderRadius: theme.roundness.mediumRoundness,
      borderWidth: !errors[name] ? 0.6 : 2,
      borderColor: !errors[name]
        ? theme.colors.inputBorder
        : theme.colors.danger,
      borderStyle: 'solid',
      width: '100%',
      backgroundColor: theme.colors.card,
      paddingLeft: 15,
      paddingRight: 15,
      fontSize: theme.fonts.smallFont,
    },
  });
  const [t, sett] = useState<boolean>(false);
  useEffect(() => {
    sett(false);
    setTimeout(() => {
      sett(true);
    }, 1000);
  }, [dependancy]);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={!!defaultValue ? defaultValue.toString() : defaultValue}
      rules={rules}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={style}>
          <Text style={[styles.label, globalStyles.fontFamily]}>{label}</Text>
          {t && (
            <View style={[[styles.input, globalStyles.boxShadow]]}>
              <RichEditor
                ref={richText}
                onChange={onChange}
                placeholder={label}
                androidHardwareAccelerationDisabled={true}
                style={{height: '100%', width: '100%'}}
                initialHeight={200}
                scrollEnabled={true}
                initialContentHTML={value}
                onBlur={onBlur}
              />

              <RichToolbar
                editor={richText}
                selectedIconTint="#873c1e"
                iconTint="#312921"
                actions={[
                  actions.fontSize,
                  actions.heading1,
                  actions.heading2,
                  actions.heading3,
                  actions.insertVideo,
                  actions.table,
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertLink,
                  actions.setStrikethrough,
                  actions.setUnderline,
                ]}
                iconMap={{
                  [actions.heading1]: ({tintColor}: any) => (
                    <Text
                      style={{
                        color: tintColor,
                        fontSize: theme.fonts.mediumFont,
                      }}>
                      H1
                    </Text>
                  ),
                  [actions.heading2]: ({tintColor}: any) => (
                    <Text
                      style={{
                        color: tintColor,
                        fontSize: theme.fonts.mediumFont,
                      }}>
                      H2
                    </Text>
                  ),
                  [actions.heading3]: ({tintColor}: any) => (
                    <Text
                      style={{
                        color: tintColor,
                        fontSize: theme.fonts.mediumFont,
                      }}>
                      H3
                    </Text>
                  ),
                }}
                style={{width: '100%'}}
              />
            </View>
          )}
          <Text
            style={[
              !!errors[name] ? styles.error : {display: 'none'},
              globalStyles.fontFamily,
            ]}>
            {!!errors[name] && '* ' + errors[name].message.toString()}
          </Text>
        </View>
      )}
    />
  );
};

export default RichTextEditor;

interface RichEditors {
  name: any;
  rules?: any;
  control: any;
  defaultValue?: any;
  errors: any;
  label?: string;
  editable?: any;
  style?: any;
  dependancy?: any;
}
