import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import ShareButtons from './ShareButtons';

    // Simulating a simple cache/store since we don't have a backend
    const articles = {};

    function ArticlePage() {
      const { id } = useParams();
      const [article, setArticle] = useState(null);
      const [commentText, setCommentText] = useState('');
      const [hasVoted, setHasVoted] = useState(false);
      const [userVote, setUserVote] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const shareUrl = window.location.href;
      const maxCommentLength = 500;

      useEffect(() => {
        const loadArticle = async () => {
          setLoading(true);
          try {
            if (articles[id]) {
              articles[id].views += 1;
              setArticle(articles[id]);
            } else {
              const trends = [
                { id: 1, title: 'Taylor Swift New Album', keywords: ['taylor swift', 'new album', 'music'] },
                { id: 2, title: 'AI Revolution', keywords: ['artificial intelligence', 'ai', 'machine learning'] },
                { id: 3, title: 'Global Warming', keywords: ['climate change', 'global warming', 'environment'] },
              ];
              const trend = trends.find(t => t.id === parseInt(id));
              if (trend) {
                articles[id] = {
                  id: trend.id,
                  title: `Breaking: ${trend.title}!`,
                  content: `The latest buzz is all about ${trend.title}. This is a hot topic right now! #trending #news #hot`,
                  imageUrl: 'https://placekitten.com/200/150',
                  tags: trend.keywords,
                  views: 1,
                  ctr: 0,
                  seoRanking: 'N/A',
                  votes: { hot: 0, not: 0 },
                  comments: [],
                  timestamp: new Date().toLocaleString(),
                  shareCount: 0
                };
                setArticle(articles[id]);
              } else {
                setError('Article not found');
              }
            }
          } catch (err) {
            setError('Failed to load article');
          } finally {
            setLoading(false);
          }
        };

        loadArticle();
      }, [id]);

      const handleShare = (platform) => {
        if (articles[id]) {
          articles[id].shareCount = (articles[id].shareCount || 0) + 1;
          setArticle({...articles[id]});
        }
      };

      const handleVote = (type) => {
        if (!hasVoted && articles[id]) {
          articles[id].votes[type] += 1;
          setArticle({...articles[id]});
          setHasVoted(true);
          setUserVote(type);
          // Save vote to localStorage
          localStorage.setItem(`vote-${id}`, type);
        }
      };

      const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() !== '') {
          if (articles[id]) {
            const newComment = {
              id: Date.now(),
              text: commentText,
              timestamp: new Date().toLocaleString(),
              likes: 0
            };
            articles[id].comments = [newComment, ...articles[id].comments];
            setArticle({...articles[id]});
            setCommentText('');
          }
        }
      };

      const handleLikeComment = (commentId) => {
        if (articles[id]) {
          const updatedComments = articles[id].comments.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, likes: comment.likes + 1 };
            }
            return comment;
          });
          articles[id].comments = updatedComments;
          setArticle({...articles[id]});
        }
      };

      const handleClearComments = () => {
        if (articles[id] && window.confirm('Are you sure you want to clear all comments?')) {
          articles[id].comments = [];
          setArticle({...articles[id]});
        }
      };

      if (loading) {
        return (
          <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="container mx-auto p-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          </div>
        );
      }

      if (!article) {
        return <div className="container mx-auto p-4">Article not found.</div>;
      }

      return (
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{article.title}</h1>
              <Link to="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Back to Dashboard
              </Link>
            </div>

            <div className="mb-4">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="rounded-lg w-full max-h-96 object-cover"
              />
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-lg">{article.content}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleVote('hot')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    hasVoted && userVote === 'hot'
                      ? 'bg-green-500 text-white'
                      : hasVoted
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-green-500 hover:text-white'
                  }`}
                  disabled={hasVoted && userVote !== 'hot'}
                >
                  <span>🔥</span>
                  <span>Hot ({article.votes.hot})</span>
                </button>
                <button
                  onClick={() => handleVote('not')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    hasVoted && userVote === 'not'
                      ? 'bg-red-500 text-white'
                      : hasVoted
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-red-500 hover:text-white'
                  }`}
                  disabled={hasVoted && userVote !== 'not'}
                >
                  <span>❄️</span>
                  <span>Not ({article.votes.not})</span>
                </button>
              </div>
              <div className="text-gray-500 text-sm">
                {article.views} views • {article.shareCount || 0} shares
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Share this article</h3>
              <ShareButtons 
                url={shareUrl} 
                title={article.title} 
                onShare={handleShare}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Comments ({article.comments.length})</h2>
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="relative">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    maxLength={maxCommentLength}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                  <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                    {commentText.length}/{maxCommentLength}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                      !commentText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                  >
                    Post Comment
                  </button>
                  {article.comments.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearComments}
                      className="text-red-500 hover:text-red-600"
                    >
                      Clear all comments
                    </button>
                  )}
                </div>
              </form>

              <div className="space-y-4">
                {article.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-2">{comment.text}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{comment.timestamp}</span>
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
                      >
                        <span>👍</span>
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>Generated at: {article.timestamp}</p>
            </div>
          </div>
        </div>
      );
    }

    export default ArticlePage;
