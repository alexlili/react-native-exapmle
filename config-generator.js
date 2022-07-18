const fs = require('fs');
const chalk = require('chalk');
const API_DEV_URL = 'https://api.dev.tenfuli.tech/';
const API_QA_URL = 'https://api.qa.tenfuli.tech/';
const API_PROD_URL = 'https://api.tenfuli.tech/';
const STATIC_ASSETS_DEV_URL = 'https://roadshow.dev.tenfuli.tech';
const STATIC_ASSETS_QA_URL = 'https://roadshow.qa.tenfuli.tech';
const STATIC_ASSETS_PROD_URL = 'https://roadshow.tenfuli.tech';
let API_URL, STATIC_ASSETS_URL;
console.log('NODE_ENV===', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  API_URL = API_DEV_URL;
  STATIC_ASSETS_URL = STATIC_ASSETS_DEV_URL;
} else if (process.env.NODE_ENV === 'qa') {
  API_URL = API_QA_URL;
  STATIC_ASSETS_URL = STATIC_ASSETS_QA_URL;
} else {
  API_URL = API_PROD_URL;
  STATIC_ASSETS_URL = STATIC_ASSETS_PROD_URL;
}

let template = `export default {
  API_URL: '${API_URL}',
  STATIC_ASSETS_URL: '${STATIC_ASSETS_URL}',
  DEVICE_FINGERPRINT: Math.random().toString(36).slice(2),
};
`;

fs.writeFile('./src/constants/config.js', template, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.green.bold.bgWhite('全局配置文件已经生成！'));
  console.log(chalk.green.bold.bgWhite(`当前API_URL：${API_URL}`));
  console.log(
    chalk.green.bold.bgWhite(`当前STATIC_ASSETS_URL：${STATIC_ASSETS_URL}`),
  );
});
