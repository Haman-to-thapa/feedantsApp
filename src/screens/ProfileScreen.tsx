import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCompetition} from '../context/CompetitionContext';
import {useLanguage} from '../context/LanguageContext';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {
    userEmail,
    isRegistered,
    submissionUploaded,
    competitionState,
    logout,
    resetSubmissionStatus,
    switchCompetitionState,
  } = useCompetition();
  const {t, language, toggleLanguage} = useLanguage();
  const [switching, setSwitching] = useState<boolean>(false);

  const handleLogout = () => {
    Alert.alert(
      t('logoutConfirmTitle'),
      t('logoutConfirmMsg'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('logoutBtn'),
          style: 'destructive',
          onPress: async () => {
            setSwitching(true);
            // Only clear local session — backend registeredCount must NOT change on logout
            await logout();
            setSwitching(false);
            Alert.alert('Feedants', t('loggedOutSuccess'), [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Competitions');
                },
              },
            ]);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleSwitchState = async (
    target: 'REGISTRATION_OPEN' | 'SUBMISSION_OPEN' | 'REGISTRATION_FULL',
  ) => {
    // If already in target state (except REGISTRATION_OPEN which can re-sync true participant count)
    if (competitionState === target && target !== 'REGISTRATION_OPEN') {
      Alert.alert(
        'Feedants',
        language === 'en'
          ? `Competition is already in ${target} state.`
          : 'प्रतियोगिता पहले से इस स्थिति में है।',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Competitions');
            },
          },
        ],
      );
      return;
    }

    try {
      setSwitching(true);
      await switchCompetitionState(target);
      Alert.alert(
        'Feedants',
        t('stateUpdated', {state: target}),
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Competitions');
            },
          },
        ],
      );
    } catch {
      Alert.alert('Error', 'Failed to update competition state');
    } finally {
      setSwitching(false);
    }
  };

  const getInitials = (email: string) => {
    if (!email) return 'GU';
    const parts = email.split('@')[0];
    return parts.substring(0, 2).toUpperCase();
  };

  // ── If no user is logged in, show clean guest state ──────────────────────
  if (!userEmail) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('profileTitle')}</Text>
          <TouchableOpacity
            style={styles.langPill}
            activeOpacity={0.8}
            onPress={toggleLanguage}
            accessibilityLabel="Switch Language">
            <Text style={styles.langText}>
              {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 ENG'}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.guestContainer}>
            <View style={styles.guestIconCircle}>
              <Text style={styles.guestIcon}>👤</Text>
            </View>
            <Text style={styles.guestTitle}>
              {language === 'en' ? 'No User Logged In' : 'कोई उपयोगकर्ता लॉग इन नहीं है'}
            </Text>
            <Text style={styles.guestSubtitle}>
              {language === 'en'
                ? 'Register in a competition to get started.'
                : 'शुरू करने के लिए किसी प्रतियोगिता में रजिस्टर करें।'}
            </Text>
            <TouchableOpacity
              style={styles.goCompBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Competitions')}>
              <Text style={styles.goCompBtnText}>
                🏆 {language === 'en' ? 'Go to Competitions' : 'प्रतियोगिताओं पर जाएं'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* State Simulator — visible even when logged out so registration can be reopened */}
          <View style={[styles.card, styles.simulatorCard]}>
            <Text style={styles.simulatorTitle}>
              🧪 {t('stateSimulatorTitle')}
            </Text>
            <Text style={styles.simulatorDesc}>
              {language === 'en'
                ? 'Registration window closed? Reopen it here to test with a new user.'
                : 'रजिस्ट्रेशन विंडो बंद है? नए यूज़र के लिए यहाँ से खोलें।'}
            </Text>

            {switching && (
              <ActivityIndicator color="#6C5CE7" size="small" style={{marginBottom: 10}} />
            )}

            <TouchableOpacity
              style={styles.simButton}
              activeOpacity={0.8}
              disabled={switching}
              onPress={() => handleSwitchState('REGISTRATION_OPEN')}>
              <Text style={styles.simButtonText}>{t('stateRegOpen')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.simButton}
              activeOpacity={0.8}
              disabled={switching}
              onPress={() => handleSwitchState('SUBMISSION_OPEN')}>
              <Text style={styles.simButtonText}>{t('stateSubOpen')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.simButton}
              activeOpacity={0.8}
              disabled={switching}
              onPress={() => handleSwitchState('REGISTRATION_FULL')}>
              <Text style={styles.simButtonText}>{t('stateRegFull')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profileTitle')}</Text>
        <TouchableOpacity
          style={styles.langPill}
          activeOpacity={0.8}
          onPress={toggleLanguage}
          accessibilityLabel="Switch Language">
          <Text style={styles.langText}>
            {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 ENG'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.card}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(userEmail)}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userLabel}>{t('currentUser')}</Text>
              <Text style={styles.userEmail} numberOfLines={1}>
                {userEmail || t('guestUser')}
              </Text>
            </View>
          </View>
        </View>

        {/* Competition Activity Card */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>{t('competitionTitle')}</Text>
            <View style={styles.stateIndicatorPill}>
              <Text style={styles.stateIndicatorText}>
                {competitionState}
              </Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabelText}>{t('statusLabel')}:</Text>
            {submissionUploaded ? (
              <View style={[styles.badge, styles.badgeSuccess]}>
                <Text style={styles.badgeSuccessText}>
                  ✓ {t('submissionStatusUploaded')}
                </Text>
              </View>
            ) : isRegistered ? (
              <View style={[styles.badge, styles.badgeActive]}>
                <Text style={styles.badgeActiveText}>
                  ✓ {t('profileRegisteredStatus')}
                </Text>
              </View>
            ) : (
              <View style={[styles.badge, styles.badgeInactive]}>
                <Text style={styles.badgeInactiveText}>
                  ○ {t('noActiveRegistration')}
                </Text>
              </View>
            )}
          </View>

          {submissionUploaded && (
            <TouchableOpacity
              style={styles.retestBtn}
              activeOpacity={0.8}
              onPress={() => {
                resetSubmissionStatus();
                navigation.navigate('Competitions');
              }}>
              <Text style={styles.retestBtnText}>
                🎥 {language === 'en' ? 'Open Video Upload Modal' : 'वीडियो अपलोड मॉडल खोलें'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Switch / Reset User Testing Card */}
        <View style={[styles.card, styles.testingCard]}>
          <Text style={styles.testingCardTitle}>
            🔄 {t('switchUser')}
          </Text>
          <Text style={styles.testingCardDesc}>
            {t('testingSwitchTip')}
          </Text>

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.85}
            disabled={switching}
            onPress={handleLogout}>
            {switching ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.logoutButtonText}>🚪 {t('logoutBtn')}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Live State Simulator Card */}
        <View style={[styles.card, styles.simulatorCard]}>
          <Text style={styles.simulatorTitle}>
            🧪 {t('stateSimulatorTitle')}
          </Text>
          <Text style={styles.simulatorDesc}>
            {t('stateSimulatorDesc')}
          </Text>

          <TouchableOpacity
            style={[
              styles.simButton,
              competitionState === 'REGISTRATION_OPEN' && styles.simButtonActive,
            ]}
            activeOpacity={0.8}
            disabled={switching}
            onPress={() => handleSwitchState('REGISTRATION_OPEN')}>
            <Text
              style={[
                styles.simButtonText,
                competitionState === 'REGISTRATION_OPEN' && styles.simButtonTextActive,
              ]}>
              {t('stateRegOpen')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.simButton,
              competitionState === 'SUBMISSION_OPEN' && styles.simButtonActive,
            ]}
            activeOpacity={0.8}
            disabled={switching}
            onPress={() => handleSwitchState('SUBMISSION_OPEN')}>
            <Text
              style={[
                styles.simButtonText,
                competitionState === 'SUBMISSION_OPEN' && styles.simButtonTextActive,
              ]}>
              {t('stateSubOpen')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.simButton,
              competitionState === 'REGISTRATION_FULL' && styles.simButtonActive,
            ]}
            activeOpacity={0.8}
            disabled={switching}
            onPress={() => handleSwitchState('REGISTRATION_FULL')}>
            <Text
              style={[
                styles.simButtonText,
                competitionState === 'REGISTRATION_FULL' && styles.simButtonTextActive,
              ]}>
              {t('stateRegFull')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Navigate Back to Competitions */}
        <TouchableOpacity
          style={styles.competitionNavBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Competitions')}>
          <Text style={styles.competitionNavText}>
            🏆 {t('tabCompetitions')} →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEFEF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#181928',
  },
  langPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    borderWidth: 1,
    borderColor: '#DFE3E8',
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#181928',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8ECEF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  userInfo: {
    flex: 1,
  },
  userLabel: {
    fontSize: 12,
    color: '#8A94A6',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181928',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181928',
    flex: 1,
  },
  stateIndicatorPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  stateIndicatorText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  statusLabelText: {
    fontSize: 14,
    color: '#555E6D',
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeSuccess: {
    backgroundColor: '#E8F8F0',
    borderWidth: 1,
    borderColor: '#2ECC71',
  },
  badgeSuccessText: {
    color: '#27AE60',
    fontSize: 12,
    fontWeight: '700',
  },
  badgeActive: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#6C5CE7',
  },
  badgeActiveText: {
    color: '#6C5CE7',
    fontSize: 12,
    fontWeight: '700',
  },
  badgeInactive: {
    backgroundColor: '#F1F3F5',
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  badgeInactiveText: {
    color: '#868E96',
    fontSize: 12,
    fontWeight: '600',
  },
  testingCard: {
    backgroundColor: '#FFF9F6',
    borderColor: '#FFE0D1',
  },
  testingCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D35400',
    marginBottom: 6,
  },
  testingCardDesc: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E74C3C',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  simulatorCard: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  simulatorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  simulatorDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  simButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 14,
    marginBottom: 8,
    alignItems: 'center',
  },
  simButtonActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
    borderWidth: 1.5,
  },
  simButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  simButtonTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  competitionNavBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DFE3E8',
  },
  competitionNavText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  retestBtn: {
    marginTop: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retestBtnText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '700',
  },
  // Guest / logged-out styles
  guestContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  guestIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  guestIcon: {
    fontSize: 42,
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1D23',
    textAlign: 'center',
    marginBottom: 10,
  },
  guestSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  goCompBtn: {
    backgroundColor: '#6C5CE7',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  goCompBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
