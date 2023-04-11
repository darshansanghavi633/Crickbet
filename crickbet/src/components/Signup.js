import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    let result = await fetch("http://127.0.0.1:5000/signup", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result));
    // localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{marginTop:"80px"}}>Sign Up</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(item) => setName(item.target.value)}
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
            onChange={(item) => setEmail(item.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
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
            onChange={(item) => SetPassword(item.target.value)}
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
