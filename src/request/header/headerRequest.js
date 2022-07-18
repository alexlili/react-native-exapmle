import AsyncStorage from '@react-native-async-storage/async-storage';
import {ObjectUtils} from 'ts-type-utils';

export default function (superagent) {
  const Request = superagent.Request;
  Request.prototype.headerRequest = headerRequest;
  return superagent;
}

function headerRequest() {
  this.set('Content-Type', 'application/json');
  this.set('Accept', 'application/json');
  let token = AsyncStorage.getItem('token');
  if (ObjectUtils.hasValue(token)) {
    token = '';
  }
  this.set('jwt', token);

  const that = this;
  const oldEnd = this.end;

  this.end = function (fn) {
    function recordCookie() {
      return oldEnd.call(that, function (err, res) {
        return fn && fn(err, res);
      });
    }
    return recordCookie();
  };
  console.log('======当前请求======');
  console.log(this);

  return this;
}
