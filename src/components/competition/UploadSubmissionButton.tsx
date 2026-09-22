import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface UploadSubmissionButtonProps {
  isRegistered?: boolean;
  entryFee?: number;
  onPress: () => void;
}

const UploadSubmissionButton: React.FC<UploadSubmissionButtonProps> = ({
  isRegistered = false,
  entryFee = 99,
  onPress,
}) => {
  return (
    <View style={styles.submissionSection}>
      <TouchableOpacity
        style={styles.submissionButton}
        activeOpacity={0.85}
        onPress={onPress}>
        <Text style={styles.uploadIcon}>
          {isRegistered ? '↑' : '✓'}
        </Text>

        <View style={styles.centerTextContainer}>
          <Text style={styles.submissionTitle}>
            {isRegistered ? 'Upload Submission' : 'Register Now'}
          </Text>

          <Text style={styles.submissionStatus}>
            {isRegistered ? 'Registered' : `Entry Fee ₹${entryFee}`}
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
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
  uploadIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: '#BFE7E3',
    width: 24,
  },
  centerTextContainer: {
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
    color: '#BFE7E3',
  },
  arrow: {
    fontSize: 22,
    fontWeight: '400',
    color: '#BFE7E3',
    width: 24,
    textAlign: 'right',
  },
});
