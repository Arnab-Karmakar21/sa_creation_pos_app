import {View, Text, StatusBar, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import PaymentView from './PaymentView';
import {connect} from 'react-redux';
import {StoreState} from '../../../../models/reduxModel';
import {
  BookingLoadAction,
  MadePaymentAction,
  MadePaymentSuceessAction,
  PaymentInitialAction,
} from '../../../../Store/actions/posActions';
import {User} from '../../../../models/UserModel';
import {
  OrderDetails,
  PaymentData,
  PaymentMode,
  PriceBreakUp,
} from '../../../../models/PosModel';
import {useFocusEffect} from '@react-navigation/native';
import Marquee from '../PosDashboard/Marquee';
import {
  ApiCallSuccessAction,
  BeginApiCallAction,
} from '../../../../Store/actions/apiStatusActions';
import {
  Asset,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {BaseSharedUrl, environment} from '../../../../environment';

const Payment = ({
  BookingLoadAction,
  PaymentInitialAction,
  navigation,
  order_details,
  route,
  userData,
  payment_mode,
  payment_due,
  MadePaymentAction,
  paid_Payment,
  returnAmount,
  MadePaymentSuceessAction,
  price_breakup,
  wallet_balance,
  BeginApiCallAction,
  ApiCallSuccessAction,
}: PaymentProps) => {
  const [image, Setimage] = useState<any[]>([]);
  const [ref_no, SetRef] = useState<string>('');
  useFocusEffect(
    React.useCallback(() => {
      if (!!route.params.order_id && !!userData?.active_shift) {
        PaymentInitialAction({
          order_no: route.params.order_id,
          store_id: userData?.active_shift.store_id,
        });
        // BookingLoadAction({
        //   unit_id: userData?.active_shift.unit_id,
        //   store_id: userData?.active_shift.store_id,
        //   order_no: route.params.order_id,
        // });
      }
    }, []),
  );
  const Back = () => {
    navigation.goBack();
  };
  const PaidPayment = (amount: number, type: number) => {
    if (type == 1) {
      MadePaymentAction({
        order_no: route.params.order_id,
        payment_type: type,
        amount: amount,
        store_id: userData?.active_shift?.store_id,
        pg_ref_no: null,
        payment_ref_no: null,
        payment_status: null,
        recharge_amount: null,
        order_origin_type: payment_due?.order_origin_type,
        payment_doc_id: null,
        upi_ref_no: null,
      });
    } else if (type == 2) {
      MadePaymentAction({
        order_no: route.params.order_id,
        payment_type: type,
        amount: payment_due?.amount_due,
        store_id: userData?.active_shift?.store_id,
        pg_ref_no: null,
        payment_ref_no: null,
        payment_status: null,
        recharge_amount: amount,
        order_origin_type: payment_due?.order_origin_type,
        payment_doc_id: null,
        upi_ref_no: null,
      });
    } else if (type == 7) {
      MadePaymentAction({
        order_no: route.params.order_id,
        payment_type: type,
        amount: payment_due?.amount_due,
        store_id: userData?.active_shift?.store_id,
        pg_ref_no: null,
        payment_ref_no: null,
        payment_status: null,
        recharge_amount: amount,
        order_origin_type: payment_due?.order_origin_type,
        payment_doc_id: image.length > 0 ? image[0].doc_id : null,
        upi_ref_no: ref_no,
      });
    }
  };
  const PaymentDone = () => {
    MadePaymentSuceessAction({
      flag: false,
      return_amount: undefined,
    });
    navigation.reset({
      index: 0,
      routes: [{name: 'CustomerAddNew'}],
    });
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
    body.append('upload_type ', 5);
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
      console.log(err);

      ApiCallSuccessAction();
    }
  };

  return (
    <>
      <StatusBar hidden={true} />
      <Marquee />
      <PaymentView
        order_details={order_details}
        payment_mode={payment_mode}
        payment_due={payment_due}
        Back={Back}
        PaidPayment={PaidPayment}
        price_breakup={price_breakup}
        PaymentDone={PaymentDone}
        paid_Payment={paid_Payment}
        returnAmount={returnAmount}
        customer={route.params}
        userData={userData}
        wallet_balance={wallet_balance}
        captureClicked={captureClicked}
        DeleteImage={DeleteImage}
        pictureData={image}
        uploadClicked={uploadClicked}
        ref_no={ref_no}
        SetRef={SetRef}
        Setimage={Setimage}
      />
    </>
  );
};

const mapDispatchToProps = {
  BookingLoadAction,
  PaymentInitialAction,
  MadePaymentAction,
  MadePaymentSuceessAction,
  BeginApiCallAction,
  ApiCallSuccessAction,
};

const mapStateToProps = (state: StoreState) => {
  return {
    order_details: state.pos.order_details,
    userData: state.user.user_detail,
    payment_mode: state.pos.payment_mode,
    payment_due: state.pos.payment_due,
    paid_Payment: state.pos.paid_Payment,
    returnAmount: state.pos.returnAmount,
    price_breakup: state.pos.price_breakup,
    wallet_balance: state.pos.payment_due?.wallet_balance,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
interface PaymentProps {
  BookingLoadAction?: any;
  PaymentInitialAction?: any;
  route?: any;
  navigation?: any;
  userData?: User;
  order_details?: OrderDetails;
  payment_mode: PaymentMode[];
  payment_due?: PaymentData;
  MadePaymentAction?: any;
  paid_Payment: boolean;
  returnAmount?: number;
  MadePaymentSuceessAction?: any;
  price_breakup: PriceBreakUp[];
  wallet_balance?: number;
  BeginApiCallAction?: any;
  ApiCallSuccessAction?: any;
}
