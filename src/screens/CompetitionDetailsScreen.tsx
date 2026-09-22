import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CompetitionDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedants Classical Dance</Text>
      <Text>Competition Details</Text>
    </View>
  );
};

export default CompetitionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
});
