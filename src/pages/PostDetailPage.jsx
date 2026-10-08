import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '../stores/authStore';
import Navbar from '../components/Navbar';
import CTAButton from '../components/CTAButton';
import UserAvatar from '../components/UserAvatar';
import RouteGuard from '../components/RouteGuard';
import { PostPropType } from '../types';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, loading, error, fetchPostById, deletePost, isPostOwner } = usePostStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchPostById(id);
  }, [id, fetchPostById]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/documents');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden h-96 animate-pulse" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Post not found</h3>
            <p className="mt-1 text-sm text-gray-500">The post you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <RouteGuard requireAuth={currentPost.status === 'draft'}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-8 sm:px-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <UserAvatar user={currentPost.author} size="md" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currentPost.author?.name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(currentPost.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {isAuthenticated && isPostOwner(currentPost) && (
                  <div className="flex space-x-2">
                    <CTAButton
                      to={`/documents/${currentPost.id}/edit`}
                      variant="secondary"
                    >
                      Edit
                    </CTAButton>
                    <CTAButton
                      onClick={handleDelete}
                      variant="danger"
                    >
                      Delete
                    </CTAButton>
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentPost.title}</h1>

              {currentPost.tags && currentPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose max-w-none text-gray-700">
                {currentPost.content}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/documents"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Documents
            </Link>
          </div>
        </main>
      </div>
    </RouteGuard>
  );
};

PostDetailPage.propTypes = {
  className: PropTypes.string
};

export default PostDetailPage;