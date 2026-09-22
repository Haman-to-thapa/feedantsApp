import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CompetitionsScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Competitions</Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('CompetitionDetails', {
            competitionId: 'classical-dance-001',
          })
        }>
        <Text style={styles.buttonText}>
          Open Classical Dance
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompetitionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#16232C',
  },

  button: {
    backgroundColor: '#167C80',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
