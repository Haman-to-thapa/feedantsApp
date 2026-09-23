import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

const ReferAndEarnCard: React.FC = () => {
  const {t} = useLanguage();
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://feedants.com/r/referral123';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.megaphoneIcon}>📢</Text>
        <Text style={styles.title}>{t('referTitle')}</Text>
      </View>

      <View style={styles.actionRow}>
        {/* Link Box */}
        <View style={styles.linkBox}>
          <Text style={styles.linkText} numberOfLines={1}>
            {referralLink}
          </Text>
          <TouchableOpacity
            style={styles.copyBtn}
            onPress={handleCopy}
            activeOpacity={0.7}>
            <Text style={styles.copyBtnText}>
              {copied ? t('copied') : t('copyLink')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Refer Now Button */}
        <TouchableOpacity style={styles.referNowBtn} activeOpacity={0.8}>
          <Text style={styles.referNowText}>{t('referNow')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerNote}>
        {t('referFooter', {amount: '₹10'})}
      </Text>
    </View>
  );
};

export default React.memo(ReferAndEarnCard);

const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#EBF8F5',
    borderWidth: 1,
    borderColor: '#D4ECE6',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  megaphoneIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#16232C',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D2E8E2',
    paddingLeft: 8,
    paddingRight: 4,
    paddingVertical: 4,
  },
  linkText: {
    flex: 1,
    fontSize: 10,
    color: '#007B8A',
    marginRight: 4,
  },
  copyBtn: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#EEF7F5',
  },
  copyBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#007B8A',
  },
  referNowBtn: {
    backgroundColor: '#007B8A',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  referNowText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  footerNote: {
    marginTop: 8,
    fontSize: 10,
    color: '#55656F',
  },
  boldAmount: {
    fontWeight: '800',
    color: '#007B8A',
  },
});
