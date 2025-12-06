import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  Phone, Mail, MapPin, Shield
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const productLinks = [
    { key: 'traffic', href: '/products/traffic' },
    { key: 'kasko', href: '/products/kasko' },
    { key: 'health', href: '/products/health' },
    { key: 'travel', href: '/products/travel' },
    { key: 'dask', href: '/products/dask' },
    { key: 'home', href: '/products/home' },
    { key: 'pet', href: '/products/pet' },
    { key: 'phone', href: '/products/phone' },
  ];

  return (
    <footer className="bg-dark-950 border-t border-white/5 pb-20 lg:pb-0">
      {/* Main Footer */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 lg:py-16 xl:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 lg:mb-6">
              <div className="w-9 h-9 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <span className="text-dark-900 font-heading font-bold text-lg lg:text-2xl">T</span>
              </div>
              <span className="font-heading font-bold text-lg lg:text-2xl text-white">
                Tomiris<span className="text-primary-400">.</span>
              </span>
            </Link>
            <p className="text-white/60 text-xs lg:text-base leading-relaxed mb-3 lg:mb-6 max-w-sm">
              {t('footer.description')}
            </p>
            <p className="text-white/40 text-[10px] lg:text-sm leading-relaxed mb-4 lg:mb-8 max-w-sm">
              {t('footer.companyName')}<br />
              {t('footer.vkn')}<br />
              {t('footer.address')}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 lg:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-primary-400 hover:bg-white/10 transition-colors active:scale-95"
                >
                  <social.icon className="w-4 h-4 lg:w-6 lg:h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm lg:text-lg mb-3 lg:mb-6">
              {t('footer.products')}
            </h3>
            <ul className="space-y-1.5 lg:space-y-3">
              {productLinks.slice(0, 6).map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-primary-400 text-xs lg:text-base transition-colors"
                  >
                    {t(`products.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm lg:text-lg mb-3 lg:mb-6">
              {t('footer.company')}
            </h3>
            <ul className="space-y-1.5 lg:space-y-3">
              <li>
                <Link to="/about" className="text-white/60 hover:text-primary-400 text-xs lg:text-base transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/60 hover:text-primary-400 text-xs lg:text-base transition-colors">
                  {t('footer.careers')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/60 hover:text-primary-400 text-xs lg:text-base transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-primary-400 text-xs lg:text-base transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>

            <h3 className="font-heading font-semibold text-white text-sm lg:text-lg mb-3 lg:mb-6 mt-4 lg:mt-8">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-1.5 lg:space-y-3">
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-primary-400 text-xs lg:text-base transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/60 hover:text-primary-400 text-xs lg:text-base transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/kvkk" className="text-white/60 hover:text-primary-400 text-xs lg:text-base transition-colors">
                  {t('footer.kvkk')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-heading font-semibold text-white text-sm lg:text-lg mb-3 lg:mb-6">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2 lg:space-y-4">
              <li>
                <a href="tel:4440XXX" className="flex items-center gap-2 lg:gap-4 text-white/60 hover:text-primary-400 transition-colors">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/5 flex items-center justify-center">
                    <Phone className="w-3 h-3 lg:w-5 lg:h-5" />
                  </div>
                  <span className="text-xs lg:text-base">{t('footer.phone')}</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@tomirissigorta.com" className="flex items-center gap-2 lg:gap-4 text-white/60 hover:text-primary-400 transition-colors">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/5 flex items-center justify-center">
                    <Mail className="w-3 h-3 lg:w-5 lg:h-5" />
                  </div>
                  <span className="text-xs lg:text-base">{t('footer.email')}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 lg:gap-4 text-white/60">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3 h-3 lg:w-5 lg:h-5" />
                  </div>
                  <span className="text-xs lg:text-base leading-relaxed">Kadıköy/İstanbul</span>
                </div>
              </li>
            </ul>

            {/* Trust Badge */}
            <div className="mt-4 lg:mt-8 p-3 lg:p-5 rounded-xl lg:rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-primary-400/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 lg:w-6 lg:h-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-white text-xs lg:text-base font-medium">SSL Secured</p>
                  <p className="text-white/50 text-[10px] lg:text-sm">256-bit encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 lg:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 lg:gap-4">
            <p className="text-white/40 text-xs lg:text-base text-center sm:text-left">
              © {currentYear} Tomiris Sigorta. {t('footer.allRights')}
            </p>
            <div className="flex items-center gap-4 lg:gap-8">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png" 
                alt="Mastercard" 
                className="h-5 lg:h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" 
                alt="Visa" 
                className="h-5 lg:h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
