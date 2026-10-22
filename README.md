# User Management System

A simple full-stack **TypeScript** application for managing users.

Built with:

- TypeScript
- HTML/CSS
- Node.js + Express
- MongoDB + Mongoose

## Setup

Install dependencies:

```bash
npm install
```

Build the TypeScript files:

```bash
npm run build
```

Start the application:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Make sure MongoDB is running and the `.env` file contains:

```env
MONGO_URI=mongodb://localhost:27017
MONGO_NAME=user_management
PORT=3000
```

---

## Features

- Add users
- Edit users
- Delete users
- Display users in a table
- Store users in MongoDB
- Load existing users from the database
- Male/Female selection
- Age brackets
- Salary brackets
- Custom salary option
- School/University education options
- School year
- University major and year
- Optional image upload
- Conditional form fields based on selections

---

## Data Flow

The application is divided into a **frontend**, **backend**, and **database**.

```text
User
  ↓
HTML Form
  ↓
TypeScript (Frontend)
  ↓
Express API
  ↓
Controller
  ↓
Mongoose
  ↓
MongoDB
```

### Adding a User

When the form is submitted:

```text
Form
 ↓
app.ts
 ↓
POST /api/users
 ↓
User Controller
 ↓
MongoDB
```

The new user is saved in MongoDB and then displayed in the table.

### Loading Users

When the page loads:

```text
MongoDB
 ↓
GET /api/users
 ↓
app.ts
 ↓
Users Table
```

This means users remain available after refreshing the page because they are loaded from the database.

### Editing and Deleting

Editing uses:

```text
PUT /api/users/:id
```

Deleting uses:

```text
DELETE /api/users/:id
```

Both operations update MongoDB and then update the displayed data.

---

## TypeScript Purpose

This was a TypeScript learning exercise.

TypeScript is used on both the frontend and backend to provide:

- Interfaces for user data
- Typed variables and functions
- Union types for fixed options such as gender and age brackets
- Better error detection during development
- Safer communication between different parts of the application

The TypeScript code is compiled into JavaScript before the application runs.