import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type TabKey = 'about' | 'judging' | 'rules';

const CompetitionInfoTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.section}>
      {/* Underline Tabs Header */}
      <View style={styles.tabsHeader}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'about' && styles.activeTab]}
          onPress={() => setActiveTab('about')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'about' && styles.activeTabText,
            ]}>
            About Competition
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'judging' && styles.activeTab]}
          onPress={() => setActiveTab('judging')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'judging' && styles.activeTabText,
            ]}>
            Judging Parameters
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'rules' && styles.activeTab]}
          onPress={() => setActiveTab('rules')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'rules' && styles.activeTabText,
            ]}>
            Rules & Eligibility
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Content */}
      <View style={styles.card}>
        {activeTab === 'about' && (
          <>
            <Text style={styles.bodyText}>
              This is an online classical dance competition open for all age
              groups. Participate from anywhere and showcase your talent.
              Express your passion through traditional dance.
            </Text>
            {isExpanded && (
              <Text style={[styles.bodyText, {marginTop: 6}]}>
                Winners will receive attractive cash prizes and verified
                certificates. Get feedback from experienced mentors and build
                your artistic portfolio!
              </Text>
            )}
          </>
        )}

        {activeTab === 'judging' && (
          <View>
            <Text style={styles.bulletItem}>• Technique and precision</Text>
            <Text style={styles.bulletItem}>• Expression and presentation</Text>
            <Text style={styles.bulletItem}>• Creativity and choreography</Text>
            <Text style={styles.bulletItem}>• Overall performance</Text>
          </View>
        )}

        {activeTab === 'rules' && (
          <View>
            <Text style={styles.bulletItem}>
              1. Participants must submit their own recorded performance.
            </Text>
            <Text style={styles.bulletItem}>
              2. Video duration should adhere to standard event guidelines.
            </Text>
            <Text style={styles.bulletItem}>
              3. Late entries will not be accepted for evaluation.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.viewMoreRow}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.7}>
          <Text style={styles.viewMoreText}>
            {isExpanded ? 'View less ∧' : 'View more ∨'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompetitionInfoTabs;

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
  },
  tabsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF3F3',
  },
  tab: {
    paddingVertical: 10,
    marginRight: 18,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007B8A',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7D8C94',
  },
  activeTabText: {
    color: '#007B8A',
    fontWeight: '800',
  },
  card: {
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEFEF',
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#55656F',
  },
  bulletItem: {
    fontSize: 12,
    lineHeight: 20,
    color: '#55656F',
    marginBottom: 4,
  },
  viewMoreRow: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007B8A',
  },
});
