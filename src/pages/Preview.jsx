import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function Preview() {
  const [articles, setArticles] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchPublishedArticles();
  }, [offset]);

  const fetchPublishedArticles = async () => {
    try {
      const data = await api.getArticles(limit, offset);
      const published = (data || []).filter(
        (art) => art.status?.toLowerCase() === 'publish'
      );
      setArticles(published);
    } catch (err) {
      console.error('Failed to load blog preview', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Community Blog</h2>
        <p className="text-gray-500 mt-2">Explore the latest published insights and updates.</p>
      </div>

      <div className="space-y-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 transition hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <h3 className="text-2xl font-bold mt-4 text-gray-900 tracking-tight">{article.title}</h3>
              <p className="text-gray-600 mt-3 leading-relaxed whitespace-pre-line text-base">{article.content}</p>
            </article>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center border border-gray-200">
            <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No published articles available right now.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-10 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <button
          disabled={offset === 0}
          onClick={() => setOffset(Math.max(0, offset - limit))}
          className={`px-4 py-2 rounded-xl text-sm font-medium border transition flex items-center space-x-1 ${
            offset === 0 
              ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>
        <span className="text-sm font-medium text-gray-600">Showing Offset: {offset}</span>
        <button
          onClick={() => setOffset(offset + limit)}
          className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition flex items-center space-x-1"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}