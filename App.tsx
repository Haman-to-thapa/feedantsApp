import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import {CompetitionProvider} from './src/context/CompetitionContext';
import {LanguageProvider} from './src/context/LanguageContext';

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
      <LanguageProvider>
        <CompetitionProvider>
          <NavigationContainer theme={LightTheme}>
            <AppNavigator />
          </NavigationContainer>
        </CompetitionProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
};

export default App;
