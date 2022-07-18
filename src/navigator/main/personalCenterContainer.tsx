import PersonalCenter from '@/pages/personalCenter/index';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
// import {Text} from 'react-native';
const PersonalCenterStack = createStackNavigator();
const PersonalCenterStackContainer = () => {
  return (
    <PersonalCenterStack.Navigator
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
      <PersonalCenterStack.Screen
        name="PersonalCenter"
        component={PersonalCenter}
        options={{ headerShown: false }}
      />
    </PersonalCenterStack.Navigator>
  );
};
export default PersonalCenterStackContainer;
