# Booking App Frontend

This is the frontend for the Booking App, built with React, Vite, Tailwind CSS, and shadcn/ui. It provides a modern user interface for booking management, user authentication, and profile editing.

---

## Features

- User registration and login (JWT authentication)
- Dashboard to view and manage bookings
- Create new bookings
- Profile page with editable user information and smooth transitions
- Responsive design with Tailwind CSS and shadcn/ui components
- Calendar component for booking visualization
- State management with React Context

---

## Project Structure

```
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
  ui/
    // shadcn/ui components will be generated here
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

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Styling: Tailwind CSS & shadcn/ui

### Install Tailwind CSS

1. Install Tailwind and its dependencies:
   ```
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
2. Configure your `tailwind.config.js`:
   ```js
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
- Create and view your bookings on the dashboard.
- Edit your profile information.
- Log out securely.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Framer Motion

---

## Author

- Mikael

---
