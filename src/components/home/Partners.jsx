import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Simulated partner logos (using text placeholders since we don't have actual logos)
const partners = [
  { id: 1, name: 'Xxx Sigorta', color: '#003781' },
  { id: 2, name: 'Yyy Sigorta', color: '#00008F' },
  { id: 3, name: 'Zzz Sigorta', color: '#E30613' },
  { id: 4, name: 'Aaa Sigorta', color: '#E4002B' },
  { id: 5, name: 'Bbb Sigorta', color: '#DA291C' },
  { id: 6, name: 'Ccc Sigorta', color: '#006747' },
  { id: 7, name: 'Ddd Sigorta', color: '#ED1C24' },
  { id: 8, name: 'Eee Sigorta', color: '#003399' },
  { id: 9, name: 'Fff Sigorta', color: '#00A651' },
  { id: 10, name: 'Ggg Sigorta', color: '#E60012' },
  { id: 11, name: 'Hhh Sigorta', color: '#F7941D' },
  { id: 12, name: 'Iii Sigorta', color: '#1E3A8A' },
];

export function Partners() {
  const { t } = useLanguage();

  return (
    <section id="partners" className="py-12 lg:py-20 bg-dark-950 border-y border-white/5">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-2 lg:mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-white/60 text-sm lg:text-base max-w-2xl mx-auto px-4 lg:px-0">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <div className="aspect-[3/2] rounded-lg lg:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 lg:p-4 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-glow-sm">
                <div 
                  className="text-xs sm:text-sm lg:text-lg font-heading font-bold opacity-50 group-hover:opacity-100 transition-opacity text-center"
                  style={{ color: partner.color }}
                >
                  {partner.name}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="mt-8 lg:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-white/50">
            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs lg:text-sm">{t('partners.trustBadges.tobb')}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className="text-xs lg:text-sm">{t('partners.trustBadges.ssl')}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="text-xs lg:text-sm">{t('partners.trustBadges.kvkk')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Partners;
