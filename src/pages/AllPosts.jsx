import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Edit, Trash2, Plus, AlertCircle } from 'lucide-react';

export default function AllPosts() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('Published');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await api.getArticles(100, 0);
      setArticles(Array.isArray(data) ? data : data.articles || []);
    } catch (err) {
      setError('Failed to fetch articles. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.deleteArticle(id);
      setArticles(articles.filter((art) => art.id !== id));
    } catch (err) {
      alert('Failed to delete article.');
    }
  };

  const filteredArticles = articles.filter((article) => {
    const status = article.status?.toLowerCase() || '';
    const tab = activeTab.toLowerCase();
    
    if (tab === 'published') {
      return status === 'published' || status === 'publish';
    }
    return status === tab;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Articles</h2>
          <p className="text-sm text-gray-500 mt-1">Organize and monitor your published, drafted, and trashed posts.</p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition font-medium text-sm shadow-sm flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create New Post</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-center space-x-3">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200 pb-4">
        {['Published', 'Draft', 'Thrash'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-4 px-6 w-5/12">Title</th>
              <th className="py-4 px-6 w-3/12">Category</th>
              <th className="py-4 px-6 w-2/12">Status</th>
              <th className="py-4 px-6 w-2/12 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan="4" className="py-12 text-center text-gray-400">
                  Loading articles...
                </td>
              </tr>
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-4 px-6 font-medium text-gray-900 break-words">
                    {article.title}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    <span className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                      {article.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      article.status === 'Published' || article.status === 'Publish' ? 'bg-emerald-50 text-emerald-700' :
                      article.status === 'Draft' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => navigate(`/edit/${article.id}`)}
                      className="text-gray-400 hover:text-blue-600 transition p-1 inline-block"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-gray-400 hover:text-rose-600 transition p-1 inline-block"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-12 text-center text-gray-400">
                  No articles found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}