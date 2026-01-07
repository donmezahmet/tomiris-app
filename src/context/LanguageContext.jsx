import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations as staticTranslations } from '../data/translations';
import { translationsService } from '../services/firestore';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('tr');
  const [translations, setTranslations] = useState(staticTranslations);
  const [loading, setLoading] = useState(true);

  // Fetch translations from Firestore on mount and language change
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const firestoreTranslations = await translationsService.getTranslations(language);
        
        if (firestoreTranslations) {
          setTranslations((prev) => ({
            ...prev,
            [language]: firestoreTranslations,
          }));
        }
      } catch (error) {
        console.error('Error loading translations from Firestore, using static fallback:', error);
        // Keep using static translations as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'tr' ? 'en' : 'tr'));
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations[language];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [language, translations]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;

