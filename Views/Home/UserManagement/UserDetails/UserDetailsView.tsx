import { View, Text } from 'react-native'
import React from 'react'

const UserDetailsView = ({userDetails}:UserDetailsViewProp) => {
  return (
    <View>
      <Text>{userDetails?.admn_user_id} </Text>
    </View>
  )
}

export default UserDetailsView;

export interface UserDetailsViewProp{
    navigation: any;
    route: any;
    userDetails: any;
}