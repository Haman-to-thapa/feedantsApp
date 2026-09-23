import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

interface RewardRow {
  icon: string;
  position: string;
  amount: string;
}

interface RewardsSectionProps {
  rewards?: any;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({rewards}) => {
  const {t} = useLanguage();
  let list: RewardRow[] = [];

  const winnerLabel = t('winnerSuffix');
  const certificateLabel = t('certificate');

  if (rewards && typeof rewards === 'object') {
    if (Array.isArray(rewards) && rewards.length > 0) {
      list = rewards.map((r, i) => {
        let pos = r.position || `${i + 1}th ${winnerLabel}`;
        if (pos.includes('Winner')) {
          pos = pos.replace('Winner', winnerLabel);
        }
        let amt = typeof r.amount === 'number' ? `₹ ${r.amount}` : r.amount;
        if (amt === 'Certificate') {
          amt = certificateLabel;
        }
        return {
          icon: i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : '⭐',
          position: pos,
          amount: amt,
        };
      });
    } else if (rewards.first !== undefined) {
      list = [
        {icon: '🏆', position: `1st ${winnerLabel}`, amount: `₹ ${rewards.first}`},
        {icon: '🥈', position: `2nd ${winnerLabel}`, amount: `₹ ${rewards.second}`},
        {icon: '🥉', position: `3rd ${winnerLabel}`, amount: `₹ ${rewards.third}`},
        {
          icon: '⭐',
          position: '4th - 6th',
          amount: String(rewards.fourthToSixth || certificateLabel),
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
        <Text style={styles.title}>{t('rewardsTitle')}</Text>
        <Text style={styles.subTitle}>{t('allPositions')}</Text>
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
