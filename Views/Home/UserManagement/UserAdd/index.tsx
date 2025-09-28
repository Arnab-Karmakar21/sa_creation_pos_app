import {View, Text} from 'react-native';
import React from 'react';
import UserAddView from './UserAddView';
import {
  CityItem,
  CountryItem,
  DistrictItem,
  StateItem,
} from '../../../../models/DomainModels';
import {useFocusEffect} from '@react-navigation/native';
import {
  Role,
  CreateUserPayload,
  UserManagementMain,
  entityType,
} from '../../../../models/UserManagementModel';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {
  AddUser,
  RoleLoad,
  UserAddLoad,
} from '../../../../Store/actions/userManagementAction';
import {
  BeginApiCallAction,
  ApiCallSuccessAction,
} from '../../../../Store/actions/apiStatusActions';
import {StoreItem} from '../../../../models/StoreModel';
import {GetStoresService} from '../../../../Service/ServicePartner';
import {User} from '../../../../models/UserModel';

const UserAdd = ({
  navigation,
  route,
  cities,
  states,
  countries,
  districts,
  entity,
  roles,
  stores,
  UserAddLoad,
  RoleLoad,
  AddUser,
  user,
}: UserAddProps) => {
  useFocusEffect(
    React.useCallback(() => {
      UserAddLoad();
    }, []),
  );

  const onRoleLoad = async (id: any) => {
    RoleLoad({
      role_payload: id,
      store_payload: {
        qc_partner_id: user?.partner_id,
        admn_user_id: user?.admn_user_id,
      },
    });
  };

  const onAddUserAction = (payload: CreateUserPayload) => {
    if (payload.entity_type == 3) {
      payload = {...payload, entity_id: user?.partner_id};
    }
    let p = {
      data: payload,
      navigation: navigation,
    };
    AddUser(p);
  };

  return (
    <View>
      <UserAddView
        districts={districts}
        states={states}
        countries={countries}
        entity={entity}
        onAddUserAction={onAddUserAction}
        onRoleLoad={onRoleLoad}
        roles={roles}
        stores={stores}
        navigation={navigation}
      />
    </View>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    cities: state.domain.cities,
    states: state.domain.states,
    countries: state.domain.countries,
    districts: state.domain?.districts,
    entity: state.usermanagement.entity_type_main,
    roles: state.usermanagement.role_type_main,
    stores: state.store.storeList,
    user: state.user.user_detail,
  };
};

const mapDispatchToProps = {
  UserAddLoad,
  RoleLoad,
  AddUser,
  BeginApiCallAction,
  ApiCallSuccessAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);

export interface UserAddProps {
  navigation: any;
  route: any;
  UserAddLoad: any;
  roles: Role[];
  cities: CityItem[];
  states: StateItem[];
  countries: CountryItem[];
  districts: DistrictItem[];
  entity: entityType[];
  stores: StoreItem[];
  onAddUserAction: any;
  RoleLoad: any;
  AddUser: any;
  user?: User;
}
