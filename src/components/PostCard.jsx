import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PostPropType } from '../types';
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '../stores/authStore';
import UserAvatar from './UserAvatar';

const PostCard = ({ post, onDelete }) => {
  const { deletePost, isPostOwner } = usePostStore();
  const { isAuthenticated } = useAuthStore();

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      if (onDelete) onDelete(post.id);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <UserAvatar user={post.author} size="sm" />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author?.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {isAuthenticated && isPostOwner(post) && (
            <div className="flex space-x-2">
              <Link
                to={`/documents/${post.id}/edit`}
                className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <Link to={`/documents/${post.id}`} className="block">
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.content}
          </p>
        </Link>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PostPropType.isRequired,
  onDelete: PropTypes.func
};

export default PostCard;