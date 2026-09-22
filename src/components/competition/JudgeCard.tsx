import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface JudgeCardProps {
  name?: string;
  profession?: string;
  experience?: string;
  initials?: string;
  onPressVideo?: () => void;
}

const JudgeCard: React.FC<JudgeCardProps> = ({
  name = 'Manju Dubey',
  profession = 'Professional Kathak Dancer',
  experience = '12+ Years of Experience',
  initials = 'MD',
  onPressVideo,
}) => {
  return (
    <View style={styles.judgeCard}>
      <View style={styles.judgeImageWrapper}>
        <View style={styles.judgeImagePlaceholder}>
          <Text style={styles.judgeInitials}>{initials}</Text>
        </View>
      </View>

      <View style={styles.judgeInfo}>
        <Text style={styles.judgeLabel}>Judge</Text>
        <Text style={styles.judgeName}>{name}</Text>
        <Text style={styles.judgeProfession}>{profession}</Text>
        <Text style={styles.judgeExperience}>{experience}</Text>
      </View>

      <TouchableOpacity
        style={styles.videoButton}
        activeOpacity={0.8}
        onPress={onPressVideo}>
        <Text style={styles.playIcon}>▶</Text>
        <Text style={styles.videoText}>Intro Video</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JudgeCard;

const styles = StyleSheet.create({
  judgeCard: {
    marginTop: 14,
    minHeight: 116,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9EEEE',
    flexDirection: 'row',
    alignItems: 'center',
  },
  judgeImageWrapper: {
    marginRight: 12,
  },
  judgeImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E7F4F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  judgeInitials: {
    fontSize: 20,
    fontWeight: '800',
    color: '#167C80',
  },
  judgeInfo: {
    flex: 1,
  },
  judgeLabel: {
    fontSize: 12,
    color: '#7E8A91',
    marginBottom: 2,
  },
  judgeName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#162A45',
  },
  judgeProfession: {
    marginTop: 5,
    fontSize: 12,
    color: '#68788C',
  },
  judgeExperience: {
    marginTop: 4,
    fontSize: 12,
    color: '#68788C',
  },
  videoButton: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E8F7F8',
    color: '#13838A',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    paddingLeft: 3,
  },
  videoText: {
    marginTop: 7,
    fontSize: 11,
    fontWeight: '600',
    color: '#607286',
  },
});
