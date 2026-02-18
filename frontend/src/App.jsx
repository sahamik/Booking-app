import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './pages/Dashboard';
import BookingForm from "./components/bookingForm";
import { AuthProvider } from './context/AuthContext';
import Profile from "./pages/Profile";
import Calendar from "./components/Calendar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking/new" element={<BookingForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

