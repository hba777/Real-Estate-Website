## Real Estate Property Management

This project is a comprehensive real estate property management system designed to handle property listings, including details about properties, locations, and images. The backend leverages a PostgreSQL database hosted on Google Cloud Platform (GCP), which is used for storing and managing the data efficiently.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Database Schema](#database-schema)
  - [Property Table](#property-table)
  - [Location Table](#location-table)
  - [Image Table](#image-table)
- [Database Connection](#database-connection)
- [Data Source](#data-source)
- [Backend Structure](#backend-structure)
- [Usage](#usage)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project provides a backend that handles property listings, images, and location data for a real estate management platform. The backend connects to a PostgreSQL database hosted on Google Cloud Platform (GCP). It allows users to manage property listings, view property details, and store images associated with properties.

### Key Features:

- **Property Listings**: View, add, update, and delete property listings.
- **Location Management**: Manage and retrieve locations for each property.
- **Image Management**: Store images for properties in the database.
- **Cloud Database**: Data is hosted on GCP using PostgreSQL for high scalability and security.
- **Data Handling**: Integrates external property data from Kaggle's **Zameen.com Property Data** dataset for initial property records.

## Features

- **Property Listings**: View, add, edit, and delete property listings with complete details (e.g., price, area, location).
- **Location Management**: Manage property location details (city, province, locality).
- **Image Management**: Handle property images by converting them into binary format for storage in PostgreSQL.
- **Cloud-Based Storage**: Utilize GCP-hosted PostgreSQL for storing and managing property-related data.
- **Data Import from Kaggle**: The initial dataset is sourced from Kaggle’s **Zameen.com Property Data** (available [here](https://www.kaggle.com/datasets/huzzefakhan/zameencom-property-data-pakistan)).

## Database Schema

### Property Table

This table holds details about the properties available for sale or rent.

| Column Name     | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `property_id`   | Unique identifier for each property (Primary Key)             |
| `property_type` | Type of property (e.g., House, Apartment)                     |
| `price`         | Price of the property                                         |
| `price_bin`     | Categorized price range (e.g., Low, High)                     |
| `area`          | Area measurement (e.g., Kanal, Marla)                         |
| `area_marla`    | Area in Marla                                                 |
| `area_sqft`     | Area in square feet                                           |
| `baths`         | Number of bathrooms                                           |
| `bedrooms`      | Number of bedrooms                                            |
| `purpose`       | Purpose of the property (e.g., For Sale)                      |
| `location_id`   | Foreign key referencing `location_id` from the Location table |
| `date_added`    | Date when the property was added                              |

### Location Table

This table contains location details for properties.

| Column Name     | Description                                       |
| --------------- | ------------------------------------------------- |
| `location_id`   | Unique identifier for each location (Primary Key) |
| `city`          | City name                                         |
| `province_name` | Province name                                     |
| `locality`      | Locality name                                     |
| `latitude`      | Latitude of the location                          |
| `longitude`     | Longitude of the location                         |

### Image Table

This table holds the image data for properties, with each image associated with a specific property.

| Column Name   | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `image_id`    | Unique identifier for each image (Primary Key)                |
| `property_id` | Foreign key referencing `property_id` from the Property table |
| `image_data`  | Binary data of the image (BYTEA type)                         |
| `image_type`  | Type of the image (e.g., PNG, JPG)                            |
| `date_added`  | Date when the image was added                                 |

### How Images Are Stored in the Database

In this project, property images are stored as binary data in the PostgreSQL database. The images are uploaded by converting them into binary format before storing them in the `image_data` field of the **Image Table**. This ensures efficient management of images and allows easy retrieval when needed.

- **Uploading an Image**: When an image is uploaded, it is converted to binary format and stored in the `image_data` field, linked to a property via `property_id`.
- **Retrieving an Image**: When an image is requested, the binary data is retrieved from the database and converted back into its original format for display, using technologies like **Pillow** for Python or rendering directly through base64 encoding in a web application.

## Database Connection

This project utilizes a **PostgreSQL** database hosted on **Google Cloud Platform (GCP)**. The database is securely set up for high availability, and all data (property listings, locations, and images) is stored in this cloud-based database. The connection details for the database are configured as environment variables to maintain security and ease of configuration.

To connect to the PostgreSQL database:

1. Install PostgreSQL client libraries:
   ```bash
   pip install psycopg2
   ```

2. Configure the connection string in your backend application using the following structure:
   ```python
   import psycopg2
   from psycopg2 import sql

   conn = psycopg2.connect(
       host="your-gcp-host",
       port="5432",  # Default PostgreSQL port
       database="your-database",
       user="your-username",
       password="your-password"
   )
   ```

3. Ensure that the environment variables for the database credentials are set up securely in your project.

---

## Data Source

This project incorporates property data sourced from **Kaggle’s Zameen.com Property Data** dataset. The dataset contains information on property listings, including prices, locations, and other details about real estate in Pakistan. It serves as the initial data for populating the system with real-world property listings.

To import the Kaggle dataset:

1. Download the dataset from [Kaggle’s Zameen.com Property Data](https://www.kaggle.com/datasets/huzzefakhan/zameencom-property-data-pakistan).
2. Clean and format the data as required for the database (e.g., converting the price to numeric format, mapping the location fields).
3. Insert the data into the PostgreSQL database using SQL scripts or an automated script written in Python.

---

## Backend Structure

The backend of the project is built using **Node.js**, **Express**, and **PostgreSQL**.

- **Node.js**: Handles the server and API requests.
- **Express**: Simplifies routing and middleware management.
- **PostgreSQL**: Stores all property-related data securely in the cloud.
