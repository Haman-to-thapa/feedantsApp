import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

interface VideoUploadModalProps {
  visible: boolean;
  onClose: () => void;
  onUpload: (file: {
    uri: string;
    name: string;
    type: string;
    size: number;
  }) => Promise<boolean>;
}

const PRESET_VIDEOS = [
  {
    id: '1',
    name: 'Classical_Kathak_Performance.mp4',
    sizeLabel: '24.5 MB',
    sizeBytes: 24500000,
    tag: 'Kathak Solo',
  },
  {
    id: '2',
    name: 'Bharatanatyam_Varnam_Dance.mp4',
    sizeLabel: '36.8 MB',
    sizeBytes: 36800000,
    tag: 'Bharatanatyam',
  },
  {
    id: '3',
    name: 'Semi_Classical_Fusion_Routine.mp4',
    sizeLabel: '18.2 MB',
    sizeBytes: 18200000,
    tag: 'Semi-Classical',
  },
];

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
  visible,
  onClose,
  onUpload,
}) => {
  const {t} = useLanguage();

  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [customFileName, setCustomFileName] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const activeName = isCustom
    ? customFileName.trim() || 'My_Classical_Dance.mp4'
    : PRESET_VIDEOS[selectedPreset].name;

  const activeSize = isCustom
    ? 22000000
    : PRESET_VIDEOS[selectedPreset].sizeBytes;

  const handleStartUpload = async () => {
    try {
      setUploading(true);
      setProgress(15);

      // Smooth realistic progress animation
      await new Promise(resolve => setTimeout(() => resolve(true), 250));
      setProgress(45);
      await new Promise(resolve => setTimeout(() => resolve(true), 350));
      setProgress(85);

      const success = await onUpload({
        uri: `file://storage/emulated/0/Movies/${activeName}`,
        name: activeName.endsWith('.mp4') ? activeName : `${activeName}.mp4`,
        type: 'video/mp4',
        size: activeSize,
      });

      if (success) {
        setProgress(100);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setUploading(false);
          setProgress(0);
          onClose();
        }, 1200);
      } else {
        setUploading(false);
        setProgress(0);
      }
    } catch {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleClose = () => {
    if (uploading) return;
    setIsSuccess(false);
    setProgress(0);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{t('uploadModalTitle')}</Text>
              <Text style={styles.subtitle}>{t('uploadModalSubtitle')}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={handleClose}
              disabled={uploading}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {isSuccess ? (
            <View style={styles.successContainer}>
              <View style={styles.successIconCircle}>
                <Text style={styles.successCheck}>✓</Text>
              </View>
              <Text style={styles.successTitle}>
                {t('videoSubmittedSuccess')}
              </Text>
              <Text style={styles.successDesc}>
                {t('videoUploadedSuccessMsg')}
              </Text>
            </View>
          ) : (
            <View>
              {/* Selected Video Card Preview */}
              <View style={styles.videoPreviewCard}>
                <View style={styles.videoIconBox}>
                  <Text style={styles.videoIcon}>🎥</Text>
                </View>
                <View style={styles.videoMeta}>
                  <Text style={styles.videoName} numberOfLines={1}>
                    {activeName}
                  </Text>
                  <Text style={styles.videoDetails}>
                    {isCustom
                      ? '22.0 MB • MP4'
                      : PRESET_VIDEOS[selectedPreset].sizeLabel}{' '}
                    • {t('videoQuality')}
                  </Text>
                </View>
              </View>

              {/* Preset Selector */}
              <Text style={styles.sectionLabel}>{t('chooseVideoPrompt')}:</Text>
              <View style={styles.presetRow}>
                {PRESET_VIDEOS.map((preset, idx) => (
                  <TouchableOpacity
                    key={preset.id}
                    style={[
                      styles.presetPill,
                      !isCustom && selectedPreset === idx && styles.presetPillActive,
                    ]}
                    onPress={() => {
                      setIsCustom(false);
                      setSelectedPreset(idx);
                    }}>
                    <Text
                      style={[
                        styles.presetText,
                        !isCustom &&
                          selectedPreset === idx &&
                          styles.presetTextActive,
                      ]}>
                      {preset.tag}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[
                    styles.presetPill,
                    isCustom && styles.presetPillActive,
                  ]}
                  onPress={() => setIsCustom(true)}>
                  <Text
                    style={[
                      styles.presetText,
                      isCustom && styles.presetTextActive,
                    ]}>
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Custom File Name Input if selected */}
              {isCustom && (
                <View style={styles.customInputContainer}>
                  <Text style={styles.inputLabel}>{t('videoNameLabel')}:</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. My_Kathak_Performance.mp4"
                    placeholderTextColor="#A0AEC0"
                    value={customFileName}
                    onChangeText={setCustomFileName}
                    editable={!uploading}
                  />
                </View>
              )}

              {/* Guidelines */}
              <View style={styles.guidelinesBox}>
                <Text style={styles.guidelineItem}>✓ {t('guideline1')}</Text>
                <Text style={styles.guidelineItem}>✓ {t('guideline2')}</Text>
                <Text style={styles.guidelineItem}>✓ {t('guideline3')}</Text>
              </View>

              {/* Upload Progress Bar (when active) */}
              {uploading && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {width: `${Math.min(progress, 100)}%`},
                      ]}
                    />
                  </View>
                  <View style={styles.progressTextRow}>
                    <Text style={styles.progressStatusText}>
                      {t('uploadingToBackend')}
                    </Text>
                    <Text style={styles.progressPercentText}>{progress}%</Text>
                  </View>
                </View>
              )}

              {/* Upload Action Button */}
              <TouchableOpacity
                style={[
                  styles.uploadBtn,
                  uploading && styles.uploadBtnDisabled,
                ]}
                activeOpacity={0.85}
                disabled={uploading}
                onPress={handleStartUpload}>
                {uploading ? (
                  <View style={styles.loadingRow}>
                    <ActivityIndicator color="#FFFFFF" size="small" />
                    <Text style={styles.uploadBtnText}>
                      {' '}
                      {t('uploadingToBackend')}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.uploadBtnText}>
                    🚀 {t('confirmUploadBtn')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default VideoUploadModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#181928',
  },
  subtitle: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  closeText: {
    fontSize: 18,
    color: '#A0AEC0',
    fontWeight: '700',
  },
  videoPreviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  videoIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  videoIcon: {
    fontSize: 24,
  },
  videoMeta: {
    flex: 1,
  },
  videoName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  videoDetails: {
    fontSize: 12,
    color: '#718096',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 8,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  presetPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  presetPillActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  presetText: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '600',
  },
  presetTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  customInputContainer: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#718096',
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1E293B',
  },
  guidelinesBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  guidelineItem: {
    fontSize: 12,
    color: '#166534',
    marginBottom: 4,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 14,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStatusText: {
    fontSize: 11,
    color: '#718096',
    fontWeight: '500',
  },
  progressPercentText: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '700',
  },
  uploadBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadBtnDisabled: {
    backgroundColor: '#A5B4FC',
  },
  uploadBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DCFCE7',
    borderWidth: 2,
    borderColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successCheck: {
    fontSize: 32,
    color: '#16A34A',
    fontWeight: '800',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#181928',
    marginBottom: 6,
  },
  successDesc: {
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
  },
});
