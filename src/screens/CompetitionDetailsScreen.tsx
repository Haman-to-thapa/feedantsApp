import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
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

import AsyncStorage from '../utils/storage';
import {pick, types} from '../utils/documentPicker';
import {
  getCompetition,
  registerCompetition,
  getParticipation,
  uploadSubmission,
} from '../services/api';

const CompetitionDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const competitionId = route.params?.competitionId || 'classical-dance-001';

  const [competition, setCompetition] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Step 12 Registration States
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [registering, setRegistering] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>('');

  // Step 13 Submission States
  const [submissionUploaded, setSubmissionUploaded] = useState<boolean>(false);
  const [uploadingSubmission, setUploadingSubmission] =
    useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');

  // Step 14 Lifecycle computation
  const lifecycle = competition?.lifecycle;
  const competitionState = lifecycle?.state || 'REGISTRATION_OPEN';

  // Step 16.2: Reusable load/retry handler
  const loadCompetitionAgain = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const result = await getCompetition(competitionId);
      if (result?.data) {
        setCompetition(result.data);
      } else {
        setError('Unable to load competition');
      }
    } catch (err: any) {
      console.log('Load competition error:', err?.message);
      setError('Unable to load competition');
    } finally {
      setLoading(false);
    }
  }, [competitionId]);

  useEffect(() => {
    loadCompetitionAgain();
  }, [loadCompetitionAgain]);

  // Step 12.8 + Step 13.10: Saved User, Persistent Participation & Submission Check
  useEffect(() => {
    let isMounted = true;

    const checkSavedUser = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('feedants_user_email');
        if (!savedEmail) {
          return;
        }

        if (isMounted) {
          setEmail(savedEmail);
        }

        const result = await getParticipation(competitionId, savedEmail);
        if (isMounted) {
          setIsRegistered(result.registered === true);
          setSubmissionUploaded(
            result.participation?.submissionStatus === 'uploaded',
          );
        }
      } catch (err) {
        console.error('Saved user check failed:', err);
      }
    };

    checkSavedUser();

    return () => {
      isMounted = false;
    };
  }, [competitionId]);

  // Step 12.9: Register Handler
  const handleRegister = async () => {
    if (!name.trim() || !email.trim()) {
      setRegisterError('Name and email are required');
      return;
    }

    try {
      setRegistering(true);
      setRegisterError('');

      const result = await registerCompetition(
        competitionId,
        name.trim(),
        email.trim(),
      );

      if (result.success) {
        await AsyncStorage.setItem(
          'feedants_user_email',
          email.trim().toLowerCase(),
        );

        setIsRegistered(true);
        setShowRegisterModal(false);

        // Real-time update booked spot count & remaining spots
        setCompetition((prev: any) => {
          if (!prev) return prev;
          const newRegistered = (prev.registeredCount || 0) + 1;
          const remaining = Math.max(
            (prev.maxParticipants || 20) - newRegistered,
            0,
          );
          return {
            ...prev,
            registeredCount: newRegistered,
            lifecycle: {
              ...prev.lifecycle,
              remainingSpots: remaining,
              state:
                remaining === 0
                  ? 'REGISTRATION_FULL'
                  : prev.lifecycle?.state,
            },
          };
        });
      }
    } catch (err: any) {
      setRegisterError(err.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  // Step 13.11: Video Submission Upload Handler
  const handleUploadSubmission = async () => {
    try {
      setUploadingSubmission(true);
      setUploadError('');

      const res = await pick({
        mode: 'import',
        type: [types.video],
        allowMultiSelection: false,
      });

      const file = Array.isArray(res) ? res[0] : res;

      if (!file) {
        return;
      }

      const savedEmail =
        (await AsyncStorage.getItem('feedants_user_email')) || email;

      if (!savedEmail) {
        setUploadError('Please register first.');
        return;
      }

      await uploadSubmission(competitionId, savedEmail, {
        uri: file.uri || (file as any).fileCopyUri,
        name: file.name || 'competition-submission.mp4',
        type: file.type || 'video/mp4',
      });

      setSubmissionUploaded(true);
    } catch (err: any) {
      if (
        err?.message?.includes('cancelled') ||
        err?.code === 'DOCUMENT_PICKER_CANCELED'
      ) {
        return;
      }
      console.error('Submission upload error:', err);
      setUploadError(err.message || 'Unable to upload submission');
    } finally {
      setUploadingSubmission(false);
    }
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Step 14.6: Action Button Handler respecting Competition Lifecycle
  const handleButtonPress = useCallback(() => {
    if (!isRegistered) {
      if (competitionState === 'REGISTRATION_OPEN') {
        setRegisterError('');
        setShowRegisterModal(true);
      }
      return;
    }

    if (competitionState === 'SUBMISSION_OPEN' && !submissionUploaded) {
      handleUploadSubmission();
    }
  }, [isRegistered, submissionUploaded, competitionState, email, competitionId]);

  // Step 16.1: Dedicated Loading UI
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" {...({backgroundColor: '#FFFFFF'} as any)} />
        <View style={styles.loadingContainer}>
          <View style={styles.loadingCircle}>
            <Text style={styles.loadingIcon}>F</Text>
          </View>
          <Text style={styles.loadingTitle}>Loading competition</Text>
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Step 16.2: Dedicated Error Screen + Retry Action
  if (error || !competition) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" {...({backgroundColor: '#FFFFFF'} as any)} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>!</Text>
          <Text style={styles.errorTitle}>Unable to load competition</Text>
          <Text style={styles.errorDescription}>
            Please check your connection and try again.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            activeOpacity={0.85}
            onPress={loadCompetitionAgain}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" {...({backgroundColor: '#F8FAFA'} as any)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
        overScrollMode="never">
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
        <JudgeCard
          name={competition?.judge?.name}
          profession={competition?.judge?.profession}
          experience={competition?.judge?.experience}
          imageUrl={competition?.judge?.image || competition?.judge?.imageUrl}
        />

        {/* Step 14.9: Live Countdown Timer driven by MongoDB registrationEnd */}
        <CountdownTimer targetDate={competition?.registrationEnd} />

        {/* 2x2 Important Dates Grid */}
        <ImportantDates />

        {/* Previous Winners with video thumbnails */}
        <PreviousWinners />

        {/* Underline Tabs: About / Judging / Rules */}
        <CompetitionInfoTabs
          about={competition?.about}
          judgingParameters={competition?.judgingParameters}
          rules={competition?.rules}
        />

        {/* Rewards List (1st - 6th Winner) from MongoDB */}
        <RewardsSection rewards={competition?.rewards} />

        {/* Disclaimer Banner + Side-by-side Prize Video & Razorpay */}
        <CompetitionPolicies />

        {/* Refer & Earn More Discount with link copy */}
        <ReferAndEarnCard />

        {/* Hear From Our Users bar */}
        <UserReviews />

        {/* Ad Here Box */}
        <AdvertisementCard />

        {/* Step 16.4: Registration confirmation banner */}
        {isRegistered && !submissionUploaded && (
          <View style={styles.registeredBanner}>
            <Text style={styles.registeredCheck}>✓</Text>
            <View style={styles.registeredContent}>
              <Text style={styles.registeredTitle}>You are registered</Text>
              <Text style={styles.registeredText}>
                Your participation has been saved.
              </Text>
            </View>
          </View>
        )}

        {/* Step 16.5: Submission success banner */}
        {submissionUploaded && (
          <View style={styles.submissionSuccess}>
            <Text style={styles.successIcon}>✓</Text>
            <View style={styles.registeredContent}>
              <Text style={styles.successTitle}>Submission uploaded</Text>
              <Text style={styles.successText}>
                Your video has been submitted successfully.
              </Text>
            </View>
          </View>
        )}

        {/* Step 14.6: Dynamic Action Button matching lifecycle state */}
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

      {/* Step 12.11: Registration Modal */}
      <Modal
        visible={showRegisterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRegisterModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Register for Competition</Text>
              <TouchableOpacity
                onPress={() => setShowRegisterModal(false)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Enter your details to continue.
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor="#9AA4A8"
              style={styles.input}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
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
                  ? 'Registering...'
                  : `Register • ₹${competition?.entryFee || 99}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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

  // Step 16.1 Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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

  // Step 16.2 Error Styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#FFFFFF',
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

  // Step 16.4 & 16.5 Banners
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 30,
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
});
