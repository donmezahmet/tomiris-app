import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ArrayEditor } from '../../components/admin/ArrayEditor';
import { AdminInput } from '../../components/admin/AdminInput';
import { AdminSelect } from '../../components/admin/AdminSelect';
import { AdminButton } from '../../components/admin/AdminButton';
import { productsService } from '../../services/firestore';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

const gradients = [
  'from-blue-500 to-blue-700',
  'from-emerald-500 to-emerald-700',
  'from-red-500 to-red-700',
  'from-purple-500 to-purple-700',
  'from-orange-500 to-orange-700',
  'from-yellow-500 to-yellow-700',
  'from-pink-500 to-pink-700',
  'from-cyan-500 to-cyan-700',
];

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getProducts();
      setProducts(data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load products' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await productsService.updateProducts(products);
      setMessage({ type: 'success', text: 'Products saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save products' });
    } finally {
      setSaving(false);
    }
  };

  const createNewProduct = () => ({
    key: '',
    href: '/products/',
    gradient: gradients[0],
    popular: false,
    isNew: false,
  });

  const renderProduct = (product, updateProduct) => (
    <div className="space-y-4">
      <AdminInput
        label="Product Key"
        value={product.key}
        onChange={(value) => updateProduct({ ...product, key: value })}
        placeholder="e.g., traffic, kasko, health"
        required
      />
      <AdminInput
        label="Route Path"
        value={product.href}
        onChange={(value) => updateProduct({ ...product, href: value })}
        placeholder="/products/traffic"
        required
      />
      <AdminSelect
        label="Gradient Color"
        value={product.gradient}
        onChange={(value) => updateProduct({ ...product, gradient: value })}
        options={gradients}
      />
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={product.popular || false}
            onChange={(e) => updateProduct({ ...product, popular: e.target.checked })}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-primary-400"
          />
          <span className="text-white/80 text-sm">Popular</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={product.isNew || false}
            onChange={(e) => updateProduct({ ...product, isNew: e.target.checked })}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-primary-400"
          />
          <span className="text-white/80 text-sm">New</span>
        </label>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading products...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-white/60">Manage product configurations</p>
        </div>

        {message.text && (
          <div
            className={`flex items-center gap-2 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <ArrayEditor
          items={products}
          onChange={setProducts}
          renderItem={renderProduct}
          onAdd={createNewProduct}
          title="Products"
          emptyMessage="No products yet. Add one to get started."
        />

        <div className="flex justify-end">
          <AdminButton onClick={handleSave} loading={saving} icon={Save} variant="primary">
            Save Changes
          </AdminButton>
        </div>
      </div>
    </AdminLayout>
  );
}

