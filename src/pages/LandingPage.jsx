import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import Navbar from '../components/Navbar';
import { FiEdit3, FiShare2, FiLock, FiUsers, FiSearch, FiCloud } from 'react-icons/fi';

const features = [
  {
    icon: FiEdit3,
    title: 'Easy Writing',
    description: 'Start writing immediately with our distraction-free editor. No setup required.'
  },
  {
    icon: FiShare2,
    title: 'Seamless Sharing',
    description: 'Share documents with your team with just a click. Control who can view or edit.'
  },
  {
    icon: FiLock,
    title: 'Secure & Private',
    description: 'Your documents are encrypted and only accessible to you and your team.'
  },
  {
    icon: FiUsers,
    title: 'Team Collaboration',
    description: 'Work together in real-time with comments and suggestions.'
  },
  {
    icon: FiSearch,
    title: 'Powerful Search',
    description: 'Find any document instantly with full-text search and tags.'
  },
  {
    icon: FiCloud,
    title: 'Cloud Storage',
    description: 'All your documents are automatically saved and accessible from anywhere.'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection className="mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to write better
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              writespace provides all the tools to create, collaborate, and share documents efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;