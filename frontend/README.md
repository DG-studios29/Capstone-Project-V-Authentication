# Cool Tech Credential Management App

This is an internal web application for managing credentials for various services. The application supports user registration, login, different user roles, and access control based on organizational units (OUs) and divisions.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project-root

### Install dependencies:

npm install

### Configure environment variables in a .env file (create this file in the root directory):

MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/
JWT_SECRET=your_jwt_secret

### Running the Application
Start the backend server:
node index.js

Seed the database with initial data:
node seed.js

### Testing Users
Use the following credentials to test the application:

# Admin
Username: admin
Password: adminpassword

# Management User
Username: user2
Password: password2

# Normal User
Username: user1
Password: password1


### Usage
Open your browser and navigate to the frontend application.
Register and login with the provided test users.
Test different functionalities based on the role of the logged-in user.


### Project Structure
models/ - Mongoose models
controllers/ - Controllers for handling requests
routes/ - Route definitions
middleware/ - Middleware for authentication and authorization
index.js - Main entry point
seed.js - Script for seeding the database
README.md - This file


### Project Components
# Models
User: Defines the user schema including username, password, role, OUs, and divisions.
OU: Defines the organizational unit schema.
Division: Defines the division schema including references to credentials.
Credential: Defines the credential schema including name, username, and password.

# Controllers
authController: Handles user registration and login.
credentialController: Handles viewing, adding, and updating credentials.
adminController: Handles assigning users to divisions and OUs and changing user roles.

# Routes
authRoutes: Defines routes for registration and login.
credentialRoutes: Defines routes for viewing, adding, and updating credentials.
adminRoutes: Defines routes for assigning users to divisions and OUs and changing user roles.

# Middleware
authMiddleware: Provides middleware functions for user authentication and authorization.


### Running the Backend and Seeding the Database
Start the Backend Server:
node index.js

Seed the Database:
node seed.js