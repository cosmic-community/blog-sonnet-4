# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/d7b39990-9fa4-11f0-b878-255b128b940c-photo-1633356122544-f134324a6cee-1759419077006.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 15 and Cosmic CMS. Features a clean design, category filtering, author profiles, and optimized performance across all devices.

## Features

- 📝 **Dynamic Blog Posts** - Rich content display with featured images and full typography
- 👤 **Author Profiles** - Complete author pages with bio, social links, and published articles
- 🏷️ **Category System** - Organized content browsing with color-coded categories and filtering
- 📱 **Responsive Design** - Optimized experience across mobile, tablet, and desktop
- ⚡ **Fast Performance** - Server-side rendering with Next.js 15 for optimal speed
- 🎨 **Modern UI** - Clean typography, smooth animations, and intuitive navigation
- 🔍 **SEO Optimized** - Proper meta tags, structured data, and server-side rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68de9a65260d9dd939d1aede&clone_repository=68de9bc2260d9dd939d1af00)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog with posts, authors, and categories

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic SDK** - Headless CMS integration
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the blog content model

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd modern-blog-platform
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# Copy the environment template
cp .env.example .env.local

# Add your Cosmic credentials
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Blog Posts
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with author and category data
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get posts by category
const techPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .depth(1)
```

### Fetching Authors
```typescript
// Get all authors
const authors = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])

// Get single author with their posts
const author = await cosmic.objects
  .findOne({ type: 'authors', slug: authorSlug })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket using the following content structure:

### Posts Object Type
- **Title** (text) - The main title of the blog post
- **Excerpt** (textarea) - Brief summary for previews
- **Content** (html-textarea) - Main content of the post
- **Featured Image** (file) - Main image displayed with the post
- **Author** (object) - Connected to Authors object type
- **Category** (object) - Connected to Categories object type
- **Tags** (text) - Comma-separated tags
- **Published Date** (date) - When the post was published

### Authors Object Type
- **Full Name** (text) - Author's full name
- **Bio** (textarea) - Short biography
- **Profile Picture** (file) - Author's profile photo
- **Email** (text) - Contact email
- **Twitter Handle** (text) - Twitter username
- **LinkedIn URL** (text) - LinkedIn profile
- **Website** (text) - Personal website

### Categories Object Type
- **Name** (text) - Category name
- **Description** (textarea) - Category description
- **Color** (color) - Theme color for the category
- **Icon** (emoji) - Emoji representing the category

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the application: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables

### Other Platforms
The application can be deployed to any platform that supports Next.js applications.

## Environment Variables

Make sure to set these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

<!-- README_END -->