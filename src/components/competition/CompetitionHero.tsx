import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CompetitionHeroProps {
  title?: string;
  category?: string;
  tags?: string[];
  prizePool?: number;
  entryFee?: number;
  maxParticipants?: number;
  registeredCount?: number;
  isRegistered?: boolean;
}

const CompetitionHero: React.FC<CompetitionHeroProps> = ({
  title = 'Feedants Classical Dance',
  category = 'Dance',
  tags = ['Dance', 'Multi-Win'],
  prizePool = 1500,
  entryFee = 99,
  maxParticipants = 20,
  registeredCount = 1,
  isRegistered = true,
}) => {
  const spotsLeft = Math.max(maxParticipants - registeredCount, 0);
  const progressPercent = Math.min(
    Math.round((registeredCount / maxParticipants) * 100),
    100,
  );

  return (
    <View style={styles.card}>
      {/* Title and Registered Badge */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>

        {isRegistered && (
          <View style={styles.registeredBadge}>
            <Text style={styles.checkIcon}>✔</Text>
            <Text style={styles.registeredText}>Registered</Text>
          </View>
        )}
      </View>

      {/* Tags and Certificate */}
      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{category || tags[0] || 'Dance'}</Text>
        </View>

        {tags.length > 1 && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tags[1]}</Text>
          </View>
        )}

        <View style={styles.certificateWrapper}>
          <Text style={styles.trophyIcon}>🏆</Text>
          <Text style={styles.certificateText}>Winners get certificate</Text>
        </View>
      </View>

      {/* 3-Column Stats: Prize Pool | Entry Fee | Spots */}
      <View style={styles.statsRow}>
        {/* Prize Pool */}
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>Prize Pool</Text>
          <Text style={styles.prizeValue}>
            ₹ {prizePool?.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Entry Fee */}
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>Entry Fee</Text>
          <Text style={styles.feeValue}>₹ {entryFee}</Text>
        </View>

        {/* Spots */}
        <View style={styles.spotsCol}>
          <View style={styles.spotsHeader}>
            <Text style={styles.spotsUserIcon}>👥</Text>
            <Text style={styles.spotsTitle}>Only {spotsLeft} spots left</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, {width: `${progressPercent}%`}]} />
          </View>

          <Text style={styles.bookedText}>
            {registeredCount} / {maxParticipants} Booked
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(CompetitionHero);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEFEF',
    padding: 16,
    marginTop: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#14232C',
    marginRight: 8,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5F6F3',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
  },
  checkIcon: {
    fontSize: 11,
    color: '#007B8A',
    fontWeight: '800',
    marginRight: 4,
  },
  registeredText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007B8A',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 7,
  },
  tag: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EDED',
    backgroundColor: '#FAFDFD',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#34454E',
  },
  certificateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
  trophyIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  certificateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007B8A',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingTop: 12,
  },
  statCol: {
    marginRight: 14,
  },
  statLabel: {
    fontSize: 11,
    color: '#7D8C94',
    marginBottom: 4,
  },
  prizeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#007B8A',
  },
  feeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#14232C',
  },
  spotsCol: {
    flex: 1,
    alignItems: 'flex-end',
  },
  spotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  spotsUserIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  spotsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007B8A',
  },
  progressTrack: {
    width: 120,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#E5EFEF',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007B8A',
  },
  bookedText: {
    marginTop: 5,
    fontSize: 10,
    color: '#7D8C94',
  },
});
