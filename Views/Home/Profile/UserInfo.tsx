import {View, Text} from 'react-native';
import React from 'react';
import {User} from '../../../models/UserModel';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../Theme/LightTheme';

const UserInfo = ({userData}: userInfoPropos) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View style={{flex: 1, padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          padding: 5,
          borderColor: theme.colors.inputBorder,
        }}>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                color: theme.colors.placeholderText,
                fontWeight: '500',
                fontSize: theme.fonts.smallFont,
              }}>
              
              First Name
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                paddingLeft: 10,
                fontWeight: '700',
              }}>
              
              {userData?.firstname}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                color: theme.colors.placeholderText,
                fontWeight: '500',
                fontSize: theme.fonts.smallFont,
              }}>
              
              Last Name
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                paddingLeft: 10,
                fontWeight: '700',
              }}>
              {' '}
              {userData?.lastname}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          padding: 5,
          borderColor: theme.colors.inputBorder,
        }}>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                color: theme.colors.placeholderText,
                fontWeight: '500',
                fontSize: theme.fonts.smallFont,
              }}>
              Email
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                paddingLeft: 10,
                fontWeight: '700',
              }}>
              {userData?.email_id}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                color: theme.colors.placeholderText,
                fontWeight: '500',
                fontSize: theme.fonts.smallFont,
              }}>
              Phone
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                paddingLeft: 10,
                fontWeight: '700',
              }}>
              {' '}
              {userData?.contact_phone}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          padding: 5,
          borderColor: theme.colors.inputBorder,
        }}>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                color: theme.colors.placeholderText,
                fontWeight: '500',
                fontSize: theme.fonts.smallFont,
              }}>
              Marketing Sangha Name
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                paddingLeft: 10,
                fontWeight: '700',
              }}>
              {userData?.partner_name}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                color: theme.colors.placeholderText,
                fontWeight: '500',
                fontSize: theme.fonts.smallFont,
              }}>
              User Role
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                paddingLeft: 10,
                fontWeight: '700',
              }}>
              {' '}
              {userData?.role_name}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          padding: 5,
          borderColor: theme.colors.inputBorder,
        }}>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                color: theme.colors.placeholderText,
                fontWeight: '500',
                fontSize: theme.fonts.smallFont,
              }}>
              Marketing Sangha Name
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                paddingLeft: 10,
                fontWeight: '700',
              }}>
              {userData?.partner_name}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View>
            <Text
              style={{
                color: theme.colors.placeholderText,
                fontWeight: '500',
                fontSize: theme.fonts.smallFont,
              }}>
              Address
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                paddingLeft: 10,
                fontWeight: '700',
              }}>
              {' '}
              {userData?.addressline1} {userData?.addressline2} {userData?.city}{' '}
              {userData?.states_name} {userData?.countries_name} -{' '}
              {userData?.pin}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

interface userInfoPropos {
  userData?: User;
}
