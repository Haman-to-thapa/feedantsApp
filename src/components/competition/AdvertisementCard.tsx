import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

const AdvertisementCard: React.FC = () => {
  const {t} = useLanguage();

  return (
    <View style={styles.card}>
      <Text style={styles.icon}>📢</Text>
      <Text style={styles.text}>{t('adHere')}</Text>
    </View>
  );
};

export default React.memo(AdvertisementCard);

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6EAEA',
    borderStyle: 'dashed',
    backgroundColor: '#FAFCFC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 13,
    marginRight: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7D8C94',
  },
});
