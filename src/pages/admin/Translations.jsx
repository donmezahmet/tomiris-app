import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminInput } from '../../components/admin/AdminInput';
import { AdminTextarea } from '../../components/admin/AdminTextarea';
import { AdminButton } from '../../components/admin/AdminButton';
import { AdminSelect } from '../../components/admin/AdminSelect';
import { translationsService } from '../../services/firestore';
import { Save, CheckCircle, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

function TranslationSection({ section, data, onChange, path = '' }) {
  const [expanded, setExpanded] = useState(false);

  if (typeof data === 'string' || typeof data === 'number') {
    return (
      <div className="py-2">
        <AdminInput
          label={path.split('.').pop()}
          value={data}
          onChange={(value) => onChange(value)}
        />
      </div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="pl-4 border-l-2 border-white/10">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-2"
        >
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span className="font-medium">{path.split('.').pop()}</span>
        </button>
        {expanded && (
          <div className="pl-6 space-y-4">
            {data.map((item, index) => (
              <div key={index} className="p-3 rounded bg-white/5">
                <h4 className="text-white/80 mb-2">Item {index + 1}</h4>
                {typeof item === 'object' ? (
                  <TranslationSection
                    section={section}
                    data={item}
                    onChange={(updated) => {
                      const newData = [...data];
                      newData[index] = updated;
                      onChange(newData);
                    }}
                    path={`${path}[${index}]`}
                  />
                ) : (
                  <AdminInput
                    label={`Item ${index + 1}`}
                    value={item}
                    onChange={(value) => {
                      const newData = [...data];
                      newData[index] = value;
                      onChange(newData);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data);
    return (
      <div className="pl-4 border-l-2 border-white/10">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-2"
        >
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span className="font-medium">{path.split('.').pop() || 'Root'}</span>
        </button>
        {expanded && (
          <div className="pl-6 space-y-4">
            {keys.map((key) => (
              <TranslationSection
                key={key}
                section={section}
                data={data[key]}
                onChange={(updated) => {
                  onChange({ ...data, [key]: updated });
                }}
                path={path ? `${path}.${key}` : key}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export function Translations() {
  const [language, setLanguage] = useState('tr');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    loadTranslations();
  }, [language]);

  const loadTranslations = async () => {
    try {
      setLoading(true);
      const data = await translationsService.getTranslations(language);
      setTranslations(data || {});
      setSelectedSection('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load translations' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await translationsService.updateTranslations(language, translations);
      setMessage({ type: 'success', text: 'Translations saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save translations' });
    } finally {
      setSaving(false);
    }
  };

  const handleSectionSave = async () => {
    if (!selectedSection) return;
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await translationsService.updateTranslationSection(language, selectedSection, translations[selectedSection]);
      setMessage({ type: 'success', text: 'Section saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save section' });
    } finally {
      setSaving(false);
    }
  };

  const sections = Object.keys(translations).filter((key) => typeof translations[key] === 'object');

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading translations...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Translations</h1>
            <p className="text-white/60">Manage all translations for your site</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4">Sections</h2>
              <div className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => setSelectedSection(section)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedSection === section
                        ? 'bg-primary-400/20 text-primary-400 border border-primary-400/30'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {selectedSection ? (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white capitalize">{selectedSection}</h2>
                  <AdminButton onClick={handleSectionSave} loading={saving} icon={Save} variant="secondary">
                    Save Section
                  </AdminButton>
                </div>
                <TranslationSection
                  section={selectedSection}
                  data={translations[selectedSection]}
                  onChange={(updated) => {
                    setTranslations((prev) => ({ ...prev, [selectedSection]: updated }));
                  }}
                  path={selectedSection}
                />
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center text-white/50">
                Select a section from the sidebar to edit translations
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <AdminButton onClick={handleSave} loading={saving} icon={Save} variant="primary">
            Save All Translations
          </AdminButton>
        </div>
      </div>
    </AdminLayout>
  );
}

