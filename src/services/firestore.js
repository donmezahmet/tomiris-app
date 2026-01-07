import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Translations collection operations
export const translationsService = {
  // Get all translations for a language
  async getTranslations(language) {
    try {
      const docRef = doc(db, 'translations', language);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching translations:', error);
      throw error;
    }
  },

  // Update translations for a language
  async updateTranslations(language, data) {
    try {
      const docRef = doc(db, 'translations', language);
      await setDoc(docRef, { ...data, lastUpdated: new Date().toISOString() }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating translations:', error);
      throw error;
    }
  },

  // Update a specific translation section
  async updateTranslationSection(language, section, data) {
    try {
      const docRef = doc(db, 'translations', language);
      await updateDoc(docRef, {
        [section]: data,
        lastUpdated: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Error updating translation section:', error);
      throw error;
    }
  },
};

// Campaigns operations
export const campaignsService = {
  async getCampaigns(language) {
    try {
      const translations = await translationsService.getTranslations(language);
      return translations?.campaigns?.items || [];
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },

  async updateCampaigns(language, campaigns) {
    try {
      await translationsService.updateTranslationSection(language, 'campaigns', {
        items: campaigns,
        lastUpdated: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Error updating campaigns:', error);
      throw error;
    }
  },
};

// Testimonials operations
export const testimonialsService = {
  async getTestimonials(language) {
    try {
      const translations = await translationsService.getTranslations(language);
      return translations?.testimonials?.items || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  async updateTestimonials(language, testimonials) {
    try {
      await translationsService.updateTranslationSection(language, 'testimonials', {
        items: testimonials,
        lastUpdated: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Error updating testimonials:', error);
      throw error;
    }
  },
};

// FAQ operations
export const faqService = {
  async getFAQ(language) {
    try {
      const translations = await translationsService.getTranslations(language);
      return translations?.faq?.questions || [];
    } catch (error) {
      console.error('Error fetching FAQ:', error);
      throw error;
    }
  },

  async updateFAQ(language, questions) {
    try {
      await translationsService.updateTranslationSection(language, 'faq', {
        questions,
        lastUpdated: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw error;
    }
  },
};

// Config operations (products, statistics, settings)
export const configService = {
  async getConfig(key) {
    try {
      const docRef = doc(db, 'config', key);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error(`Error fetching config ${key}:`, error);
      throw error;
    }
  },

  async updateConfig(key, data) {
    try {
      const docRef = doc(db, 'config', key);
      await setDoc(docRef, { ...data, lastUpdated: new Date().toISOString() }, { merge: true });
      return true;
    } catch (error) {
      console.error(`Error updating config ${key}:`, error);
      throw error;
    }
  },
};

// Statistics operations
export const statisticsService = {
  async getStatistics() {
    try {
      const config = await configService.getConfig('statistics');
      return config || {
        customers: 'X.XM',
        policies: 'XX.XM',
        partners: 'XX',
        experience: 'XX',
      };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  async updateStatistics(stats) {
    try {
      await configService.updateConfig('statistics', stats);
      return true;
    } catch (error) {
      console.error('Error updating statistics:', error);
      throw error;
    }
  },
};

// Products operations
export const productsService = {
  async getProducts() {
    try {
      const config = await configService.getConfig('products');
      return config?.items || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async updateProducts(products) {
    try {
      await configService.updateConfig('products', { items: products });
      return true;
    } catch (error) {
      console.error('Error updating products:', error);
      throw error;
    }
  },
};

