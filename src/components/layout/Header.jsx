import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, ChevronRight, Phone, Globe, User,
  Car, Heart, Home, Shield, Plane, Smartphone, 
  PawPrint, FileText
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';

const productIcons = {
  traffic: Car,
  kasko: Shield,
  health: Heart,
  privateHealth: Heart,
  travel: Plane,
  dask: Home,
  home: Home,
  pet: PawPrint,
  phone: Smartphone,
  imm: FileText,
  greenCard: FileText,
  shortTermTraffic: Car,
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveMobileCategory(null);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const productCategories = [
    {
      name: t('categories.vehicle'),
      items: [
        { key: 'traffic', href: '/products/traffic', isNew: false },
        { key: 'kasko', href: '/products/kasko', isNew: false },
        { key: 'imm', href: '/products/imm', isNew: false },
        { key: 'greenCard', href: '/products/green-card', isNew: true },
        { key: 'shortTermTraffic', href: '/products/short-term-traffic', isNew: false },
      ],
    },
    {
      name: t('categories.health'),
      items: [
        { key: 'health', href: '/products/health', isNew: false },
        { key: 'privateHealth', href: '/products/private-health', isNew: false },
        { key: 'travel', href: '/products/travel', isNew: false },
      ],
    },
    {
      name: t('categories.home'),
      items: [
        { key: 'dask', href: '/products/dask', isNew: false },
        { key: 'home', href: '/products/home', isNew: false },
      ],
    },
    {
      name: t('categories.other'),
      items: [
        { key: 'pet', href: '/products/pet', isNew: true },
        { key: 'phone', href: '/products/phone', isNew: false },
      ],
    },
  ];

  const drawerVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-900/95 backdrop-blur-lg shadow-lg border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow">
              <span className="text-dark-900 font-heading font-bold text-lg lg:text-xl">T</span>
            </div>
            <span className="font-heading font-bold text-lg lg:text-xl text-white">
              Tomiris<span className="text-primary-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="btn-ghost flex items-center gap-1">
                {t('nav.products')}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-[600px] bg-dark-800/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-glass p-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {productCategories.map((category) => (
                        <div key={category.name}>
                          <h3 className="text-primary-400 font-semibold text-sm mb-3 uppercase tracking-wider">
                            {category.name}
                          </h3>
                          <ul className="space-y-1">
                            {category.items.map((item) => {
                              const Icon = productIcons[item.key];
                              return (
                                <li key={item.key}>
                                  <Link
                                    to={item.href}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors group"
                                  >
                                    <Icon className="w-5 h-5 text-primary-400/70 group-hover:text-primary-400" />
                                    <span>{t(`products.${item.key}`)}</span>
                                    {item.isNew && (
                                      <span className="px-2 py-0.5 text-xs bg-primary-400 text-dark-900 rounded-full font-medium">
                                        {t('common.new')}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/campaigns" className="btn-ghost">
              {t('nav.campaigns')}
            </Link>
            <Link to="/about" className="btn-ghost">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="btn-ghost">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Phone - Hidden on mobile */}
            <a href="tel:4440XXX" className="hidden lg:flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">{t('nav.phone')}</span>
            </a>

            {/* Language Toggle - Desktop only */}
            <button
              onClick={toggleLanguage}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>

            {/* Login - Hidden on mobile */}
            <Link to="/login" className="hidden lg:flex items-center gap-2 btn-ghost">
              <User className="w-4 h-4" />
              <span>{t('nav.login')}</span>
            </Link>

            {/* CTA Button - Hidden on mobile */}
            <Button variant="primary" size="sm" className="hidden lg:flex">
              {t('nav.getQuote')}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white active:scale-95 transition-transform"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-dark-900 z-50 lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-dark-900 font-heading font-bold">T</span>
                  </div>
                  <span className="font-heading font-bold text-lg text-white">
                    Tomiris<span className="text-primary-400">.</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto py-4">
                {/* Products Accordion */}
                <div className="px-4">
                  <button
                    onClick={() => setActiveMobileCategory(activeMobileCategory === 'products' ? null : 'products')}
                    className="flex items-center justify-between w-full py-3 text-white font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary-400" />
                      </div>
                      {t('nav.products')}
                    </span>
                    <ChevronRight className={`w-5 h-5 text-white/50 transition-transform ${activeMobileCategory === 'products' ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeMobileCategory === 'products' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-11 pb-3 space-y-4">
                          {productCategories.map((category) => (
                            <div key={category.name}>
                              <h3 className="text-primary-400/70 font-medium text-xs mb-2 uppercase tracking-wider">
                                {category.name}
                              </h3>
                              <ul className="space-y-1">
                                {category.items.map((item) => {
                                  const Icon = productIcons[item.key];
                                  return (
                                    <li key={item.key}>
                                      <Link
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2 py-2 text-white/70 hover:text-white text-sm"
                                      >
                                        <Icon className="w-4 h-4 text-primary-400/50" />
                                        {t(`products.${item.key}`)}
                                        {item.isNew && (
                                          <span className="px-1.5 py-0.5 text-[10px] bg-primary-400 text-dark-900 rounded-full font-medium">
                                            {t('common.new')}
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Links */}
                <div className="px-4 mt-2 space-y-1">
                  <Link
                    to="/campaigns"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-white font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary-400" />
                    </div>
                    {t('nav.campaigns')}
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-white font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-400" />
                    </div>
                    {t('nav.about')}
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-white font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-primary-400" />
                    </div>
                    {t('nav.contact')}
                  </Link>
                </div>

                {/* Divider */}
                <div className="my-4 mx-4 border-t border-white/10" />

                {/* Quick Actions */}
                <div className="px-4 space-y-3">
                  <a
                    href="tel:4440XXX"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-white"
                  >
                    <Phone className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium text-sm">{t('nav.phone')}</p>
                      <p className="text-xs text-white/50">7/24 {language === 'tr' ? 'Destek' : 'Support'}</p>
                    </div>
                  </a>

                  {/* Language Toggle */}
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-primary-400" />
                      <span className="font-medium text-sm">{language === 'tr' ? 'Dil' : 'Language'}</span>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-white/10 text-xs font-medium uppercase">
                      {language}
                    </span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-white/10 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 text-white font-medium"
                >
                  <User className="w-4 h-4" />
                  {t('nav.login')}
                </Link>
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.getQuote')}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
