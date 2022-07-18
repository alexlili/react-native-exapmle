import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import HomeStackContainer from './homeContainer';
import MyRoadshowContainer from './myRoadshowContainer';
import PersonalCenterContainer from './personalCenterContainer';
const IconHome = require('@/assets/img/icons/home.png');
const IconHomeActive = require('@/assets/img/icons/home-active.png');
const IconRoadshow = require('@/assets/img/icons/roadshow.png');
const IconRoadshowActive = require('@/assets/img/icons/roadshow-active.png');
const IconMy = require('@/assets/img/icons/my.png');
const IconMyActive = require('@/assets/img/icons/my-active.png');
const Tab = createBottomTabNavigator();

const MainStack = () => {
  const navigation = useNavigation();
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e: any) => {
  //     // Prevent default behavior
  //     e.preventDefault();

  //     // Do something manually
  //     // ...
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  return (
    <Tab.Navigator
      initialRouteName="首页"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === '首页') {
            iconName = focused ? IconHomeActive : IconHome;
          } else if (route.name === '我的路演') {
            iconName = focused ? IconRoadshowActive : IconRoadshow;
          } else if (route.name === '个人中心') {
            iconName = focused ? IconMyActive : IconMy;
          }
          return <Image style={styles.icon} source={iconName} />;
        }
      })}>
      <Tab.Screen name="首页" component={HomeStackContainer} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="我的路演" component={MyRoadshowContainer} />
      <Tab.Screen name="个人中心" component={PersonalCenterContainer} options={{ unmountOnBlur: true }} />
    </Tab.Navigator>
  );
};
export default MainStack;
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
