import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ArrayEditor } from '../../components/admin/ArrayEditor';
import { AdminInput } from '../../components/admin/AdminInput';
import { AdminTextarea } from '../../components/admin/AdminTextarea';
import { AdminButton } from '../../components/admin/AdminButton';
import { AdminSelect } from '../../components/admin/AdminSelect';
import { faqService } from '../../services/firestore';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export function FAQ() {
  const [language, setLanguage] = useState('tr');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadFAQ();
  }, [language]);

  const loadFAQ = async () => {
    try {
      setLoading(true);
      const data = await faqService.getFAQ(language);
      setQuestions(data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load FAQ' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await faqService.updateFAQ(language, questions);
      setMessage({ type: 'success', text: 'FAQ saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save FAQ' });
    } finally {
      setSaving(false);
    }
  };

  const createNewQuestion = () => ({
    q: '',
    a: '',
  });

  const renderQuestion = (question, updateQuestion) => (
    <div className="space-y-4">
      <AdminInput
        label="Question"
        value={question.q}
        onChange={(value) => updateQuestion({ ...question, q: value })}
        placeholder="Enter the question"
        required
      />
      <AdminTextarea
        label="Answer"
        value={question.a}
        onChange={(value) => updateQuestion({ ...question, a: value })}
        placeholder="Enter the answer"
        rows={4}
        required
      />
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading FAQ...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">FAQ</h1>
            <p className="text-white/60">Manage frequently asked questions</p>
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
          items={questions}
          onChange={setQuestions}
          renderItem={renderQuestion}
          onAdd={createNewQuestion}
          title="FAQ Questions"
          emptyMessage="No questions yet. Add one to get started."
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

