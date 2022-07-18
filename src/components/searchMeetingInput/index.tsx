import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Index: React.FC = () => {
  const navigation = useNavigation();
  const searchOnTouchEnd = () => {
    navigation.navigate('SearchMeeting');
  };
  return (
    <View style={styles.wrap}>
      <View style={styles.inputWrap} onTouchEnd={searchOnTouchEnd}>
        <Text style={styles.input}>快速搜索路演会议</Text>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    width: '100%',
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 36,
    backgroundColor: '#d8d8d8',
    borderRadius: 18,
  },
  input: {
    position: 'relative',
    paddingLeft: 45,
  },
});
