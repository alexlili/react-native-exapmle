/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

const Loading: React.FC = () => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#88000000',
        },
      ]}>
      <View
        style={[
          {backgroundColor: '#5a5a5a', height: 80, width: 80, borderRadius: 12},
        ]}>
        <ActivityIndicator
          color={'white'}
          size={'large'}
          style={{flex: 1, marginBottom: 10}}
        />

        <View
          style={[
            {
              flex: 1,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            },
          ]}>
          <Text>加载中...</Text>
        </View>
      </View>
    </View>
  );
};

export default Loading;
