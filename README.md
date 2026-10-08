# writespace

A simple, powerful writing platform for creating and sharing documents with your team.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Easy Writing**: Distraction-free editor for immediate writing
- **Seamless Sharing**: Share documents with team members with access control
- **Secure & Private**: Encrypted documents accessible only to authorized users
- **Team Collaboration**: Real-time collaboration with comments and suggestions
- **Powerful Search**: Full-text search and tag-based organization
- **Cloud Storage**: Automatic saving and access from anywhere
- **Admin Dashboard**: User and document management for administrators

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces
  - [Vite](https://vitejs.dev/) - Next generation frontend tooling
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [React Router](https://reactrouter.com/) - Declarative routing for React

- **State Management**:
  - [Zustand](https://github.com/pmndrs/zustand) - A small, fast and scalable bearbones state-management solution

- **Testing**:
  - [Vitest](https://vitest.dev/) - A Vite-native unit test framework
  - [Testing Library](https://testing-library.com/) - Simple and complete testing utilities

- **Deployment**:
  - [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later) or yarn (v1.22 or later)
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/writespace.git
cd writespace
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_BASE_URL=https://api.writespace.com/v1
```

For development, you can use the values from `.env.example`.

### Running the Application

#### Development

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173`.

#### Production Build

```bash
npm run build
# or
yarn build
```

This will create a production-ready build in the `dist` directory.

#### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

This will start a local server to preview the production build.

## Folder Structure

```
writespace/
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── index.html                  # Main HTML file
├── package.json                # Project dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vercel.json                 # Vercel deployment configuration
├── vite.config.js              # Vite configuration
├── src/
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   ├── index.css               # Global styles
│   ├── components/             # Reusable UI components
│   │   ├── CTAButton.jsx       # Call-to-action button component
│   │   ├── FeatureCard.jsx     # Feature card component
│   │   ├── HeroSection.jsx     # Hero section component
│   │   ├── Navbar.jsx          # Navigation bar component
│   │   ├── PostCard.jsx        # Post card component
│   │   ├── PostForm.jsx        # Post creation/editing form
│   │   ├── RouteGuard.jsx      # Authentication/authorization guard
│   │   ├── UserAvatar.jsx      # User avatar component
│   │   └── UserForm.jsx        # User creation/editing form
│   ├── constants.js            # Application constants
│   ├── pages/                  # Page components
│   │   ├── AdminDashboard.jsx  # Admin dashboard page
│   │   ├── BlogListPage.jsx    # Blog post listing page
│   │   ├── CreatePostPage.jsx  # Create new post page
│   │   ├── EditPostPage.jsx    # Edit post page
│   │   ├── LandingPage.jsx     # Landing page
│   │   ├── LoginPage.jsx       # Login page
│   │   ├── NotFoundPage.jsx    # 404 page
│   │   ├── PostDetailPage.jsx  # Post detail page
│   │   ├── RegisterPage.jsx    # Registration page
│   │   └── UserList.jsx        # User management page
│   ├── routes/                 # Application routes
│   │   └── index.jsx           # Router configuration
│   ├── services/               # Service utilities
│   │   └── localStorageService.js # Local storage service
│   ├── stores/                 # State management stores
│   │   ├── authStore.js        # Authentication store
│   │   ├── postStore.js        # Post store
│   │   └── userStore.js        # User store
│   ├── types/                  # Type definitions
│   │   └── index.js            # PropTypes definitions
│   └── utils/                  # Utility functions
│       ├── dateUtils.js        # Date formatting utilities
│       └── validationUtils.js  # Form validation utilities
├── public/                     # Static assets
└── README.md                   # Project documentation
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build
- `npm run test` - Run tests
- `npm run coverage` - Run tests with coverage report

## Deployment

### Vercel

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy the application:

```bash
vercel
```

Follow the prompts to link your project and deploy.

### Other Platforms

For other platforms like Netlify, AWS, or Heroku, consult their respective documentation for deploying Vite + React applications.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.