import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Gift, Percent, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';

const campaignIcons = [Users, Percent, Gift];
const campaignGradients = [
  'from-violet-600 to-purple-800',
  'from-emerald-600 to-teal-800',
  'from-amber-600 to-orange-800',
];

export function Campaigns() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const campaigns = t('campaigns.items') || [];

  useEffect(() => {
    if (campaigns.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [campaigns.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + campaigns.length) % campaigns.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % campaigns.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  if (!Array.isArray(campaigns) || campaigns.length === 0) {
    return null;
  }

  const currentCampaign = campaigns[currentIndex];
  const CurrentIcon = campaignIcons[currentIndex % campaignIcons.length];
  const currentGradient = campaignGradients[currentIndex % campaignGradients.length];

  return (
    <section id="campaigns" className="py-12 lg:py-20 bg-dark-950 relative overflow-hidden">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-2 lg:mb-4">
            {t('campaigns.title')}
          </h2>
          <p className="text-white/60 text-sm lg:text-base max-w-2xl mx-auto px-4 lg:px-0">
            {t('campaigns.subtitle')}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Campaign Card */}
          <div 
            className="relative h-[320px] sm:h-[300px] lg:h-[350px] overflow-hidden rounded-2xl lg:rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className={`absolute inset-0 bg-gradient-to-br ${currentGradient} p-6 sm:p-8 lg:p-12`}
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    {/* Icon */}
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 lg:mb-6">
                      <CurrentIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white mb-1 lg:mb-2">
                      {currentCampaign.title}
                    </h3>
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium mb-2 lg:mb-4">
                      {currentCampaign.subtitle}
                    </p>
                    <p className="text-white/70 text-sm lg:text-base max-w-md">
                      {currentCampaign.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-4 mt-4 lg:mt-6">
                    <Button 
                      variant="secondary" 
                      className="bg-white/20 hover:bg-white/30 border-white/30 text-sm lg:text-base"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      {currentCampaign.cta}
                    </Button>
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -right-16 lg:-right-20 -bottom-16 lg:-bottom-20 w-48 lg:w-64 h-48 lg:h-64 rounded-full bg-white/10" />
                <div className="absolute -right-8 lg:-right-10 -bottom-8 lg:-bottom-10 w-32 lg:w-40 h-32 lg:h-40 rounded-full bg-white/10" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons - Hidden on mobile (use swipe) */}
          <button
            onClick={goToPrevious}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-4 lg:mt-6">
            {campaigns.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-6 lg:w-8 bg-primary-400' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div 
          className="text-center mt-6 lg:mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a 
            href="/campaigns" 
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors text-sm lg:text-base"
          >
            {t('campaigns.viewAll')}
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Campaigns;
