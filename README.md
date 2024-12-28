# LONA
[![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338BDF8.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Cloud Platform](https://img.shields.io/badge/Google%20Cloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)

## Overview

"LONA" is a modern web application designed for buying, selling, and renting properties. It features a responsive and user-friendly interface with advanced search capabilities, an interactive map integration, and secure user account management.

## Features

- **Search and Filter Properties**: Users can search properties by criteria such as price, location, size, and property type (e.g., house, apartment, etc.). Advanced filters allow for a personalized search experience.
- **User Authentication**: Users can securely register, log in, and recover their accounts via email. Includes JWT-based authentication for secure access.
- **Interactive Map**: View property locations on an interactive map, filter properties directly on the map, and get directions.
- **Admin Panel**: Admins can manage property listings, approve user registrations, and remove inappropriate content.
- **User Profiles**: Users can manage their personal information, save favorite properties, and track their search history.

## Technologies & Tools

- **Frontend**:
  - [Next.js](https://nextjs.org/): Framework for building server-side rendered React applications.
  - [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for fast, responsive UI development.

- **Backend**:
  - [Node.js](https://nodejs.org/): JavaScript runtime for building the server-side application.
  - [Express.js](https://expressjs.com/): Web application framework for building RESTful APIs.
  - [PostgreSQL](https://www.postgresql.org/): Relational database for storing property and user data.

- **Authentication & Real-time**:
  - [Firebase](https://firebase.google.com/): For user authentication and real-time features.

- **Mapping**:
  - [Leaflet](https://leafletjs.com/): JavaScript library for interactive maps.


## Getting Started

Follow these steps to get the development environment up and running.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/real-estate-website.git
    ```

2. Navigate to the project directory:

    ```bash
    cd real-estate-website
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    npm install
    ```

4. Set up your environment variables:

    - For **frontend**, create a `.env.local` file with the following variables:
      ```env
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
      ```

    - For **backend**, create a `.env` file with the following variables:
      ```env
      DATABASE_URL=your_postgresql_connection_string
      JWT_SECRET=your_jwt_secret
      FIREBASE_CONFIG=your_firebase_config
      ```

### Database Schema

- **Users**: Stores user information for authentication (email, password hash, etc.). Users can have multiple saved properties.
- **Properties**: Stores detailed information about properties, including price, location, description, and images.
  - Sample properties include: 3-bedroom house in New York, 2-bedroom apartment in Los Angeles, etc.
- **Locations**: Stores geographic information for each property, including latitude and longitude.
- **Images**: Stores images and media for properties. Each property can have multiple associated images.



