import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../Theme/LightTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import {User} from '../../../models/UserModel';

const ProfileView = ({userData, onSubmit}: ProfileViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [selected, SetSelected] = useState<number>(1);
  const menu: menuProps[] = [
    {
      name: 'User Info',
      step: 1,
      icon: 'supervised-user-circle',
    },
    {
      name: 'Change Passsword',
      step: 2,
      icon: 'security',
    },
    {
      name: 'Log Out',
      step: 3,
      icon: 'exit-to-app',
    },
  ];
  const styles = StyleSheet.create({
    parent: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    child1: {
      backgroundColor: theme.colors.primary,
      height: '25%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    child2: {
      backgroundColor: theme.colors.background,
      height: '75%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    middleSection: {
      height: '100%',
      width: '80%',
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: -120,
    },

    left: {
      height: '100%',
      width: '25%',
      display: 'flex',
      flexDirection: 'row',
    },
    right: {
      backgroundColor: 'white',
      height: '100%',
      width: '75%',
      display: 'flex',
    },
    profileImg: {
      height: 100,
      width: 100,
      display: 'flex',
      alignSelf: 'center',
      resizeMode: 'contain',
    },
  });

  return (
    <View style={styles.parent}>
      <View style={styles.child1}></View>
      <View style={styles.child2}>
        <View style={styles.middleSection}>
          <View style={styles.left}>
            <View
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                backgroundColor: theme.colors.background,
                flexDirection: 'column',
                paddingTop: 8,
                opacity: 0.9,
                borderColor: 'white',
                borderWidth: 4,
              }}>
              <View style={{marginVertical: 30}}>
                <Image
                  style={styles.profileImg}
                  source={require('../../../Assets/profile.png')}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    alignSelf: 'center',
                    color: theme.colors.primary,
                  }}>
                  {userData?.firstname} {userData?.lastname}
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    alignSelf: 'center',
                    color: theme.colors.placeholderText,
                  }}>
                  {userData?.role_name}
                </Text>
              </View>
              {menu.map((item: any, index: number) => (
                <Menu
                  selected={selected}
                  SetSelected={SetSelected}
                  key={index}
                  item={item}
                />
              ))}
            </View>
          </View>
          <View style={styles.right}>
            {selected == 1 ? (
              <UserInfo userData={userData} />
            ) : (
              selected == 2 && <ChangePassword onSubmit={onSubmit} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileView;

const Menu = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <TouchableOpacity
      onPress={() => props.SetSelected(props.item.step)}
      style={{
        borderColor: 'white',
        borderWidth: 0.5,
        padding: 10,
        flexDirection: 'row',
        backgroundColor:
          props.selected == props.item.step
            ? theme.colors.primary
            : theme.colors.background,
      }}>
      <Icon
        name={props.item.icon}
        size={theme.fonts.massiveFont}
        color={
          props.selected == props.item.step
            ? theme.colors.background
            : theme.colors.primary
        }
      />
      <Text
        style={{
          marginLeft: 20,
          fontSize: 17,
          alignSelf: 'center',
          color:
            props.selected == props.item.step
              ? theme.colors.background
              : theme.colors.primary,
          fontWeight: 'bold',
        }}>
        {props.item.name}
      </Text>
    </TouchableOpacity>
  );
};

interface menuProps {
  name: string;
  step: number;
  icon: string;
}

interface ProfileViewProps {
  userData?: User;
  onSubmit: any;
}
