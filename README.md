# Real Estate Website - Frontend Development

## Overview
The Real Estate Website is a Next.js application designed to facilitate the buying, selling, and renting of properties. This documentation focuses on the frontend development aspects, including project structure, setup instructions, and key features.

## Technologies & Tools
- **Next.js**: A React-based framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling components efficiently.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Figma**: Used for UI design and prototyping.

## Getting Started

### Prerequisites
- Node.js (version >= 14.x)
- npm or Yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hba777/Real-Estate-Website.git
   cd Real-Estate-Website
   git checkout feature/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (create a `.env.local` file):
   ```plaintext
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Project Structure
```
/src
  ├── assets          # Static assets (images, icons, etc.)
  ├── components      # Reusable UI components
  ├── pages           # Next.js pages (routing)
  ├── styles          # Global styles and Tailwind CSS configuration
  └── db.js          # Database connection and data retrieval logic
```

### Directory Details
- **`assets`**: Contains all static files, including images and icons used throughout the application.
  
- **`components`**: Houses reusable components such as buttons, forms, and layout elements. Key components may include:
  - **Header**: Navigation and branding.
  - **Footer**: Website footer with links and information.
  - **PropertyCard**: Displays individual property details.
  
- **`pages`**: Contains the pages of the application, leveraging Next.js routing for navigation. This includes:
  - **index.js**: The homepage featuring property listings.
  - **[id].js**: Dynamic page for displaying individual property details based on the property ID.
  
- **`styles`**: Holds global CSS styles and Tailwind CSS configuration files, ensuring a consistent design across the application.

- **`db.js`**: Manages the connection to the database and retrieval of data for properties and users. This file handles the API calls to fetch property listings and related data.

## Key Features
- **Property Listings**: Dynamic display of properties with filtering and sorting options.
- **Property Details**: Individual property pages with images, descriptions, and interaction options.
- **User Authentication**: Forms for user registration and login.
- **Search Functionality**: Interactive search capabilities for properties based on various criteria.

## User Interface
The frontend design emphasizes a modern, clean aesthetic with:
- **Responsive Layout**: Built with Tailwind CSS to ensure usability on all devices.
- **Figma Designs**: Wireframes and mockups to guide the UI development process.

## Accessibility
Ensured adherence to web accessibility standards (WCAG) to provide a usable experience for all users, including those with disabilities.

## Development Process
- Engaged in user research to inform design decisions.
- Iterated on UI designs based on user feedback and testing.
- Collaborated with backend developers to integrate APIs seamlessly.

## Future Improvements
- Enhance performance optimizations for faster load times.
- Introduce new features based on user feedback and analytics.
- Improve SEO strategies for better search engine visibility.

---

For more information on backend development and overall project management, please refer to the respective documentation sections.
```
