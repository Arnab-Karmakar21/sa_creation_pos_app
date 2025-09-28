import {View, Text} from 'react-native';
import React from 'react';
import {Card} from '@rneui/base';
import {ThemeItem} from '../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DashboardCard = ({details, onDashboardCardClick}: DashboardCardProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <TouchableOpacity
      onPress={() => {
        onDashboardCardClick(details.url);
      }}>
      <Card containerStyle={{borderRadius: 10, alignItems: 'center', flex: 1}}>
        <Icon
          name={details.icon}
          size={theme.icons.bigIcon}
          color={theme.colors.primary}
          style={{alignSelf: 'center'}}></Icon>
        <Text
          style={{
            fontSize: theme.fonts.smallFont,
            marginTop: 5,
            alignSelf: 'center',
          }}>
          {details.name}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default DashboardCard;

interface DashboardCardProps {
  details: any;
  onDashboardCardClick: any;
}
