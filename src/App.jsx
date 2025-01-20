import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Layout from './components/Layout';
    import Dashboard from './components/Dashboard';
    import ArticlePage from './components/ArticlePage';
    import HomePage from './components/HomePage';

    function App() {
      return (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trends" element={<Dashboard />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </Layout>
      );
    }

    export default App;
