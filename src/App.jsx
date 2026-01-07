import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import PageTransition from './components/ui/PageTransition';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { Translations } from './pages/admin/Translations';
import { Campaigns } from './pages/admin/Campaigns';
import { Testimonials } from './pages/admin/Testimonials';
import { FAQ } from './pages/admin/FAQ';
import { Products } from './pages/admin/Products';
import { Statistics } from './pages/admin/Statistics';
import { Contact as AdminContact } from './pages/admin/Contact';
import { About as AdminAbout } from './pages/admin/About';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scroll to top immediately before paint
    window.scrollTo(0, 0);
  }, [pathname]);

  // Also scroll on initial load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <PageTransition>
                <Home />
              </PageTransition>
              <Footer />
              <MobileNav />
            </>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <>
              <Header />
              <PageTransition>
                <ProductDetail />
              </PageTransition>
              <Footer />
              <MobileNav />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <PageTransition>
                <About />
              </PageTransition>
              <Footer />
              <MobileNav />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <PageTransition>
                <Contact />
              </PageTransition>
              <Footer />
              <MobileNav />
            </>
          }
        />
        <Route
          path="/campaigns"
          element={
            <>
              <Header />
              <PageTransition>
                <Home />
              </PageTransition>
              <Footer />
              <MobileNav />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <PageTransition>
                <Home />
              </PageTransition>
              <Footer />
              <MobileNav />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/translations"
          element={
            <ProtectedRoute>
              <Translations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/campaigns"
          element={
            <ProtectedRoute>
              <Campaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <Testimonials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faq"
          element={
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute>
              <AdminContact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <ProtectedRoute>
              <AdminAbout />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <PageTransition>
                <Home />
              </PageTransition>
              <Footer />
              <MobileNav />
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-dark-900 flex flex-col">
            <AnimatedRoutes />
          </div>
        </Router>
      </LanguageProvider>
    </AdminAuthProvider>
  );
}

export default App;
