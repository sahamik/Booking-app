// src/components/register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import axios from "axios";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Rekisteröinti epäonnistui");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-200 via-slate-100 to-blue-200">
    
    {/* Header */}
    <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-blue-700">Booking App</h1>
      <button
        className="text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => alert("Tässä voisi olla ohje/Help")}>
        Help
      </button>
    </header>

    {/* Keskitetty sisältö */}
    <div className="flex flex-1 items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Rekisteröidy</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <Label htmlFor="name">Nimi</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Anna nimesi"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Sähköposti</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="esim. user@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Salasana</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Salasana"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Rekisteröidytään..." : "Rekisteröidy"}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Onko sinulla jo tili?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Kirjaudu sisään
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);
}

