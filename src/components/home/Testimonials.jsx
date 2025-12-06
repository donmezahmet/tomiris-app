import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Testimonials() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const testimonials = t('testimonials.items') || [];

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    const maxIndex = window.innerWidth >= 1024 ? Math.max(0, testimonials.length - 3) : testimonials.length - 1;
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
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

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-12 lg:py-20 bg-dark-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-primary-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 lg:w-96 h-64 lg:h-96 bg-emerald-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-2 lg:mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-white/60 text-sm lg:text-base max-w-2xl mx-auto px-4 lg:px-0">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div 
              className="flex gap-4 lg:gap-6"
              animate={{ 
                x: window.innerWidth >= 1024 
                  ? `-${currentIndex * (100 / 3)}%` 
                  : `-${currentIndex * 100}%` 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="w-full lg:w-1/3 flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-full p-5 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 lg:w-10 lg:h-10 text-primary-400/30 mb-3 lg:mb-4" />

                    {/* Rating */}
                    <div className="flex items-center gap-0.5 lg:gap-1 mb-3 lg:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 text-primary-400 fill-primary-400" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-4 lg:mb-6 line-clamp-4 lg:line-clamp-none">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-dark-900 font-semibold text-sm lg:text-base">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm lg:text-base">{testimonial.name}</p>
                        <p className="text-white/50 text-xs lg:text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 lg:gap-4 mt-6 lg:mt-8">
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            
            <div className="flex items-center gap-1.5 lg:gap-2">
              {testimonials.map((_, index) => {
                const isVisible = window.innerWidth >= 1024 
                  ? index <= Math.max(0, testimonials.length - 3)
                  : true;
                if (!isVisible) return null;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 lg:h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-5 lg:w-6 bg-primary-400' 
                        : 'w-1.5 lg:w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={goToNext}
              disabled={currentIndex >= (window.innerWidth >= 1024 ? testimonials.length - 3 : testimonials.length - 1)}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
