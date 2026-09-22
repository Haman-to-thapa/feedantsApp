import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface CompetitionHeaderProps {
  onBack: () => void;
}

const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({onBack}) => {
  const [selectedLang, setSelectedLang] = useState<'ENG' | 'HIN'>('ENG');

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.7}
        onPress={onBack}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={() => setSelectedLang('ENG')}>
          <Text
            style={
              selectedLang === 'ENG'
                ? styles.activeLanguage
                : styles.inactiveLanguage
            }>
            ENG
          </Text>
        </TouchableOpacity>

        <Text style={styles.separator}>|</Text>

        <TouchableOpacity onPress={() => setSelectedLang('HIN')}>
          <Text
            style={
              selectedLang === 'HIN'
                ? styles.activeLanguage
                : styles.inactiveLanguage
            }>
            हिंदी
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompetitionHeader;

const styles = StyleSheet.create({
  header: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 38,
    lineHeight: 38,
    color: '#1E293B',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#F4F7F7',
  },
  activeLanguage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#167C80',
  },
  separator: {
    marginHorizontal: 6,
    color: '#A0A0A0',
  },
  inactiveLanguage: {
    fontSize: 12,
    fontWeight: '500',
    color: '#777777',
  },
});
