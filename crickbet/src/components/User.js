import React, { useState, useEffect } from "react";
import { FaHandPointRight, FaHandPointUp } from "react-icons/fa";
import { RiAlertFill } from "react-icons/ri";

function User(props) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isChoiceMade, setIsChoiceMade] = useState(false);
  const [matches, setMatches] = useState("");
  const [choice, setChoice] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    getMatches();
  }, []);

  useEffect(() => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    // Check if the current time is between 7:00 PM and 7:30 PM IST (11:30 AM to 12:00 PM UTC)
    if (hours === 17 && minutes >= 0 && minutes <= 29) {
      setIsChoiceMade(true); // Allow choice selection from 7:00 PM to 7:30 PM IST
      const secondsUntilEnd = (30 - minutes) * 60;
      setTimeLeft(secondsUntilEnd);
    } else {
      setIsChoiceMade(false); // Disable choice selection outside the specified time range
      setTimeLeft(0);
    }
  }, [currentTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerID = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => {
        clearTimeout(timerID);
      };
    }
  }, [timeLeft]);

  const handleChoice = async () => {
    setIsConfirmed(true);
    if (!isChoiceMade) {
      setIsChoiceMade(true);
      let result = await fetch("http://localhost:5002/user", {
        method: "post",
        body: JSON.stringify({ match: matches.match, userChoices: [{ name: name, choice: choice }] }),
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
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      let result = await fetch("http://localhost:5002/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (!result.ok) {
        console.error(`Error: ${result.status} - ${result.statusText}`);
        return;
      }

      result = await result.json();
      console.log(result);
      setMatches(result);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const auth = localStorage.getItem("user");
  const name = JSON.parse(auth).name;

  return (
    <div>
      <div className="container text-center" style={{ marginTop: "100px" }}>
        <h3>
          {`${props.name.name} are you ready to cheer on your favorite team today? Who are you rooting for?`}
        </h3>
        <div className="btn-group my-3" role="group" aria-label="Basic radio toggle button group">
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            value={choice}
            onChange={() => setChoice(matches.team1)}
            disabled={isConfirmed || !isChoiceMade}
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
            disabled={isConfirmed || !isChoiceMade}
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
          disabled={isConfirmed || !isChoiceMade}
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
        {timeLeft > 0 ? (
          <div>
            <h4>{`Time left to select: ${Math.floor(timeLeft / 60)} minutes`}</h4>
          </div>
        ) : (<div>
          <h4>{`Alright, it's time to settle the score! Choose your squad by picking a slot between 7:00pm and 7:30pm. Show your allegiance and let's see who's got the winning vibe!`}</h4>
        </div>)}
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
            Once you have clicked confirm you can not change your choice on your own.
          </li>
          <li>If still you want to change the choice try contacting admin.</li>
        </ul>
      </div>
    </div>
  );
}

export default User;
