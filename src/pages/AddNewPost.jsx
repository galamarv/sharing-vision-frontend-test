import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowLeft, Send, Save, AlertCircle } from 'lucide-react';

export default function AddNewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Publish');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (targetStatus) => {
    setError('');
    try {
      await api.createArticle({ 
        title, 
        content, 
        category, 
        status: targetStatus || status 
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Validation failed. Check requirements (Title >= 20, Content >= 200, Category >= 3).');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Article</h2>
        <p className="text-sm text-gray-500 mb-6">Fill in the inputs below following validation rules.</p>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-start space-x-3">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Article Title <span className="text-gray-400 font-normal">(Min 20 characters)</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              placeholder="Enter a descriptive title..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content Body <span className="text-gray-400 font-normal">(Min 200 characters)</span></label>
            <textarea
              rows="7"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              placeholder="Write your article content here..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category <span className="text-gray-400 font-normal">(Min 3 characters)</span></label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              placeholder="e.g. Technology, Lifestyle..."
            />
          </div>

       

          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSubmit('Publish')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-medium text-sm shadow-sm flex items-center space-x-2"
            >
              <Send size={16} />
              <span>Publish Now</span>
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('Draft')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition font-medium text-sm flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save as Draft</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}