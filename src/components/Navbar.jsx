import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { ADMIN_EMAILS } from '../constants';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isAdmin } = useUserStore();

  const navLinks = [
    { path: '/', label: 'Home' },
    ...(isAuthenticated ? [
      { path: '/documents', label: 'Documents' },
      ...(isAdmin() ? [
        { path: '/admin/users', label: 'Users' },
        { path: '/admin/dashboard', label: 'Dashboard' }
      ] : [])
    ] : [])
  ];

  const authLinks = isAuthenticated
    ? [
        { path: '/profile', label: user?.name || 'Profile' },
        { action: logout, label: 'Logout' }
      ]
    : [
        { path: '/login', label: 'Login' },
        { path: '/register', label: 'Register' }
      ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">writespace</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${location.pathname === link.path ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {authLinks.map((link, index) => (
              link.path ? (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${location.pathname === link.path ? 'bg-gray-100' : ''} px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={`action-${index}`}
                  onClick={link.action}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  className: PropTypes.string
};

export default Navbar;