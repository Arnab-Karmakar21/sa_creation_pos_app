import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MarqueeView from 'react-native-marquee-view';
import moment from 'moment';
import {ThemeItem} from '../../../../Theme/LightTheme';
import {useTheme} from '@react-navigation/native';

const Marquee = () => {
  const theme: ThemeItem = Object(useTheme());
  const [time, SetTime] = useState<any>(new Date());
  useEffect(() => {
    let timmer = setTimeout(() => {
      SetTime(new Date());
    }, 10000);
    return () => clearInterval(timmer);
  }, [time]);
  return (
    <MarqueeView
      autoPlay={true}
      playing={true}
      delay={2000}
      style={{
        backgroundColor: theme.colors.primary,
        width: '100%',
      }}>
      <View style={{width: '100%'}}>
        <Text style={{color: '#ffff', fontWeight: '700'}}>
          Srishtishree Store POS System{'                        '}
          {'                        '} Time {moment(time).format('hh:mm:ss a')}
          {'         '}Date {moment(time).format('DD-MM-YYYY')}
          {'                        '}
          Srishtishree Store POS System{'                        '}
          {'                        '} Time {moment(time).format('hh:mm:ss a')}
          {'         '} Date {moment(time).format('DD-MM-YYYY')}
        </Text>
      </View>
    </MarqueeView>
  );
};

export default Marquee;
