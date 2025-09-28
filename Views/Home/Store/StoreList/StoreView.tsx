import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { ThemeItem } from '../../../../Theme/LightTheme';
import globalStyles from '../../../../GlobalStyle';
import HeaderStyle1 from '../../../../UILibrary/HeaderStyle1';

import StoreCard from './StoreCard';
import { StoreItem } from '../../../../Models/StoreModel';
import { Card, Icon } from '@rneui/base';
import QubeButton from '../../../../UILibrary/QubeButton';


const StoreView = ({
  stores,
  onAddStoreClick,
  onUpdateStoreClick,
  onStoreDetailsClick,
  onStoreCardClick,
  reloadData,
}: StoreViewProps) => {

  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      headerContainer: {
        paddingTop: 40,
        paddingHorizontal: '5%',
        backgroundColor: theme.colors.primaryShade,
        borderBottomRightRadius: theme.roundness.bigRoundness,
      },
      headerText: {
        fontSize: theme.fonts.massiveFont,
        fontWeight: 'bold',
        color: theme.colors.primaryConstrast,
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: {height: 3, width: 0},
        textShadowRadius: 2.5,
      },
      headerSubText: {
        fontSize: theme.fonts.mediumFont,
        color: theme.colors.secondaryTint,
      },
      spacing: {
        paddingVertical: 10,
      },
      addButton: {
        position: 'absolute',
        bottom: 25,
        right: 15,
      },
  })
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../../../../Assets/bg6.jpg')} style={{height:"100%",width:"100%"}} imageStyle={{opacity:0.4}}>
        <View style={[{marginTop:10, marginBottom:5, width:"95%",height:50,alignSelf:"center",flexDirection:"row"},globalStyles.boxShadow]}>
            <View style={{width:"50%",alignSelf:"center"}}>
              <Text style={{fontSize:theme.fonts.massiveFont,borderBottomWidth:1,borderBottomColor:theme.colors.darkTint,width:80}}>Stores</Text>
            </View>
            <View style={{width:"50%",alignSelf:"center"}}>
              <View style={{alignSelf:"flex-end",width:150}}>
              <QubeButton 
                  onPress={onAddStoreClick}
                  title="Add Store"
                  color="success"
                  ></QubeButton></View>
            </View> 
        </View>
      {!!stores  && stores.length == 0 ? (
         <View style={{flex:1,justifyContent:"center"}}>
             <Icon
                  name={'store'}
                  size={200}
                  color={theme.colors.darkTint}
                />
            <Text style={{alignSelf:"center",fontSize:25}}>No stores present</Text>
            </View>
        ):(
            <FlatList
            numColumns={2}
            data={stores}
            keyExtractor={(store) => store.store_id.toString()}
            renderItem={(store) => (
           <View style={{width:"50%",paddingRight:20,paddingLeft:20, marginVertical:10,paddingBottom:10}}>
             <StoreCard
               store={store.item}
               onUpdateStoreClick={onUpdateStoreClick}
               onStoreDetailsClick={onStoreDetailsClick}
               onStoreCardClick={onStoreCardClick}></StoreCard>
           </View>
         )}
         refreshing={false}
         onRefresh={reloadData}
       />)}
    </ImageBackground>
    </View>
  )
}

export default StoreView;

interface StoreViewProps {
  stores: StoreItem[];
  onAddStoreClick: any;
  onUpdateStoreClick: any;
  reloadData: any;
  onStoreDetailsClick: any;
  onStoreCardClick: any;
}
