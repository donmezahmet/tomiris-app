import { AdminLayout } from '../../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import {
  Languages,
  Megaphone,
  MessageSquare,
  HelpCircle,
  Package,
  BarChart3,
  Phone,
  Info,
} from 'lucide-react';

const quickLinks = [
  { path: '/admin/translations', icon: Languages, label: 'Translations', color: 'from-blue-500 to-blue-600' },
  { path: '/admin/campaigns', icon: Megaphone, label: 'Campaigns', color: 'from-purple-500 to-purple-600' },
  { path: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials', color: 'from-green-500 to-green-600' },
  { path: '/admin/faq', icon: HelpCircle, label: 'FAQ', color: 'from-orange-500 to-orange-600' },
  { path: '/admin/products', icon: Package, label: 'Products', color: 'from-cyan-500 to-cyan-600' },
  { path: '/admin/statistics', icon: BarChart3, label: 'Statistics', color: 'from-pink-500 to-pink-600' },
  { path: '/admin/contact', icon: Phone, label: 'Contact Info', color: 'from-red-500 to-red-600' },
  { path: '/admin/about', icon: Info, label: 'About Page', color: 'from-yellow-500 to-yellow-600' },
];

export function Dashboard() {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/60">Manage all your site content from here</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary-400/50 hover:bg-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {link.label}
                </h3>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 p-6 rounded-xl bg-primary-400/10 border border-primary-400/20">
          <h2 className="text-xl font-semibold text-white mb-2">Welcome to Admin Dashboard</h2>
          <p className="text-white/70">
            Use the quick links above to manage different sections of your website. All changes are saved to Firebase and will be reflected on your site immediately.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

