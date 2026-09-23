import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

interface HearFromUsersProps {
  onPress?: () => void;
}

const UserReviews: React.FC<HearFromUsersProps> = ({onPress}) => {
  const {t} = useLanguage();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={onPress}>
      <Text style={styles.chatIcon}>💬</Text>

      <View style={styles.info}>
        <Text style={styles.title}>{t('hearFromUsers')}</Text>
        <Text style={styles.subText}>{t('hearFromUsersSub')}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

export default React.memo(UserReviews);

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAEFEF',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  chatIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16232C',
  },
  subText: {
    fontSize: 10,
    color: '#7D8C94',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#7D8C94',
    fontWeight: '300',
  },
});
