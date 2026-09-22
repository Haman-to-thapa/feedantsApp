import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CompetitionHeader from '../components/competition/CompetitionHeader';
import CompetitionHero from '../components/competition/CompetitionHero';
import JudgeCard from '../components/competition/JudgeCard';
import CountdownTimer from '../components/competition/CountdownTimer';
import ImportantDates from '../components/competition/ImportantDates';
import PreviousWinners from '../components/competition/PreviousWinners';
import CompetitionInfoTabs from '../components/competition/CompetitionInfoTabs';
import RewardsSection from '../components/competition/RewardsSection';
import PrizeMoneyCard from '../components/competition/PrizeMoneyCard';
import CompetitionPolicies from '../components/competition/CompetitionPolicies';

const CompetitionDetailsScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" {...({backgroundColor: '#FFFFFF'} as any)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Top Header */}
        <CompetitionHeader onBack={() => navigation.goBack()} />

        {/* Title, tags, prize cards, and spots bar */}
        <CompetitionHero />

        {/* Judge info and intro video */}
        <JudgeCard />

        {/* Live registration countdown */}
        <CountdownTimer />

        {/* Important dates schedule */}
        <ImportantDates />

        {/* Previous winners horizontal carousel */}
        <PreviousWinners />

        {/* Information tabs (About / Judging / Rules) */}
        <CompetitionInfoTabs />

        {/* Rewards breakdown (1st - 6th) */}
        <RewardsSection />

        {/* Prize money video/card */}
        <PrizeMoneyCard />

        {/* Disclaimer, Refund Policy, and Razorpay Secure Payment */}
        <CompetitionPolicies />
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
});
