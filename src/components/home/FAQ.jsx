import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  
  const questions = t('faq.questions') || [];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-12 lg:py-20 bg-dark-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] lg:w-[800px] h-[250px] lg:h-[400px] bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-primary-400/10 border border-primary-400/20 mb-4 lg:mb-6">
            <HelpCircle className="w-3 h-3 lg:w-4 lg:h-4 text-primary-400" />
            <span className="text-xs lg:text-sm text-primary-400 font-medium">{t('faq.badge')}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-2 lg:mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-white/60 text-sm lg:text-base max-w-2xl mx-auto px-4 lg:px-0">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3 lg:space-y-4">
          {questions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className={`rounded-xl lg:rounded-2xl border transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-white/10 border-primary-400/30' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-4 lg:p-6 text-left"
                >
                  <span className={`font-heading font-semibold text-sm lg:text-lg pr-4 ${
                    openIndex === index ? 'text-primary-400' : 'text-white'
                  }`}>
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ${
                      openIndex === index ? 'text-primary-400' : 'text-white/50'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 lg:w-6 lg:h-6" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                        <p className="text-white/70 text-sm lg:text-base leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="text-center mt-8 lg:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/60 text-sm lg:text-base mb-3 lg:mb-4">
            {t('faq.contact.question')}
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors text-sm lg:text-base"
          >
            {t('faq.contact.link')}
            <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
