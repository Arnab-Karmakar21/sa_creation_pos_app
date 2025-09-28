import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {connect} from 'react-redux';
import ProductEditView from './ProductEditView';
import {Buffer} from 'buffer';
import ImagePicker, {
  Asset,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ProductEditPayload} from '../../../../models/StoreModel';
import {StoreState} from '../../../../models/reduxModel';
import {
  GetVariantLoad,
  ProductEditAction,
  ProductEditLoad,
  ResetProductEditAction,
  SimilarProductAction,
} from '../../../../Store/actions/storeAction';
import {
  ApiCallSuccessAction,
  BeginApiCallAction,
} from '../../../../Store/actions/apiStatusActions';
import {BaseSharedUrl, environment} from '../../../../environment';
import {showToast} from '../../../../Service/Toast';
import {Base64} from 'base64-string';
const ProductEdit = (props: any) => {
  const enc = new Base64();
  const [image, Setimage] = useState<any[]>([]);
  const routeParams: any = props.route.params;
  useEffect(() => {
    props.ProductEditLoad(props.route.params);

    props.GetVariantLoad(props.route.params.varients);
    console.log(routeParams);

    props.SimilarProductAction({
      store_id: routeParams.store_id,
      brand_id: routeParams.product_brand_id,
      brand_created_by_role: routeParams.brand_created_by_role,
    });
  }, []);

  const captureClicked = async () => {
    if (await requestCameraPermission()) {
      try {
        let res = await launchCamera({
          cameraType: 'back',
          mediaType: 'photo',
          quality: 0.7,
          includeBase64: false,
        });
        if (!!res?.assets && res?.assets.length > 0) {
          UploadImage({...res?.assets[0], name: res.assets[0].fileName});
        }
      } catch (err) {}
    }
  };

  const uploadClicked = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
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
  const ChangeDefault = (id: string) => {
    let img = JSON.parse(JSON.stringify(image));
    img = img.map((m: any) => ({...m, default: 0}));
    img.find((m: any) => m.id == id).default = 1;
    Setimage(img);
  };
  const UploadImage = async (imageLoc: any) => {
    const body = new FormData();
    props.BeginApiCallAction({
      count: 1,
      message: 'Uploading image. Please wait...',
    });
    body.append('image_file ', imageLoc);
    body.append('upload_type ', 2);
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
      props.ApiCallSuccessAction();
    } catch (err) {
      props.ApiCallSuccessAction();
    }
  };

  const onProductEditEvent = async (payload: any) => {
    (payload.partner_product_id = props.singleProductDetail.partner_product_id),
      (payload.images = image.map(m => ({
        default: m.default,
        doc_name: m.doc_name,
        thum_doc_name: m.thum_doc_name,
        doc_id: m.doc_id,
      })));
    payload.store_id = routeParams.store_id;
    payload.brand_id = null;
    payload.stock_quantity = null;
    payload.admn_user_id = props.user;
    payload.product_discount = !!payload.product_discount
      ? +payload.product_discount
      : undefined;
    payload.product_gst_percentage = !!payload.product_gst_percentage
      ? +payload.product_gst_percentage
      : undefined;
    payload.product_mrp = !!payload.product_mrp
      ? +payload.product_mrp
      : undefined;
    payload.product_quantity = !!payload.product_quantity
      ? +payload.product_quantity
      : undefined;
    payload.product_selling_price = !!payload.product_selling_price
      ? +payload.product_selling_price
      : undefined;
    payload.online_qty =
      !!payload.online_qty && +payload.online_flag
        ? +payload.online_qty
        : undefined;
    payload.online_mrp =
      !!payload.online_mrp && +payload.online_flag
        ? +payload.online_mrp
        : undefined;
    payload.online_discount =
      !!payload.online_discount && +payload.online_flag
        ? +payload.online_discount
        : undefined;
    payload.online_selling_price =
      !!payload.online_selling_price && +payload.online_flag
        ? +payload.online_selling_price
        : undefined;
    payload.online_gst_percentage =
      !!payload.online_gst_percentage && +payload.online_flag
        ? +payload.online_gst_percentage
        : undefined;
    payload.online_flag = +payload.online_flag ? true : false;
    if (image.length > 0 && !!image.find(m => m.default == 1)) {
      if (!!payload.long_desc) {
        var b64 = await enc.urlEncode(payload.long_desc);
        payload.long_desc = b64;
      }

      props.ProductEditAction(payload);
    } else {
      showToast('Product default image is required.', 'error');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!!props.productEditDone) {
        props.navigation.goBack();
      }
    }, [props.productEditDone]),
  );

  useEffect(() => {
    return () => {
      props.ResetProductEditAction(false);
    };
  }, []);
  useEffect(() => {
    if (!!props.singleProductDetail) {
      Setimage(
        props.singleProductDetail.product_images.map((m: any) => ({
          ...m,
          id: Math.random(),
        })),
      );
    }
  }, [props.singleProductDetail]);
  return (
    <ProductEditView
      units={props.units}
      singleProductDetail={props.singleProductDetail}
      captureClicked={captureClicked}
      uploadClicked={uploadClicked}
      pictureData={image}
      onProductEditEvent={onProductEditEvent}
      storeCategory={props.route.params.store_category}
      routeParams={props.route.params}
      varients={props.varients}
      ChangeDefault={ChangeDefault}
      similar_product={props.similar_product}
      Setimage={Setimage}
      DeleteImage={DeleteImage}></ProductEditView>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    singleProductDetail: state.store.singleProductDetail,
    units: state.store.units,
    productEditDone: state.store.productEditDone,
    varients: state.store.varients,
    user: state.user.user_detail?.admn_user_id,
    similar_product: state.store.similar_product,
  };
};

const mapDispatchToProps = {
  ProductEditLoad,
  BeginApiCallAction,
  ApiCallSuccessAction,
  ResetProductEditAction,
  ProductEditAction,
  GetVariantLoad,
  SimilarProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
