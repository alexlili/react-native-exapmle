import Home from '@/pages/home/index';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
// import {Text} from 'react-native';
const HomeStack = createStackNavigator();
const HomeStackContainer = () => {
  return (
    <HomeStack.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, cardStyle: { backgroundColor: '#fff' } }}

      />
    </HomeStack.Navigator>
  );
};
export default HomeStackContainer;
