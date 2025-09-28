import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Card} from '@rneui/base';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {UserDetails} from '../../../../models/UserManagementModel';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {User} from '../../../../models/UserModel';

const UserListView = ({
  createUser,
  userlist,
  onUpdateStatus,
  onViewUserDetails,
  user,
}: UserListViewProps) => {
  const theme: ThemeItem = Object(useTheme());

  const styles = StyleSheet.create({
    container: {borderRadius: 10},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6},
    datarowActive: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      width: '100%',
      backgroundColor: '#A0E4B0',
      alignItems: 'center',
    },
    datarowInactive: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      width: '100%',
      backgroundColor: '#FA7F7F',
      alignItems: 'center',
    },
  });
  return (
    <View>
      <Card containerStyle={[{borderRadius: 10}, globalStyles.boxShadow]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
                fontWeight: '600',
              }}>
              Users List
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Image
              source={require('../../../../Assets/sa_logo.png')}
              style={{height: 80, width: 80, alignSelf: 'flex-end'}}></Image>
          </View>
        </View>
      </Card>
      <Card
        containerStyle={[
          styles.container,
          globalStyles.boxShadow,
          {height: '78%'},
        ]}>
        <View style={{width: 150, marginBottom: 10, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: theme.colors.tertiaryShade,
              padding: 5,
            }}
            onPress={createUser}>
            <Icon
              name="person-add"
              size={theme.icons.smallIcon}
              color={theme.colors.tertiaryShade}></Icon>
            <Text
              style={{
                marginLeft: 5,
                fontSize: theme.fonts.smallFont,
                alignSelf: 'center',
                color: theme.colors.tertiaryShade,
              }}>
              Create User
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Sl.No</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Username</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Contact Phone</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Address</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Store Name</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Status</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'white'}}>Action</Text>
          </View>
        </View>
        <ScrollView style={{height: '75%'}}>
          {userlist.map((item, index) => (
            <View
              key={index}
              style={
                item.user_status == 1
                  ? styles.datarowActive
                  : styles.datarowInactive
              }>
              <View style={{flex: 1}}>
                <Text>{index + 1}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>{item.firstname.concat(' ', item.lastname)}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>{item.contact_phone}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>{item.addressline1.concat(', ', item.city)}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>{item.store_name}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>{item.user_status_name}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {item.user_status == 0 &&
                  user?.admn_user_id != item.admn_user_id && (
                    <TouchableOpacity
                      onPress={() => {
                        onUpdateStatus(item.admn_user_id, 1);
                      }}>
                      <Icon
                        name="person-add"
                        size={22}
                        color={theme.colors.primary}></Icon>
                    </TouchableOpacity>
                  )}
                {item.user_status == 1 &&
                  user?.admn_user_id != item.admn_user_id && (
                    <TouchableOpacity
                      style={{marginLeft: 7}}
                      onPress={() => {
                        onUpdateStatus(item.admn_user_id, 4);
                      }}>
                      <Icon
                        name="person-remove"
                        size={22}
                        color={theme.colors.secondary}></Icon>
                    </TouchableOpacity>
                  )}
                <TouchableOpacity
                  style={{marginLeft: 7}}
                  onPress={() => {
                    onViewUserDetails(item.admn_user_id);
                  }}>
                  <Icon name="eye" size={22}></Icon>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </Card>
    </View>
  );
};

export default UserListView;

interface UserListViewProps {
  createUser: any;
  userlist: UserDetails[];
  onUpdateStatus: any;
  onViewUserDetails: any;
  user?: User;
}
