import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CompetitionDetailsScreen = () => {
  const navigation = useNavigation<any>();

  // Temporary demo deadline.
  // Later this will come from the backend.
  const registrationEnd = useRef(
    Date.now() +
      1 * 24 * 60 * 60 * 1000 +
      6 * 60 * 60 * 1000 +
      28 * 60 * 1000 +
      32 * 1000,
  ).current;

  const [timeLeft, setTimeLeft] = useState(registrationEnd - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(registrationEnd - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [registrationEnd]);

  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));

  const days = Math.floor(totalSeconds / (24 * 60 * 60));

  const hours = Math.floor(
    (totalSeconds % (24 * 60 * 60)) / (60 * 60),
  );

  const minutes = Math.floor(
    (totalSeconds % (60 * 60)) / 60,
  );

  const seconds = totalSeconds % 60;

  const formatTime = (value: number) =>
    String(value).padStart(2, '0');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" {...({backgroundColor: '#FFFFFF'} as any)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={styles.languageContainer}>
            <Text style={styles.activeLanguage}>ENG</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.inactiveLanguage}>हिंदी</Text>
          </View>
        </View>

        {/* Competition Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            Feedants Classical Dance
          </Text>

          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Dance</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>Multi-Win</Text>
            </View>
          </View>

          <Text style={styles.certificateText}>
            Winners get certificate
          </Text>
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
            <Text style={styles.spotsTitle}>
              Only 19 spots left
            </Text>

            <Text style={styles.bookedText}>
              1 / 20 Booked
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>

            <Text style={styles.progressText}>
              5%
            </Text>
          </View>
        </View>

        {/* Judge */}
        <View style={styles.judgeCard}>
          <View style={styles.judgeImageWrapper}>
            <View style={styles.judgeImagePlaceholder}>
              <Text style={styles.judgeInitials}>MD</Text>
            </View>
          </View>

          <View style={styles.judgeInfo}>
            <Text style={styles.judgeLabel}>Judge</Text>

            <Text style={styles.judgeName}>
              Manju Dubey
            </Text>

            <Text style={styles.judgeProfession}>
              Professional Kathak Dancer
            </Text>

            <Text style={styles.judgeExperience}>
              12+ Years of Experience
            </Text>
          </View>

          <TouchableOpacity
            style={styles.videoButton}
            activeOpacity={0.8}>
            <Text style={styles.playIcon}>▶</Text>

            <Text style={styles.videoText}>
              Intro Video
            </Text>
          </TouchableOpacity>
        </View>

        {/* Countdown */}
        <View style={styles.countdownCard}>
          <Text style={styles.countdownIcon}>⌛</Text>

          <Text style={styles.countdownLabel}>
            Registration closes in
          </Text>

          <Text style={styles.countdownValue}>
            {formatTime(days)}d : {formatTime(hours)}h :{' '}
            {formatTime(minutes)}m : {formatTime(seconds)}s
          </Text>

          <Text style={styles.hurryText}>
            ⏱ Hurry up!
          </Text>
        </View>

        {/* Important Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Dates</Text>

          <View style={styles.datesCard}>
            <View style={styles.dateRow}>
              <View>
                <Text style={styles.dateLabel}>Register Before</Text>
                <Text style={styles.dateValue}>24 Sep 2026</Text>
              </View>
              <Text style={styles.dateIcon}>📅</Text>
            </View>

            <View style={styles.dateDivider} />

            <View style={styles.dateRow}>
              <View>
                <Text style={styles.dateLabel}>Submission Starts</Text>
                <Text style={styles.dateValue}>25 Sep 2026</Text>
              </View>
              <Text style={styles.dateIcon}>📤</Text>
            </View>

            <View style={styles.dateDivider} />

            <View style={styles.dateRow}>
              <View>
                <Text style={styles.dateLabel}>Submission Ends</Text>
                <Text style={styles.dateValue}>27 Sep 2026</Text>
              </View>
              <Text style={styles.dateIcon}>⏳</Text>
            </View>

            <View style={styles.dateDivider} />

            <View style={styles.dateRow}>
              <View>
                <Text style={styles.dateLabel}>Result Date</Text>
                <Text style={styles.dateValue}>30 Sep 2026</Text>
              </View>
              <Text style={styles.dateIcon}>🏆</Text>
            </View>
          </View>
        </View>

        {/* Previous Winners */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Previous Winners</Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.winnersContainer}>

            <View style={styles.winnerCard}>
              <View style={styles.winnerImage}>
                <Text style={styles.winnerInitial}>AS</Text>
              </View>

              <Text style={styles.winnerName}>Aarushi Sharma</Text>
              <Text style={styles.winnerPosition}>1st Winner</Text>
            </View>

            <View style={styles.winnerCard}>
              <View style={styles.winnerImage}>
                <Text style={styles.winnerInitial}>RK</Text>
              </View>

              <Text style={styles.winnerName}>Riya Kapoor</Text>
              <Text style={styles.winnerPosition}>2nd Winner</Text>
            </View>

            <View style={styles.winnerCard}>
              <View style={styles.winnerImage}>
                <Text style={styles.winnerInitial}>PN</Text>
              </View>

              <Text style={styles.winnerName}>Priya Nair</Text>
              <Text style={styles.winnerPosition}>3rd Winner</Text>
            </View>

            <View style={styles.winnerCard}>
              <View style={styles.winnerImage}>
                <Text style={styles.winnerInitial}>MS</Text>
              </View>

              <Text style={styles.winnerName}>Meera Singh</Text>
              <Text style={styles.winnerPosition}>4th Winner</Text>
            </View>

          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CompetitionDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },

  // Header
  header: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 38,
    lineHeight: 38,
    color: '#1E293B',
  },

  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#F4F7F7',
  },

  activeLanguage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#167C80',
  },

  separator: {
    marginHorizontal: 6,
    color: '#A0A0A0',
  },

  inactiveLanguage: {
    fontSize: 12,
    fontWeight: '500',
    color: '#777777',
  },

  // Title
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

  // Prize cards
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

  // Spots
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

  // Judge Card
  judgeCard: {
    marginTop: 14,
    minHeight: 116,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9EEEE',
    flexDirection: 'row',
    alignItems: 'center',
  },

  judgeImageWrapper: {
    marginRight: 12,
  },

  judgeImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E7F4F3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  judgeInitials: {
    fontSize: 20,
    fontWeight: '800',
    color: '#167C80',
  },

  judgeInfo: {
    flex: 1,
  },

  judgeLabel: {
    fontSize: 12,
    color: '#7E8A91',
    marginBottom: 2,
  },

  judgeName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#162A45',
  },

  judgeProfession: {
    marginTop: 5,
    fontSize: 12,
    color: '#68788C',
  },

  judgeExperience: {
    marginTop: 4,
    fontSize: 12,
    color: '#68788C',
  },

  videoButton: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E8F7F8',
    color: '#13838A',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    paddingLeft: 3,
  },

  videoText: {
    marginTop: 7,
    fontSize: 11,
    fontWeight: '600',
    color: '#607286',
  },

  // Countdown Card
  countdownCard: {
    marginTop: 12,
    minHeight: 52,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#EAF7F7',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 4,
  },

  countdownIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  countdownLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#162A45',
    marginRight: 10,
  },

  countdownValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#087C84',
    minWidth: 150,
  },

  hurryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#167C80',
  },

  // Sections
  section: {
    marginTop: 22,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#16232C',
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: '#167C80',
  },

  datesCard: {
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

  winnersContainer: {
    paddingRight: 10,
  },

  winnerCard: {
    width: 145,
    marginRight: 12,
    padding: 11,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EEEE',
  },

  winnerImage: {
    width: 123,
    height: 115,
    borderRadius: 13,
    backgroundColor: '#E7F4F3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  winnerInitial: {
    fontSize: 28,
    fontWeight: '800',
    color: '#167C80',
  },

  winnerName: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#1B2A33',
  },

  winnerPosition: {
    marginTop: 4,
    fontSize: 11,
    color: '#75828A',
  },
});
