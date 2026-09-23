import React, {createContext, useContext, useState, useMemo, useCallback} from 'react';
import {translations, Language, TranslationKey, localizeDynamic} from '../localization/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  localize: (text: string) => string;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      const dict = translations[language] || translations.en;
      let text = dict[key] || translations.en[key] || (key as string);

      if (params) {
        Object.entries(params).forEach(([placeholder, value]) => {
          text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), String(value));
        });
      }

      return text;
    },
    [language],
  );

  const localize = useCallback(
    (text: string): string => {
      return localizeDynamic(text, language);
    },
    [language],
  );

  const isHindi = language === 'hi';

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      localize,
      isHindi,
    }),
    [language, toggleLanguage, t, localize, isHindi],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
