import PropTypes from 'prop-types';
import { UserPropType } from '../types';

const UserAvatar = ({ user, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl'
  };

  const initial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase();

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${sizeClasses[size]} ${className}`}
    >
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={`${user.name || user.email}'s avatar`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {initial}
        </span>
      )}
    </div>
  );
};

UserAvatar.propTypes = {
  user: UserPropType.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string
};

export default UserAvatar;