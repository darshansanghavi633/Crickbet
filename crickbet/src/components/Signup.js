import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async () => {
    try {
      if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        setErrorMessage("Please fill in all fields");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      const response = await fetch("http://127.0.0.1:5002/signup", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const result = await response.json();
      console.log(result);
      console.log(result.user);
      console.log(result.token);
      if (result && result.token && result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.token));
        navigate('/');
        console.log("successfully signed in");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      setErrorMessage("An error occurred during registration. Please try again later.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ marginTop: "80px" }}>Sign Up</h2>
      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="exampleInputPassword1"
          />
        </div>
        <button type="button" onClick={collectData} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
