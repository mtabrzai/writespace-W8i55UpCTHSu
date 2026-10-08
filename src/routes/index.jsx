import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PropTypes from 'prop-types';
import App from '../App';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import BlogListPage from '../pages/BlogListPage';
import PostDetailPage from '../pages/PostDetailPage';
import CreatePostPage from '../pages/CreatePostPage';
import EditPostPage from '../pages/EditPostPage';
import AdminDashboard from '../pages/AdminDashboard';
import UserList from '../pages/UserList';
import RouteGuard from '../components/RouteGuard';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'documents',
        children: [
          {
            index: true,
            element: <BlogListPage />
          },
          {
            path: 'new',
            element: (
              <RouteGuard requireAuth>
                <CreatePostPage />
              </RouteGuard>
            )
          },
          {
            path: ':id',
            element: <PostDetailPage />
          },
          {
            path: ':id/edit',
            element: (
              <RouteGuard requireAuth>
                <EditPostPage />
              </RouteGuard>
            )
          }
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: 'dashboard',
            element: (
              <RouteGuard requireAuth requireAdmin>
                <AdminDashboard />
              </RouteGuard>
            )
          },
          {
            path: 'users',
            children: [
              {
                index: true,
                element: (
                  <RouteGuard requireAuth requireAdmin>
                    <UserList />
                  </RouteGuard>
                )
              },
              {
                path: 'new',
                element: (
                  <RouteGuard requireAuth requireAdmin>
                    <div className="min-h-screen bg-gray-50">
                      <Navbar />
                      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex justify-between items-center mb-8">
                          <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 sm:p-8">
                          <UserForm />
                        </div>
                      </main>
                    </div>
                  </RouteGuard>
                )
              },
              {
                path: ':id',
                element: (
                  <RouteGuard requireAuth requireAdmin>
                    <div className="min-h-screen bg-gray-50">
                      <Navbar />
                      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex justify-between items-center mb-8">
                          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 sm:p-8">
                          <UserDetails />
                        </div>
                      </main>
                    </div>
                  </RouteGuard>
                )
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

Router.propTypes = {
  children: PropTypes.node
};

export default Router;