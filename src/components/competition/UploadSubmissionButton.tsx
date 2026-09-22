import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface UploadSubmissionButtonProps {
  onPress?: () => void;
}

const UploadSubmissionButton: React.FC<UploadSubmissionButtonProps> = ({
  onPress = () => console.log('Upload Submission pressed'),
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.88}
      onPress={onPress}>
      <Text style={styles.title}>Upload Submission</Text>
      <Text style={styles.status}>Registered</Text>
    </TouchableOpacity>
  );
};

export default React.memo(UploadSubmissionButton);

const styles = StyleSheet.create({
  button: {
    marginTop: 14,
    marginBottom: 8,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#006E7D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  status: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '600',
    color: '#BFE7E3',
  },
});
