import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

interface VideoModalProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({
  visible,
  title,
  subtitle,
  videoUrl = 'https://www.youtube.com',
  thumbnailUrl,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpenExternal = async () => {
    try {
      const url = videoUrl || 'https://www.youtube.com';
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch {
      // Fallback silently
    }
  };

  const defaultThumbnail =
    thumbnailUrl ||
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.badgeText}>VIDEO PREVIEW</Text>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              {subtitle ? (
                <Text style={styles.subtitle} numberOfLines={1}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.7}
              onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Video Player Box */}
          <View style={styles.playerContainer}>
            <Image source={{ uri: defaultThumbnail }} style={styles.thumbnail} />
            <View style={styles.darkCurtain} />

            {/* Play/Pause Button */}
            <TouchableOpacity
              style={styles.playButtonLarge}
              activeOpacity={0.85}
              onPress={() => setIsPlaying(!isPlaying)}>
              <Text style={styles.playIconLarge}>{isPlaying ? '❚❚' : '▶'}</Text>
            </TouchableOpacity>

            {/* Video Controls Bar */}
            <View style={styles.controlsBar}>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    isPlaying ? styles.progressPlaying : styles.progressPaused,
                  ]}
                />
              </View>
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>
                  {isPlaying ? '01:42' : '00:15'} / 03:30
                </Text>
                <Text style={styles.qualityTag}>HD 1080p</Text>
              </View>
            </View>
          </View>

          {/* Action Row */}
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.watchFullButton}
              activeOpacity={0.85}
              onPress={handleOpenExternal}>
              <Text style={styles.watchFullText}>▶ Open Full Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dismissButton}
              activeOpacity={0.85}
              onPress={onClose}>
              <Text style={styles.dismissText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(VideoModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 20, 26, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#131F24',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#263842',
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#00C3C9',
    letterSpacing: 1,
    marginBottom: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 12,
    color: '#94A6AD',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E2D33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 14,
    color: '#C4D1D6',
    fontWeight: '700',
  },
  playerContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  darkCurtain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },
  playButtonLarge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#007B8A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
  },
  playIconLarge: {
    fontSize: 22,
    color: '#FFFFFF',
    marginLeft: 3,
  },
  controlsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00C3C9',
  },
  progressPlaying: {
    width: '65%',
  },
  progressPaused: {
    width: '20%',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  timeText: {
    fontSize: 10,
    color: '#D4DEE2',
    fontWeight: '600',
  },
  qualityTag: {
    fontSize: 9,
    color: '#00C3C9',
    fontWeight: '800',
    backgroundColor: '#152C33',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  footerRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 18,
    gap: 12,
  },
  watchFullButton: {
    flex: 2,
    height: 44,
    backgroundColor: '#007B8A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchFullText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dismissButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#1E2D33',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B0C0C6',
  },
});
