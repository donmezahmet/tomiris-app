import { motion } from 'framer-motion';
import { 
  Award, Target, Heart, 
  Sparkles, TrendingUp, Shield, Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import GlassCard from '../components/ui/GlassCard';

const valueIcons = {
  customer: Heart,
  trust: Shield,
  innovation: TrendingUp,
  speed: Clock,
};

export function About() {
  const { t } = useLanguage();

  const stats = [
    { value: 'X.XM', label: t('stats.customers'), isText: true },
    { value: 'XX.XM', label: t('stats.policies'), isText: true },
    { value: 'XX', label: t('stats.partners'), isText: true },
    { value: 'XX', label: t('stats.experience'), isText: true },
  ];

  const values = ['customer', 'trust', 'innovation', 'speed'];

  const milestones = t('about.journey.milestones') || [];
  const awards = t('about.awards.items') || [];

  return (
    <main className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] rounded-full bg-primary-400/10 blur-3xl"
            style={{ top: '0%', left: '-20%' }}
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-primary-400/10 border border-primary-400/20 mb-4 lg:mb-6">
              <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-primary-400" />
              <span className="text-xs lg:text-sm text-primary-400 font-medium">{t('about.badge')}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 lg:mb-6">
              {t('about.title')} <span className="text-gradient">{t('about.titleHighlight')}</span>
            </h1>
            
            <p className="text-base lg:text-xl text-white/60 px-4 lg:px-0">
              {t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 lg:py-16 bg-dark-950 border-y border-white/5">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl lg:text-5xl font-heading font-bold text-primary-400 mb-1 lg:mb-2">
                  {stat.value}+
                </div>
                <p className="text-white/60 text-xs lg:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 lg:py-24 bg-dark-900">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-white/5 border border-white/10 mb-4 lg:mb-6">
                <Target className="w-3 h-3 lg:w-4 lg:h-4 text-primary-400" />
                <span className="text-xs lg:text-sm text-white/70 font-medium">{t('about.mission.badge')}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 lg:mb-6">
                {t('about.mission.title')}
              </h2>
              
              <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-4 lg:mb-6">
                {t('about.mission.description1')}
              </p>
              
              <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                {t('about.mission.description2')}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-3 lg:gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {values.map((valueKey, index) => {
                const Icon = valueIcons[valueKey];
                return (
                  <GlassCard 
                    key={index} 
                    className="p-4 lg:p-6"
                    hover={false}
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary-400/10 flex items-center justify-center mb-3 lg:mb-4">
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
                    </div>
                    <h3 className="font-heading font-semibold text-white text-sm lg:text-base mb-1 lg:mb-2">
                      {t(`about.values.${valueKey}.title`)}
                    </h3>
                    <p className="text-white/60 text-xs lg:text-sm">
                      {t(`about.values.${valueKey}.description`)}
                    </p>
                  </GlassCard>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 lg:py-24 bg-dark-950">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-2 lg:mb-4">
              {t('about.journey.title')}
            </h2>
            <p className="text-white/60 text-sm lg:text-base max-w-2xl mx-auto">
              {t('about.journey.subtitle')}
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 lg:-translate-x-1/2" />

            {Array.isArray(milestones) && milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center gap-4 lg:gap-8 mb-8 lg:mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Dot */}
                <div className="absolute left-4 lg:left-1/2 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-primary-400 lg:-translate-x-1/2 z-10" />
                
                {/* Content */}
                <div className={`ml-10 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                  <span className="text-primary-400 font-heading font-bold text-lg lg:text-xl">
                    {milestone.year}
                  </span>
                  <h3 className="text-white font-heading font-semibold text-base lg:text-lg mt-1">
                    {milestone.title}
                  </h3>
                  <p className="text-white/60 text-xs lg:text-sm mt-1">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-12 lg:py-24 bg-dark-900">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-primary-400/10 border border-primary-400/20 mb-4 lg:mb-6">
              <Award className="w-3 h-3 lg:w-4 lg:h-4 text-primary-400" />
              <span className="text-xs lg:text-sm text-primary-400 font-medium">{t('about.awards.badge')}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-2 lg:mb-4">
              {t('about.awards.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {Array.isArray(awards) && awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-5 lg:p-6 text-center" hover={false}>
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-primary-400/10 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <Award className="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm lg:text-base mb-1">
                    {award.title}
                  </h3>
                  <p className="text-white/60 text-xs lg:text-sm">{award.subtitle}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
