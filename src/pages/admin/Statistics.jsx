import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminInput } from '../../components/admin/AdminInput';
import { AdminButton } from '../../components/admin/AdminButton';
import { statisticsService } from '../../services/firestore';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export function Statistics() {
  const [stats, setStats] = useState({
    customers: '',
    policies: '',
    partners: '',
    experience: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const data = await statisticsService.getStatistics();
      setStats(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load statistics' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await statisticsService.updateStatistics(stats);
      setMessage({ type: 'success', text: 'Statistics saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save statistics' });
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (key, value) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading statistics...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Statistics</h1>
          <p className="text-white/60">Update your site statistics</p>
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

        <div className="space-y-6 p-6 rounded-xl bg-white/5 border border-white/10">
          <AdminInput
            label="Happy Customers"
            value={stats.customers}
            onChange={(value) => updateStat('customers', value)}
            placeholder="e.g., X.XM or 1.5M"
            required
          />
          <AdminInput
            label="Policy Quotes"
            value={stats.policies}
            onChange={(value) => updateStat('policies', value)}
            placeholder="e.g., XX.XM or 2.3M"
            required
          />
          <AdminInput
            label="Insurance Partners"
            value={stats.partners}
            onChange={(value) => updateStat('partners', value)}
            placeholder="e.g., XX or 30"
            required
          />
          <AdminInput
            label="Years of Experience"
            value={stats.experience}
            onChange={(value) => updateStat('experience', value)}
            placeholder="e.g., XX or 10"
            required
          />
        </div>

        <div className="flex justify-end">
          <AdminButton onClick={handleSave} loading={saving} icon={Save} variant="primary">
            Save Changes
          </AdminButton>
        </div>
      </div>
    </AdminLayout>
  );
}

