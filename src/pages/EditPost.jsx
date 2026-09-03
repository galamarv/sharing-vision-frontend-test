import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowLeft, Send, Save, Trash, AlertCircle } from 'lucide-react';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  const fetchArticleDetails = async () => {
    try {
      const data = await api.getArticleById(id);
      setTitle(data.title || '');
      setContent(data.content || '');
      setCategory(data.category || '');
    } catch (err) {
      console.error('Failed to fetch article details', err);
    }
  };

  const handleUpdate = async (targetStatus) => {
    setError('');
    try {
      await api.updateArticle(id, { 
        title, 
        content, 
        category, 
        status: targetStatus 
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Validation failed. Check requirements.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <button 
        onClick={() => navigate('/')} 
        className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center space-x-1 mb-6 transition"
      >
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit Article</h2>
        <p className="text-sm text-gray-500 mb-6">Modify your article information and choose a target state below.</p>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-start space-x-3">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Article Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content Body</label>
            <textarea
              rows="7"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center space-x-3 pt-4 border-t border-gray-100 flex-wrap gap-y-3">
            <button
              type="button"
              onClick={() => handleUpdate('Publish')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl transition font-medium text-sm shadow-sm flex items-center space-x-2"
            >
              <Send size={16} />
              <span>Publish</span>
            </button>
            <button
              type="button"
              onClick={() => handleUpdate('Draft')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl transition font-medium text-sm shadow-sm flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save as Draft</span>
            </button>
            <button
              type="button"
              onClick={() => handleUpdate('Thrash')}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-5 py-3 rounded-xl transition font-medium text-sm flex items-center space-x-2"
            >
              <Trash size={16} />
              <span>Move to Trash</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}