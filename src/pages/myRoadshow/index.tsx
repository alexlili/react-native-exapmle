import SearchMeetingInput from '@/components/searchMeetingInput/index';
import * as React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
const DeviceHeight = Dimensions.get('window').height; //full width

const Index: React.FC = () => {
  const scheme = useColorScheme();

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{height: DeviceHeight}}>
        <View style={styles.wrap}>
          <SearchMeetingInput />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputWrap: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    backgroundColor: '#F2F2F2',
  },
  input: {
    position: 'relative',
    paddingLeft: 45,
  },
  bannerWrap: {
    position: 'relative',
  },
});
