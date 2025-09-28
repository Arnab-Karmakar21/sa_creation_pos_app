import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {useFocusEffect} from '@react-navigation/native';
import StockAddView from './StockAddView';
import {Buffer} from 'buffer';
import {
  Asset,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {StockAddPayload, VariantImage} from '../../../../models/StoreModel';
import {StoreState} from '../../../../models/reduxModel';
import {PermissionsAndroid} from 'react-native';
import {
  ApiCallSuccessAction,
  BeginApiCallAction,
} from '../../../../Store/actions/apiStatusActions';
import {BaseSharedUrl, environment} from '../../../../environment';
import {
  GetVariantLoad,
  ProductBrandLoad,
  ProductCategoryLoad,
  ProductEditLoad,
  ProductSubCategoryLoad,
  ResetStockAddDone,
  SimilarProductAction,
  StockAddAction,
  StockAddLoad,
} from '../../../../Store/actions/storeAction';
import {showToast} from '../../../../Service/Toast';
import {Base64} from 'base64-string';
const StockAdd = (props: any) => {
  const enc = new Base64();
  const routeParams: any = props.route.params;
  // const [image, Setimage] = useState<any[]>([]);
  
  const [imageConsolidated, Setimage] = useState<any[]>([]);
  const [imageVariant, setImage] = useState<VariantImage[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      props.StockAddLoad({
        template_id: routeParams.template_id,
        category_id: routeParams.category_id,
        subcategory_id: routeParams.subcategory_id,
        store_category: routeParams.store_category,
        qc_partner_id: routeParams.qc_partner_id,
        variants: routeParams.variants,
      });
      props.SimilarProductAction({
        store_id: routeParams.store_id,
        brand_id: routeParams.brand_id,
        brand_created_by_role: routeParams.created_by_role,
      });
    }, [routeParams]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!!props.stockAddDone) {
        props.navigation.navigate('storeinventory', {
          store_id: routeParams.store_id,
          store_category: routeParams.store_category,
          store_name: routeParams.store_name,
          category_name: routeParams?.category_name,
          qc_partner_id: routeParams.qc_partner_id,
        });
      }
    }, [props.stockAddDone]),
  );

  useEffect(() => {
    return () => {
      props.ResetStockAddDone(false);
    };
  }, []);

  const onTemplateSelection = (template_id: number) => {
    props.ProductCategoryLoad(template_id);
  };

  const onCategorySelection = (template_item_id: number) => {
    props.ProductSubCategoryLoad(template_item_id);
    let vart = props.productCategories.find(
      (m: any) => m.template_item_id == template_item_id,
    )?.variants;
    if (!!vart) {
      props.GetVariantLoad(vart);
    }
  };

  const onSubCategorySelection = (subcategory_id: number) => {
    props.ProductBrandLoad(subcategory_id, props.qc_partner_id);
  };

  const onBrandSelection = (brand_id: number, role: number) => {
    props.SimilarProductAction({
      store_id: routeParams.store_id,
      brand_id: brand_id,
      brand_created_by_role: role,
    });
  };

  const patchProductInfo = (partner_product_id: number) => {
    if (!!partner_product_id && !!routeParams.store_category) {
      props.ProductEditLoad({
        partner_product_id: partner_product_id,
        store_category: routeParams.store_category,
      });
    }
  };

  const onStockAddAction = async (payload: StockAddPayload) => {
    payload.images = imageConsolidated.map(m => ({
      default: m.default,
      doc_name: m.doc_name,
      doc_path: m.doc_path , 
      thum_doc_name: m.thum_doc_name,
      thum_doc_path: m.thumb_doc_path,
      scr_doc_name: m.scr_doc_name,
      scr_doc_path: m.scr_doc_path,
      doc_id: m.doc_id,
    }));
    payload.store_id = routeParams.store_id;
    payload.qc_partner_id = +props.route.params.qc_partner_id;
    payload.admn_user_id = props.admin_user_id;
    payload.product_discount = !!payload.product_discount
      ? +payload.product_discount
      : undefined;
    payload.product_gst_percentage = !!payload.product_gst_percentage
      ? +payload.product_gst_percentage
      : undefined;

    payload.procurement_price = !!payload.procurement_price
      ? +payload.procurement_price
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
    payload.stock_quantity = !!payload.stock_quantity
      ? +payload.stock_quantity
      : undefined;
    payload.online_qty = !!payload.online_qty ? +payload.online_qty : undefined;
    payload.online_mrp = !!payload.online_mrp ? +payload.online_mrp : undefined;
    payload.online_discount = !!payload.online_discount
      ? +payload.online_discount
      : undefined;
    payload.online_selling_price = !!payload.online_selling_price
      ? +payload.online_selling_price
      : undefined;
    payload.online_gst_percentage = !!payload.online_gst_percentage
      ? +payload.online_gst_percentage
      : undefined;
    payload.online_flag = payload.online_flag ? true : false;

    let defaultImageFound: boolean = true;
    for (let i = 0; i < imageVariant.length ; i++) {
      const defaultImg = imageVariant[i].images.find(img => img.default == 1);
      console.log("image variant id :: ", imageVariant[i].variantId);
      if (!defaultImg) {
        defaultImageFound = false;
        break;
      }
    }

    if (imageVariant.length > 0 && defaultImageFound) {
      if (!!payload.long_desc) {
        var b64 = await enc.urlEncode(payload.long_desc);
        payload.long_desc = b64;
      }
      props.StockAddAction(payload);
    } else {
      showToast('Product default image is required.', 'error');
    }
  };

  const captureClicked = async (blockId: number) => {
    if (await requestCameraPermission()) {
      try {
        let res = await launchCamera({
          cameraType: 'back',
          mediaType: 'photo',
          quality: 0.7,
          includeBase64: true,
        });
        if (!!res?.assets && res?.assets.length > 0) {
          UploadImage(blockId, {...res?.assets[0], name: res.assets[0].fileName});
        }
      } catch (err) {}
    }
  };

  const uploadClicked = (blockId: number) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (!!response.assets && response.assets.length > 0) {
        UploadImage(blockId, {
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
  const DeleteImage = (blockId: number , item: Asset) => {
    // Setimage(image.filter(m => m.id != item.id));
    setImage(prev =>
      prev.map(variant =>
        variant.variantId === blockId
          ? { ...variant, images: variant.images.filter(img => img.id !== item.id) }
          : variant
      )
    );
  };
  const ChangeDefault = (variantId: number , id: string) => {
    // let img = JSON.parse(JSON.stringify(image));
    // img = img.map((m: any) => ({...m, default: 0}));
    // img.find((m: any) => m.id == id).default = 1;
    // Setimage(img);

    setImage(prev =>
      prev.map(variant =>
        variant.variantId === variantId
          ? {
              ...variant,
              images: variant.images.map(img => ({
                ...img,
                default: img.id === id ? 1 : 0
              }))
            }
          : variant
      )
    );
  };
  const UploadImage = async (variantId: number , imageLoc: any) => {
    console.log('Image for block :: ', variantId);
    let variant = imageVariant.find(variant => variant.variantId == variantId);
    const body = new FormData();
    props.BeginApiCallAction({
      count: 1,
      message: 'Uploading image. Plase wait...',
    });
    body.append('image_file ', imageLoc);
    body.append('upload_type ', 2);
    // body.append('default', image.length > 0 ? 0 : 1);
    body.append('default', !!variant && variant.images.length > 0 ? 0 : 1);
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
        console.log('Image upload response :: ', json);

        // Setimage([
        //   ...image,
        //   {...imageLoc, id: Math.random().toString(), ...json?.data},
        // ]);
        // setImage(prev =>
        //   prev.map(variant =>
        //     variant.variantId === variantId
        //       ? { ...variant, images: [...variant.images , {...imageLoc, id: Math.random().toString(), ...json?.data}] }
        //       : { variantId , images: [{...imageLoc, id: Math.random().toString(), ...json?.data}]}
        //   )
        // );

        setImage(prev => {
          const found = prev.find(item => item.variantId == variantId);
          console.log("found :: ", found?.variantId);
          if (!!found) {
            return prev.map(variant =>
              variant.variantId === variantId
                ? { ...variant, images: [...variant.images , {...imageLoc, id: Math.random().toString(), ...json?.data}] }
                : variant
            );
          } else {
            return [...prev, { variantId , images: [{...imageLoc, id: Math.random().toString(), ...json?.data}]}];
          } 
        });
      } else {
      }
      props.ApiCallSuccessAction();
    } catch (err) {
      props.ApiCallSuccessAction();
    }
  };
  return (
    <StockAddView
      templates={props.templates}
      units={props.units}
      singleProductDetail={props.singleProductDetail}
      productCategories={props.productCategories}
      productSubCategories={props.productSubCategories}
      productBrands={props.productBrands}
      onTemplateSelection={onTemplateSelection}
      onCategorySelection={onCategorySelection}
      onSubCategorySelection={onSubCategorySelection}
      onStockAddAction={onStockAddAction}
      pictureData={imageConsolidated}
      variantImage={imageVariant}
      patchData={Object(routeParams)}
      onBrandSelection={onBrandSelection}
      patchProductInfo={patchProductInfo}
      captureClicked={captureClicked}
      uploadClicked={uploadClicked}
      ChangeDefault={ChangeDefault}
      varients={props.varients}
      similar_product={props.similar_product}
      Setimage={Setimage}
      BeginApiCallAction={BeginApiCallAction}
      ApiCallSuccessAction={ApiCallSuccessAction}
      DeleteImage={DeleteImage}></StockAddView>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {
    qc_partner_id: state.user.user_detail?.partner_id,
    templates: state.store.templateList,
    units: state.store.units,
    productCategories: state.store.productCategories,
    productSubCategories: state.store.productSubCategories,
    productBrands: state.store.productBrands,
    stockAddDone: state.store.stockAddDone,
    singleProductDetail: state.store.singleProductDetail,
    varients: state.store.varients,
    admin_user_id: state.user.user_detail?.admn_user_id,
    similar_product: state.store.similar_product,
  };
};

const mapDispatchToProps = {
  StockAddLoad,
  ProductCategoryLoad,
  ProductSubCategoryLoad,
  ProductBrandLoad,
  StockAddAction,
  BeginApiCallAction,
  ApiCallSuccessAction,
  ResetStockAddDone,
  ProductEditLoad,
  GetVariantLoad,
  SimilarProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockAdd);
