/**
 * Add to the request prototype.
 */
import {Toast} from '@/util/events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ObjectUtils} from 'ts-type-utils';
export default function (superagent: any) {
  const Request = superagent.Request;
  Request.prototype.apiDomainParse = apiDomainParse;
  return superagent;
}

export enum RequestErrorCode {
  AccountIsNotExist = 50040019, // 账号不存在
  PasswordIsError = 50040016, // 密码错误
  RoleIsExist = 50041002, // 角色已存在
  InvalidUser = 10040007, // 非法用户
  SMSFrequency = 50040003, // 短信频繁发送
  SMSFailed = 50040002, // 短信发送失败
  SMSCodeError = 50040004, // 短信验证码错误
  AccountIsForbiden = 50040022, // 您的账号已被管理员停用，如有疑问，请联系管理员
  DataHandleError = 10080001, // 数据操作异常
}

function apiDomainParse(this: any, manualParse: any) {
  const that = this;
  const oldEnd = this.end;

  this.end = function (fn: any) {
    function attemptParse() {
      return oldEnd.call(
        that,
        function (
          errTmp: any,
          resTmp = {
            body: {},
          },
        ) {
          let err1 = errTmp;
          let res1 = resTmp;

          if (manualParse) {
            const {err, res} = manualParse(err1, res1);
            err1 = err;
            res1 = res;
          }
          // 请求成功
          function successParse(response: any) {
            // 登录态过期
            if (response.code === 10000000 || response.errcode === 10000000) {
              // 清除localstorage
              AsyncStorage.clear();
              return res1;
            }
            // 其他错误码
            if (RequestErrorCode[response.code]) {
              Toast(response.msg);
              // 清除localstorage
              AsyncStorage.clear();
              return res1;
            }
            // 正常则返回response里面的data数据
            // console.log('===请求接口返回值===');
            // console.log(response);
            return response.data;
          }

          return (
            fn &&
            fn(
              parseError(err1, res1),
              res1.body ? successParse(res1.body) : res1,
              that,
            )
          );
        },
      );
    }
    return attemptParse();
  };
  return this;
}

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export function parseError(err: any, res: any) {
  if (err) {
    if (ObjectUtils.hasValue(err.status)) {
      const errorText = codeMessage[err.status] || '请求错误';
      console.error(`请求错误类型 ${err.status}`);
      return Error(errorText);
    }

    if (err.response && err.response.body) {
      const error1 = Error(err.response.body.message);

      return error1;
    }

    return err;
  }

  if (!res) {
    return err;
  }

  return null;
}
