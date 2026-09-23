import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import AsyncStorage from '../utils/storage';
import {useNavigation} from '@react-navigation/native';
import {getAllCompetitions} from '../services/api';
import {useLanguage} from '../context/LanguageContext';

const COMPETITIONS_CACHE_KEY = 'feedants_competitions_list_cache';

// State badge config
const STATE_CONFIG: Record<
  string,
  {label: string; labelHi: string; color: string; bg: string; icon: string}
> = {
  UPCOMING:           {label: 'Upcoming',         labelHi: 'जल्द आ रहा है', color: '#1D6FA4', bg: '#E8F4FD', icon: '🔜'},
  REGISTRATION_OPEN:  {label: 'Registration Open',labelHi: 'रजिस्ट्रेशन खुला', color: '#0E7A47', bg: '#E6F6EE', icon: '✅'},
  REGISTRATION_FULL:  {label: 'Registration Full',labelHi: 'पंजीकरण भरा', color: '#C0392B', bg: '#FDE8E8', icon: '🔴'},
  REGISTRATION_CLOSED:{label: 'Registration Closed',labelHi: 'पंजीकरण बंद',color: '#7B4F00', bg: '#FFF3CD', icon: '🔒'},
  SUBMISSION_OPEN:    {label: 'Submission Open',  labelHi: 'सबमिशन खुला', color: '#6B2E9E', bg: '#F0E8FB', icon: '📤'},
  SUBMISSION_CLOSED:  {label: 'Competition Ended',labelHi: 'प्रतियोगिता समाप्त', color: '#555', bg: '#EFEFEF', icon: '🏁'},
  RESULT_PUBLISHED:   {label: 'Results Published',labelHi: 'परिणाम घोषित',color: '#B7860B', bg: '#FFF8DC', icon: '🏆'},
};

const CompetitionsScreen = () => {
  const navigation = useNavigation<any>();
  const {language, toggleLanguage} = useLanguage();
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // 1. Immediately hydrate from cache on mount (0ms instant UI!)
  useEffect(() => {
    AsyncStorage.getItem(COMPETITIONS_CACHE_KEY)
      .then((cached: string | null) => {
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCompetitions(parsed);
            setLoading(false); // Instant render from cache!
          }
        }
      })
      .catch(() => {});
  }, []);

  const fetchCompetitions = useCallback(async () => {
    try {
      setError('');
      const res = await getAllCompetitions();
      if (res?.data && Array.isArray(res.data)) {
        setCompetitions(res.data);
        AsyncStorage.setItem(COMPETITIONS_CACHE_KEY, JSON.stringify(res.data)).catch(() => {});
      }
    } catch (err: any) {
      setCompetitions(prev => {
        // Only show full error if we have no cached data to display
        if (prev.length === 0) {
          setError(err?.message || 'Failed to load competitions');
        }
        return prev;
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCompetitions();
  }, [fetchCompetitions]);

  const openCompetition = (competitionId: string) => {
    const parent = navigation.getParent?.();
    if (parent) {
      parent.navigate('CompetitionDetails', {competitionId});
    } else {
      navigation.navigate('CompetitionDetails', {competitionId});
    }
  };

  const renderCard = ({item}: {item: any}) => {
    const state: string = item.lifecycle?.state || 'REGISTRATION_OPEN';
    const cfg = STATE_CONFIG[state] || STATE_CONFIG.REGISTRATION_OPEN;
    const isEnded = state === 'SUBMISSION_CLOSED' || state === 'RESULT_PUBLISHED';

    const remaining = item.lifecycle?.remainingSpots ?? 0;
    const registered = item.registeredCount ?? 0;
    const max = item.maxParticipants ?? 20;
    const pct = Math.min((registered / max) * 100, 100);

    const regEnd = item.registrationEnd
      ? new Date(item.registrationEnd).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '';

    return (
      <TouchableOpacity
        style={[styles.card, isEnded && styles.cardEnded]}
        activeOpacity={0.88}
        onPress={() => openCompetition(item.competitionId)}>
        {/* Top row: title + state badge */}
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleCol}>
            <Text style={styles.cardCategory}>{item.category || 'Dance'}</Text>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          <View style={[styles.stateBadge, {backgroundColor: cfg.bg}]}>
            <Text style={styles.stateIcon}>{cfg.icon}</Text>
            <Text style={[styles.stateLabel, {color: cfg.color}]}>
              {language === 'hi' ? cfg.labelHi : cfg.label}
            </Text>
          </View>
        </View>

        {/* Spots progress bar */}
        {!isEnded && (
          <View style={styles.progressRow}>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, {width: `${pct}%`}]} />
            </View>
            <Text style={styles.progressLabel}>
              {remaining > 0
                ? `${remaining} spots left`
                : 'No spots left'}
            </Text>
          </View>
        )}

        {/* Meta row: prize + fee + reg end */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>₹{(item.prizePool || 0).toLocaleString('en-IN')}</Text>
            <Text style={styles.metaKey}>Prize Pool</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>₹{item.entryFee || 99}</Text>
            <Text style={styles.metaKey}>Entry Fee</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>{regEnd || '—'}</Text>
            <Text style={styles.metaKey}>Reg. Ends</Text>
          </View>
        </View>

        {/* CTA */}
        <View style={[styles.cta, isEnded && styles.ctaEnded]}>
          <Text style={[styles.ctaText, isEnded && styles.ctaTextEnded]}>
            {isEnded ? 'View Details →' : 'View & Register →'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎭</Text>
      <Text style={styles.emptyTitle}>No Competitions Found</Text>
      <Text style={styles.emptySubtitle}>
        Pull down to refresh or check back later.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            {language === 'hi' ? 'प्रतियोगिताएं' : 'Competitions'}
          </Text>
          <Text style={styles.headerSub}>
            {language === 'hi' ? 'सभी प्रतियोगिताएं' : `${competitions.length} competition${competitions.length !== 1 ? 's' : ''}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.langPill} onPress={toggleLanguage}>
          <Text style={styles.langText}>
            {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 ENG'}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && !refreshing && competitions.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#167C80" />
          <Text style={styles.loadingText}>
            {language === 'hi' ? 'प्रतियोगिताएं लोड हो रही हैं...' : 'Loading competitions...'}
          </Text>
        </View>
      ) : error && competitions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>⚠️</Text>
          <Text style={styles.emptyTitle}>Unable to Load</Text>
          <Text style={styles.emptySubtitle}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchCompetitions}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={competitions}
          keyExtractor={item => item.competitionId || item._id}
          renderItem={renderCard}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#167C80"
            />
          }
        />
      )}
    </View>
  );
};

export default CompetitionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#16232C',
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize: 12,
    color: '#8A9BAC',
    marginTop: 2,
  },
  langPill: {
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B4A6B',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardEnded: {
    opacity: 0.75,
    backgroundColor: '#FAFAFA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardTitleCol: {
    flex: 1,
    marginRight: 10,
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: '#167C80',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#16232C',
    lineHeight: 23,
  },
  stateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  stateIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  stateLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  progressBg: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E8EDF2',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#167C80',
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7F8C',
    minWidth: 80,
    textAlign: 'right',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#16232C',
  },
  metaKey: {
    fontSize: 10,
    color: '#8A9BAC',
    marginTop: 2,
  },
  metaDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#DDE3EA',
  },
  cta: {
    backgroundColor: '#167C80',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  ctaEnded: {
    backgroundColor: '#E8EDF2',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  ctaTextEnded: {
    color: '#6B7F8C',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#8A9BAC',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#16232C',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#8A9BAC',
    textAlign: 'center',
    lineHeight: 20,
  },
  retryBtn: {
    marginTop: 20,
    backgroundColor: '#167C80',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
