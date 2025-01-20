import React from 'react';
    import { Link, useLocation } from 'react-router-dom';

    export default function Layout({ children }) {
      return (
        <div className="min-h-screen bg-white">
          <header className="border-b">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-8">
                  <Link to="/" className="flex items-center">
                    <span className="text-purple-600 text-xl font-bold">Twittence</span>
                    <span className="ml-2 text-sm text-gray-600">Trend-Powered Insights</span>
                  </Link>
                  <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
                    <Link to="/trends" className="text-gray-600 hover:text-gray-900">Trends</Link>
                    <Link to="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
                  <Link to="/trial" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      );
    }
