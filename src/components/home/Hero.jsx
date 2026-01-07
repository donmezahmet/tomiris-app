import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Car, Heart, Home, Plane, Smartphone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { statisticsService } from '../../services/firestore';
import Button from '../ui/Button';

const floatingIcons = [
  { icon: Shield, color: 'from-blue-400 to-blue-600', delay: 0, x: '10%', y: '20%' },
  { icon: Car, color: 'from-green-400 to-green-600', delay: 0.5, x: '85%', y: '15%' },
  { icon: Heart, color: 'from-red-400 to-red-600', delay: 1, x: '75%', y: '70%' },
  { icon: Home, color: 'from-yellow-400 to-yellow-600', delay: 1.5, x: '5%', y: '65%' },
  { icon: Plane, color: 'from-purple-400 to-purple-600', delay: 2, x: '90%', y: '45%' },
  { icon: Smartphone, color: 'from-pink-400 to-pink-600', delay: 2.5, x: '15%', y: '85%' },
];

export function Hero() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    customers: 'X.XM',
    policies: 'XX.XM',
    partners: 'XX',
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await statisticsService.getStatistics();
        if (data) {
          setStats(data);
        }
      } catch (error) {
        console.error('Error loading statistics from Firestore, using fallback:', error);
      }
    };

    loadStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[400px] lg:w-[700px] xl:w-[800px] h-[400px] lg:h-[700px] xl:h-[800px] rounded-full bg-primary-400/10 blur-3xl"
          style={{ top: '10%', left: '-10%' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[300px] lg:w-[600px] xl:w-[700px] h-[300px] lg:h-[600px] xl:h-[700px] rounded-full bg-emerald-900/30 blur-3xl"
          style={{ bottom: '10%', right: '-5%' }}
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating Icons - Hidden on mobile */}
      <div className="absolute inset-0 hidden lg:block">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay, duration: 0.5 }}
          >
            <motion.div
              className={`w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-gradient-to-br ${item.color} p-3 xl:p-4 shadow-lg`}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
            >
              <item.icon className="w-full h-full text-white" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 lg:pt-24 pb-12 lg:pb-16">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-4 lg:mb-8">
            <span className="inline-flex items-center gap-2 px-3 lg:px-5 py-1.5 lg:py-2.5 rounded-full bg-white/5 border border-white/10 text-xs lg:text-sm text-white/80">
              <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-400 animate-pulse" />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-heading font-bold text-white mb-4 lg:mb-8 leading-tight"
          >
            {t('hero.title')}{' '}
            <span className="text-gradient">{t('hero.titleHighlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-primary-400 font-medium mb-3 lg:mb-6"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/60 max-w-3xl mx-auto mb-6 lg:mb-10 px-4 lg:px-0"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-5 mb-8 lg:mb-14 px-4 lg:px-0"
          >
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto lg:px-8 lg:py-4 lg:text-lg">
              {t('hero.cta')}
            </Button>
            <Button variant="secondary" size="lg" icon={Play} className="w-full sm:w-auto lg:px-8 lg:py-4 lg:text-lg">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-3 lg:gap-12 xl:gap-16 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-0.5 lg:mb-2">
                {stats.customers}+
              </div>
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-white/50">{t('hero.stats.customers')}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-0.5 lg:mb-2">
                {stats.policies}+
              </div>
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-white/50">{t('hero.stats.policies')}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-0.5 lg:mb-2">
                {stats.partners}+
              </div>
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-white/50">{t('hero.stats.companies')}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - Hidden on mobile */}
        <motion.div 
          className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-primary-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
