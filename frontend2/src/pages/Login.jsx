import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      const role = res.data.user.role;

      // redirect po roli
      if (role === "HOST") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2>🔐 Login</h2>

      <p style={{ color: "#666" }}>
        Welcome back to PetStay
      </p>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 10 }}
      />

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      <button
        className="btn"
        onClick={login}
        disabled={loading}
        style={{ marginTop: 15, width: "100%" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}