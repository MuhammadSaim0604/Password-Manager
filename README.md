
# 🔐 Password Manager

A full-stack Password Manager built with **React**, **Express.js**, and **MongoDB**. This application allows users to **sign up**, **log in**, and securely manage their passwords.

---

## 🚀 Features

- User Authentication (Signup & Login)
- Add, Edit, and Delete Passwords
- Encrypted Storage using bcrypt and JWT
- Responsive UI with React
- Backend REST API with Express.js
- MongoDB for persistent storage

---

## 📁 Tech Stack

- **Frontend**: React, Tailwind CSS (or any UI framework)
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt

---

## 🔧 Installation

### Clone the repository
```bash
git clone https://github.com/MuhammadSaim0604/Pass-Manager-Frontend.git
cd Pass-Manager-Frontend
```

### Backend Setup
```bash
cd Backend
npm install
npm start
```

Create a `.env` file inside the `backend` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend Setup


Go inside the `Password-Manager` directory and run these commands:
Create a `.env` file inside the `Password-Manager` folder:

```
VITE_BASE_URL=your_server-url
```

Then run these commands inside the `Password-Manager` directory:

```bash
npm install
npm start
```

Now Your Frontend Started go to the browser and type `http://localhost:5173`.

---

## 🧪 API Endpoints

### Auth Routes
- `POST /api/auth/signup` - Create a new account
- `POST /api/auth/login` - Login and get token

### Password Routes (require JWT)
- `GET /api/passwords` - Fetch all passwords
- `POST /api/passwords` - Add new password
- `PUT /api/passwords/:id` - Update password
- `DELETE /api/passwords/:id` - Delete password

---

## 🔐 Security

- Passwords stored in the DB are **encrypted**
- JWT is used for user session validation
- Protected routes with authentication middleware

---

## 📷 Screenshots

![Home Page](https://raw.githubusercontent.com/MuhammadSaim0604/Password-Manager/refs/heads/main/public/BB.png "Home Page")

---

## 📄 License

This project is licensed under the MIT License.
