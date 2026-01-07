import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminInput } from '../../components/admin/AdminInput';
import { AdminTextarea } from '../../components/admin/AdminTextarea';
import { AdminButton } from '../../components/admin/AdminButton';
import { AdminSelect } from '../../components/admin/AdminSelect';
import { translationsService } from '../../services/firestore';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export function Contact() {
  const [language, setLanguage] = useState('tr');
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadContact();
  }, [language]);

  const loadContact = async () => {
    try {
      setLoading(true);
      const translations = await translationsService.getTranslations(language);
      setContact(translations?.contact || {});
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load contact information' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await translationsService.updateTranslationSection(language, 'contact', contact);
      setMessage({ type: 'success', text: 'Contact information saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save contact information' });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path, value) => {
    const keys = path.split('.');
    setContact((prev) => {
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  if (loading || !contact) {
    return (
      <AdminLayout>
        <div className="text-white">Loading contact information...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Contact Information</h1>
            <p className="text-white/60">Manage contact page content</p>
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

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Hero Section</h2>
            <AdminInput
              label="Badge"
              value={contact.badge || ''}
              onChange={(value) => updateField('badge', value)}
            />
            <AdminInput
              label="Title"
              value={contact.title || ''}
              onChange={(value) => updateField('title', value)}
            />
            <AdminInput
              label="Title Highlight"
              value={contact.titleHighlight || ''}
              onChange={(value) => updateField('titleHighlight', value)}
            />
            <AdminTextarea
              label="Description"
              value={contact.description || ''}
              onChange={(value) => updateField('description', value)}
            />
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white/80">Phone</h3>
                <AdminInput
                  label="Title"
                  value={contact.info?.phone?.title || ''}
                  onChange={(value) => updateField('info.phone.title', value)}
                />
                <AdminInput
                  label="Value"
                  value={contact.info?.phone?.value || ''}
                  onChange={(value) => updateField('info.phone.value', value)}
                />
                <AdminInput
                  label="Description"
                  value={contact.info?.phone?.description || ''}
                  onChange={(value) => updateField('info.phone.description', value)}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white/80">Email</h3>
                <AdminInput
                  label="Title"
                  value={contact.info?.email?.title || ''}
                  onChange={(value) => updateField('info.email.title', value)}
                />
                <AdminInput
                  label="Value"
                  value={contact.info?.email?.value || ''}
                  onChange={(value) => updateField('info.email.value', value)}
                />
                <AdminInput
                  label="Description"
                  value={contact.info?.email?.description || ''}
                  onChange={(value) => updateField('info.email.description', value)}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white/80">Address</h3>
                <AdminInput
                  label="Title"
                  value={contact.info?.address?.title || ''}
                  onChange={(value) => updateField('info.address.title', value)}
                />
                <AdminInput
                  label="Value"
                  value={contact.info?.address?.value || ''}
                  onChange={(value) => updateField('info.address.value', value)}
                />
                <AdminInput
                  label="Description"
                  value={contact.info?.address?.description || ''}
                  onChange={(value) => updateField('info.address.description', value)}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white/80">Working Hours</h3>
                <AdminInput
                  label="Title"
                  value={contact.info?.hours?.title || ''}
                  onChange={(value) => updateField('info.hours.title', value)}
                />
                <AdminInput
                  label="Value"
                  value={contact.info?.hours?.value || ''}
                  onChange={(value) => updateField('info.hours.value', value)}
                />
                <AdminInput
                  label="Description"
                  value={contact.info?.hours?.description || ''}
                  onChange={(value) => updateField('info.hours.description', value)}
                />
              </div>
            </div>
          </div>
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

