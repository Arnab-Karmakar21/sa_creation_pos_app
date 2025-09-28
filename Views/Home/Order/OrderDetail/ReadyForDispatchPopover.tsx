import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {ThemeItem} from '../../../../Theme/LightTheme';
import QubeTextInput from '../../../../UILibrary/QubeTextInput';
import {requiredValidator} from '../../../../Validators';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import QubeButton from '../../../../UILibrary/QubeButton';
interface ReadyForDispatchPopoverProps {
  Setflag?: any;
  flag: boolean;
  submit?: any;
}
const ReadyForDispatchPopover = ({
  flag,
  Setflag,
  submit,
}: ReadyForDispatchPopoverProps) => {
  const theme: ThemeItem = Object(useTheme());
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
    watch,
    getValues,
    reset,
  } = useForm<any>({
    mode: 'all',
  });
  useEffect(() => {
    setValue('length', undefined);
    setValue('width', undefined);
    setValue('height', undefined);
    setValue('weight', undefined);
  }, [flag]);
  return (
    <Modal
      style={{
        width: '60%',
        position: 'absolute',
        top: '3%',
        left: '15%',
        zIndex: 2,
        height: '75%',
      }}
      testID={'modal'}
      collapsable={true}
      onBackdropPress={() => Setflag(false)}
      isVisible={flag}>
      <ScrollView
        style={{
          backgroundColor: '#ffff',
          padding: 10,
          //   justifyContent: 'center',
          //   alignItems: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            borderBottomColor: theme.colors.placeholderText,
            borderBottomWidth: 0.5,
            width: '100%',
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: theme.fonts.massiveFont,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}>
            Package Information
          </Text>
        </View>
        <View style={{width: '95%', margin: 10}}>
          <View style={{paddingVertical: 10}}>
            <QubeTextInput
              rules={{...requiredValidator}}
              name="length"
              control={control}
              defaultValue={null}
              placeholder="Enter Package Length (cm) "
              refName={register}
              errors={errors}
              label="Package Length (cm) (*)"
              blurOnSubmit={false}
              keyboardType="number-pad"
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <QubeTextInput
              rules={{...requiredValidator}}
              name="width"
              control={control}
              defaultValue={null}
              placeholder="Enter Package Width (cm)"
              refName={register}
              errors={errors}
              label="Package Width (cm) (*)"
              blurOnSubmit={false}
              keyboardType="number-pad"
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <QubeTextInput
              rules={{...requiredValidator}}
              name="height"
              control={control}
              defaultValue={null}
              placeholder="Enter Package Height (cm)"
              refName={register}
              errors={errors}
              label="Package Height (cm) (*)"
              blurOnSubmit={false}
              keyboardType="number-pad"
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <QubeTextInput
              rules={{...requiredValidator}}
              name="weight"
              control={control}
              defaultValue={null}
              placeholder="Enter Package Weight (KG)"
              refName={register}
              errors={errors}
              label="Package Weight(KG) (*)"
              blurOnSubmit={false}
              keyboardType="number-pad"
            />
          </View>
          <View style={{padding: 10}}>
            <View style={{padding: 10}}>
              <QubeButton
                color={'primary'}
                onPress={handleSubmit(submit)}
                title="Submit"></QubeButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ReadyForDispatchPopover;
