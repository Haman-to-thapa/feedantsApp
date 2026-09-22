import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface RewardRow {
  icon: string;
  position: string;
  amount: string;
}

interface RewardsSectionProps {
  rewards?: any;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({rewards}) => {
  let list: RewardRow[] = [];

  if (rewards && typeof rewards === 'object') {
    if (Array.isArray(rewards) && rewards.length > 0) {
      list = rewards.map((r, i) => ({
        icon: i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : '⭐',
        position: r.position || `${i + 1}th Winner`,
        amount: typeof r.amount === 'number' ? `₹ ${r.amount}` : r.amount,
      }));
    } else if (rewards.first !== undefined) {
      list = [
        {icon: '🏆', position: '1st Winner', amount: `₹ ${rewards.first}`},
        {icon: '🥈', position: '2nd Winner', amount: `₹ ${rewards.second}`},
        {icon: '🥉', position: '3rd Winner', amount: `₹ ${rewards.third}`},
        {
          icon: '⭐',
          position: '4th - 6th',
          amount: String(rewards.fourthToSixth || 'Certificate'),
        },
      ];
    }
  }

  if (list.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Rewards</Text>
        <Text style={styles.subTitle}>(All Positions)</Text>
      </View>

      <View style={styles.card}>
        {list.map((item, idx) => (
          <View
            key={item.position + idx}
            style={[
              styles.row,
              idx < list.length - 1 && styles.rowBorder,
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

export default React.memo(RewardsSection);

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
