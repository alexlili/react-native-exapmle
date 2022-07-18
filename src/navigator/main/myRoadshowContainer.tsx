import MyRoadshow from '@/pages/myRoadshow/index';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
// import {Text} from 'react-native';
const MyRoadshowStack = createStackNavigator();
const MyRoadshowStackContainer = () => {
  return (
    <MyRoadshowStack.Navigator
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
      <MyRoadshowStack.Screen
        name="MyRoadshow"
        component={MyRoadshow}
        options={{headerShown: false}}
      />
    </MyRoadshowStack.Navigator>
  );
};
export default MyRoadshowStackContainer;
