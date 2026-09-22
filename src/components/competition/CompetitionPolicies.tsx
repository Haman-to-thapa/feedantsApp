import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface CompetitionPoliciesProps {
  onPressPrizeVideo?: () => void;
  onPressRefund?: () => void;
}

const CompetitionPolicies: React.FC<CompetitionPoliciesProps> = ({
  onPressPrizeVideo,
  onPressRefund,
}) => {
  return (
    <View style={styles.container}>
      {/* Disclaimer Pill Banner */}
      <View style={styles.disclaimerBanner}>
        <Text style={styles.infoIcon}>ⓘ</Text>
        <Text style={styles.disclaimerText}>
          <Text style={styles.disclaimerHighlight}>Disclaimer: </Text>
          Only contributions from paid participants will be considered for
          judging.
        </Text>
      </View>

      {/* 2-Card Row: Prize Money Info (Left) | Refund & Razorpay (Right) */}
      <View style={styles.cardsRow}>
        {/* Left Card */}
        <TouchableOpacity
          style={styles.halfCard}
          activeOpacity={0.8}
          onPress={onPressPrizeVideo}>
          <View style={styles.playSquare}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <Text style={styles.cardTitle}>
            How will you receive prize money?
          </Text>
          <Text style={styles.cardSub}>Watch video to know more</Text>
        </TouchableOpacity>

        {/* Right Card */}
        <View style={styles.halfCard}>
          <TouchableOpacity
            style={styles.policyRow}
            activeOpacity={0.7}
            onPress={onPressRefund}>
            <Text style={styles.shieldIcon}>🛡</Text>
            <Text style={styles.policyTitle}>Refund policy</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.policyRow}>
            <Text style={styles.shieldIcon}>🛡</Text>
            <View style={styles.razorpayInfo}>
              <Text style={styles.secureText}>Secure payments powered by</Text>
              <Text style={styles.razorpayBrand}>Razorpay</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(CompetitionPolicies);

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },
  disclaimerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF6F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  infoIcon: {
    fontSize: 14,
    color: '#007B8A',
    marginRight: 6,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: '#55656F',
    lineHeight: 16,
  },
  disclaimerHighlight: {
    fontWeight: '800',
    color: '#007B8A',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  halfCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAEFEF',
    padding: 12,
    justifyContent: 'center',
  },
  playSquare: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#D7F1EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  playIcon: {
    fontSize: 12,
    color: '#007B8A',
    marginLeft: 2,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16232C',
    lineHeight: 16,
  },
  cardSub: {
    marginTop: 4,
    fontSize: 10,
    color: '#7D8C94',
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  policyTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16232C',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F5F5',
    marginVertical: 8,
  },
  razorpayInfo: {
    flex: 1,
  },
  secureText: {
    fontSize: 9,
    color: '#7D8C94',
  },
  razorpayBrand: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0C2340',
    fontStyle: 'italic',
  },
});
