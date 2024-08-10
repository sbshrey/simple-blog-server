# simple-blog-server

This project implements a simple REST API for a blog post system using Node.js, Express.js, and in-memory data storage. It includes endpoints for creating, retrieving, updating, and deleting blog posts. The API requires API key-based authentication for posts routes.

## Project Structure

```
simple-blog-server/
├──src
    ├── middleware
    |   └── auth.js             # Defines the auth mechanism
    ├── routes/
    │   └── default.js          # Defines the blog default-related routes
    │   └── health.js           # Defines the blog health-related routes
    │   └── posts.js            # Defines the blog post-related routes
    ├── index.js              # Main entry point of the application
├── loadtest.js            # endpoints load test with autocannon
├── package.json           # NPM package configuration
└── README.md              # Project documentation
```


## Features
- RESTful API: Provides endpoints to create, read, update, and delete blog posts.
- In-memory Data Storage: Stores posts in memory (no database).
- Basic Authentication: Uses an API key for secure access to the API.

## Endpoints
  - `POST /posts`: Create a new blog post.
  - `GET /posts/{id}`: Retrieve a specific post by ID.
  - `GET /posts`: List all posts with pagination support.
  - `PUT /posts/{id}`: Update a specific post by ID.
  - `DELETE /posts/{id}`: Delete a specific post by ID.


## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

### Clone the repository:

```
git clone https://github.com/yourusername/blog-api.git
cd blog-api
```
### Install dependencies:

```
npm install
```

### Start the server:

```
node index.js
```

The server will start on http://localhost:3000.

## Authentication
All API routes (except /api-docs) require an API key for authentication. The key must be provided in the x-api-key header.

```
x-api-key: your-api-key
```




