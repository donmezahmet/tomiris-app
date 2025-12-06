import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, BadgeCheck, Headphones, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import GlassCard from '../ui/GlassCard';

const features = [
  {
    key: 'ai',
    icon: Brain,
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    key: 'price',
    icon: BadgeCheck,
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    key: 'support',
    icon: Headphones,
    gradient: 'from-amber-500 to-orange-700',
  },
];

export function WhyChooseUs() {
  const { t } = useLanguage();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="why-us" className="py-12 lg:py-24 xl:py-28 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-primary-400/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-emerald-900/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-16 xl:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 lg:px-5 py-1.5 lg:py-2.5 rounded-full bg-primary-400/10 border border-primary-400/20 mb-4 lg:mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-3 h-3 lg:w-5 lg:h-5 text-primary-400" />
            <span className="text-xs lg:text-base text-primary-400 font-medium">{t('whyUs.badge')}</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-bold text-white mb-2 lg:mb-6">
            {t('whyUs.title')}
          </h2>
          <p className="text-white/60 text-sm lg:text-lg xl:text-xl max-w-3xl mx-auto px-4 lg:px-0">
            {t('whyUs.subtitle')}
          </p>
        </motion.div>

        {/* Mobile Scroll Navigation */}
        <div className="flex items-center justify-end gap-2 mb-4 lg:hidden">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white/5 text-white/50 active:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white/5 text-white/50 active:bg-white/10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features - Horizontal scroll on mobile */}
        <div 
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-3 gap-4 lg:gap-8 xl:gap-10 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.key} 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto snap-center"
            >
              <GlassCard className="p-6 lg:p-10 xl:p-12 h-full text-center group" hover={false}>
                {/* Icon */}
                <motion.div 
                  className={`w-16 h-16 lg:w-24 xl:w-28 lg:h-24 xl:h-28 rounded-2xl lg:rounded-3xl xl:rounded-[2rem] bg-gradient-to-br ${feature.gradient} p-4 lg:p-6 xl:p-7 mx-auto mb-4 lg:mb-8 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg lg:text-2xl xl:text-3xl font-heading font-semibold text-white mb-2 lg:mb-4">
                  {t(`whyUs.features.${feature.key}.title`)}
                </h3>
                <p className="text-white/60 text-sm lg:text-base xl:text-lg leading-relaxed">
                  {t(`whyUs.features.${feature.key}.description`)}
                </p>

                {/* Decorative line */}
                <div className="mt-4 lg:mt-8 h-1 w-12 lg:w-20 mx-auto rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-8 lg:mt-16 xl:mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 lg:gap-6 p-4 lg:p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-center sm:text-left">
              <p className="text-white font-medium text-sm lg:text-lg xl:text-xl">{t('whyUs.cta.title')}</p>
              <p className="text-white/60 text-xs lg:text-base">{t('whyUs.cta.subtitle')}</p>
            </div>
            <motion.button 
              className="btn-primary whitespace-nowrap text-sm lg:text-base xl:text-lg lg:px-8 lg:py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('whyUs.cta.button')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
