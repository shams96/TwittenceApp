import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { generateArticle } from '../services/articleGenerator';

    const trends = [
      { id: 1, title: 'Taylor Swift New Album', keywords: ['taylor swift', 'new album', 'music'] },
      { id: 2, title: 'AI Revolution', keywords: ['artificial intelligence', 'ai', 'machine learning'] },
      { id: 3, title: 'Global Warming', keywords: ['climate change', 'global warming', 'environment'] },
    ];

    function Dashboard() {
      const [searchTerm, setSearchTerm] = useState('');
      const [generating, setGenerating] = useState({});
      const [articles, setArticles] = useState({});

      const handleGenerateArticle = async (trendId) => {
        setGenerating(prev => ({ ...prev, [trendId]: true }));
        try {
          const trend = trends.find(t => t.id === trendId);
          const article = await generateArticle(trend);
          setArticles(prev => ({
            ...prev,
            [trendId]: article
          }));
        } catch (error) {
          console.error('Error generating article:', error);
        } finally {
          setGenerating(prev => ({ ...prev, [trendId]: false }));
        }
      };

      const filteredTrends = trends.filter(trend =>
        trend.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl font-medium mb-2">Get the latest buzz in a snap!</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search trends..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTrends.map(trend => (
              <div
                key={trend.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
              >
                <h3 className="text-xl font-semibold mb-4">{trend.title}</h3>
                <button
                  onClick={() => handleGenerateArticle(trend.id)}
                  disabled={generating[trend.id]}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mb-4 relative"
                >
                  {generating[trend.id] ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </div>
                  ) : (
                    'Generate Article'
                  )}
                </button>
                {articles[trend.id] && (
                  <div className="space-y-4">
                    <div className="text-gray-600 text-sm line-clamp-3">
                      {articles[trend.id].content}
                    </div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/article/${trend.id}`}
                        className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
                      >
                        View Article
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                      <span className="text-gray-500 text-sm">
                        Views: {articles[trend.id].views}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    export default Dashboard;
