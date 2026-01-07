import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Car, Shield, Heart, Plane, Home, PawPrint, 
  Smartphone, ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { productsService } from '../../services/firestore';
import GlassCard from '../ui/GlassCard';

const iconMap = {
  traffic: Car,
  kasko: Shield,
  health: Heart,
  travel: Plane,
  dask: Home,
  home: Home,
  pet: PawPrint,
  phone: Smartphone,
};

// Fallback products
const fallbackProducts = [
  {
    key: 'traffic',
    icon: Car,
    href: '/products/traffic',
    gradient: 'from-blue-500 to-blue-700',
    popular: true,
  },
  {
    key: 'kasko',
    icon: Shield,
    href: '/products/kasko',
    gradient: 'from-emerald-500 to-emerald-700',
    popular: true,
  },
  {
    key: 'health',
    icon: Heart,
    href: '/products/health',
    gradient: 'from-red-500 to-red-700',
    popular: false,
  },
  {
    key: 'travel',
    icon: Plane,
    href: '/products/travel',
    gradient: 'from-purple-500 to-purple-700',
    popular: false,
  },
  {
    key: 'dask',
    icon: Home,
    href: '/products/dask',
    gradient: 'from-orange-500 to-orange-700',
    popular: false,
  },
  {
    key: 'home',
    icon: Home,
    href: '/products/home',
    gradient: 'from-yellow-500 to-yellow-700',
    popular: false,
  },
  {
    key: 'pet',
    icon: PawPrint,
    href: '/products/pet',
    gradient: 'from-pink-500 to-pink-700',
    isNew: true,
  },
  {
    key: 'phone',
    icon: Smartphone,
    href: '/products/phone',
    gradient: 'from-cyan-500 to-cyan-700',
    popular: false,
  },
];

export function ProductGrid() {
  const { t } = useLanguage();
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const firestoreProducts = await productsService.getProducts();
        if (firestoreProducts && firestoreProducts.length > 0) {
          const productsWithIcons = firestoreProducts.map((product) => ({
            ...product,
            icon: iconMap[product.key] || Car,
          }));
          setProducts(productsWithIcons);
        }
      } catch (error) {
        console.error('Error loading products from Firestore, using fallback:', error);
        // Keep using fallback products
      }
    };

    loadProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="products" className="py-12 lg:py-24 xl:py-28 bg-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 lg:w-[500px] h-64 lg:h-[500px] bg-primary-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 lg:w-[500px] h-64 lg:h-[500px] bg-emerald-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-bold text-white mb-2 lg:mb-6">
            {t('productGrid.title')}
          </h2>
          <p className="text-white/60 text-sm lg:text-lg xl:text-xl max-w-3xl mx-auto px-4 lg:px-0">
            {t('productGrid.subtitle')}
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product) => (
            <motion.div key={product.key} variants={itemVariants}>
              <Link to={product.href}>
                <GlassCard className="p-4 lg:p-6 xl:p-8 h-full group relative overflow-hidden">
                  {/* Badge */}
                  {(product.isNew || product.popular) && (
                    <span className={`absolute top-2 right-2 lg:top-4 lg:right-4 px-1.5 lg:px-3 py-0.5 lg:py-1 text-[10px] lg:text-xs font-medium rounded-full ${
                      product.isNew 
                        ? 'bg-primary-400 text-dark-900' 
                        : 'bg-white/10 text-white/80'
                    }`}>
                      {product.isNew ? t('common.new') : t('common.popular')}
                    </span>
                  )}

                  {/* Icon */}
                  <div className={`w-10 h-10 lg:w-16 xl:w-20 lg:h-16 xl:h-20 rounded-xl lg:rounded-2xl xl:rounded-3xl bg-gradient-to-br ${product.gradient} p-2 lg:p-4 xl:p-5 mb-3 lg:mb-5 xl:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="w-full h-full text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-sm lg:text-lg xl:text-xl text-white mb-1 lg:mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
                    {t(`products.${product.key}`)}
                  </h3>

                  {/* Arrow */}
                  <div className="flex items-center gap-1 text-white/50 group-hover:text-primary-400 transition-colors">
                    <span className="text-xs lg:text-sm xl:text-base">{t('common.getQuote')}</span>
                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`} />
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div 
          className="text-center mt-6 lg:mt-12 xl:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors text-sm lg:text-base xl:text-lg"
          >
            {t('productGrid.viewAll')}
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductGrid;
