import AsyncStorage from '@react-native-async-storage/async-storage';

const getAsyncStorageItem = async (prop: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(prop);
    if (jsonValue !== null) {
      console.log(`${prop}===`, JSON.parse(jsonValue));
    } else {
      console.log(`${prop}===null`);
    }
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
  return '';
};

export default class DeviceStorage {
  static get(key: string) {
    return getAsyncStorageItem(key);
  }
  static save(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }
  static update(key: string, value: any) {
    return DeviceStorage.get(key).then(item => {
      value =
        typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }
  static delete(key: string) {
    return AsyncStorage.removeItem(key);
  }
}
