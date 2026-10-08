import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useUserStore } from '../stores/userStore';
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '../stores/authStore';
import Navbar from '../components/Navbar';
import RouteGuard from '../components/RouteGuard';
import CTAButton from '../components/CTAButton';
import { FiUsers, FiFileText, FiUserPlus, FiActivity } from 'react-icons/fi';

const AdminDashboard = () => {
  const { users, loading: usersLoading, error: usersError, fetchUsers } = useUserStore();
  const { posts, loading: postsLoading, error: postsError, fetchPosts } = usePostStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchUsers(1, 100);
    fetchPosts(1, 100);
  }, [fetchUsers, fetchPosts]);

  const totalUsers = users.length;
  const totalPosts = posts.length;
  const activeUsers = users.filter(user => user.lastActiveAt).length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;

  return (
    <RouteGuard requireAuth requireAdmin>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-3">
              <CTAButton to="/admin/users/new" variant="primary">
                <FiUserPlus className="mr-2 h-4 w-4" />
                Add User
              </CTAButton>
              <CTAButton to="/documents/new" variant="secondary">
                <FiFileText className="mr-2 h-4 w-4" />
                New Post
              </CTAButton>
            </div>
          </div>

          {(usersError || postsError) && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {usersError || postsError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {(usersLoading || postsLoading) ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 h-32 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-3">
                    <FiUsers className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{totalUsers}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-full bg-green-100 p-3">
                    <FiActivity className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{activeUsers}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-full bg-blue-100 p-3">
                    <FiFileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{totalPosts}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-full bg-purple-100 p-3">
                    <FiFileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Published Posts</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{publishedPosts}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
              <CTAButton to="/admin/users" variant="outline" size="sm">
                View All
              </CTAButton>
            </div>

            {usersLoading ? (
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden animate-pulse h-64" />
            ) : (
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.slice(0, 5).map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name || 'No name'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <CTAButton
                              to={`/admin/users/${user.id}`}
                              variant="secondary"
                              size="sm"
                            >
                              View
                            </CTAButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
              <CTAButton to="/documents" variant="outline" size="sm">
                View All
              </CTAButton>
            </div>

            {postsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden h-24 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {posts.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          <Link to={`/documents/${post.id}`} className="hover:text-indigo-600 transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        by {post.author?.name || 'Anonymous'} • {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </RouteGuard>
  );
};

AdminDashboard.propTypes = {
  className: PropTypes.string
};

export default AdminDashboard;