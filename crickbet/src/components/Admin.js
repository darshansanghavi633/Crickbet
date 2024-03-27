import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Unauthorizedusers from "./Unauthorizedusers";

export default function Admin() {
  const auth = localStorage.getItem("user");
  const [match, setMatch] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [win, setWin] = useState("");
  const email = JSON.parse(auth).email;
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (email === "darshansanghavi@gmail.com") {
      setAdmin(true);
    }
  }, [admin]);
  const updateMatchStatus = () => {
    if (win) {
      console.log(win);
    }
  };

  const beginMatch = async () => {
    if (match === 0 || team1.trim() === "" || team2.trim() === "") {
      alert("Please fill in all fields");
      return;
    }
    let result = await fetch("http://127.0.0.1:5002/admin", {
      method: "post",
      body: JSON.stringify({ match, team1, team2 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/user");
    }
  };

  return (
    <>
      {admin ? (
        <div className="container text-center" style={{ marginTop: "100px" }}>
          <h3 className="text-center">
            Hello, <i>{JSON.parse(auth).name}</i>{" "}
          </h3>
          <p style={{ fontSize: "20px" }}>
            It's a big day for cricket fans! Can you tell me which IPL match is
            happening today? I don't want to miss any of the excitement!
          </p>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              <b>Match No.</b>
            </span>
            <input
              type="number"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={match}
              onChange={(e) => setMatch(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              <b>Team1</b>
            </label>
            <select
              className="form-select"
              id="inputGroupSelect01"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
            >
              <option>Select</option>
              <option>MI</option>
              <option>CSK</option>
              <option>RCB</option>
              <option>KKR</option>
              <option>RR</option>
              <option>LSG</option>
              <option>DC</option>
              <option>GT</option>
              <option>SRH</option>
              <option>PK</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              <b>Team2</b>
            </label>
            <select
              className="form-select"
              id="inputGroupSelect01"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
            >
              <option>Select</option>
              <option>MI</option>
              <option>CSK</option>
              <option>RCB</option>
              <option>KKR</option>
              <option>RR</option>
              <option>LSG</option>
              <option>DC</option>
              <option>GT</option>
              <option>SRH</option>
              <option>PK</option>
            </select>
          </div>
          <button
            type="button"
            onClick={beginMatch}
            className="btn btn-dark"
            style={{ color: "lightgreen" }}
          >
            Let's Begin
          </button>
          <div className="container text-center">
            <h4>Update Match Status</h4>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                <b>Match No.</b>
              </span>
              <input
                type="number"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={match}
                onChange={(e) => setMatch(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Which team won ?"
                aria-describedby="button-addon2"
                value={win}
                onChange={(e) => setWin(e.target.value)}
              />
              <button
                style={{ color: "lightgreen" }}
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={updateMatchStatus}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Unauthorizedusers />
      )}
    </>
  );
}
