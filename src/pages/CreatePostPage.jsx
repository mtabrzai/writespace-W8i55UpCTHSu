import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import PostForm from '../components/PostForm';
import RouteGuard from '../components/RouteGuard';

const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    <RouteGuard requireAuth>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          </div>

          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 sm:p-8">
            <PostForm />
          </div>
        </main>
      </div>
    </RouteGuard>
  );
};

CreatePostPage.propTypes = {
  className: PropTypes.string
};

export default CreatePostPage;