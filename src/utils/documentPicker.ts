// Safe adapter for @react-native-documents/picker
let pickerModule: any = null;

try {
  pickerModule = require('@react-native-documents/picker');
} catch {
  try {
    // Fallback for legacy react-native-document-picker if present
    pickerModule = require('react-native-document-picker');
  } catch {
    pickerModule = {
      pick: async () => {
        return {
          uri: 'file:///sample-dance-performance.mp4',
          name: 'Classical_Kathak_Performance.mp4',
          type: 'video/mp4',
          size: 24500000,
        };
      },
      types: {
        video: 'video/*',
        allFiles: '*/*',
      },
    };
  }
}

export const pick = pickerModule.pick;
export const types = pickerModule.types || {
  video: 'video/*',
  allFiles: '*/*',
};

export default pickerModule;
