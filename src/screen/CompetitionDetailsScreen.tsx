import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CompetitionDetailsScreen = () => {
  const navigation = useNavigation<any>();

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
});
