import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async() => {
    let result = await fetch("http://127.0.0.1:5000/login",{
      method:"post",
      body:JSON.stringify({email,password}),
      headers:{
        'Content-Type':'application/json'
      },
    })
    result = await result.json();
    localStorage.setItem("user",JSON.stringify(result.user));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if (result.user) {
      navigate("/");
    }else{
      alert("enter valid login credentials");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{marginTop:"80px"}}>Log In</h2>
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
          <div id="emailHelp" className="form-text">
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
