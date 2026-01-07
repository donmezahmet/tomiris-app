import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ArrayEditor } from '../../components/admin/ArrayEditor';
import { AdminInput } from '../../components/admin/AdminInput';
import { AdminButton } from '../../components/admin/AdminButton';
import { AdminSelect } from '../../components/admin/AdminSelect';
import { testimonialsService } from '../../services/firestore';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export function Testimonials() {
  const [language, setLanguage] = useState('tr');
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadTestimonials();
  }, [language]);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialsService.getTestimonials(language);
      setTestimonials(data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load testimonials' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await testimonialsService.updateTestimonials(language, testimonials);
      setMessage({ type: 'success', text: 'Testimonials saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save testimonials' });
    } finally {
      setSaving(false);
    }
  };

  const createNewTestimonial = () => ({
    name: '',
    role: '',
    text: '',
  });

  const renderTestimonial = (testimonial, updateTestimonial) => (
    <div className="space-y-4">
      <AdminInput
        label="Name"
        value={testimonial.name}
        onChange={(value) => updateTestimonial({ ...testimonial, name: value })}
        placeholder="Customer name"
        required
      />
      <AdminInput
        label="Role/Title"
        value={testimonial.role}
        onChange={(value) => updateTestimonial({ ...testimonial, role: value })}
        placeholder="Job title or role"
        required
      />
      <AdminInput
        label="Testimonial Text"
        value={testimonial.text}
        onChange={(value) => updateTestimonial({ ...testimonial, text: value })}
        placeholder="Customer testimonial"
        required
      />
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading testimonials...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Testimonials</h1>
            <p className="text-white/60">Manage customer testimonials</p>
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
          items={testimonials}
          onChange={setTestimonials}
          renderItem={renderTestimonial}
          onAdd={createNewTestimonial}
          title="Testimonials"
          emptyMessage="No testimonials yet. Add one to get started."
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

