/**
 * @format
 */
import { AppRegistry } from 'react-native';
// import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';
import { name as appName } from './app.json';
import App from './src/App';

// MessageQueue.spy(true, msg => console.log(msg));

AppRegistry.registerComponent(appName, () => App);
