import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ImportantDates: React.FC = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Important Dates</Text>

      <View style={styles.gridCard}>
        {/* Top Row */}
        <View style={styles.row}>
          {/* Register Before */}
          <View style={styles.cell}>
            <Text style={styles.icon}>📅</Text>
            <View style={styles.cellContent}>
              <Text style={styles.label}>Register Before</Text>
              <Text style={styles.date}>10 Aug 26</Text>
              <Text style={styles.time}>11:50 PM</Text>
            </View>
          </View>

          <View style={styles.verticalDivider} />

          {/* Submission Starts */}
          <View style={styles.cell}>
            <Text style={styles.icon}>✈</Text>
            <View style={styles.cellContent}>
              <Text style={styles.label}>Submission Starts</Text>
              <Text style={styles.date}>6 Aug 26</Text>
              <Text style={styles.time}>04:00 AM</Text>
            </View>
          </View>
        </View>

        <View style={styles.horizontalDivider} />

        {/* Bottom Row */}
        <View style={styles.row}>
          {/* Submission Ends */}
          <View style={styles.cell}>
            <Text style={styles.icon}>📤</Text>
            <View style={styles.cellContent}>
              <Text style={styles.label}>Submission Ends</Text>
              <Text style={styles.date}>30 Aug 26</Text>
              <Text style={styles.time}>11:55 PM</Text>
            </View>
          </View>

          <View style={styles.verticalDivider} />

          {/* Result Date */}
          <View style={styles.cell}>
            <Text style={styles.icon}>🏆</Text>
            <View style={styles.cellContent}>
              <Text style={styles.label}>Result Date</Text>
              <Text style={styles.date}>1 Sept 26</Text>
              <Text style={styles.time}>11:50 PM</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ImportantDates);

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16232C',
    marginBottom: 8,
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEFEF',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 2,
  },
  cellContent: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#7D8C94',
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007B8A',
  },
  time: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16232C',
    marginTop: 1,
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#EEF3F3',
    marginHorizontal: 10,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#EEF3F3',
    marginHorizontal: 12,
  },
});
