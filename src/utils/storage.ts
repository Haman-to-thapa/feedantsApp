// Robust AsyncStorage adapter with fallback support
let storageInstance: {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
};

try {
  const AsyncStorageModule = require('@react-native-async-storage/async-storage');
  storageInstance = AsyncStorageModule.default || AsyncStorageModule;
} catch {
  // Graceful in-memory fallback until npm install completes
  const memoryCache: Record<string, string> = {};
  storageInstance = {
    getItem: async (key: string): Promise<string | null> => {
      return memoryCache[key] ?? null;
    },
    setItem: async (key: string, value: string): Promise<void> => {
      memoryCache[key] = value;
    },
    removeItem: async (key: string): Promise<void> => {
      delete memoryCache[key];
    },
    clear: async (): Promise<void> => {
      Object.keys(memoryCache).forEach(k => delete memoryCache[k]);
    },
  };
}

export default storageInstance;
