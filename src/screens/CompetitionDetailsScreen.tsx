import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ActivityIndicator,
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

import {getCompetition} from '../services/api';

const CompetitionDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const competitionId = route.params?.competitionId || 'classical-dance-001';

  const [competition, setCompetition] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const loadCompetition = async () => {
      try {
        setLoading(true);
        const result = await getCompetition(competitionId);
        if (isMounted && result?.data) {
          setCompetition(result.data);
          setError('');
        }
      } catch (err: any) {
        console.log('Backend connection note:', err?.message);
        if (isMounted) {
          setError('Backend offline or loading');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCompetition();

    return () => {
      isMounted = false;
    };
  }, [competitionId]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
          isRegistered={competition?.isRegistered ?? true}
        />

        {/* Judge Card with dynamic photo & intro video */}
        <JudgeCard
          name={competition?.judge?.name}
          profession={competition?.judge?.profession}
          experience={competition?.judge?.experience}
          imageUrl={competition?.judge?.image || competition?.judge?.imageUrl}
        />

        {/* Live Countdown Banner (Self-isolated timer, zero screen re-renders) */}
        <CountdownTimer />

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

        {/* Upload Submission Button */}
        <UploadSubmissionButton />
      </ScrollView>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
