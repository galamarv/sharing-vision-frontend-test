import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, BookOpen } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => 
    location.pathname === path 
      ? 'bg-blue-600 text-white shadow-sm' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            SV
          </div>
          <span className="text-lg font-bold text-gray-800 tracking-tight">Article Hub</span>
        </div>
        <div className="flex space-x-2">
          <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2 ${isActive('/')}`}>
            <LayoutDashboard size={18} />
            <span>All Posts</span>
          </Link>
          <Link to="/add" className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2 ${isActive('/add')}`}>
            <PlusCircle size={18} />
            <span>Add New</span>
          </Link>
          <Link to="/preview" className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2 ${isActive('/preview')}`}>
            <BookOpen size={18} />
            <span>Preview Blog</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}