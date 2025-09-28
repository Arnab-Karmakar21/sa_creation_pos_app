import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import StoreAddView from './StoreAddView';
import {StoreCreatePayload, Units} from '../../../../Models/StoreModel';
import {connect} from 'react-redux';
import {
  StoreAddAction,
  StoreAddLoad,
} from '../../../../Store/actions/storeAction';
import {StoreState} from '../../../../models/reduxModel';
import {
  CityItem,
  CountryItem,
  DistrictItem,
  DomainData,
  StateItem,
  DomainState,
} from '../../../../models/DomainModels';
import {useFocusEffect} from '@react-navigation/native';
import {
  Asset,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  ApiCallSuccessAction,
  BeginApiCallAction,
} from '../../../../Store/actions/apiStatusActions';
import {BaseSharedUrl, environment} from '../../../../environment';
import {User} from '../../../../models/UserModel';
import {SetLocationSuccess} from '../../../../Store/actions/LocationActions';

const StoreAdd = ({
  StoreAddLoad,
  cities,
  countries,
  districts,
  states,
  storeCategories,
  unit,
  navigation,
  BeginApiCallAction,
  ApiCallSuccessAction,
  StoreAddAction,
  user,
  SetLocationSuccess,
}: StoreAddPorps) => {
  const [image, Setimage] = useState<any[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      if (
        states.length == 0 ||
        countries.length == 0 ||
        storeCategories.length == 0 ||
        unit.length == 0 ||
        districts.length == 0
      ) {
        StoreAddLoad();
        Setimage([]);
      }
    }, []),
  );
  const onStoreAddAction = async (payload: StoreCreatePayload) => {
    StoreAddAction({
      data: {
        ...payload,
        qc_partner_id: user?.partner_id,
        latitude: +payload.latitude,
        longitude: +payload.longitude,
        store_image: image.map((m: any) => ({
          default: m.default,
          doc_name: m.doc_name,
          thum_doc_name: m.thum_doc_name,
          doc_id: m.doc_id,
        })),
      },
      navigation: navigation,
    });
  };

  const onStoreAddDone = () => {
    navigation.goBack();
  };

  const uploadClicked = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (!!response.assets && response.assets.length > 0) {
        UploadImage({
          ...response?.assets[0],
          name: response.assets[0].fileName,
        });
      }
    });
  };

  const captureClicked = async () => {
    if (await requestCameraPermission()) {
      try {
        let res = await launchCamera({
          cameraType: 'back',
          mediaType: 'photo',
          quality: 0.7,
          includeBase64: true,
        });
        if (!!res?.assets && res?.assets.length > 0) {
          UploadImage({...res?.assets[0], name: res.assets[0].fileName});
        }
      } catch (err) {}
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  const DeleteImage = (item: Asset) => {
    Setimage(image.filter(m => m.id != item.id));
  };

  const UploadImage = async (imageLoc: any) => {
    const body = new FormData();
    BeginApiCallAction({
      count: 1,
      message: 'Uploading image. Plase wait...',
    });
    body.append('image_file ', imageLoc);
    body.append('upload_type ', 1);
    body.append('default', image.length > 0 ? 0 : 1);
    try {
      let response = await fetch(
        BaseSharedUrl + environment.url.document_uploadUrl,
        {
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.ok) {
        let json = await response.json();

        Setimage([...image, {id: Math.random().toString(), ...json?.data}]);
      } else {
      }
      ApiCallSuccessAction();
    } catch (err) {
      ApiCallSuccessAction();
    }
  };
  const ChangeDefault = (id: string) => {
    let img = JSON.parse(JSON.stringify(image));
    img = img.map((m: any) => ({...m, default: 0}));
    img.find((m: any) => m.id == id).default = 1;
    Setimage(img);
  };

  return (
    <StoreAddView
      cities={cities}
      states={states}
      countries={countries}
      storeCategories={storeCategories}
      onStoreAddAction={onStoreAddAction}
      onStoreAddDone={onStoreAddDone}
      pictureData={image}
      captureClicked={captureClicked}
      uploadClicked={uploadClicked}
      districts={districts}
      unit={unit}
      navigation={navigation}
      ChangeDefault={ChangeDefault}
      DeleteImage={DeleteImage}></StoreAddView>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    user: state.user.user_detail,
    cities: state.domain.cities,
    states: state.domain.states,
    countries: state.domain.countries,
    storeCategories: state.store.storeCategories,
    districts: state.domain?.districts,
    unit: state.store.unit,
  };
};

const mapDispatchToProps = {
  StoreAddLoad,
  BeginApiCallAction,
  ApiCallSuccessAction,
  StoreAddAction,
  SetLocationSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreAdd);

interface StoreAddPorps {
  StoreAddLoad?: any;
  cities: CityItem[];
  states: StateItem[];
  countries: CountryItem[];
  districts: DistrictItem[];
  storeCategories: DomainData[];
  unit: Units[];
  navigation?: any;
  BeginApiCallAction?: any;
  ApiCallSuccessAction?: any;
  StoreAddAction?: any;
  user?: User;
  SetLocationSuccess?: any;
}
