/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import Toast from '@/components/globalToast/index';
import DeviceStorage from '@/util/storage';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './navigator';
import { getUserInfo } from './service/user';

const App: React.FC = () => {
  useEffect(() => {
    const getAsyncStorageData = async () => {
      // 获取token
      const currentToken = await DeviceStorage.get('token');
      if (currentToken) {
        // token存在则去请求接口请求用户信息并且更新本地userInfo
        const userInfo = await getUserInfo();
        await DeviceStorage.update('userInfo', userInfo);
      }
    };
    getAsyncStorageData();
  }, []);
  return (
    <View style={styles.app}>
      <Toast />
      <Navigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    position: 'relative',
    backgroundColor: '#fff',
    flex: 1,
  },
});
