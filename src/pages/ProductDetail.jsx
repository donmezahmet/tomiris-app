import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, Shield, Heart, Plane, Home, PawPrint, 
  Smartphone, Check, ArrowRight, Phone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

const productData = {
  traffic: {
    icon: Car,
    gradient: 'from-blue-500 to-blue-700',
    coverages: {
      tr: [
        'Maddi hasar teminatı',
        'Bedeni hasar teminatı',
        'Ölüm teminatı',
        'Tedavi masrafları',
        'Sürekli sakatlık teminatı',
      ],
      en: [
        'Material damage coverage',
        'Bodily injury coverage',
        'Death coverage',
        'Medical expenses',
        'Permanent disability coverage',
      ],
    },
  },
  kasko: {
    icon: Shield,
    gradient: 'from-emerald-500 to-emerald-700',
    coverages: {
      tr: [
        'Tam kasko teminatı',
        'Çarpma, çarpışma',
        'Yangın',
        'Hırsızlık',
        'Doğal afetler',
        'Cam kırılması',
        'Yol yardım',
      ],
      en: [
        'Full comprehensive coverage',
        'Collision',
        'Fire',
        'Theft',
        'Natural disasters',
        'Glass breakage',
        'Roadside assistance',
      ],
    },
  },
  health: {
    icon: Heart,
    gradient: 'from-red-500 to-red-700',
    coverages: {
      tr: [
        'Yatarak tedavi',
        'Ayakta tedavi',
        'Ameliyat masrafları',
        'İlaç masrafları',
        'Laboratuvar tetkikleri',
      ],
      en: [
        'Inpatient treatment',
        'Outpatient treatment',
        'Surgery expenses',
        'Medication expenses',
        'Laboratory tests',
      ],
    },
  },
  travel: {
    icon: Plane,
    gradient: 'from-purple-500 to-purple-700',
    coverages: {
      tr: [
        'Sağlık giderleri',
        'Bagaj kaybı',
        'Uçuş iptali',
        'Kaza sonucu sakatlık',
        'Tıbbi tahliye',
      ],
      en: [
        'Medical expenses',
        'Lost baggage',
        'Flight cancellation',
        'Accident disability',
        'Medical evacuation',
      ],
    },
  },
  dask: {
    icon: Home,
    gradient: 'from-orange-500 to-orange-700',
    coverages: {
      tr: [
        'Deprem hasarı',
        'Yangın (deprem kaynaklı)',
        'İnfilak',
        'Yer kayması',
        'Tsunami',
      ],
      en: [
        'Earthquake damage',
        'Fire (earthquake-related)',
        'Explosion',
        'Landslide',
        'Tsunami',
      ],
    },
  },
  home: {
    icon: Home,
    gradient: 'from-yellow-500 to-yellow-700',
    coverages: {
      tr: [
        'Yangın',
        'Hırsızlık',
        'Su hasarı',
        'Cam kırılması',
        'Elektronik cihaz',
        'Deprem (isteğe bağlı)',
      ],
      en: [
        'Fire',
        'Theft',
        'Water damage',
        'Glass breakage',
        'Electronic devices',
        'Earthquake (optional)',
      ],
    },
  },
  pet: {
    icon: PawPrint,
    gradient: 'from-pink-500 to-pink-700',
    coverages: {
      tr: [
        'Veteriner masrafları',
        'Ameliyat giderleri',
        'Aşı ve kontroller',
        'Acil tedavi',
        'Kayıp arama',
      ],
      en: [
        'Veterinary expenses',
        'Surgery costs',
        'Vaccinations and checkups',
        'Emergency treatment',
        'Lost pet search',
      ],
    },
  },
  phone: {
    icon: Smartphone,
    gradient: 'from-cyan-500 to-cyan-700',
    coverages: {
      tr: [
        'Ekran kırılması',
        'Sıvı hasarı',
        'Hırsızlık',
        'Garanti uzatma',
        'Düşme hasarı',
      ],
      en: [
        'Screen breakage',
        'Liquid damage',
        'Theft',
        'Extended warranty',
        'Drop damage',
      ],
    },
  },
};

export function ProductDetail() {
  const { productId } = useParams();
  const { t, language } = useLanguage();
  
  const product = productData[productId] || productData.traffic;
  const ProductIcon = product.icon;
  const coverages = product.coverages[language] || product.coverages.tr;

  return (
    <main className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full bg-primary-400/10 blur-3xl"
            style={{ top: '20%', right: '-10%' }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className={`inline-flex w-16 h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl bg-gradient-to-br ${product.gradient} p-4 lg:p-5 mb-4 lg:mb-6 shadow-lg`}>
                <ProductIcon className="w-full h-full text-white" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 lg:mb-4">
                {t(`products.${productId}`)}
              </h1>
              
              <p className="text-base lg:text-xl text-white/60 mb-6 lg:mb-8 px-4 lg:px-0">
                {t('productDetail.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto min-h-[48px]">
                  {t('common.getQuote')}
                </Button>
                <Button variant="secondary" size="lg" icon={Phone} className="w-full sm:w-auto min-h-[48px]">
                  {t('nav.phone')}
                </Button>
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-5 lg:p-8" hover={false}>
                <h2 className="text-xl lg:text-2xl font-heading font-bold text-white mb-5 lg:mb-6">
                  {t('productDetail.getQuote')}
                </h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('productDetail.form.tcNo')}</label>
                    <input 
                      type="text" 
                      placeholder={t('productDetail.form.tcPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors text-sm lg:text-base min-h-[48px]"
                    />
                  </div>

                  {(productId === 'traffic' || productId === 'kasko') && (
                    <div>
                      <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('productDetail.form.plate')}</label>
                      <input 
                        type="text" 
                        placeholder={t('productDetail.form.platePlaceholder')}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors text-sm lg:text-base min-h-[48px]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('productDetail.form.phone')}</label>
                    <input 
                      type="tel" 
                      placeholder={t('productDetail.form.phonePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors text-sm lg:text-base min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('productDetail.form.email')}</label>
                    <input 
                      type="email" 
                      placeholder={t('productDetail.form.emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors text-sm lg:text-base min-h-[48px]"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="consent"
                      className="w-5 h-5 rounded bg-white/5 border-white/20 text-primary-400 focus:ring-primary-400 focus:ring-offset-0 mt-0.5 min-w-[20px]"
                    />
                    <label htmlFor="consent" className="text-white/50 text-xs lg:text-sm">
                      {t('productDetail.form.consent')}
                    </label>
                  </div>

                  <Button variant="primary" className="w-full mt-4 min-h-[48px] lg:min-h-[52px]">
                    {t('productDetail.form.submit')}
                  </Button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-12 lg:py-24 bg-dark-900">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-2 lg:mb-4">
              {t('productDetail.coverage.title')}
            </h2>
            <p className="text-white/60 text-sm lg:text-base max-w-2xl mx-auto px-4 lg:px-0">
              {t(`products.${productId}`)} {t('productDetail.coverage.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 max-w-4xl mx-auto">
            {coverages.map((coverage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 lg:p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Check className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <span className="text-white text-sm lg:text-base">{coverage}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-primary-400/10 via-emerald-900/10 to-primary-400/10">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white mb-3 lg:mb-4">
              {t('productDetail.cta.title')}
            </h2>
            <p className="text-white/60 text-sm lg:text-base mb-5 lg:mb-6">
              {t('productDetail.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4">
              <Button variant="primary" icon={Phone} className="w-full sm:w-auto min-h-[48px]">
                {t('nav.phone')}
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto min-h-[48px]">
                {t('productDetail.cta.whatsapp')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
