# Blog API

## Overview
This project is a RESTful API built with **Node.js, Express, and PostgreSQL** . It serves as the backend for a **blog platform** that will have two separate frontends:

1. A **public frontend** where users can read and comment on blog posts.
2. A **private admin frontend** where the author can create, edit, and publish blog posts.

This project is a great way to practice and see the benefits of creating an API-only backend, allowing multiple frontends to interact with it.

---

## Features
- **JWT Authentication** for secure user login and role-based access.
- **User Registration & Login** with validation.
- **CRUD Operations for Blog Posts** (Create, Read, Update, Delete).
- **Comment System** with authentication for posting and managing comments.
- **Admin Controls** for managing posts and comments.
- **Middleware for Validation and Authentication**.
- **RESTful API Design** with structured endpoints.

---

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB / PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Deployment:** Netlify (for frontend), Render/Vercel (for backend)

---

## Installation
### **Prerequisites**
- Install **Node.js** and **npm**.
- Setup a **MongoDB/PostgreSQL database**.

### **Steps to Run Locally**
```bash
# Clone the repository
git clone https://github.com/Keshujangid/Blog-api.git

# Navigate to the project directory
cd Blog-api

# Install dependencies
npm install

# Create a .env file in the root directory and add the following variables
PORT=5000
your_database_connection_string=your_database_connection_string
JWT_SECRET=your_jwt_secret

# Start the server
npm start
```
The server should now be running at `http://localhost:5000`.

---

## API Endpoints

### **Authentication Routes**
| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| POST   | `/auth/register` | User Registration   |
| POST   | `/auth/login`    | User Login & Token  |
| POST   | `/auth/logout`   | Logout User        |
| POST   | `/auth/verify-token` | Verify JWT Token |

### **Blog Post Routes**
| Method | Endpoint        | Description               |
|--------|----------------|---------------------------|
| GET    | `/api/posts`    | Fetch all blog posts      |
| GET    | `/api/posts/:id` | Fetch a specific post    |
| POST   | `/api/posts`    | Create a new post (Auth) |
| DELETE | `/api/posts/:id` | Delete a post (Auth)     |

### **Comment Routes**
| Method | Endpoint        | Description                      |
|--------|----------------|----------------------------------|
| GET    | `/api/posts/:id/comments` | Get comments for a post |
| POST   | `/api/posts/:id/comments` | Add a comment (Auth) |
| PUT    | `/api/posts/:id/comment/:commentId` | Edit a comment (Auth) |
| DELETE | `/api/posts/:id/comment/:commentId` | Delete a comment (Auth) |

### **Admin Routes**
| Method | Endpoint            | Description                       |
|--------|----------------------|-----------------------------------|
| GET    | `/admin/posts`       | Get all posts by the user (Auth) |
| GET    | `/admin/posts/:id`   | Get a specific post (Auth)       |
| PUT    | `/admin/posts/:id`   | Update a post (Auth)             |
| DELETE | `/admin/posts/:id/comment/:commentId` | Delete comment by author (Auth) |

---

## License
This project is open-source and available under the MIT License.

---

## Contact
For any issues or contributions, feel free to open a pull request or reach out to me on GitHub!

---
**Happy Coding! 🚀**

