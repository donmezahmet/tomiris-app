import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Building2, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { statisticsService } from '../../services/firestore';

const statsConfig = [
  {
    key: 'customers',
    icon: Users,
  },
  {
    key: 'policies',
    icon: FileText,
  },
  {
    key: 'partners',
    icon: Building2,
  },
  {
    key: 'experience',
    icon: Award,
  },
];

export function Statistics() {
  const { t } = useLanguage();
  const [statsData, setStatsData] = useState({
    customers: 'X.XM',
    policies: 'XX.XM',
    partners: 'XX',
    experience: 'XX',
  });

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const data = await statisticsService.getStatistics();
        if (data) {
          setStatsData(data);
        }
      } catch (error) {
        console.error('Error loading statistics from Firestore, using fallback:', error);
        // Keep using fallback values
      }
    };

    loadStatistics();
  }, []);

  const stats = statsConfig.map((stat) => ({
    ...stat,
    value: statsData[stat.key] || 'XX',
  }));

  return (
    <section id="stats" className="py-12 lg:py-24 xl:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 via-emerald-900/10 to-primary-400/10" />
      <div className="absolute inset-0 bg-dark-900/90" />

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div 
          className="text-center mb-8 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-bold text-white mb-2 lg:mb-4">
            {t('stats.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 xl:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              className="text-center p-4 lg:p-8 xl:p-10 rounded-xl lg:rounded-2xl xl:rounded-3xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 lg:w-16 xl:w-20 lg:h-16 xl:h-20 rounded-xl lg:rounded-2xl xl:rounded-3xl bg-primary-400/10 flex items-center justify-center mx-auto mb-3 lg:mb-6">
                <stat.icon className="w-5 h-5 lg:w-8 xl:w-10 lg:h-8 xl:h-10 text-primary-400" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-1 lg:mb-3">
                {stat.value}+
              </div>
              <p className="text-white/60 text-xs lg:text-base xl:text-lg">{t(`stats.${stat.key}`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
