import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../GlobalStyle';
import {ThemeItem} from '../../Theme/LightTheme';
import {ScrollView} from 'react-native-gesture-handler';
import {Asset} from 'react-native-image-picker';
import {RetrieveImageService, RetrieveImageService_one} from '../../Service/S3';

const QubeInputPicture = ({
  blockId , 
  imageURI,
  label,
  captureClicked,
  uploadClicked,
  DeleteImage,
  ChangeDefault,
  disabled,
}: QubeInputPictuerProps) => {
  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    container: {
      height: 240,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    labelText: {
      color: theme.colors.primary,
      paddingBottom: 5,
      fontSize: theme.fonts.smallFont,
    },
    buttonText: {
      fontSize: theme.fonts.extraSmallFont,
      color: theme.colors.primaryTint,
    },
  });

  // console.log("imageURI :: ", imageURI);
  

  return (
    <View style={styles.container}>
      <Text style={[styles.labelText, globalStyles.fontFamily]}>{label}</Text>
      <ScrollView horizontal={true}>
        {imageURI?.map((item, index) => (
          <TouchableOpacity
            onPress={() => !!blockId ? ChangeDefault(blockId , item.id) : ChangeDefault(item.id)}
            key={index}
            style={{
              height: 200,
              width: 200,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: '#dbd9d9',
              borderRadius: 10,
              margin: 5,
            }}>
            {item?.default != 1 && (
              <TouchableOpacity
                onPress={() => !!blockId ? DeleteImage(blockId, item) : DeleteImage(item)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 999,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                }}>
                <Icon
                  name="delete"
                  size={theme.icons.bigIcon}
                  color={theme.colors.danger}></Icon>
              </TouchableOpacity>
            )}

            {item?.default == 1 && (
              <View
                style={{
                  backgroundColor: '#ffff',
                  position: 'absolute',
                  top: 80,
                  zIndex: 999,
                  left: 75,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>Default</Text>
              </View>
            )}

            <Image
              style={{
                height: undefined,
                aspectRatio: 1,
                width: 195,
                borderRadius: 10,
              }}
              source = {{ uri: item?.thumb_doc_path || item?.doc_path }}  // {{uri: RetrieveImageService_one(item.thumb_doc_path)}}
            />
          </TouchableOpacity>
        ))}
        {!disabled && (
          <View
            style={{
              height: 200,
              width: 200,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: '#dbd9d9',
              borderRadius: 10,
              margin: 5,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => !!blockId ? captureClicked(blockId) : captureClicked()}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                name="camera-alt"
                size={theme.icons.bigIcon}
                color={theme.colors.primaryTint}></Icon>
              <Text style={[globalStyles.fontFamily, styles.buttonText]}>
                Open Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => !!blockId ? uploadClicked(blockId) : uploadClicked()}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                name="cloud-upload"
                size={theme.icons.massiveIcon}
                color={theme.colors.primaryTint}></Icon>
              <Text style={[globalStyles.fontFamily, styles.buttonText]}>
                Open File
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

interface QubeInputPictuerProps {
  blockId?: number ; 
  imageURI: any[];
  label: string;
  captureClicked: any;
  uploadClicked: any;
  DeleteImage?: any;
  ChangeDefault?: any;
  disabled?: any;
}

interface Picture {
  uri: string;
  id: number;
}

export default QubeInputPicture;
