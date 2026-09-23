import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

type TabKey = 'about' | 'judging' | 'rules';

interface CompetitionInfoTabsProps {
  about?: string;
  judgingParameters?: string[];
  rules?: string[];
}

const CompetitionInfoTabs: React.FC<CompetitionInfoTabsProps> = ({
  about = '',
  judgingParameters = [],
  rules = [],
}) => {
  const {t} = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [isExpanded, setIsExpanded] = useState(false);

  const fallbackAbout = t('defaultAbout');
  const fallbackJudging = [
    t('judgingItem1'),
    t('judgingItem2'),
    t('judgingItem3'),
    t('judgingItem4'),
  ];
  const fallbackRules = [
    t('rulesItem1'),
    t('rulesItem2'),
    t('rulesItem3'),
  ];

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
            {t('aboutCompetition')}
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
            {t('judgingParameters')}
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
            {t('rulesEligibility')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Content */}
      <View style={styles.card}>
        {activeTab === 'about' && (
          <>
            <Text style={styles.bodyText}>{about || fallbackAbout}</Text>
            {isExpanded && (
              <Text style={[styles.bodyText, styles.expandedText]}>
                {t('aboutExpanded')}
              </Text>
            )}
          </>
        )}

        {activeTab === 'judging' && (
          <View>
            {(judgingParameters.length > 0
              ? judgingParameters
              : fallbackJudging
            ).map(param => (
              <Text key={param} style={styles.bulletItem}>
                • {param}
              </Text>
            ))}
          </View>
        )}

        {activeTab === 'rules' && (
          <View>
            {(rules.length > 0 ? rules : fallbackRules).map((r, i) => (
              <Text key={r + i} style={styles.bulletItem}>
                {i + 1}. {r}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.viewMoreRow}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.7}>
          <Text style={styles.viewMoreText}>
            {isExpanded ? t('viewLess') : t('viewMore')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(CompetitionInfoTabs);

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
  expandedText: {
    marginTop: 6,
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
