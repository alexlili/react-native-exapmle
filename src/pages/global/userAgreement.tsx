// import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const UserAgreement: React.FC = () => {
  // const navigation = useNavigation();
  return (
    <View style={styles.wrap}>
      <Text>用户协议</Text>
    </View>
  );
};

export default UserAgreement;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
