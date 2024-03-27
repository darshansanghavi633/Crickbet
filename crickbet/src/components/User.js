import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { RiAlertFill } from "react-icons/ri";
import { FaHandPointUp } from "react-icons/fa";

export default function User(props) {
  console.log(props)
  let isChoiceMade = false;
  const auth = localStorage.getItem("user");
  const name = JSON.parse(auth).name;
  const [matches, setMatches] = useState("");
  const [choice, setChoice] = useState("");
  useEffect(() => {
    getMatches();
  }, []);
  const userChoices = [
    {
      name: name,
      choice: choice,
    },
  ];
  const match = matches.match;

  const handleChoice = async () => {
    if (!isChoiceMade) {
      isChoiceMade = true;
      let result = await fetch("http://localhost:5002/user", {
        method: "post",
        body: JSON.stringify({ match, userChoices }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      console.log(result);
    }
  };

  const getMatches = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        // Handle case where token is not found
        console.error("Token not found in localStorage");
        return;
      }

      let result = await fetch("http://localhost:5002/user", {
        headers: {
          authorization: `Bearer ${token}` // Assuming token is prefixed with 'Bearer'
        }
      });

      if (!result.ok) {
        // Handle non-successful response (e.g., server error)
        console.error(`Error: ${result.status} - ${result.statusText}`);
        return;
      }

      result = await result.json();
      setMatches(result);
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error fetching matches:", error);
    }
  };

  return (
    <div>
      <div className="container text-center" style={{ marginTop: "100px" }}>
        <h3>
          {`${props.name.name} are you ready to cheer on your favorite team today? Who are you
          rooting for?`}
        </h3>
        <div
          className="btn-group my-3"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            value={choice}
            onChange={() => setChoice(matches.team1)}
          />
          <label className="btn btn-outline-success" htmlFor="btnradio1">
            {matches.team1}
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
            value={choice}
            onChange={(e) => setChoice(matches.team2)}
          />
          <label className="btn btn-outline-success" htmlFor="btnradio2">
            {matches.team2}
          </label>
        </div>
        <button
          type="button"
          style={{ color: "lightgreen" }}
          className="btn btn-dark mx-4"
          onClick={handleChoice}
        >
          CONFIRM
        </button>
      </div>
      <div className="container text-center">
        {choice ? (
          <h3>You are on {choice} side</h3>
        ) : (
          <h3>
            Please select team <FaHandPointUp />
          </h3>
        )}
      </div>
      <div className="container" style={{ fontSize: "20px" }}>
        <ul>
          <i>
            {" "}
            <FaHandPointRight /> How to select team :
          </i>
          <li>Select the team you are supporting today from above.</li>
          <li>After selecting team of your choice click on confirm.</li>
          <li style={{ color: "red" }}>
            {" "}
            <RiAlertFill /> Don't forget to click on CONFIRM
          </li>
          <li>
            Once you have clicked confirm you can not change your choice on your
            own.
          </li>
          <li>If still you want to change the choice try contacting admin.</li>
        </ul>
      </div>
    </div>
  );
}
