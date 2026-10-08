import PropTypes from 'prop-types';

export const UserPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string,
  avatar: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  role: PropTypes.string
});

export const PostPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['draft', 'published', 'archived']),
  tags: PropTypes.arrayOf(PropTypes.string)
});

export const SessionPropType = PropTypes.shape({
  token: PropTypes.string.isRequired,
  expiresAt: PropTypes.string.isRequired,
  user: UserPropType.isRequired
});

export const DocumentSettingsPropType = PropTypes.shape({
  fontSize: PropTypes.string,
  lineHeight: PropTypes.number,
  theme: PropTypes.oneOf(['light', 'dark', 'sepia'])
});

export const ErrorPropType = PropTypes.shape({
  message: PropTypes.string.isRequired,
  code: PropTypes.string,
  details: PropTypes.object
});

export const PaginatedResponsePropType = PropTypes.shape({
  data: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number
});