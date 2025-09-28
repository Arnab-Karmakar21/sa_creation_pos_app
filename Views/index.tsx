import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupLogin from './SignupLogin';
import Home from './Home';
import StoreAddView from './Home/Store/StoreAdd/StoreAddView';
import StoreAdd from './Home/Store/StoreAdd';
import {connect} from 'react-redux';
import {StoreState} from '../models/reduxModel';
import {User} from '../models/UserModel';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationSelector from '../UILibrary/LocationSelector';
import Profile from './Home/Profile';
import {fatchVersion} from '../Service/Partner';
import {environment} from '../environment';
import Modal from 'react-native-modal';
import {ThemeItem} from '../Theme/LightTheme';
import {UserLogoutSuccess} from '../Store/actions/userAction';
const Stack = createNativeStackNavigator();
const MainRoute = ({userData, UserLogoutSuccess}: MainRouteProps) => {
  const [version, SetVersion] = useState<any>();
  const [update_flag, SetUpdateFlag] = useState<boolean>(false);
  useFocusEffect(
    React.useCallback(() => {
      const saveUserData = async () => {
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (e) {
          console.error(e);
        }
      };
      if (!!userData && !!userData.admn_user_id) {
        saveUserData();
      }
    }, [userData]),
  );
  useEffect(() => {
    try {
      fatchVersion()
        .then(response => {
          if (!!response.data && !!response.data.data) {
            if (
              !!response.data.data &&
              !!response.data?.data?.version_code &&
              response.data.data?.version_code !=
                environment?.app_Version?.versionCode
            ) {
              SetVersion(response.data.data);
              UserLogoutSuccess();
              AsyncStorage.multiRemove(['userData', 'token']);
              SetUpdateFlag(true);
            } else {
              SetVersion(undefined);
              SetUpdateFlag(false);
            }
          }
        })
        .catch(error => {});
    } catch (err) {}
  }, []);
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'signuplogin'}>
        {!!userData && userData.admn_user_id ? (
          <>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen
              name="locationSelector"
              component={LocationSelector}
            />
          </>
        ) : (
          <Stack.Screen name="signuplogin" component={SignupLogin} />
        )}
      </Stack.Navigator>
      <VersionUpdatePopOver version={version} update_flag={update_flag} />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
interface MainRouteProps {
  userData?: User;
  UserLogoutSuccess?: any;
}

const VersionUpdatePopOver = (props: any) => {
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
      isVisible={props.update_flag}>
      {!!props.update_flag && (
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
                fontSize: theme.fonts.bigFont,
                fontWeight: 'bold',
                color: theme.colors.primary,
              }}>
              New version ({props.version.version_code}) available
            </Text>
          </View>
          <View style={{width: '100%', padding: 5}}>
            <Text style={{fontSize: theme.fonts.mediumFont}}>
              • {props.version.version_description}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: theme.fonts.smallFont,
                color: theme.colors.primaryTint,
              }}>
              Please Update your app to continue.
            </Text>
          </View>
        </View>
      )}
    </Modal>
  );
};
