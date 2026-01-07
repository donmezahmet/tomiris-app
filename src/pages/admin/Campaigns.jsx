import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ArrayEditor } from '../../components/admin/ArrayEditor';
import { AdminInput } from '../../components/admin/AdminInput';
import { AdminButton } from '../../components/admin/AdminButton';
import { AdminSelect } from '../../components/admin/AdminSelect';
import { campaignsService } from '../../services/firestore';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export function Campaigns() {
  const [language, setLanguage] = useState('tr');
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadCampaigns();
  }, [language]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const data = await campaignsService.getCampaigns(language);
      setCampaigns(data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load campaigns' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await campaignsService.updateCampaigns(language, campaigns);
      setMessage({ type: 'success', text: 'Campaigns saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save campaigns' });
    } finally {
      setSaving(false);
    }
  };

  const createNewCampaign = () => ({
    title: '',
    subtitle: '',
    description: '',
    cta: '',
  });

  const renderCampaign = (campaign, updateCampaign) => (
    <div className="space-y-4">
      <AdminInput
        label="Title"
        value={campaign.title}
        onChange={(value) => updateCampaign({ ...campaign, title: value })}
        placeholder="Campaign title"
        required
      />
      <AdminInput
        label="Subtitle"
        value={campaign.subtitle}
        onChange={(value) => updateCampaign({ ...campaign, subtitle: value })}
        placeholder="Campaign subtitle"
        required
      />
      <AdminInput
        label="Description"
        value={campaign.description}
        onChange={(value) => updateCampaign({ ...campaign, description: value })}
        placeholder="Campaign description"
        required
      />
      <AdminInput
        label="CTA Button Text"
        value={campaign.cta}
        onChange={(value) => updateCampaign({ ...campaign, cta: value })}
        placeholder="Button text (e.g., 'Hemen Davet Et')"
        required
      />
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading campaigns...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Campaigns</h1>
            <p className="text-white/60">Manage your marketing campaigns</p>
          </div>
          <AdminSelect
            value={language}
            onChange={setLanguage}
            options={[
              { value: 'tr', label: 'Turkish' },
              { value: 'en', label: 'English' },
            ]}
          />
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
          items={campaigns}
          onChange={setCampaigns}
          renderItem={renderCampaign}
          onAdd={createNewCampaign}
          title="Campaigns"
          emptyMessage="No campaigns yet. Add one to get started."
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

