import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SearchMeeting: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrap}>
      <View
        onTouchEnd={() => {
          navigation.goBack();
        }}>
        <Text>取消</Text>
      </View>
      <Text>我是搜索页</Text>
    </View>
  );
};

// const SearchMeeting: React.FC = ({navigation, route}) => {
//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <HeaderButtons left children={() => <View>111</View>}></HeaderButtons>
//       ),
//       headerRight: () => (
//         <HeaderButtons children={() => <View>111</View>}></HeaderButtons>
//       ),
//     });
//   }, [navigation, route]);

//   return (
//     <View style={styles.wrap}>
//       <Text>我是搜索页</Text>
//     </View>
//   );
// };

export default SearchMeeting;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
