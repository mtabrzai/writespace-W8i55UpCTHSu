import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStore } from '../stores/authStore';

const HeroSection = ({ className = '' }) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className={`bg-gradient-to-r from-indigo-500 to-purple-600 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Write Your Ideas with writespace
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-indigo-100">
            A simple, powerful writing platform for creating and sharing documents with your team.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                to={isAuthenticated ? "/documents" : "/register"}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors"
              >
                {isAuthenticated ? 'View Documents' : 'Get Started'}
                <svg
                  className="-mr-1 ml-3 h-5 w-5 text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            {!isAuthenticated && (
              <div className="ml-3 inline-flex">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  className: PropTypes.string
};

export default HeroSection;