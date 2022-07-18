const request = require('superagent');
const chalk = require('chalk');
const superagent_prefix = require('superagent-prefix');
import config from '@/constants/config';
// import NetInfo from '@react-native-community/netinfo';
import header from './header/headerRequest';
import apiDomainParse from './parse/apiDomainParse';
const API_URL = config.API_URL;
const prefix = 'roadshow-assistant-service';

header(request);
apiDomainParse(request);

export default class Request {
  static async post(url: string, params = {}) {
    if (!params) {
      params = {};
    }

    let response = await request
      .post(url)
      .send(params)
      .use(superagent_prefix(`${API_URL}${prefix}`))
      .headerRequest()
      .apiDomainParse();
    console.log(chalk.yellow(`===post请求${url}返回值response===`));
    console.log(response);
    return response;
  }

  static async get(url: string, params = {}) {
    if (!params) {
      params = {};
    }

    // console.log()

    let response = await request
      .get(url)
      .query(params)
      .use(superagent_prefix(`${API_URL}${prefix}`))
      .headerRequest()
      .apiDomainParse();
    console.log(chalk.yellow(`===get请求${url}返回值response===`));
    console.log(response);
    return response;
  }

  /**
   * 判断网络请求接口业务是否成功
   * @param res
   * @returns {*|boolean}
   */
  static netQueryOk(res: any) {
    return res && res.success;
  }

  // static async isNetConnected() {
  //   //用于判断当前设备是否联网
  //   let result = await NetInfo.fetch();
  //   return result;
  // }
}
