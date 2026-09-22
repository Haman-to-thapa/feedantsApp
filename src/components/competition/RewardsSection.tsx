import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface RewardItem {
  position: string;
  amount: string;
  subtext: string;
}

const defaultRewards: RewardItem[] = [
  {position: '1st Winner', amount: '₹800', subtext: 'Cash Prize'},
  {position: '2nd Winner', amount: '₹400', subtext: 'Cash Prize'},
  {position: '3rd Winner', amount: '₹200', subtext: 'Cash Prize'},
  {position: '4th - 6th', amount: '🏅', subtext: 'Certificate'},
];

const RewardsSection: React.FC<{rewards?: RewardItem[]}> = ({
  rewards = defaultRewards,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Rewards</Text>

      <View style={styles.rewardsGrid}>
        {rewards.map(item => (
          <View key={item.position} style={styles.rewardCard}>
            <Text style={styles.rewardPosition}>{item.position}</Text>
            <Text style={styles.rewardAmount}>{item.amount}</Text>
            <Text style={styles.rewardSubtext}>{item.subtext}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RewardsSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#16232C',
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  rewardCard: {
    width: '48%',
    minHeight: 110,
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EEEE',
    justifyContent: 'center',
  },
  rewardPosition: {
    fontSize: 12,
    color: '#738088',
    marginBottom: 7,
  },
  rewardAmount: {
    fontSize: 23,
    fontWeight: '800',
    color: '#167C80',
  },
  rewardSubtext: {
    marginTop: 4,
    fontSize: 11,
    color: '#8A949A',
  },
});
