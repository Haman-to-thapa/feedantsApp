import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import CompetitionHeader from '../components/competition/CompetitionHeader';
import CompetitionHero from '../components/competition/CompetitionHero';
import JudgeCard from '../components/competition/JudgeCard';
import CountdownTimer from '../components/competition/CountdownTimer';
import ImportantDates from '../components/competition/ImportantDates';
import PreviousWinners from '../components/competition/PreviousWinners';
import CompetitionInfoTabs from '../components/competition/CompetitionInfoTabs';
import RewardsSection from '../components/competition/RewardsSection';
import CompetitionPolicies from '../components/competition/CompetitionPolicies';
import ReferAndEarnCard from '../components/competition/ReferAndEarnCard';
import UserReviews from '../components/competition/UserReviews';
import AdvertisementCard from '../components/competition/AdvertisementCard';
import UploadSubmissionButton from '../components/competition/UploadSubmissionButton';
import VideoModal from '../components/competition/VideoModal';
import VideoUploadModal from '../components/competition/VideoUploadModal';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCompetition} from '../context/CompetitionContext';
import {useLanguage} from '../context/LanguageContext';

const CompetitionDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {t} = useLanguage();

  const competitionId = route.params?.competitionId || 'classical-dance-001';

  // High-performance state from Context API
  const {
    competition,
    lifecycle,
    competitionState,
    isRegistered,
    submissionUploaded,
    loading,
    error,
    loadCompetition,
    register,
    uploadVideo,
    switchCompetitionState,
    retry,
  } = useCompetition();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCompetition(competitionId);
    setRefreshing(false);
  }, [loadCompetition, competitionId]);

  // Local Modal Form States
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [registering, setRegistering] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>('');

  // Upload progress state
  const [uploadingSubmission, setUploadingSubmission] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');

  // Video Preview Modal State
  const [videoModalVisible, setVideoModalVisible] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState({
    title: '',
    subtitle: '',
    videoUrl: '',
    thumbnailUrl: '',
  });

  const handleOpenVideo = (
    title: string,
    subtitle?: string,
    videoUrl?: string,
    thumbnailUrl?: string,
  ) => {
    setActiveVideo({
      title,
      subtitle: subtitle || '',
      videoUrl: videoUrl || 'https://www.youtube.com',
      thumbnailUrl: thumbnailUrl || '',
    });
    setVideoModalVisible(true);
  };

  // Fetch / refresh on mount
  useEffect(() => {
    loadCompetition(competitionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competitionId]);

  // Handle User Registration
  const handleRegister = async () => {
    if (!name.trim() || !email.trim()) {
      setRegisterError(t('nameAndEmailRequired'));
      return;
    }

    try {
      setRegistering(true);
      setRegisterError('');

      const result = await register(name.trim(), email.trim());

      if (result.success) {
        setShowRegisterModal(false);
        // Automatically sync state with backend (no manual refresh needed)
        await loadCompetition(competitionId);

        // If submission window is open, seamlessly trigger upload flow
        if (competitionState === 'SUBMISSION_OPEN') {
          setTimeout(() => {
            setShowUploadModal(true);
          }, 350);
        }
      } else {
        setRegisterError(result.message || 'Registration failed');
      }
    } catch (err: any) {
      setRegisterError(err.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };


  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs');
    }
  }, [navigation]);

  const handleButtonPress = useCallback(() => {
    if (!isRegistered) {
      if (
        competitionState === 'REGISTRATION_OPEN' ||
        competitionState === 'SUBMISSION_OPEN'
      ) {
        setRegisterError('');
        setShowRegisterModal(true);
      }
      return;
    }

    if (!submissionUploaded) {
      if (competitionState === 'SUBMISSION_OPEN') {
        setShowUploadModal(true);
      } else {
        Alert.alert(
          t('openSubmissionNowTitle'),
          t('openSubmissionNowMsg'),
          [
            {text: t('cancel'), style: 'cancel'},
            {
              text: t('testUploadBtn'),
              onPress: async () => {
                await switchCompetitionState('SUBMISSION_OPEN');
                setShowUploadModal(true);
              },
            },
          ],
        );
      }
    }
  }, [
    isRegistered,
    submissionUploaded,
    competitionState,
    switchCompetitionState,
    t,
  ]);

  const insets = useSafeAreaInsets();
  const dynamicTopInset =
    Platform.OS === 'android'
      ? Math.max(insets.top, StatusBar.currentHeight || 0, 10)
      : insets.top;

  // Loading state (only shown if no cached data is available yet)
  if (loading && !competition) {
    return (
      <View style={[styles.safeArea, {paddingTop: dynamicTopInset}]}>
        <StatusBar
          barStyle="dark-content"
          {...({translucent: true, backgroundColor: 'transparent'} as any)}
        />
        <View style={styles.loadingContainer}>
          <View style={styles.loadingCircle}>
            <Text style={styles.loadingIcon}>F</Text>
          </View>
          <Text style={styles.loadingTitle}>{t('loadingCompetition')}</Text>
          <Text style={styles.loadingText}>{t('pleaseWait')}</Text>
        </View>
      </View>
    );
  }

  // Error screen + Retry
  if (error && !competition) {
    return (
      <View style={[styles.safeArea, {paddingTop: dynamicTopInset}]}>
        <StatusBar
          barStyle="dark-content"
          {...({translucent: true, backgroundColor: 'transparent'} as any)}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>!</Text>
          <Text style={styles.errorTitle}>{t('unableToLoad')}</Text>
          <Text style={styles.errorDescription}>
            {error || t('checkConnection')}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            activeOpacity={0.85}
            onPress={retry}>
            <Text style={styles.retryButtonText}>{t('tryAgain')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Dynamic timer configuration matching competition lifecycle
  const getTimerConfig = () => {
    if (!competition) {
      return {
        targetDate: undefined,
        label: t('registrationClosesIn'),
        closedLabel: t('registrationEnded'),
        hurryText: t('hurryUp'),
        icon: '⌛',
      };
    }

    const now = new Date();
    const regStart = new Date(competition.registrationStart);
    const regEnd = new Date(competition.registrationEnd);
    const subStart = new Date(competition.submissionStart);
    const subEnd = new Date(competition.submissionEnd);
    const resDate = new Date(competition.resultDate);

    // If registration hasn't started yet
    if (now < regStart) {
      return {
        targetDate: competition.registrationStart,
        label: t('registrationStartsIn'),
        closedLabel: t('registrationEnded'),
        hurryText: '📅 Upcoming',
        icon: '📅',
      };
    }

    // Active Registration window
    if (now <= regEnd) {
      return {
        targetDate: competition.registrationEnd,
        label: t('registrationClosesIn'),
        closedLabel: t('registrationEnded'),
        hurryText: t('hurryUp'),
        icon: '⌛',
      };
    }

    // Gap between registration end and submission start
    if (now < subStart) {
      return {
        targetDate: competition.submissionStart,
        label: t('submissionStartsIn'),
        closedLabel: t('submissionStarts') || 'Submission starting...',
        hurryText: '🎬 Get Ready!',
        icon: '⏳',
      };
    }

    // Active Video Submission / Uploading window!
    if (now <= subEnd) {
      return {
        targetDate: competition.submissionEnd,
        label: t('submissionClosesIn'),
        closedLabel: t('submissionEnded'),
        hurryText: '🎥 Upload Now!',
        icon: '🎥',
      };
    }

    // Submission closed, awaiting results
    if (now < resDate) {
      return {
        targetDate: competition.resultDate,
        label: t('resultAnnounceIn'),
        closedLabel: t('competitionCompleted'),
        hurryText: '🏆 Stay Tuned!',
        icon: '🏆',
      };
    }

    // All ended / results published
    return {
      targetDate: undefined,
      label: t('competitionCompleted'),
      closedLabel: t('competitionCompleted'),
      hurryText: '🎉 Finished',
      icon: '🎉',
    };
  };

  const timerConfig = getTimerConfig();

  return (
    <View style={[styles.safeArea, {paddingTop: dynamicTopInset}]}>
      <StatusBar
        barStyle="dark-content"
        {...({translucent: true, backgroundColor: 'transparent'} as any)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
        overScrollMode="never"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007B8A']}
          />
        }>
        {/* ← Go back | ENG हिंदी */}
        <CompetitionHeader onBack={handleBack} />

        {/* Dynamic Title, Registered badge, tags, Prize/Fee/Spots from MongoDB */}
        <CompetitionHero
          title={competition?.title}
          category={competition?.category}
          tags={competition?.tags}
          prizePool={competition?.prizePool}
          entryFee={competition?.entryFee}
          maxParticipants={competition?.maxParticipants}
          registeredCount={competition?.registeredCount}
          remainingSpots={lifecycle?.remainingSpots}
          isRegistered={isRegistered}
        />

        {/* Judge Card with dynamic photo & intro video */}
        {competition?.judge && (
          <JudgeCard
            name={competition.judge.name}
            profession={competition.judge.profession}
            experience={competition.judge.experience}
            imageUrl={competition.judge.image || competition.judge.imageUrl}
            onPressVideo={() =>
              handleOpenVideo(
                `Judge Intro Video: ${competition.judge.name}`,
                competition.judge.profession,
                competition.judge.introVideo || 'https://www.youtube.com',
                competition.judge.image || competition.judge.imageUrl,
              )
            }
          />
        )}

        {/* Live Countdown Timer driven by MongoDB dates across all lifecycle phases */}
        <CountdownTimer
          targetDate={timerConfig.targetDate}
          label={timerConfig.label}
          closedLabel={timerConfig.closedLabel}
          hurryText={timerConfig.hurryText}
          icon={timerConfig.icon}
        />

        {/* 2x2 Important Dates Grid from MongoDB */}
        <ImportantDates
          registrationEnd={competition?.registrationEnd}
          submissionStart={competition?.submissionStart}
          submissionEnd={competition?.submissionEnd}
          resultDate={competition?.resultDate}
        />

        {/* Previous Winners with video thumbnails */}
        <PreviousWinners
          onPressWinnerVideo={w =>
            handleOpenVideo(
              `${w.name} - Performance`,
              `${w.position} • Feedants Classical Dance`,
              'https://www.youtube.com',
              w.imageUrl,
            )
          }
        />

        {/* Underline Tabs: About / Judging / Rules */}
        <CompetitionInfoTabs
          about={competition?.about}
          judgingParameters={competition?.judgingParameters}
          rules={competition?.rules}
        />

        {/* Rewards List (1st - 6th Winner) from MongoDB */}
        <RewardsSection rewards={competition?.rewards} />

        {/* Disclaimer Banner + Side-by-side Prize Video & Razorpay */}
        <CompetitionPolicies
          onPressPrizeVideo={() =>
            handleOpenVideo(
              'How Will You Receive Prize Money?',
              'Instant transfer via Razorpay / UPI to verified bank account',
              'https://www.youtube.com',
            )
          }
        />

        {/* Refer & Earn More Discount with link copy */}
        <ReferAndEarnCard />

        {/* Hear From Our Users bar */}
        <UserReviews />

        {/* Ad Here Box */}
        <AdvertisementCard />

        {/* Registration confirmation banner */}
        {isRegistered && !submissionUploaded && (
          <View style={styles.registeredBanner}>
            <Text style={styles.registeredCheck}>✓</Text>
            <View style={styles.registeredContent}>
              <Text style={styles.registeredTitle}>{t('youAreRegistered')}</Text>
              <Text style={styles.registeredText}>
                {t('participationSaved')}
              </Text>
            </View>
          </View>
        )}

        {/* Submission success banner */}
        {submissionUploaded && (
          <View style={styles.submissionSuccess}>
            <Text style={styles.successIcon}>✓</Text>
            <View style={styles.registeredContent}>
              <Text style={styles.successTitle}>{t('submissionUploadedTitle')}</Text>
              <Text style={styles.successText}>
                {t('videoSubmittedSuccess')}
              </Text>
            </View>
          </View>
        )}

        {/* Competition Ended Banner — shown when submission window closes */}
        {(competitionState === 'SUBMISSION_CLOSED' ||
          competitionState === 'RESULT_PUBLISHED') && (
          <View style={styles.endedBanner}>
            <Text style={styles.endedIcon}>
              {competitionState === 'RESULT_PUBLISHED' ? '🏆' : '🔒'}
            </Text>
            <View style={styles.registeredContent}>
              <Text style={styles.endedTitle}>
                {competitionState === 'RESULT_PUBLISHED'
                  ? 'Results Published!'
                  : 'Competition Ended'}
              </Text>
              <Text style={styles.endedText}>
                {competitionState === 'RESULT_PUBLISHED'
                  ? 'Thank you for participating. Check the results section.'
                  : 'The submission window is now closed. Results will be announced soon.'}
              </Text>
            </View>
          </View>
        )}

        {/* Dynamic Action Button matching lifecycle state */}
        <UploadSubmissionButton
          isRegistered={isRegistered}
          submissionUploaded={submissionUploaded}
          uploadingSubmission={uploadingSubmission}
          competitionState={competitionState}
          entryFee={competition?.entryFee || 99}
          submissionStart={competition?.submissionStart}
          uploadError={uploadError}
          onPress={handleButtonPress}
        />
      </ScrollView>

      {/* Registration Modal */}
      {/* Registration Modal - Centered Dialog with Keyboard Handling */}
      <Modal
        visible={showRegisterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRegisterModal(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('modalTitle')}</Text>
              <TouchableOpacity
                onPress={() => setShowRegisterModal(false)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              {t('modalSubtitle')}
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={t('fullNamePlaceholder')}
              placeholderTextColor="#9AA4A8"
              style={styles.input}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={t('emailPlaceholder')}
              placeholderTextColor="#9AA4A8"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            {registerError ? (
              <Text style={styles.errorText}>{registerError}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleRegister}
              disabled={registering}
              activeOpacity={0.85}>
              <Text style={styles.confirmButtonText}>
                {registering
                  ? t('registering')
                  : t('registerBtn', {fee: competition?.entryFee || 99})}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* In-App Video Preview & Playback Modal */}
      <VideoModal
        visible={videoModalVisible}
        title={activeVideo.title}
        subtitle={activeVideo.subtitle}
        videoUrl={activeVideo.videoUrl}
        thumbnailUrl={activeVideo.thumbnailUrl}
        onClose={() => setVideoModalVisible(false)}
      />

      {/* Interactive Video Submission Upload Modal */}
      <VideoUploadModal
        visible={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={async file => {
          setUploadingSubmission(true);
          try {
            const res = await uploadVideo(file);
            if (res.success) {
              await loadCompetition(competitionId);
              return true;
            }
            setUploadError(res.message || 'Upload failed');
            return false;
          } catch (err: any) {
            setUploadError(err?.message || 'Upload failed');
            return false;
          } finally {
            setUploadingSubmission(false);
          }
        }}
      />
    </View>
  );
};

export default React.memo(CompetitionDetailsScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFA',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 25,
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFA',
  },
  loadingCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E7F5F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    fontSize: 25,
    fontWeight: '900',
    color: '#167C80',
  },
  loadingTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '800',
    color: '#182A34',
  },
  loadingText: {
    marginTop: 5,
    fontSize: 12,
    color: '#7A858A',
  },

  // Error Styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#F8FAFA',
  },
  errorIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FDECEC',
    color: '#C0392B',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 27,
    fontWeight: '800',
    lineHeight: 52,
  },
  errorTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '800',
    color: '#182A34',
  },
  errorDescription: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#7A858A',
  },
  retryButton: {
    marginTop: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#167C80',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  // Banners
  registeredBanner: {
    marginTop: 18,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#EDF8F3',
    borderWidth: 1,
    borderColor: '#D3EDE0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  registeredCheck: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#D8F0E4',
    color: '#168557',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 34,
    marginRight: 10,
  },
  registeredContent: {
    flex: 1,
  },
  registeredTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#24533F',
  },
  registeredText: {
    marginTop: 3,
    fontSize: 11,
    color: '#70847A',
  },
  submissionSuccess: {
    marginTop: 12,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#EEF8FA',
    borderWidth: 1,
    borderColor: '#D5ECEF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  successIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#DDF1F3',
    color: '#167C80',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 34,
    marginRight: 10,
  },
  successTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A4B50',
  },
  successText: {
    marginTop: 3,
    fontSize: 11,
    color: '#728185',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 20, 26, 0.65)',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 4},
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#182A34',
  },
  closeButton: {
    fontSize: 30,
    color: '#667177',
  },
  modalSubtitle: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 12,
    color: '#78858A',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDE6E6',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1B2A33',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#C0392B',
    marginBottom: 12,
  },
  confirmButton: {
    height: 52,
    borderRadius: 13,
    backgroundColor: '#167C80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  // Competition ended / result published banner
  endedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F5C842',
    padding: 14,
    marginTop: 12,
    marginBottom: 4,
  },
  endedIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  endedTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#7B4F00',
    marginBottom: 2,
  },
  endedText: {
    fontSize: 12,
    color: '#7B4F00',
    lineHeight: 18,
    opacity: 0.85,
  },
});
