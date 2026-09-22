import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface CompetitionPoliciesProps {
  onPressRefundPolicy?: () => void;
}

const CompetitionPolicies: React.FC<CompetitionPoliciesProps> = ({
  onPressRefundPolicy,
}) => {
  return (
    <>
      {/* Disclaimer */}
      <View style={styles.noticeCard}>
        <View style={styles.noticeHeader}>
          <Text style={styles.noticeIcon}>ⓘ</Text>
          <Text style={styles.noticeTitle}>Disclaimer</Text>
        </View>

        <Text style={styles.noticeText}>
          Please review the competition rules and eligibility requirements
          before submitting your entry. Prize distribution is subject to
          successful verification of the participant and submission.
        </Text>
      </View>

      {/* Refund Policy */}
      <View style={styles.noticeCard}>
        <View style={styles.noticeHeader}>
          <Text style={styles.noticeIcon}>↩</Text>
          <Text style={styles.noticeTitle}>Refund Policy</Text>
        </View>

        <Text style={styles.noticeText}>
          Entry fees are refundable only where applicable under the
          competition's refund terms. Please check the applicable policy
          before completing payment.
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressRefundPolicy}>
          <Text style={styles.policyLink}>Read full refund policy</Text>
        </TouchableOpacity>
      </View>

      {/* Secure Payment */}
      <View style={styles.paymentCard}>
        <View style={styles.paymentIcon}>
          <Text style={styles.lockIcon}>🔒</Text>
        </View>

        <View style={styles.paymentInfo}>
          <Text style={styles.paymentTitle}>Secure Payment</Text>
          <Text style={styles.paymentText}>
            Your payment is securely processed through Razorpay.
          </Text>
        </View>
      </View>
    </>
  );
};

export default CompetitionPolicies;

const styles = StyleSheet.create({
  noticeCard: {
    marginTop: 15,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F7FAFA',
    borderWidth: 1,
    borderColor: '#E5EEEE',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  noticeIcon: {
    marginRight: 8,
    fontSize: 19,
    color: '#167C80',
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A2A32',
  },
  noticeText: {
    fontSize: 12,
    lineHeight: 19,
    color: '#6E7A81',
  },
  policyLink: {
    marginTop: 9,
    fontSize: 12,
    fontWeight: '700',
    color: '#167C80',
  },
  paymentCard: {
    marginTop: 15,
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#F5FBF9',
    borderWidth: 1,
    borderColor: '#DCEFE8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F4EF',
    marginRight: 12,
  },
  lockIcon: {
    fontSize: 20,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A2A32',
  },
  paymentText: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 17,
    color: '#728087',
  },
});
