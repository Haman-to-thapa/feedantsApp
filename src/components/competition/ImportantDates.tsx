import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface DateItem {
  label: string;
  value: string;
  icon: string;
}

const defaultDates: DateItem[] = [
  {label: 'Register Before', value: '24 Sep 2026', icon: '📅'},
  {label: 'Submission Starts', value: '25 Sep 2026', icon: '📤'},
  {label: 'Submission Ends', value: '27 Sep 2026', icon: '⏳'},
  {label: 'Result Date', value: '30 Sep 2026', icon: '🏆'},
];

const ImportantDates: React.FC<{dates?: DateItem[]}> = ({dates = defaultDates}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Important Dates</Text>

      <View style={styles.datesCard}>
        {dates.map((item, index) => (
          <React.Fragment key={item.label}>
            <View style={styles.dateRow}>
              <View>
                <Text style={styles.dateLabel}>{item.label}</Text>
                <Text style={styles.dateValue}>{item.value}</Text>
              </View>
              <Text style={styles.dateIcon}>{item.icon}</Text>
            </View>
            {index < dates.length - 1 && <View style={styles.dateDivider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default ImportantDates;

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#16232C',
  },
  datesCard: {
    marginTop: 11,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EEEE',
    paddingHorizontal: 15,
  },
  dateRow: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateLabel: {
    fontSize: 12,
    color: '#7B878D',
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B2A33',
  },
  dateIcon: {
    fontSize: 20,
  },
  dateDivider: {
    height: 1,
    backgroundColor: '#EDF1F1',
  },
});
