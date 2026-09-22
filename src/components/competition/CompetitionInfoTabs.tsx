import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

type TabKey = 'about' | 'judging' | 'rules';

const CompetitionInfoTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('about');

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Competition Information</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'about' && styles.activeTabButton,
          ]}
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
          style={[
            styles.tabButton,
            activeTab === 'judging' && styles.activeTabButton,
          ]}
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
          style={[
            styles.tabButton,
            activeTab === 'rules' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('rules')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'rules' && styles.activeTabText,
            ]}>
            Rules & Eligibility
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.descriptionCard}>
        {activeTab === 'about' && (
          <>
            <Text style={styles.descriptionTitle}>About Competition</Text>
            <Text style={styles.descriptionText}>
              Showcase your talent through the art of classical dance.
              Participants can present their best performance and compete for
              exciting rewards.
            </Text>
            <Text style={styles.descriptionText}>
              This competition is designed to celebrate creativity, expression,
              technique and dedication towards classical dance.
            </Text>
          </>
        )}

        {activeTab === 'judging' && (
          <>
            <Text style={styles.descriptionTitle}>Judging Parameters</Text>
            <View style={styles.parameterRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.parameterText}>Technique and precision</Text>
            </View>
            <View style={styles.parameterRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.parameterText}>
                Expression and presentation
              </Text>
            </View>
            <View style={styles.parameterRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.parameterText}>
                Creativity and choreography
              </Text>
            </View>
            <View style={styles.parameterRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.parameterText}>Overall performance</Text>
            </View>
          </>
        )}

        {activeTab === 'rules' && (
          <>
            <Text style={styles.descriptionTitle}>Rules & Eligibility</Text>
            <View style={styles.parameterRow}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={styles.parameterText}>
                Participants must submit their own performance.
              </Text>
            </View>
            <View style={styles.parameterRow}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={styles.parameterText}>
                The submitted video should follow the competition guidelines.
              </Text>
            </View>
            <View style={styles.parameterRow}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={styles.parameterText}>
                Entries submitted after the deadline may not be considered.
              </Text>
            </View>
            <View style={styles.parameterRow}>
              <Text style={styles.bullet}>4.</Text>
              <Text style={styles.parameterText}>
                Judges' decision will be recorded according to the stated
                judging criteria.
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default CompetitionInfoTabs;

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#16232C',
  },
  tabsContainer: {
    paddingTop: 12,
    paddingBottom: 3,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 22,
    backgroundColor: '#F5F7F7',
    borderWidth: 1,
    borderColor: '#E8EEEE',
  },
  activeTabButton: {
    backgroundColor: '#E5F5F4',
    borderColor: '#C8E8E6',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#758087',
  },
  activeTabText: {
    color: '#167C80',
    fontWeight: '800',
  },
  descriptionCard: {
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EEEE',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#182A34',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 21,
    color: '#68757D',
    marginBottom: 10,
  },
  parameterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 11,
  },
  bullet: {
    width: 22,
    fontSize: 15,
    fontWeight: '800',
    color: '#167C80',
  },
  parameterText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: '#68757D',
  },
});
