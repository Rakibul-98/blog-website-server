
# Blog Website Server

This project is a backend system for a blogging platform that enables users to create, update, and manage their blogs. It implements secure authentication and role-based access control, distinguishing between Admin and User roles.

Users can register and log in to the system, create blogs, update or delete their own blogs, and access only their personal user data. Admins have the authority to manage the platform by blocking or unblocking users and deleting any blog, though they cannot update blogs. Blocked users are restricted from creating or updating blogs.

Additionally, the platform provides a public API for viewing blogs, featuring search, sorting, and filtering functionalities to enhance user experience.
## Features

- Users can register and log in.
- Users must log in to create, update, or delete blogs.
- Users can create, update, and delete their own blogs.
- Users can only view their own user data.
- Blocked users cannot create or update blogs.
- Admins can delete any blog.
- Admins can block users by updating the isBlocked property.
- Admins cannot update any blog.
- A public API allows reading blogs supporting search, sorting, and filtering functionalities.


## 🔗 Live Link
![Live link](https://blog-website-server-om9d.onrender.com/)https://blog-website-server-om9d.onrender.com/


## 🛠 Technologies
Node.js, Express.js, MongoDB, Mongoose, TypeScript, Zod validator,  Dotenv, Bcrypt, JSON Web Token, Cookie-Parser, CORS, HTTP-Status, TS-Node-Dev, TypeScript Compiler, Postman


## Run Locally

Clone the project

```bash
  git clone https://github.com/Rakibul-98/blog-website-server.git
```

Go to the project directory

```bash
  cd blog-website-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

