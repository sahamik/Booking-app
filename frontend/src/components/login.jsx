import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Yritetään kirjautua käyttäjällä:", { email, password });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
        console.log("Login-virhe:", err.response?.data);
        setError("Virheellinen sähköposti tai salasana");
        }
  };

  return (
  <div className="min-h-screen bg-linear-to-br from-blue-200 via-slate-100 to-blue-200 flex flex-col">
    
    {/* Header */}
    <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-blue-700">Booking App</h1>
      <button
        className="text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => alert("Tässä voisi olla ohje/Help")}>
        Help
      </button>
    </header>

    {/* Keskitetty Card */}
    <div className="flex items-center justify-center flex-1">
      <Card className="w-95 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-gray-700">
            Kirjaudu sisään
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Sähköposti</Label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Salasana</Label>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">
              Kirjaudu sisään
            </Button>

            <p className="text-center text-sm text-gray-600">
              Ei tiliä?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline"
              >
                Rekisteröidy
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
);
}
