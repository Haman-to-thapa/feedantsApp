import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

interface WinnerItem {
  name: string;
  position: string;
  imageUrl: string;
}

const winnersData: WinnerItem[] = [
  {
    name: 'Riya Shah',
    position: '1st Winner',
    imageUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Aarav Mehta',
    position: '1st Winner',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Neha Verma',
    position: '2nd Winner',
    imageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Ishita Chouhan',
    position: '3rd Winner',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
];

interface PreviousWinnersProps {
  onPressWinnerVideo?: (winner: WinnerItem) => void;
}

const PreviousWinners: React.FC<PreviousWinnersProps> = ({
  onPressWinnerVideo,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Previous Winners</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}>
        {winnersData.map(w => (
          <TouchableOpacity
            key={w.name}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => onPressWinnerVideo?.(w)}>
            <View style={styles.imageWrapper}>
              <Image source={{uri: w.imageUrl}} style={styles.image} />
              <View style={styles.playBadge}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </View>

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {w.name}
              </Text>
              <Text style={styles.position}>{w.position}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default React.memo(PreviousWinners);

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16232C',
    marginBottom: 8,
  },
  scrollList: {
    paddingRight: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAEFEF',
    padding: 7,
    marginRight: 10,
    width: 145,
  },
  imageWrapper: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playBadge: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#007B8A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  playIcon: {
    fontSize: 7,
    color: '#FFFFFF',
    marginLeft: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16232C',
  },
  position: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '700',
    color: '#007B8A',
  },
});
