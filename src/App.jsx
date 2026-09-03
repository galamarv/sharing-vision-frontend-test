import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllPosts from './pages/AllPosts';
import AddNewPost from './pages/AddNewPost';
import EditPost from './pages/EditPost';
import Preview from './pages/Preview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="py-6">
          <Routes>
            <Route path="/" element={<AllPosts />} />
            <Route path="/add" element={<AddNewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;