# Zenith Product API

A RESTful Product Management API built using Node.js, Express.js, MongoDB, and Mongoose.

## Features

- Create new products
- Retrieve all products
- Retrieve a single product by ID
- Update existing products
- Delete products
- Filter products by category
- Filter products by minimum and maximum price
- Sort products by price (ascending and descending)
- Paginate product results

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate into the project:

   ```bash
   cd zenith-product-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/products | Create a product |
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| PUT | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |

## Query Parameters

| Parameter | Description |
|---|---|
| category | Filter by category |
| minPrice | Minimum product price |
| maxPrice | Maximum product price |
| sortBy | price_asc or price_desc |
| page | Page number (default: 1) |
| limit | Results per page (default: 10) |

## Security

Environment variables and node_modules are excluded from Git using `.gitignore`.

## Author

Darshita Vaghela