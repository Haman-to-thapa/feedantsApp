import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface PrizeMoneyCardProps {
  onPress?: () => void;
}

const PrizeMoneyCard: React.FC<PrizeMoneyCardProps> = ({onPress}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Prize Money</Text>

      <TouchableOpacity
        style={styles.videoCard}
        activeOpacity={0.85}
        onPress={onPress}>
        <View style={styles.videoThumbnail}>
          <Text style={styles.largePlay}>▶</Text>
        </View>

        <View style={styles.videoInfo}>
          <Text style={styles.videoCardTitle}>
            Know more about prize money
          </Text>
          <Text style={styles.videoCardText}>
            Learn how winners receive their rewards.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PrizeMoneyCard;

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#16232C',
  },
  videoCard: {
    marginTop: 12,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EEEE',
  },
  videoThumbnail: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCEDEC',
  },
  largePlay: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    color: '#167C80',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 21,
    paddingLeft: 4,
  },
  videoInfo: {
    padding: 14,
  },
  videoCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A2A32',
  },
  videoCardText: {
    marginTop: 5,
    fontSize: 12,
    color: '#738088',
  },
});
