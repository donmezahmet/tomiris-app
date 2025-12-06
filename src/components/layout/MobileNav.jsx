import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Grid3X3, MessageSquare, Phone, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const navItems = [
  { key: 'home', icon: Home, action: 'scroll-top' },
  { key: 'products', icon: Grid3X3, action: 'scroll-section', target: 'products' },
  { key: 'quote', icon: FileText, action: 'navigate', href: '/products/traffic', isPrimary: true },
  { key: 'contact', icon: MessageSquare, action: 'navigate', href: '/contact' },
  { key: 'call', icon: Phone, action: 'external', href: 'tel:4440XXX' },
];

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const labels = {
    home: t('nav.products') === 'Products' ? 'Home' : 'Ana Sayfa',
    products: t('nav.products') === 'Products' ? 'Products' : 'Ürünler',
    quote: t('nav.getQuote'),
    contact: t('nav.contact'),
    call: t('nav.products') === 'Products' ? 'Call' : 'Ara',
  };

  const isActive = (item) => {
    if (item.action === 'scroll-top') return location.pathname === '/';
    if (item.action === 'scroll-section') return location.pathname === '/';
    if (item.href) return location.pathname.startsWith(item.href);
    return false;
  };

  const handleClick = (item) => {
    if (item.action === 'scroll-top') {
      // If already on home page, scroll to top
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to home, scroll will happen after navigation
        navigate('/');
      }
    } else if (item.action === 'scroll-section') {
      // If on home page, scroll to section
      if (location.pathname === '/') {
        const element = document.getElementById(item.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to home with hash
        navigate('/#' + item.target);
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.getElementById(item.target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else if (item.action === 'navigate') {
      navigate(item.href);
    }
    // External links are handled by the anchor tag
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item);

          // External link (tel:)
          if (item.action === 'external') {
            return (
              <a
                key={item.key}
                href={item.href}
                className="flex flex-col items-center justify-center py-2 px-3 min-w-[60px]"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl transition-colors"
                >
                  <item.icon className="w-5 h-5 transition-colors text-white/50" />
                </motion.div>
                <span className="text-[10px] mt-0.5 transition-colors text-white/50">
                  {labels[item.key]}
                </span>
              </a>
            );
          }

          // Primary CTA button
          if (item.isPrimary) {
            return (
              <button
                key={item.key}
                onClick={() => handleClick(item)}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-glow"
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon className="w-6 h-6 text-dark-900" />
                </motion.div>
                <span className="text-[10px] text-primary-400 mt-1 font-medium">
                  {labels[item.key]}
                </span>
              </button>
            );
          }

          // Regular nav items
          return (
            <button
              key={item.key}
              onClick={() => handleClick(item)}
              className="flex flex-col items-center justify-center py-2 px-3 min-w-[60px]"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-xl transition-colors ${
                  active ? 'bg-primary-400/10' : ''
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    active ? 'text-primary-400' : 'text-white/50'
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] mt-0.5 transition-colors ${
                  active ? 'text-primary-400 font-medium' : 'text-white/50'
                }`}
              >
                {labels[item.key]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;
