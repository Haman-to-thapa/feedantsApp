import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface RewardRow {
  icon: string;
  position: string;
  amount: string;
}

const rewardsList: RewardRow[] = [
  {icon: '🏆', position: '1st Winner', amount: '₹ 550'},
  {icon: '🥈', position: '2nd Winner', amount: '₹ 300'},
  {icon: '🥉', position: '3rd Winner', amount: '₹ 240'},
  {icon: '⭐', position: '4th Winner', amount: '₹ 200'},
  {icon: '⭐', position: '5th Winner', amount: '₹ 130'},
  {icon: '⭐', position: '6th Winner', amount: '₹ 80'},
];

const RewardsSection: React.FC = () => {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Rewards</Text>
        <Text style={styles.subTitle}>(All Positions)</Text>
      </View>

      <View style={styles.card}>
        {rewardsList.map((item, idx) => (
          <View
            key={item.position}
            style={[
              styles.row,
              idx < rewardsList.length - 1 && styles.rowBorder,
            ]}>
            <View style={styles.left}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.position}>{item.position}</Text>
            </View>

            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RewardsSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16232C',
  },
  subTitle: {
    fontSize: 12,
    color: '#7D8C94',
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAEFEF',
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F6F6',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 15,
    marginRight: 10,
  },
  position: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16232C',
  },
  amount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007B8A',
  },
});
