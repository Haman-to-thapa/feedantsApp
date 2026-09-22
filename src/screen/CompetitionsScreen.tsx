import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CompetitionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Competitions</Text>
    </View>
  );
};

export default CompetitionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
