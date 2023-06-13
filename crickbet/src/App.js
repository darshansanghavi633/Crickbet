import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import "./App.css";
import PrivateComponent from "./components/PrivateComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Stats from "./components/Stats";
import Signup from "./components/Signup";
import Home from "./components/Home";
import User from "./components/User";
import Unauthorizedusers from "./components/Unauthorizedusers";

function App() {
  const auth = localStorage.getItem("user");
  const email = JSON.parse(auth).email;
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (email === "darshansanghavi@gmail.com") {
      setAdmin(true);
    }
  }, [admin]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/stats" element={<Stats />}></Route>
            <Route
              path="/user"
              element={<User name={JSON.parse(auth)} />}
            ></Route>
            {admin ? (
              <Route path="/admin" element={<Admin />}></Route>
            ) : (
              <Route path="/admin" element={<Unauthorizedusers />}></Route>
            )}
            <Route path="/logout" element={<h1>Logout</h1>}></Route>
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
