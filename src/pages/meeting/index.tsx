import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Home: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrap}>
      <Text>我是首页</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
