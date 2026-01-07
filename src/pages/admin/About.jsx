import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminInput } from '../../components/admin/AdminInput';
import { AdminTextarea } from '../../components/admin/AdminTextarea';
import { AdminButton } from '../../components/admin/AdminButton';
import { AdminSelect } from '../../components/admin/AdminSelect';
import { ArrayEditor } from '../../components/admin/ArrayEditor';
import { translationsService } from '../../services/firestore';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export function About() {
  const [language, setLanguage] = useState('tr');
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadAbout();
  }, [language]);

  const loadAbout = async () => {
    try {
      setLoading(true);
      const translations = await translationsService.getTranslations(language);
      setAbout(translations?.about || {});
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load about page content' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await translationsService.updateTranslationSection(language, 'about', about);
      setMessage({ type: 'success', text: 'About page saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save about page' });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path, value) => {
    const keys = path.split('.');
    setAbout((prev) => {
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

  const createNewMilestone = () => ({
    year: '',
    title: '',
    description: '',
  });

  const createNewAward = () => ({
    title: '',
    subtitle: '',
  });

  const renderMilestone = (milestone, updateMilestone) => (
    <div className="space-y-3">
      <AdminInput
        label="Year"
        value={milestone.year || ''}
        onChange={(value) => updateMilestone({ ...milestone, year: value })}
        placeholder="20XX"
      />
      <AdminInput
        label="Title"
        value={milestone.title || ''}
        onChange={(value) => updateMilestone({ ...milestone, title: value })}
        placeholder="Milestone title"
      />
      <AdminInput
        label="Description"
        value={milestone.description || ''}
        onChange={(value) => updateMilestone({ ...milestone, description: value })}
        placeholder="Milestone description"
      />
    </div>
  );

  const renderAward = (award, updateAward) => (
    <div className="space-y-3">
      <AdminInput
        label="Title"
        value={award.title || ''}
        onChange={(value) => updateAward({ ...award, title: value })}
        placeholder="Award title"
      />
      <AdminInput
        label="Subtitle"
        value={award.subtitle || ''}
        onChange={(value) => updateAward({ ...award, subtitle: value })}
        placeholder="Award subtitle"
      />
    </div>
  );

  if (loading || !about) {
    return (
      <AdminLayout>
        <div className="text-white">Loading about page content...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">About Page</h1>
            <p className="text-white/60">Manage about page content</p>
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
              value={about.badge || ''}
              onChange={(value) => updateField('badge', value)}
            />
            <AdminInput
              label="Title"
              value={about.title || ''}
              onChange={(value) => updateField('title', value)}
            />
            <AdminInput
              label="Title Highlight"
              value={about.titleHighlight || ''}
              onChange={(value) => updateField('titleHighlight', value)}
            />
            <AdminTextarea
              label="Description"
              value={about.description || ''}
              onChange={(value) => updateField('description', value)}
            />
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Mission</h2>
            <AdminInput
              label="Badge"
              value={about.mission?.badge || ''}
              onChange={(value) => updateField('mission.badge', value)}
            />
            <AdminInput
              label="Title"
              value={about.mission?.title || ''}
              onChange={(value) => updateField('mission.title', value)}
            />
            <AdminTextarea
              label="Description 1"
              value={about.mission?.description1 || ''}
              onChange={(value) => updateField('mission.description1', value)}
              rows={3}
            />
            <AdminTextarea
              label="Description 2"
              value={about.mission?.description2 || ''}
              onChange={(value) => updateField('mission.description2', value)}
              rows={3}
            />
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Journey</h2>
            <AdminInput
              label="Title"
              value={about.journey?.title || ''}
              onChange={(value) => updateField('journey.title', value)}
            />
            <AdminInput
              label="Subtitle"
              value={about.journey?.subtitle || ''}
              onChange={(value) => updateField('journey.subtitle', value)}
            />
            <ArrayEditor
              items={about.journey?.milestones || []}
              onChange={(milestones) => updateField('journey.milestones', milestones)}
              renderItem={renderMilestone}
              onAdd={createNewMilestone}
              title="Milestones"
            />
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Awards</h2>
            <AdminInput
              label="Badge"
              value={about.awards?.badge || ''}
              onChange={(value) => updateField('awards.badge', value)}
            />
            <AdminInput
              label="Title"
              value={about.awards?.title || ''}
              onChange={(value) => updateField('awards.title', value)}
            />
            <ArrayEditor
              items={about.awards?.items || []}
              onChange={(items) => updateField('awards.items', items)}
              renderItem={renderAward}
              onAdd={createNewAward}
              title="Awards"
            />
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

