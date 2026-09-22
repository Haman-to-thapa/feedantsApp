import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface WinnerItem {
  name: string;
  position: string;
  initials: string;
}

const defaultWinners: WinnerItem[] = [
  {name: 'Aarushi Sharma', position: '1st Winner', initials: 'AS'},
  {name: 'Riya Kapoor', position: '2nd Winner', initials: 'RK'},
  {name: 'Priya Nair', position: '3rd Winner', initials: 'PN'},
  {name: 'Meera Singh', position: '4th Winner', initials: 'MS'},
];

interface PreviousWinnersProps {
  winners?: WinnerItem[];
  onPressSeeAll?: () => void;
}

const PreviousWinners: React.FC<PreviousWinnersProps> = ({
  winners = defaultWinners,
  onPressSeeAll,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Previous Winners</Text>

        <TouchableOpacity onPress={onPressSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.winnersContainer}>
        {winners.map(w => (
          <View key={w.name} style={styles.winnerCard}>
            <View style={styles.winnerImage}>
              <Text style={styles.winnerInitial}>{w.initials}</Text>
            </View>

            <Text style={styles.winnerName}>{w.name}</Text>
            <Text style={styles.winnerPosition}>{w.position}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PreviousWinners;

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#16232C',
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: '#167C80',
  },
  winnersContainer: {
    paddingRight: 10,
  },
  winnerCard: {
    width: 145,
    marginRight: 12,
    padding: 11,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EEEE',
  },
  winnerImage: {
    width: 123,
    height: 115,
    borderRadius: 13,
    backgroundColor: '#E7F4F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerInitial: {
    fontSize: 28,
    fontWeight: '800',
    color: '#167C80',
  },
  winnerName: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#1B2A33',
  },
  winnerPosition: {
    marginTop: 4,
    fontSize: 11,
    color: '#75828A',
  },
});
