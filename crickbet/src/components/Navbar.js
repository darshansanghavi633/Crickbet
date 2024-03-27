import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FcSportsMode } from 'react-icons/fc'
import { MdLeaderboard } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'


export default function Navbar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <FcSportsMode /> Crickbet
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {auth ? (
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">
                  <AiFillHome style={{ marginBottom: "5px" }} /> Home
                </Link>
                <Link className="nav-link active" to="/stats">
                  <MdLeaderboard style={{ marginBottom: "5px" }} /> Leaderboard
                </Link>
                <Link className="nav-link active" to="/user">
                  {JSON.parse(auth).name}
                </Link>
                <Link className="nav-link active" to="/admin">
                  Admin
                </Link>
                <Link className="nav-link active" onClick={logout} to="/signup">
                  Logout ( {JSON.parse(auth).name} )
                </Link>
              </div>
            ) : (
              <div className="navbar-nav">
                <Link className="nav-link active" to="/signup">
                  Signup
                </Link>
                <Link className="nav-link active" to="/login">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
