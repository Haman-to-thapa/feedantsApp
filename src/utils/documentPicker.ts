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
        throw new Error(
          'Document picker package not installed. Run: npm install @react-native-documents/picker',
        );
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
