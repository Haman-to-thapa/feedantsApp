import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import CompetitionDetailsScreen from '../screens/CompetitionDetailsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  CompetitionDetails: {
    competitionId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

      <Stack.Screen
        name="CompetitionDetails"
        component={CompetitionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
