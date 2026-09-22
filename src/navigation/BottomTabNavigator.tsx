import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CreateScreen from '../screens/CreateScreen';
import CompetitionDetailsScreen from '../screens/CompetitionDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// --- Vector Icon Components (Pure React Native Views) ---

// 1. Home Icon
const HomeTabIcon = ({focused}: {focused: boolean}) => {
  const color = focused ? '#007B8A' : '#8D9BA2';
  return (
    <View style={styles.iconBox}>
      {/* Roof Triangle */}
      <View style={[styles.homeRoof, {borderBottomColor: color}]} />
      {/* House Body */}
      <View style={[styles.homeBody, {backgroundColor: color}]}>
        <View style={styles.homeDoor} />
      </View>
    </View>
  );
};

// 2. Explore (Magnifying Glass) Icon
const ExploreTabIcon = ({focused}: {focused: boolean}) => {
  const color = focused ? '#007B8A' : '#8D9BA2';
  return (
    <View style={styles.iconBox}>
      <View style={[styles.searchCircle, {borderColor: color}]} />
      <View style={[styles.searchHandle, {backgroundColor: color}]} />
    </View>
  );
};

// 3. Center Create (+) Button
const CreateTabButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.createButtonContainer}>
      <View style={styles.createButtonBadge}>
        <Text style={styles.createPlus}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

// 4. Competitions (Trophy) Icon
const CompetitionsTabIcon = ({focused}: {focused: boolean}) => {
  const color = focused ? '#007B8A' : '#8D9BA2';
  return (
    <View style={styles.iconBox}>
      {/* Trophy Cup */}
      <View style={[styles.trophyCup, {backgroundColor: color}]}>
        <View style={[styles.trophyHandleLeft, {borderColor: color}]} />
        <View style={[styles.trophyHandleRight, {borderColor: color}]} />
      </View>
      {/* Trophy Stem & Base */}
      <View style={[styles.trophyStem, {backgroundColor: color}]} />
      <View style={[styles.trophyBase, {backgroundColor: color}]} />
    </View>
  );
};

// 5. Profile (Avatar) Icon
const ProfileTabIcon = ({focused}: {focused: boolean}) => {
  return (
    <View style={styles.iconBox}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        }}
        style={[
          styles.profileImage,
          focused ? styles.profileActiveBorder : styles.profileInactiveBorder,
        ]}
      />
    </View>
  );
};

// Custom Tab Bar matching Figma design
const CustomTabBar = ({state, descriptors, navigation}: any) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 12 : 6);

  return (
    <View style={[styles.tabBarContainer, {paddingBottom: bottomPadding}]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Center Create (+) Button
        if (route.name === 'Create') {
          return (
            <CreateTabButton key={route.key} onPress={onPress} />
          );
        }

        let label = 'Home';
        let IconComponent = HomeTabIcon;

        if (route.name === 'Home') {
          label = 'Home';
          IconComponent = HomeTabIcon;
        } else if (route.name === 'Explore') {
          label = 'Explore';
          IconComponent = ExploreTabIcon;
        } else if (route.name === 'Competitions') {
          label = 'Competitions';
          IconComponent = CompetitionsTabIcon;
        } else if (route.name === 'Profile') {
          label = 'Profile';
          IconComponent = ProfileTabIcon;
        }

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.75}
            onPress={onPress}
            style={styles.tabItem}>
            <IconComponent focused={isFocused} />
            <Text
              style={[
                styles.tabLabel,
                isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}>
              {options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const renderTabBar = (props: any) => <CustomTabBar {...props} />;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Competitions"
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen
        name="Competitions"
        component={CompetitionDetailsScreen}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEFEF',
    paddingTop: 8,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: -3},
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 28,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#007B8A',
    fontWeight: '800',
  },
  tabLabelInactive: {
    color: '#8D9BA2',
    fontWeight: '600',
  },

  // Home Icon Styles
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 7,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  homeBody: {
    width: 12,
    height: 8,
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 1.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  homeDoor: {
    width: 4,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  // Explore (Search) Icon Styles
  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    marginTop: -2,
    marginLeft: -3,
  },
  searchHandle: {
    width: 2.2,
    height: 6,
    borderRadius: 1,
    transform: [{rotate: '-45deg'}],
    position: 'absolute',
    bottom: 2,
    right: 5,
  },

  // Center Create (+) Button Styles
  createButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonBadge: {
    width: 44,
    height: 32,
    borderRadius: 11,
    backgroundColor: '#007B8A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#007B8A',
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  createPlus: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 24,
    marginTop: -1,
  },

  // Trophy Icon Styles
  trophyCup: {
    width: 13,
    height: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  trophyHandleLeft: {
    position: 'absolute',
    left: -4,
    top: 1,
    width: 4,
    height: 6,
    borderWidth: 1.5,
    borderRightWidth: 0,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  trophyHandleRight: {
    position: 'absolute',
    right: -4,
    top: 1,
    width: 4,
    height: 6,
    borderWidth: 1.5,
    borderLeftWidth: 0,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  trophyStem: {
    width: 2.5,
    height: 4,
  },
  trophyBase: {
    width: 12,
    height: 2.5,
    borderRadius: 1,
  },

  // Profile Avatar Styles
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  profileActiveBorder: {
    borderWidth: 2,
    borderColor: '#007B8A',
  },
  profileInactiveBorder: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});
