import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';

const RouteGuard = ({ children, requireAuth = false, requireAdmin = false }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { isAdmin } = useUserStore();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && (!isAuthenticated || !isAdmin())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

RouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
  requireAuth: PropTypes.bool,
  requireAdmin: PropTypes.bool
};

export default RouteGuard;