import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useRoute, useTheme} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dasboard';
import {ThemeItem} from '../../Theme/LightTheme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StoreAdd from './Store/StoreAdd';
import {connect} from 'react-redux';
import {StoreState} from '../../models/reduxModel';
import {RolePermission, User} from '../../models/UserModel';
import {UserLogoutSuccess} from '../../Store/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserManagements from './UserManagement';
import Stores from './Store';
import POS from './POS';
import Profile from './Profile';
import WishList from './WishList';
import Order from './Order';
import Fulfillment from './Fulfillment';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Home = ({userData, route, UserLogoutSuccess}: HomeProps) => {
  const theme: ThemeItem = Object(useTheme());

  const Logout = () => {
    UserLogoutSuccess();
    AsyncStorage.multiRemove(['token', 'userData']);
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        // headerTitle: 'ABCDs',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.background,
        headerRight: item => (
          <TouchableOpacity style={{marginRight: 10}}>
            <Icon name={'notifications'} size={35} color={'white'} />

            <Text
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                textAlign: 'center',
                borderRadius: 20,
                width: 20,
                top: 0,
                right: 0,
                color: '#fff',
              }}>
              9+
            </Text>
          </TouchableOpacity>
        ),
      }}
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          userData={userData}
          item={SideNavMenu}
          Logout={Logout}
        />
      )}>
      {SideNavMenu.map((m, index) => (
        <Drawer.Screen
          options={{
            headerTitle: m.name,
          }}
          key={index}
          name={m.url}
          component={m.component}
        />
      ))}
    </Drawer.Navigator>
  );
};

const mapDispatchToProps = {
  UserLogoutSuccess,
};

const mapStateToProps = (state: StoreState) => {
  return {
    userData: state.user.user_detail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
interface HomeProps {
  userData?: User;
  route?: any;
  UserLogoutSuccess?: any;
}

function CustomDrawerContent(props: any) {
  const theme: ThemeItem = Object(useTheme());
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#ffff'}}>
      {!!props.userData && (
        <TouchableOpacity
          onPress={() =>
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Profile'}],
            })
          }
          style={{
            height: 200,
            marginBottom: 20,
            borderBottomColor: '#f0efeb',
            borderBottomWidth: 2,
            marginTop: -5,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
          }}>
          <ImageBackground
            source={require('../../Assets/drawerbg.jpg')}
            style={{height: '100%', width: '100%', position: 'absolute'}}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 60,
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.background,
                    fontWeight: '600',
                  }}>
                  {props?.userData?.firstname} {props?.userData?.lastname}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 20, color: theme.colors.background}}>
                  <Text style={{fontSize: 14}}>
                    {props?.userData?.role_name}
                  </Text>
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 14, color: theme.colors.placeholderText}}>
                  {props?.userData?.company_name}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 14, color: theme.colors.placeholderText}}>
                  {props?.userData?.contact_phone}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}

      {props?.item.map(
        (m: SideNavMenu, index: number) =>
          !!m.sidenav &&
          !!props?.userData?.role_permissions &&
          props?.userData?.role_permissions.find(
            (n: RolePermission) => n.control_element_name == m.name,
          ) && (
            <TouchableOpacity
              onPress={() =>
                props.navigation.reset({
                  index: 0,
                  routes: [{name: m.url}],
                })
              }
              key={index}
              style={{
                paddingVertical: 5,
                borderRadius: 5,
                backgroundColor:
                  props.state.index === index
                    ? theme.colors.primary
                    : theme.colors.background,
                marginVertical: 2,
                marginHorizontal: 5,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
              }}>
              <Icon
                name={m.icon}
                size={28}
                color={
                  props.state.index === index
                    ? theme.colors.background
                    : theme.colors.darkTint
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  color:
                    props.state.index === index
                      ? theme.colors.background
                      : theme.colors.darkTint,
                  fontWeight: '600',
                  marginLeft: 20,
                }}>
                {m.name}
              </Text>
            </TouchableOpacity>
          ),
      )}
      <TouchableOpacity
        onPress={() => props.Logout()}
        style={{
          paddingVertical: 5,
          borderRadius: 10,
          backgroundColor: theme.colors.background,
          margin: 5,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <Icons
          name={'log-out-outline'}
          size={28}
          color={theme.colors.darkTint}
        />
        <Text
          style={{
            fontSize: 16,
            color: theme.colors.darkTint,
            marginLeft: 20,
            fontWeight: '600',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
      <View
        style={{
          borderColor: '#dadee3',
          backgroundColor: '#dadee3',
          margin: 20,
          borderWidth: 0.5,
          borderStyle: 'solid',
        }}></View>
    </DrawerContentScrollView>
  );
}
export const SideNavMenu: SideNavMenu[] = [
  {
    icon: 'dashboard',
    name: 'Dashboard',
    url: 'LoginArea',
    component: Dashboard,
    sidenav: true,
    subRoute: [],
    dashboardRender: false,
  },
  {
    icon: 'home',
    name: 'Store',
    url: 'store',
    component: Stores,
    sidenav: true,
    subRoute: [],
    dashboardRender: true,
  },
  {
    icon: 'supervisor-account',
    name: 'User Management',
    url: 'user',
    component: UserManagements,
    sidenav: true,
    subRoute: [],
    dashboardRender: true,
  },
  {
    icon: 'shopping-cart',
    name: 'POS Management',
    url: 'pos',
    component: POS,
    sidenav: true,
    subRoute: [],
    dashboardRender: true,
  },
  {
    icon: 'bag-handle-outline',
    name: 'Profile',
    url: 'Profile',
    component: Profile,
    sidenav: false,
    subRoute: [],
    dashboardRender: true,
  },
  {
    icon: 'shopping-basket',
    name: 'Stock Requisition',
    url: 'wishList',
    component: WishList,
    sidenav: true,
    subRoute: [],
    dashboardRender: true,
  },
  {
    icon: 'list-alt',
    name: 'Stock Fulfillment',
    url: 'fulfillment',
    component: Fulfillment,
    sidenav: true,
    subRoute: [],
    dashboardRender: true,
  },
  {
    icon: 'list',
    name: 'Order',
    url: 'order',
    component: Order,
    sidenav: true,
    subRoute: [],
    dashboardRender: true,
  },
];
export interface SideNavMenu {
  url: string;
  icon?: any;
  name?: string;
  component: any;
  sidenav?: boolean;
  subRoute: string[];
  dashboardRender?: boolean;
}
