import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import StoreEditView from './StoreEditView';
import {useFocusEffect} from '@react-navigation/native';
import {
  Asset,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {connect} from 'react-redux';
import {UploadImageService, S3Folder} from '../../../../Service/S3';
import {
  ClearLocationData,
  SetLocationSuccess,
} from '../../../../Store/actions/LocationActions';
import {
  BeginApiCallAction,
  ApiCallSuccessAction,
} from '../../../../Store/actions/apiStatusActions';
import {StoreUpdatePayload, Units} from '../../../../models/StoreModel';
import {StoreState} from '../../../../models/reduxModel';
import {
  StoreEditAction,
  StoreEditLoad,
} from '../../../../Store/actions/storeAction';
import {BaseSharedUrl, environment} from '../../../../environment';

const StoreEdit = (props: any) => {
  const [image, Setimage] = useState<any[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      if (!!props.updatingDone) {
        props.navigation.goBack();
      }
    }, [props.updatingDone]),
  );

  useEffect(() => {
    props.StoreEditLoad(props.route.params.store_id);
  }, []);

  const onStoreUpdateAction = async (payload: StoreUpdatePayload) => {
    props.StoreEditAction({
      ...props.singleStore,
      ...payload,
      qc_partner_id: +props.route.params.qc_partner_id,
      latitude: +payload.latitude,
      longitude: +payload.longitude,
      store_image: image.map((m: any) => ({
        default: m.default,
        doc_name: m.doc_name,
        thum_doc_name: m.thum_doc_name,
        doc_id: m.doc_id,
      })),
    });
  };

  useEffect(() => {
    return () => {
      // props.ClearPictureData();
      props.ClearLocationData();
    };
  }, []);
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
        Setimage([
          ...image,
          {...imageLoc, id: Math.random().toString(), ...json?.data},
        ]);
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
    <StoreEditView
      states={props.states}
      countries={props.countries}
      storeCategories={props.storeCategories}
      singleStore={props.singleStore}
      onStoreUpdateAction={onStoreUpdateAction}
      captureClicked={captureClicked}
      uploadClicked={uploadClicked}
      pictureData={image}
      districts={props.districts}
      unit={props.unit}
      ChangeDefault={ChangeDefault}
      DeleteImage={DeleteImage}
      Setimage={Setimage}
      navigation={props.navigation}
      SetLocationSuccess={props.SetLocationSuccess}></StoreEditView>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    qc_partner_id: state.user.user_detail?.partner_id,
    states: state.domain.states,
    countries: state.domain.countries,
    storeCategories: state.store.storeCategories,
    singleStore: state.store.singleStore,
    updatingDone: state.store.updatingDone,
    districts: state.domain?.districts,
    unit: state.store.unit,
  };
};

const mapDispatchToProps = {
  StoreEditLoad,
  StoreEditAction,
  ClearLocationData,
  BeginApiCallAction,
  ApiCallSuccessAction,
  SetLocationSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreEdit);
