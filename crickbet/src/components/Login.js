import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (auth && token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    try {
      // Check if any field is empty
      if (email.trim() === "" || password.trim() === "") {
        setErrorMessage("Please fill in all fields");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      // Check password length
      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      const response = await fetch("http://127.0.0.1:5002/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const result = await response.json();
      if (result.user && result.token) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.token));
        navigate("/");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error during user login:", error);
      setErrorMessage("Your email or password is incorrect. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ marginTop: "80px" }}>Log In</h2>
      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text" style={{ color: "#a701f1" }}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="button" onClick={handleLogin} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
