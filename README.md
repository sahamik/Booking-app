# Booking App

A full-stack booking application with user authentication, booking management, and a modern React frontend.

---

## Features

- User registration and login (JWT authentication)
- Create, view, and manage bookings
- Protected dashboard for authenticated users
- Profile page with editable user information and smooth transitions
- Responsive React frontend (Vite)
- Node.js/Express backend with MongoDB
- State management with React Context
- Styling with Tailwind CSS and shadcn/ui
- Calendar component for booking visualization

---

## Project Structure

```
backend/
  models/
    booking.js
    user.js
  routes/
    auth.js
    booking.js
  middleware/
    verifyToken.js
  server.js
  package.json

frontend/
  src/
    components/
      bookingForm.jsx
      bookingItem.jsx
      login.jsx
      register.jsx
      Calendar.jsx
    context/
      AuthContext.jsx
      AuthProvider.jsx
    pages/
      Dashboard.jsx
      Profile.jsx
    App.jsx
    main.jsx
    App.css
    index.css
  public/
  index.html
  package.json
  vite.config.js
  eslint.config.js
  README.md
```

---

## Getting Started

### Backend

1. Install dependencies:
   ```
   cd backend
   npm install
   ```
2. Set up your MongoDB connection in `server.js` or with environment variables.
3. Start the backend server:
   ```
   npm start
   ```

### Frontend

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Start the frontend development server:
   ```
   npm run dev
   ```

---

## Styling: Tailwind CSS & shadcn/ui

### Install Tailwind CSS

1. In the `frontend` directory, install Tailwind and its dependencies:
   ```
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
2. Configure your `tailwind.config.js`:
   ```js
   // tailwind.config.js
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```
3. Add Tailwind to your CSS (e.g., `src/index.css`):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Install shadcn/ui

1. Install shadcn/ui CLI:
   ```
   npx shadcn-ui@latest init
   ```
2. Follow the CLI prompts to set up shadcn/ui in your project.
3. Add components as needed:
   ```
   npx shadcn-ui@latest add button
   ```
   Replace `button` with any component you want to add.

For more details, see the [Tailwind CSS docs](https://tailwindcss.com/docs/guides/vite) and [shadcn/ui docs](https://ui.shadcn.com/docs/installation).

---

## Usage

- Register a new user or log in.
- Create new bookings and view your existing bookings on the dashboard.
- Edit your profile information with smooth transitions.
- Log out securely.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

---

## Author

- Mikael

---

