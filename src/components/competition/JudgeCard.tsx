import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

interface JudgeCardProps {
  name?: string;
  profession?: string;
  experience?: string;
  imageUrl?: string;
  onPressVideo?: () => void;
}

const JudgeCard: React.FC<JudgeCardProps> = ({
  name = '',
  profession = '',
  experience = '',
  imageUrl = '',
  onPressVideo,
}) => {
  const {t, localize} = useLanguage();

  // If no judge data is provided, do not render an empty card
  if (!name && !profession && !imageUrl) {
    return null;
  }

  return (
    <View style={styles.judgeCard}>
      {imageUrl ? (
        <Image source={{uri: imageUrl}} style={styles.judgeImage} />
      ) : (
        <View style={[styles.judgeImage, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>
            {name ? name.charAt(0).toUpperCase() : 'J'}
          </Text>
        </View>
      )}

      <View style={styles.judgeInfo}>
        <Text style={styles.judgeLabel}>{t('judge')}</Text>
        {name ? <Text style={styles.judgeName}>{localize(name)}</Text> : null}
        {profession ? (
          <Text style={styles.judgeProfession}>{localize(profession)}</Text>
        ) : null}
        {experience ? (
          <Text style={styles.judgeExperience}>{localize(experience)}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.videoButton}
        activeOpacity={0.8}
        onPress={onPressVideo}>
        <View style={styles.playCircle}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
        <Text style={styles.videoText}>{t('introVideo')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(JudgeCard);

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
  placeholderImage: {
    backgroundColor: '#E4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#007B8A',
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
