import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import {CompetitionProvider} from './src/context/CompetitionContext';

const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007B8A',
    background: '#F8FAFA',
    card: '#FFFFFF',
    text: '#14232C',
    border: '#EAEFEF',
    notification: '#007B8A',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <CompetitionProvider>
        <NavigationContainer theme={LightTheme}>
          <AppNavigator />
        </NavigationContainer>
      </CompetitionProvider>
    </SafeAreaProvider>
  );
};

export default App;
