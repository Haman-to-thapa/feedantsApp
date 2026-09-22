import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '../utils/storage';
import {
  getCompetition,
  getParticipation,
  registerCompetition,
  uploadSubmission,
} from '../services/api';

export interface CompetitionContextType {
  competition: any;
  lifecycle: any;
  competitionState: string;
  isRegistered: boolean;
  submissionUploaded: boolean;
  userEmail: string;
  loading: boolean;
  error: string;
  loadCompetition: (id?: string) => Promise<void>;
  register: (name: string, email: string) => Promise<{success: boolean; message?: string}>;
  uploadVideo: (file: {uri: string; name: string; type: string}) => Promise<{success: boolean; message?: string}>;
  retry: () => void;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

const COMPETITION_CACHE_KEY = 'feedants_cached_competition';
const USER_EMAIL_KEY = 'feedants_user_email';

export const CompetitionProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [competition, setCompetition] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [submissionUploaded, setSubmissionUploaded] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeCompetitionId, setActiveCompetitionId] = useState<string>('classical-dance-001');

  // Computed lifecycle
  const lifecycle = useMemo(() => {
    return competition?.lifecycle || null;
  }, [competition]);

  const competitionState = useMemo(() => {
    return lifecycle?.state || 'REGISTRATION_OPEN';
  }, [lifecycle]);

  // Load from offline cache first for instant 0ms rendering
  useEffect(() => {
    const hydrateFromCache = async () => {
      try {
        const [cachedData, savedEmail] = await Promise.all([
          AsyncStorage.getItem(COMPETITION_CACHE_KEY),
          AsyncStorage.getItem(USER_EMAIL_KEY),
        ]);

        if (savedEmail) {
          setUserEmail(savedEmail);
        }

        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          if (parsed && typeof parsed === 'object') {
            setCompetition(parsed);
            setLoading(false); // Instant render from cache!
          }
        }
      } catch (e) {
        // Fallback silently to network
      }
    };

    hydrateFromCache();
  }, []);

  // Main data loader with network fallback and background refresh
  const loadCompetition = useCallback(async (id?: string) => {
    const targetId = id || activeCompetitionId || 'classical-dance-001';
    setActiveCompetitionId(targetId);

    try {
      setError('');
      // If we don't have any cached data yet, show loading
      if (!competition) {
        setLoading(true);
      }

      const result = await getCompetition(targetId);

      if (result?.data) {
        setCompetition(result.data);
        setError('');
        // Asynchronously update cache
        AsyncStorage.setItem(COMPETITION_CACHE_KEY, JSON.stringify(result.data)).catch(() => {});
      } else {
        if (!competition) {
          setError('Unable to load competition');
        }
      }

      // Check participation in background
      const savedEmail = (await AsyncStorage.getItem(USER_EMAIL_KEY)) || userEmail;
      if (savedEmail) {
        setUserEmail(savedEmail);
        try {
          const partResult = await getParticipation(targetId, savedEmail);
          if (partResult) {
            setIsRegistered(partResult.registered === true);
            setSubmissionUploaded(
              partResult.participation?.submissionStatus === 'uploaded',
            );
          }
        } catch {
          // Non-blocking background participation check
        }
      }
    } catch (err: any) {
      console.log('Context loadCompetition network note:', err?.message);
      if (!competition) {
        setError('Unable to load competition. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  }, [activeCompetitionId, competition, userEmail]);

  // Register user
  const register = useCallback(
    async (name: string, email: string) => {
      const targetId = activeCompetitionId || 'classical-dance-001';
      try {
        const result = await registerCompetition(targetId, name.trim(), email.trim());

        if (result.success) {
          const cleanEmail = email.trim().toLowerCase();
          await AsyncStorage.setItem(USER_EMAIL_KEY, cleanEmail);
          setUserEmail(cleanEmail);
          setIsRegistered(true);

          // Optimistically increment spot count in state and cache
          setCompetition((prev: any) => {
            if (!prev) return prev;
            const newCount = (prev.registeredCount || 0) + 1;
            const updated = {
              ...prev,
              registeredCount: newCount,
              lifecycle: {
                ...prev.lifecycle,
                remainingSpots: Math.max((prev.maxParticipants || 20) - newCount, 0),
              },
            };
            AsyncStorage.setItem(COMPETITION_CACHE_KEY, JSON.stringify(updated)).catch(() => {});
            return updated;
          });

          return {success: true};
        }
        return {success: false, message: result.message || 'Registration failed'};
      } catch (err: any) {
        return {success: false, message: err?.message || 'Registration failed'};
      }
    },
    [activeCompetitionId],
  );

  // Upload Video submission
  const uploadVideo = useCallback(
    async (file: {uri: string; name: string; type: string}) => {
      const targetId = activeCompetitionId || 'classical-dance-001';
      const email = userEmail || (await AsyncStorage.getItem(USER_EMAIL_KEY));

      if (!email) {
        return {success: false, message: 'Please register first.'};
      }

      try {
        const result = await uploadSubmission(targetId, email, file);
        if (result.success) {
          setSubmissionUploaded(true);
          return {success: true};
        }
        return {success: false, message: result.message || 'Upload failed'};
      } catch (err: any) {
        return {success: false, message: err?.message || 'Upload failed'};
      }
    },
    [activeCompetitionId, userEmail],
  );

  const retry = useCallback(() => {
    loadCompetition(activeCompetitionId);
  }, [loadCompetition, activeCompetitionId]);

  const value = useMemo(
    () => ({
      competition,
      lifecycle,
      competitionState,
      isRegistered,
      submissionUploaded,
      userEmail,
      loading,
      error,
      loadCompetition,
      register,
      uploadVideo,
      retry,
    }),
    [
      competition,
      lifecycle,
      competitionState,
      isRegistered,
      submissionUploaded,
      userEmail,
      loading,
      error,
      loadCompetition,
      register,
      uploadVideo,
      retry,
    ],
  );

  return (
    <CompetitionContext.Provider value={value}>
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (!context) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};

export default CompetitionContext;
