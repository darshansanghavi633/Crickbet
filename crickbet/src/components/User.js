import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function User(props) {
  let isChoiceMade = false;
  const auth = localStorage.getItem("user");
  const name = JSON.parse(auth).name;
  const [matches, setMatches] = useState("");
  const[choice,setChoice]=useState('');
  useEffect(() => {
    getMatches();
  }, []);
  const userChoices = [
    {
      name:name,
      choice:choice
    }
  ];
  const match = matches.match;

  const handleChoice =async () => {
    if(!isChoiceMade){
      isChoiceMade = true;
      let result = await fetch("http://localhost:5000/user",{
          method: "post",
          body: JSON.stringify({match,userChoices}),
          headers: {
              "Content-Type": "application/json",
          },
      });
   
      result = await result.json();
      console.log(result)
    }
  };


  const getMatches = async () => {
    let result = await fetch("http://localhost:5000/user", {
      //   headers:{
      //     authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      //   }
    });
    result = await result.json();
    setMatches(result);
  };
  return (
    <div>
      <div className="container text-center" style={{ marginTop: "100px" }}>
        <h3>
          {`${props.name} are you ready to cheer on your favorite team today? Who are you
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
            onChange={()=>setChoice(matches.team1)}
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
            onChange={(e)=>setChoice(matches.team2)}
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
        {
        choice?(
          <h3>You are on {choice} side</h3>
        ):(
          <h3>Please select team</h3>
        )
        }
      </div>
      <div className="container" style={{ fontSize: "20px" }}>
        <ul>
          <i>How to select team :</i>
          <li>Select the team you are supporting today from above.</li>
          <li>After selecting team of your choice click on confirm.</li>
          <li style={{color:"red"}}>Don't forget to click on CONFIRM</li>
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
