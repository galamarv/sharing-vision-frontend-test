import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Edit, Trash2, FileText, CheckCircle2, Clock, Trash } from 'lucide-react';

export default function AllPosts() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('Publish');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await api.getArticles(100, 0);
      setArticles(data || []);
    } catch (err) {
      console.error('Failed to fetch articles', err);
    }
  };

  const handleThrash = async (article) => {
    try {
      await api.updateArticle(article.id, {
        title: article.title,
        content: article.content,
        category: article.category,
        status: 'Thrash'
      });
      fetchArticles();
    } catch (err) {
      console.error('Failed to move article to trash', err);
    }
  };

  const filteredArticles = articles.filter(
    (art) => art.status?.toLowerCase() === activeTab.toLowerCase()
  );

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'publish':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 size={12} className="mr-1"/> Published</span>;
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"><Clock size={12} className="mr-1"/> Draft</span>;
      case 'thrash':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200"><Trash size={12} className="mr-1"/> Trashed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Articles</h2>
          <p className="text-sm text-gray-500 mt-1">Organize and monitor your published, drafted, and trashed posts.</p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm transition flex items-center space-x-2"
        >
          <span>Create New Post</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-200/60 p-1.5 rounded-xl w-fit mb-6">
        {[
          { id: 'Publish', label: 'Published' },
          { id: 'Draft', label: 'Drafts' },
          { id: 'Thrash', label: 'Trashed' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/75">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 max-w-md truncate">{article.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{getStatusBadge(article.status)}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => navigate(`/edit/${article.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center"
                      title="Edit Article"
                    >
                      <Edit size={16} />
                    </button>
                    {activeTab !== 'Thrash' && (
                      <button
                        onClick={() => handleThrash(article)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition inline-flex items-center"
                        title="Move to Trash"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-16 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No articles found in this section.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}