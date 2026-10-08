# Deployment Guide

## Table of Contents

- [Vercel Deployment](#vercel-deployment)
  - [Prerequisites](#prerequisites)
  - [One-Click Deploy](#one-click-deploy)
  - [Manual Deployment](#manual-deployment)
  - [Environment Variables](#environment-variables)
  - [Custom Domains](#custom-domains)
  - [Preview Deployments](#preview-deployments)
- [Other Platforms](#other-platforms)
  - [Netlify](#netlify)
  - [AWS Amplify](#aws-amplify)
  - [Heroku](#heroku)
- [CI/CD Setup](#cicd-setup)
  - [GitHub Actions](#github-actions)
- [Troubleshooting](#troubleshooting)
- [Production Checklist](#production-checklist)

## Vercel Deployment

### Prerequisites

- A [Vercel account](https://vercel.com/signup)
- GitHub, GitLab, or Bitbucket account connected to Vercel
- Node.js (v18 or later) installed locally for manual deployments
- writespace project repository

### One-Click Deploy

1. Click the button below to deploy writespace to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fwritespace)

2. Follow the Vercel dashboard prompts to:
   - Connect your Git provider
   - Select the writespace repository
   - Configure project settings (framework preset: Vite)
   - Add environment variables (see [Environment Variables](#environment-variables))
   - Deploy

### Manual Deployment

#### Using Vercel CLI

1. Install the Vercel CLI globally:

```bash
npm install -g vercel
```

2. Navigate to your project directory:

```bash
cd writespace
```

3. Run the Vercel deployment command:

```bash
vercel
```

4. Follow the prompts to:
   - Link your project to an existing Vercel project or create a new one
   - Set the project root directory (should be the current directory)
   - Configure environment variables
   - Deploy

5. For production deployment:

```bash
vercel --prod
```

#### Using Git Integration

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import your writespace repository
5. Configure project settings:
   - Framework Preset: Vite
   - Root Directory: (leave empty if project is in root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables (see [Environment Variables](#environment-variables))
7. Click "Deploy"

### Environment Variables

Add these environment variables in your Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `https://api.writespace.com/v1` | Base URL for the API |

To add environment variables:

1. Go to your project in the Vercel Dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add each variable with its value
4. Redeploy your project for changes to take effect

### Custom Domains

To add a custom domain to your Vercel deployment:

1. Go to your project in the Vercel Dashboard
2. Navigate to "Settings" → "Domains"
3. Enter your domain name (e.g., `writespace.yourdomain.com`)
4. Follow the instructions to configure DNS records
5. Wait for DNS propagation (can take up to 24 hours)

### Preview Deployments

Vercel automatically creates preview deployments for:

- Every push to a pull request
- Every push to a branch that isn't your production branch

Preview deployments have unique URLs and can be shared for testing before merging to production.

## Other Platforms

### Netlify

1. Go to [Netlify](https://app.netlify.com/) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider and select the writespace repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in "Site settings" → "Environment variables"
6. Click "Deploy site"

### AWS Amplify

1. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "Connect app" and select your Git provider
3. Choose the writespace repository and branch
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Add environment variables in the build settings
6. Click "Save and deploy"

### Heroku

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Create a new Heroku app:

```bash
heroku create your-app-name
```

3. Add the Node.js buildpack:

```bash
heroku buildpacks:set heroku/nodejs
```

4. Configure the app for Vite:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false
```

5. Create a `static.json` file in your project root:

```json
{
  "root": "dist/",
  "clean_urls": false,
  "routes": {
    "/**": "index.html"
  }
}
```

6. Commit and push to Heroku:

```bash
git add .
git commit -m "Configure for Heroku"
git push heroku main
```

## CI/CD Setup

### GitHub Actions

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

1. Generate a Vercel token from your [Vercel account settings](https://vercel.com/account/tokens)
2. Add the token as a GitHub secret named `VERCEL_TOKEN`
3. Push the workflow file to your repository

## Troubleshooting

### Common Issues

**Build fails with "Module not found" errors**
- Ensure all dependencies are listed in `package.json`
- Run `npm install` locally and commit `package-lock.json`
- Check for case sensitivity in import paths

**Blank page after deployment**
- Verify the output directory is correctly set to `dist`
- Check that the `vite.config.js` is properly configured
- Ensure environment variables are set in the deployment platform

**API requests failing**
- Verify `VITE_API_BASE_URL` is set correctly
- Check CORS settings on your API server
- Ensure the API endpoint is accessible from the deployed environment

**Environment variables not available**
- Ensure variables are prefixed with `VITE_` for Vite to expose them
- Verify variables are set in the deployment platform
- Check for typos in variable names

**CSS not loading**
- Verify Tailwind CSS is properly configured in `tailwind.config.js`
- Ensure `index.css` imports Tailwind directives
- Check that the build process completes without errors

## Production Checklist

Before deploying to production:

- [ ] Test all authentication flows (login, registration, logout)
- [ ] Verify all API endpoints are working with the production API URL
- [ ] Test document creation, editing, and deletion
- [ ] Check admin dashboard functionality
- [ ] Verify responsive design on mobile, tablet, and desktop
- [ ] Test error handling and 404 pages
- [ ] Ensure environment variables are properly set
- [ ] Verify custom domain configuration (if applicable)
- [ ] Test preview deployments for pull requests
- [ ] Set up monitoring and error tracking
- [ ] Configure proper caching headers
- [ ] Test performance with Lighthouse
- [ ] Verify SSL certificate is valid
- [ ] Set up proper redirects (HTTP → HTTPS, www → non-www)
- [ ] Test search functionality
- [ ] Verify user permissions and access control