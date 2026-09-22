import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

interface JudgeCardProps {
  name?: string;
  profession?: string;
  experience?: string;
  imageUrl?: string;
  onPressVideo?: () => void;
}

const JudgeCard: React.FC<JudgeCardProps> = ({
  name = 'Manju Dubey',
  profession = 'Professional Kathak Dancer',
  experience = '12+ Years of Experience',
  imageUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  onPressVideo,
}) => {
  return (
    <View style={styles.judgeCard}>
      <Image source={{uri: imageUrl}} style={styles.judgeImage} />

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
        <View style={styles.playCircle}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
        <Text style={styles.videoText}>Intro Video</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JudgeCard;

const styles = StyleSheet.create({
  judgeCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEFEF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  judgeImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 12,
  },
  judgeInfo: {
    flex: 1,
  },
  judgeLabel: {
    fontSize: 11,
    color: '#7E8B92',
    marginBottom: 2,
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#16232C',
  },
  judgeProfession: {
    marginTop: 4,
    fontSize: 11,
    color: '#657780',
  },
  judgeExperience: {
    marginTop: 2,
    fontSize: 11,
    color: '#7E8B92',
  },
  videoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 15,
    color: '#007B8A',
    marginLeft: 2,
  },
  videoText: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '600',
    color: '#657780',
  },
});
