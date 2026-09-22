import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CompetitionHero: React.FC = () => {
  return (
    <>
      {/* Competition Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Feedants Classical Dance</Text>

        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Dance</Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>Multi-Win</Text>
          </View>
        </View>

        <Text style={styles.certificateText}>Winners get certificate</Text>
      </View>

      {/* Prize / Entry Fee */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Prize Pool</Text>
          <Text style={styles.infoValue}>₹1,500</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Entry Fee</Text>
          <Text style={styles.infoValue}>₹99</Text>
        </View>
      </View>

      {/* Spots */}
      <View style={styles.spotsCard}>
        <View>
          <Text style={styles.spotsTitle}>Only 19 spots left</Text>
          <Text style={styles.bookedText}>1 / 20 Booked</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>5%</Text>
        </View>
      </View>
    </>
  );
};

export default CompetitionHero;

const styles = StyleSheet.create({
  titleSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#16232C',
    lineHeight: 34,
  },
  tagsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: '#E8F5F4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#167C80',
  },
  certificateText: {
    marginTop: 13,
    fontSize: 13,
    color: '#59636B',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#F7FAFA',
    borderRadius: 16,
    padding: 17,
    borderWidth: 1,
    borderColor: '#E7EEEE',
  },
  infoLabel: {
    fontSize: 12,
    color: '#7A858A',
    marginBottom: 7,
  },
  infoValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#16232C',
  },
  spotsCard: {
    marginTop: 14,
    padding: 17,
    borderRadius: 16,
    backgroundColor: '#FFF8F2',
    borderWidth: 1,
    borderColor: '#F4E2D1',
  },
  spotsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#243038',
  },
  bookedText: {
    marginTop: 5,
    fontSize: 12,
    color: '#7B8589',
  },
  progressContainer: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  progressTrack: {
    flex: 1,
    height: 7,
    borderRadius: 10,
    backgroundColor: '#E9DCD0',
    overflow: 'hidden',
  },
  progressFill: {
    width: '5%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#167C80',
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#667177',
  },
});
