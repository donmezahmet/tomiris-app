import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, 
  MessageSquare, Send, Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

export function Contact() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      titleKey: 'phone',
      href: 'tel:4440XXX',
    },
    {
      icon: Mail,
      titleKey: 'email',
      href: 'mailto:info@tomirissigorta.com',
    },
    {
      icon: MapPin,
      titleKey: 'address',
      href: '#',
    },
    {
      icon: Clock,
      titleKey: 'hours',
      href: '#',
    },
  ];

  const subjects = t('contact.form.subjects') || {};

  return (
    <main className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full bg-primary-400/10 blur-3xl"
            style={{ bottom: '-20%', right: '-10%' }}
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
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
              <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4 text-primary-400" />
              <span className="text-xs lg:text-sm text-primary-400 font-medium">{t('contact.badge')}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 lg:mb-6">
              {t('contact.title')} <span className="text-gradient">{t('contact.titleHighlight')}</span>
            </h1>
            
            <p className="text-base lg:text-xl text-white/60 px-4 lg:px-0">
              {t('contact.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 lg:py-12 bg-dark-950">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-4 lg:p-6 text-center h-full">
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-primary-400/10 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <item.icon className="w-5 h-5 lg:w-7 lg:h-7 text-primary-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm lg:text-base mb-1">
                    {t(`contact.info.${item.titleKey}.title`)}
                  </h3>
                  <p className="text-primary-400 font-medium text-xs lg:text-sm mb-0.5 lg:mb-1">
                    {t(`contact.info.${item.titleKey}.value`)}
                  </p>
                  <p className="text-white/50 text-[10px] lg:text-sm hidden sm:block">
                    {t(`contact.info.${item.titleKey}.description`)}
                  </p>
                </GlassCard>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 lg:py-24 bg-dark-900">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-5 lg:p-8" hover={false}>
                <h2 className="text-xl lg:text-2xl font-heading font-bold text-white mb-5 lg:mb-6">
                  {t('contact.form.title')}
                </h2>
                
                <form className="space-y-4 lg:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                    <div>
                      <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('contact.form.name')}</label>
                      <input 
                        type="text" 
                        placeholder={t('contact.form.namePlaceholder')}
                        className="w-full px-4 py-3 lg:py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors text-sm lg:text-base min-h-[48px]"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('contact.form.phone')}</label>
                      <input 
                        type="tel" 
                        placeholder={t('contact.form.phonePlaceholder')}
                        className="w-full px-4 py-3 lg:py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors text-sm lg:text-base min-h-[48px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('contact.form.email')}</label>
                    <input 
                      type="email" 
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full px-4 py-3 lg:py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors text-sm lg:text-base min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('contact.form.subject')}</label>
                    <select className="w-full px-4 py-3 lg:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-400 transition-colors text-sm lg:text-base min-h-[48px]">
                      <option value="" className="bg-dark-800">{t('contact.form.subjectPlaceholder')}</option>
                      {Object.entries(subjects).map(([key, value]) => (
                        <option key={key} value={key} className="bg-dark-800">{value}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs lg:text-sm mb-1.5 lg:mb-2">{t('contact.form.message')}</label>
                    <textarea 
                      rows="4"
                      placeholder={t('contact.form.messagePlaceholder')}
                      className="w-full px-4 py-3 lg:py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary-400 transition-colors resize-none text-sm lg:text-base"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      id="privacy"
                      className="w-5 h-5 lg:w-5 lg:h-5 rounded bg-white/5 border-white/20 text-primary-400 focus:ring-primary-400 focus:ring-offset-0 mt-0.5 min-w-[20px]"
                    />
                    <label htmlFor="privacy" className="text-white/50 text-xs lg:text-sm">
                      {t('contact.form.consent')}
                    </label>
                  </div>

                  <Button variant="primary" className="w-full min-h-[48px] lg:min-h-[52px]" icon={Send} iconPosition="right">
                    {t('contact.form.submit')}
                  </Button>
                </form>
              </GlassCard>
            </motion.div>

            {/* Map / Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-6"
            >
              {/* Map placeholder */}
              <div className="aspect-video rounded-xl lg:rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900000003!2d29.0556!3d40.9889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU5JzIwLjAiTiAyOcKwMDMnMjAuMiJF!5e0!3m2!1str!2str!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick actions */}
              <GlassCard className="p-4 lg:p-6" hover={false}>
                <h3 className="font-heading font-semibold text-white text-sm lg:text-base mb-3 lg:mb-4">
                  {t('contact.quickAccess.title')}
                </h3>
                <div className="space-y-2 lg:space-y-3">
                  <a 
                    href="tel:4440XXX"
                    className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm lg:text-base">{t('contact.quickAccess.call')}</p>
                      <p className="text-white/50 text-xs lg:text-sm">444 0 XXX</p>
                    </div>
                  </a>
                  
                  <a 
                    href="https://wa.me/90XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm lg:text-base">{t('contact.quickAccess.whatsapp')}</p>
                      <p className="text-white/50 text-xs lg:text-sm">{t('contact.quickAccess.whatsappDesc')}</p>
                    </div>
                  </a>
                </div>
              </GlassCard>

              {/* FAQ Link */}
              <div className="p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-gradient-to-r from-primary-400/10 to-emerald-900/10 border border-white/10">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary-400/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm lg:text-base">{t('contact.faq.title')}</p>
                    <p className="text-white/50 text-xs lg:text-sm truncate">{t('contact.faq.description')}</p>
                  </div>
                  <Button variant="ghost" className="text-primary-400 text-xs lg:text-sm flex-shrink-0">
                    {t('contact.faq.button')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
