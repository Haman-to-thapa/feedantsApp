import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface CompetitionHeaderProps {
  onBack?: () => void;
}

const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({onBack}) => {
  const [selectedLang, setSelectedLang] = useState<'ENG' | 'HIN'>('ENG');

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.7}
        onPress={onBack}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Go back</Text>
      </TouchableOpacity>

      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={[
            styles.langPill,
            selectedLang === 'ENG' && styles.activeLangPill,
          ]}
          onPress={() => setSelectedLang('ENG')}>
          <Text
            style={[
              styles.langText,
              selectedLang === 'ENG' && styles.activeLangText,
            ]}>
            ENG
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.langPill,
            selectedLang === 'HIN' && styles.activeLangPill,
          ]}
          onPress={() => setSelectedLang('HIN')}>
          <Text
            style={[
              styles.langText,
              selectedLang === 'HIN' && styles.activeLangText,
            ]}>
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
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingRight: 10,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: '700',
    color: '#16232C',
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16232C',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderRadius: 20,
    backgroundColor: '#F3F6F6',
  },
  langPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  activeLangPill: {
    backgroundColor: '#007B8A',
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6E7A81',
  },
  activeLangText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
