import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

interface UploadSubmissionButtonProps {
  isRegistered?: boolean;
  submissionUploaded?: boolean;
  uploadingSubmission?: boolean;
  competitionState?: string;
  entryFee?: number;
  submissionStart?: string | Date;
  uploadError?: string;
  onPress: () => void;
}

const UploadSubmissionButton: React.FC<UploadSubmissionButtonProps> = ({
  isRegistered = false,
  submissionUploaded = false,
  uploadingSubmission = false,
  competitionState = 'REGISTRATION_OPEN',
  entryFee = 99,
  submissionStart,
  uploadError = '',
  onPress,
}) => {
  const {t} = useLanguage();

  const getActionTitle = () => {
    if (uploadingSubmission) {
      return t('uploading');
    }

    if (isRegistered) {
      if (submissionUploaded) {
        return t('submissionUploaded');
      }

      if (competitionState === 'SUBMISSION_OPEN') {
        return t('uploadSubmission');
      }

      return t('registeredStatus');
    }

    switch (competitionState) {
      case 'UPCOMING':
        return t('registrationNotStarted');

      case 'REGISTRATION_FULL':
        return t('registrationFull');

      case 'REGISTRATION_OPEN':
        return t('registerNow');

      case 'REGISTRATION_CLOSED':
        return t('registrationClosed');

      case 'SUBMISSION_OPEN':
        return t('registrationClosed');

      case 'SUBMISSION_CLOSED':
        return t('submissionClosed');

      case 'RESULT_PUBLISHED':
        return t('viewResult');

      default:
        return t('registerNow');
    }
  };

  const isActionDisabled = () => {
    if (uploadingSubmission) {
      return true;
    }

    if (isRegistered) {
      return submissionUploaded;
    }

    return competitionState !== 'REGISTRATION_OPEN';
  };

  const formattedSubmissionStart = submissionStart
    ? new Date(submissionStart).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
      })
    : '';

  return (
    <View style={styles.submissionSection}>
      <TouchableOpacity
        style={[
          styles.submissionButton,
          isActionDisabled() && styles.disabledSubmissionButton,
          submissionUploaded && styles.successSubmissionButton,
        ]}
        activeOpacity={0.85}
        disabled={isActionDisabled()}
        onPress={onPress}>
        <Text style={styles.uploadIcon}>
          {submissionUploaded ? '✓' : isRegistered ? '↑' : '＋'}
        </Text>

        <View style={styles.actionTextContainer}>
          <Text style={styles.submissionTitle}>{getActionTitle()}</Text>

          <Text style={styles.submissionStatus}>
            {isRegistered
              ? submissionUploaded
                ? t('submittedSuccessfully')
                : competitionState === 'SUBMISSION_OPEN'
                ? t('registeredStatus')
                : formattedSubmissionStart
                ? t('submissionStartsOn', {date: formattedSubmissionStart})
                : t('registeredStatus')
              : competitionState === 'REGISTRATION_OPEN'
              ? t('entryFeeBadge', {fee: entryFee})
              : (competitionState || '').replace(/_/g, ' ')}
          </Text>
        </View>

        {competitionState !== 'REGISTRATION_FULL' && !submissionUploaded && (
          <Text style={styles.arrow}>›</Text>
        )}
      </TouchableOpacity>

      {uploadError ? <Text style={styles.errorText}>{uploadError}</Text> : null}
    </View>
  );
};

export default React.memo(UploadSubmissionButton);

const styles = StyleSheet.create({
  submissionSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  submissionButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: '#006E7D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#006E7D',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  disabledSubmissionButton: {
    backgroundColor: '#C9D5D5',
    elevation: 0,
    shadowOpacity: 0,
  },
  successSubmissionButton: {
    backgroundColor: '#0E7A6E',
  },
  uploadIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    width: 28,
  },
  actionTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  submissionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  submissionStatus: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    color: '#E5F6F4',
    textTransform: 'capitalize',
  },
  arrow: {
    fontSize: 22,
    fontWeight: '400',
    color: '#FFFFFF',
    width: 24,
    textAlign: 'right',
  },
  errorText: {
    marginTop: 8,
    fontSize: 12,
    color: '#C0392B',
    textAlign: 'center',
    fontWeight: '600',
  },
});
