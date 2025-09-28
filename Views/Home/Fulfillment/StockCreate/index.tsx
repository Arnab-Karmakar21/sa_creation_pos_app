import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  TemplateItem,
  ProductCategoryItem,
  ProductSubCategoryItem,
  ProductBrandItem,
  Variants,
  UnitItem,
  ProductEditLoadPayload,
  ProductEditPayload,
} from '../../../../models/StoreModel';
import StockCreateView from './StockCreateView';
import {connect} from 'react-redux';
import {
  ProductCategoryLoad,
  ProductSubCategoryLoad,
  ProductBrandLoad,
  StockAddLoad,
  ProductEditLoad,
  GetVariantLoad,
} from '../../../../Store/actions/storeAction';
import {StoreState} from '../../../../models/reduxModel';
import {useFocusEffect} from '@react-navigation/native';
import {
  Asset,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {BaseSharedUrl, environment} from '../../../../environment';
import {
  ApiCallSuccessAction,
  BeginApiCallAction,
} from '../../../../Store/actions/apiStatusActions';
import {ReqCreateProductAction} from '../../../../Store/actions/StockAction';
import {showToast} from '../../../../Service/Toast';

const StockCreate = ({
  productBrands,
  productCategories,
  productSubCategories,
  templates,
  units,
  varients,
  ProductEditLoad,
  StockAddLoad,
  qc_partner_id,
  route,
  ApiCallSuccessAction,
  BeginApiCallAction,
  GetVariantLoad,
  ProductBrandLoad,
  ReqCreateProductAction,
  navigation,
  singleProductDetail,
}: StockCreateProps) => {
  const [image, Setimage] = useState<any[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      if (!!route.params) {
        StockAddLoad({
          template_id: route.params.template_id,
          category_id: route.params.category_id,
          subcategory_id: route.params.subcategory_id,
          store_category: route.params?.store_category,
          variants: route.params.variants,
        });
        if (route.params.partner_product_id && !!route.params?.store_id) {
          let payload: ProductEditLoadPayload = {
            partner_product_id: route.params.partner_product_id,
            store_category: route.params?.store_category,
            store_id: route.params?.store_id,
            varients: route.params.variants,
          };
          ProductEditLoad(payload);
        }
      }
    }, []),
  );
  useEffect(() => {
    if (!!singleProductDetail) {
      Setimage(
        singleProductDetail.product_images.map((m: any) => ({
          ...m,
          id: Math.random(),
        })),
      );
    }
  }, [singleProductDetail]);
  const onTemplateSelection = (template_id: number) => {
    ProductCategoryLoad(template_id);
  };

  const onCategorySelection = (template_item_id: number) => {
    ProductSubCategoryLoad(template_item_id);
    let vart = productCategories?.find(
      (m: any) => m.template_item_id == template_item_id,
    )?.variants;
    if (!!vart) {
      GetVariantLoad(vart);
    }
  };

  const onSubCategorySelection = (subcategory_id: number) => {
    !!qc_partner_id && ProductBrandLoad(subcategory_id, qc_partner_id);
  };
  // const StockAddLoads = (item: any) => {
  //   item.qc_partner_id = qc_partner_id;
  //   StockAddLoad(item);
  // };
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
    BeginApiCallAction({
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
      ApiCallSuccessAction();
    } catch (err) {
      ApiCallSuccessAction();
    }
  };
  const onProductAddEditEvent = (payload: any) => {
    if (image.length > 0) {
      payload.partner_id = qc_partner_id;
      payload.brand_created_by_role = productBrands.find(
        m => m.brand_id == payload.brand_id,
      )?.created_by_role;
      payload.wishlist_item_id = route?.params?.wishlist_item_id;
      payload.images = image.map(m => ({
        default: m.default,
        doc_name: m.doc_name,
        thum_doc_name: m.thum_doc_name,
        doc_id: m.doc_id,
      }));
      if (!!route?.params?.partner_product_id) {
        payload.product_id = +route?.params?.partner_product_id;
        ReqCreateProductAction({
          data: payload,
          navigation: navigation,
        });
      } else {
        ReqCreateProductAction({
          data: payload,
          navigation: navigation,
        });
      }
    } else {
      showToast('Product image is required.', 'rgba(0, 0, 0, 0.7)');
    }
  };
  const AddBrand = (id: number) => {
    navigation.navigate('brandadd', {
      subcategory_id: id,
      subcategory_name: productSubCategories.find(
        m => m.product_subcategory_id == id,
      )?.subcategory_name,
      store_category: route.params?.store_category,
    });
  };

  return (
    <StockCreateView
      productBrands={productBrands}
      productCategories={productCategories}
      templates={templates}
      productSubCategories={productSubCategories}
      onCategorySelection={onCategorySelection}
      onSubCategorySelection={onSubCategorySelection}
      onTemplateSelection={onTemplateSelection}
      varients={varients}
      units={units}
      captureClicked={captureClicked}
      pictureData={image}
      uploadClicked={uploadClicked}
      ChangeDefault={ChangeDefault}
      DeleteImage={DeleteImage}
      patchData={route.params}
      onProductAddEditEvent={onProductAddEditEvent}
      AddBrand={AddBrand}
      singleProductDetail={singleProductDetail}
      editable={route.params.editable}
      Back={() => navigation.goBack()}
    />
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    templates: state.store.templateList,
    productCategories: state.store.productCategories,
    productSubCategories: state.store.productSubCategories,
    productBrands: state.store.productBrands,
    qc_partner_id: state.user.user_detail?.partner_id,
    varients: state.store.varients,
    units: state.store.units,
    singleProductDetail: state.store.singleProductDetail,
  };
};
const mapDispatchToProps = {
  ProductCategoryLoad,
  ProductSubCategoryLoad,
  ProductBrandLoad,
  StockAddLoad,
  ProductEditLoad,
  GetVariantLoad,
  BeginApiCallAction,
  ApiCallSuccessAction,
  ReqCreateProductAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(StockCreate);
interface StockCreateProps {
  templates: TemplateItem[];
  productCategories: ProductCategoryItem[];
  productSubCategories: ProductSubCategoryItem[];
  productBrands: ProductBrandItem[];
  qc_partner_id?: number;
  StockAddLoad?: any;
  ProductEditLoad?: any;
  varients: Variants[];
  units: UnitItem[];
  route?: any;
  ApiCallSuccessAction?: any;
  BeginApiCallAction?: any;
  GetVariantLoad?: any;
  ProductBrandLoad?: any;
  ReqCreateProductAction?: any;
  navigation?: any;
  singleProductDetail?: ProductEditPayload;
  editable?: boolean;
}
