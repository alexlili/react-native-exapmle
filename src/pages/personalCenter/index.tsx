/* eslint-disable react-native/no-inline-styles */
import DeviceStorage from '@/util/storage';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ObjectUtils } from 'ts-type-utils';
const DefaultAvatar = require('@/assets/img/icons/avatar.png');
const LaunchMeeting = require('@/assets/img/icons/edit.png');
const Auth = require('@/assets/img/icons/auth.png');
const Setting = require('@/assets/img/icons/setting.png');
const RightArrow = require('@/assets/img/icons/right-arrow.png');
const DeviceWidth = Dimensions.get('window').width; //full width
const DeviceHeight = Dimensions.get('window').height; //full width

const Index: React.FC = () => {
  const navigation = useNavigation();
  const [stateRefreshing, setRefreshing] = useState<boolean>(false);
  const [stateLogin, setLogin] = useState<boolean>(false);
  const [stateUserInfo, setUserInfo] = useState<any>({});
  useEffect(() => {
    console.log(111)
    const getAsyncStorageData = async () => {
      // 获取userInfo
      const currentUserInfo = await DeviceStorage.get('userInfo');
      console.log('currentUserInfo===', currentUserInfo)
      if (!ObjectUtils.isNullOrUndefined(currentUserInfo?.userid)) {
        // 请求设置页面接口
        setLogin(true);
        setUserInfo(currentUserInfo)
      } else {
        setLogin(false);
      }
    };
    getAsyncStorageData();
  }, []);
  const searchOnTouchEnd = () => {
    if (!stateLogin) {
      navigation.navigate('Login');
    }
  };

  /**
   * 下拉刷新
   */
  async function onRefresh() {
    console.log('下拉刷新');
    // 获取最新用户信息
  }
  const launchRordshow = () => {
    if (stateLogin) {
      // 跳转至发起路演
    } else {
      navigation.navigate('Login');
    }
  };

  const userAuth = () => {
    if (stateLogin) {
      // 用户认证
    } else {
      navigation.navigate('Login');
    }
  };

  const setting = () => {
    if (stateLogin) {
      // 设置页面
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={{ height: DeviceHeight, backgroundColor: 'red' }}>
      <View style={styles.wrap}>
        <FlatList
          data={[]}
          renderItem={({ }) => null}
          ListHeaderComponent={() => (
            <View style={{ width: DeviceWidth }}>
              <View style={styles.headerWrap}>
                <View style={styles.avatarWrap} onTouchEnd={searchOnTouchEnd}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                    source={DefaultAvatar}
                  />
                  {stateLogin ? (
                    <View style={styles.right}>
                      <Text style={styles.loginText}>{stateUserInfo?.name}</Text>
                    </View>
                  ) : (
                    <View style={styles.right}>
                      <Text style={styles.loginText}>立即登录</Text>
                      <Text style={styles.loginDes}>快来登录解锁更多路演</Text>
                    </View>
                  )}
                </View>
                <View style={styles.itemsWrap}>
                  <View style={styles.itemWrap} onTouchEnd={launchRordshow}>
                    <View style={styles.itemLeft}>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={LaunchMeeting}
                      />
                      <Text style={styles.itemText}>发起路演</Text>
                    </View>
                    <Image
                      style={{ width: 10, height: 16 }}
                      source={RightArrow}
                    />
                  </View>
                  <View style={styles.itemWrap} onTouchEnd={userAuth}>
                    <View style={styles.itemLeft}>
                      <Image style={{ width: 20, height: 20 }} source={Auth} />
                      <Text style={styles.itemText}>身份认证</Text>
                    </View>
                    <Image
                      style={{ width: 10, height: 16 }}
                      source={RightArrow}
                    />
                  </View>
                  <View style={styles.itemWrap} onTouchEnd={setting}>
                    <View style={styles.itemLeft}>
                      <Image style={{ width: 20, height: 20 }} source={Setting} />
                      <Text style={styles.itemText}>设置</Text>
                    </View>
                    <Image
                      style={{ width: 10, height: 16 }}
                      source={RightArrow}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
          refreshing={stateRefreshing}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerWrap: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarWrap: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
  },
  right: {
    paddingLeft: 20,
  },
  loginText: {
    fontSize: 17,
    color: '#0B0C0D',
    paddingBottom: 8,
  },
  loginDes: {
    fontSize: 12,
    color: '#999B9E',
  },
  itemsWrap: {
    width: '90%',
    display: 'flex',
    paddingTop: 20,
  },
  itemWrap: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemText: {
    paddingLeft: 5,
  },
});
