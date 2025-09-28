import { View, Text } from 'react-native'
import React from 'react'
import UserDetailsView from './UserDetailsView'
import { connect } from 'react-redux'
import { StoreState } from '../../../../models/reduxModel'
import { useFocusEffect } from '@react-navigation/native'
import { GetSingleUserDetails } from '../../../../Store/actions/userManagementAction'
import { BeginApiCallAction, ApiCallSuccessAction } from '../../../../Store/actions/apiStatusActions'
import { SingleUserDetails } from '../../../../models/UserManagementModel'

const UserDetails = ({
navigation,
route,
GetSingleUserDetails,
singleUserDetails
}: UserDetailsProps) => {

  useFocusEffect(
    React.useCallback(()=> {
        GetSingleUserDetails({
            admn_user_id:route.params.user_id
        })
    },[])
  );
  return (
    <View>
      <UserDetailsView
        userDetails={singleUserDetails} 
        navigation={navigation} 
        route={route}/>
    </View>
  )
}

const mapStateToProps = (state: StoreState, ownProps: any)=>{
    return{
        singleUserDetails : state.usermanagement.singleUserDetails
    }
}
const mapDispatchToProps = {
    GetSingleUserDetails,
    BeginApiCallAction,
    ApiCallSuccessAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

export interface UserDetailsProps {
    navigation: any;
    route: any;
    GetSingleUserDetails:any;
    singleUserDetails?:SingleUserDetails;
}

