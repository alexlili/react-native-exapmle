import Login from '@/pages/global/login';
import PrivacyPolicy from '@/pages/global/privacyPolicy';
import SearchMeeting from '@/pages/global/searchMeeting';
import UserAgreement from '@/pages/global/userAgreement';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './main/index';

const Navigation: React.FC = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  // const MyTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: 'rgb(255, 45, 85)',
  //     background: 'rgb(242, 242, 242)',
  //     card: 'rgb(255, 255, 255)',
  //     text: 'rgb(28, 28, 30)',
  //     border: 'rgb(199, 199, 204)',
  //     notification: 'rgb(255, 69, 58)',
  //   },
  // };

  const scheme = useColorScheme();
  const RootStack = createStackNavigator();

  console.log('scheme===', scheme);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="#fff"
        />
        <RootStack.Navigator>
          <RootStack.Screen
            options={{ headerShown: false }}
            name="MainStack"
            component={MainStack}
          />
          <RootStack.Screen
            name="SearchMeeting"
            component={SearchMeeting}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="UserAgreement"
            component={UserAgreement}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              headerTitle: '',
              headerTransparent: true,
              headerPressColorAndroid: '#fff',
            }}
          />
          <RootStack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{
              cardStyle: { backgroundColor: 'transparent' },
              headerTitle: '',
              headerTransparent: true,
              headerPressColorAndroid: '#fff',
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
