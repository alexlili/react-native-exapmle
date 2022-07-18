/* eslint-disable react-native/no-inline-styles */
import {
  getLoginAuthCode,
  getToken,
  LoginDeviceType,
  verifyLoginAuthCode
} from '@/service/login';
import { Toast } from '@/util/events';
import DeviceStorage from '@/util/storage';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ObjectUtils } from 'ts-type-utils';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [stateTimer, setTimer] = useState<number | null>(null);
  const [statePhoneNumber, setPhoneNumber] = useState<string>('');
  const [stateAuthCode, setAuthCode] = useState<string>('');

  useEffect(() => {
    const clearAuthCodeTimeout = setTimeout(() => {
      if (stateTimer && stateTimer > 0 && stateTimer <= 60) {
        setTimer(stateTimer - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(clearAuthCodeTimeout);
    };
  }, [stateTimer]);
  /**
   * 校验手机号、验证码
   */
  const verifyPhone = (type: string) => {
    if (
      statePhoneNumber === '' ||
      statePhoneNumber.substring(0, 1) !== '1' ||
      statePhoneNumber.length !== 11
    ) {
      return '请输入正确的手机号';
    }
    if (type === 'statePhoneNumber') {
      return '';
    }
    if (
      type === 'code' &&
      (stateAuthCode === '' || stateAuthCode.length !== 6)
    ) {
      return '请输入六位验证码';
    }

    return '';
  };
  const getAuthCode = () => {
    const errMsg = verifyPhone(statePhoneNumber);
    if (errMsg !== '') {
      Toast(errMsg);
    } else {
      getLoginAuthCode(statePhoneNumber).then(() => {
        // 开始倒计时
        setTimer(60);
      });
    }
  };

  // 获取公钥与私钥(暂时写死)
  const pubKey = 'f412dae6e65c4895bdea3b0722b2bf64';

  const submit = async () => {
    const errMsg = verifyPhone('code');
    if (errMsg !== '') {
      Toast(errMsg);
    } else {
      const userInfo = await verifyLoginAuthCode(
        statePhoneNumber,
        stateAuthCode,
        LoginDeviceType.Android,
      );
      console.log(userInfo);
      // 使用返回的userid与pubKey生成token
      if (userInfo && ObjectUtils.hasValue(userInfo.userid)) {
        // 存储userInfo
        await DeviceStorage.save('userInfo', userInfo);
        // 请求token
        const tokenRes = await getToken(userInfo.userid, pubKey);
        console.log('tokenRes===', tokenRes);
        console.log('tokenRes===', tokenRes);
        if (tokenRes) {
          // 存储token
          DeviceStorage.save('token', tokenRes);
          Toast('登录成功');
          navigation.navigate('Home');
        } else {
          Toast('登录失败');
        }
      }
    }
  };
  return (
    <View style={styles.wrap}>
      <View
        style={styles.backBtn}
        onTouchEnd={() => {
          navigation.goBack();
        }}>
        <Text>返回</Text>
      </View>
      <View style={styles.logoWrap}>
        <Image
          source={require('@/assets/img/logo.png')}
          style={{height: 40}}
          resizeMode={'contain'}
        />
        <Text style={styles.logoText}>欢迎登录</Text>
      </View>
      <View style={styles.formWrap}>
        <View style={styles.itemWrap}>
          <Text style={styles.phoneCode}>+86</Text>
          <TextInput
            style={styles.phoneInput}
            onChangeText={text => setPhoneNumber(text)}
            value={statePhoneNumber}
            placeholder={'请输入手机号'}
            maxLength={11}
            keyboardType={'numeric'}
            placeholderTextColor={'#BBBBBB'}
          />
        </View>
        <View style={styles.itemWrap}>
          <TextInput
            style={styles.codeInput}
            onChangeText={text => setAuthCode(text)}
            value={stateAuthCode}
            placeholder={'请输入验证码'}
            placeholderTextColor={'#BBBBBB'}
            maxLength={6}
            keyboardType={'numeric'}
          />
          {!stateTimer || (stateTimer && stateTimer <= 0) ? (
            <Text onPress={getAuthCode} style={{color: '#449ff8'}}>
              获取验证码
            </Text>
          ) : (
            <Text style={{color: '#999'}}>已发送({stateTimer}s)</Text>
          )}
        </View>
        <LinearGradient
          colors={['#63d0fa', '#449ff8']}
          angle={90}
          useAngle
          style={styles.loginBtnWrapBg}>
          <TouchableOpacity style={styles.loginBtnWrap} onPress={submit}>
            <Text style={styles.loginText}>登录</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.textWrap}>
          <Text>
            登录注册即表示已同意
            <Text
              style={{color: '#449ff8'}}
              onPress={() => {
                navigation.navigate('UserAgreement');
              }}>
              用户协议
            </Text>
            和
            <Text
              style={{color: '#449ff8'}}
              onPress={() => {
                navigation.navigate('PrivacyPolicy');
              }}>
              隐私政策
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  logoWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30%',
  },
  logoText: {
    marginTop: 20,
    fontSize: 20,
    color: '#000',
  },
  formWrap: {
    marginTop: 50,
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 50,
  },
  phoneCode: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  phoneInput: {
    height: 30,
    flexGrow: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    color: '#000',
    fontSize: 16,
    paddingLeft: 12,
    paddingTop: 0,
    paddingBottom: 0,
  },
  codeInput: {
    height: 50,
    flexGrow: 1,
    color: '#000',
    fontSize: 16,
    lineHeight: 30,
    paddingTop: 0,
    paddingBottom: 0,
  },
  loginBtnWrapBg: {
    borderRadius: 4,
    marginTop: 30,
  },
  loginBtnWrap: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#fff',
  },
  textWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
