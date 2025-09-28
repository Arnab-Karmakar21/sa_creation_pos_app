import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Card} from '@rneui/base';
import globalStyles from '../../../GlobalStyle';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../Theme/LightTheme';
import {FlatList} from 'react-native-gesture-handler';
import DashboardCard from './DashboardCard';
import {SideNavMenu} from '..';
import {User} from '../../../models/UserModel';

const DashboardView = ({
  onDashboardCardClick,
  userData,
}: DashboardCardProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover"
        imageStyle={{opacity: 0.5}}>
        <Card containerStyle={[{borderRadius: 10}, globalStyles.boxShadow]}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: theme.fonts.bigFont,
                  color: theme.colors.primary,
                  fontWeight: '600',
                }}>
                SA Creation's Dashboard
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                source={require('../../../Assets/sa_logo.png')}
                style={{height: 60, width: 60, alignSelf: 'flex-end'}}></Image>
            </View>
          </View>
        </Card>
        <Card containerStyle={[{borderRadius: 10}, globalStyles.boxShadow]}>
          <FlatList
            numColumns={3}
            data={SideNavMenu.filter(m =>
              userData?.role_permissions.find(
                n => n.control_element_name == m.name && m.dashboardRender,
              ),
            )}
            keyExtractor={navItem => navItem.url}
            renderItem={navItem => (
              <View style={{width: '32%'}}>
                <DashboardCard
                  details={navItem.item}
                  onDashboardCardClick={onDashboardCardClick}
                />
              </View>
            )}
          />
        </Card>
      </ImageBackground>
    </View>
  );
};

export default DashboardView;

interface DashboardCardProps {
  onDashboardCardClick: any;
  userData?: User;
}
