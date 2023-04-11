import React from "react";

export default function Home() {
  return (
    <div className="container home">
      <h1
        className="text-center"
        style={{ color: "lightgreen", marginTop: "85px" }}
      >
        Crickbet
      </h1>
      <p style={{ fontSize: "20px" }}>
        Crickbet is a friendly IPL betting game that users can play without any
        cost. Crickbet is a{" "}
        <span>
          <i>fun and friendly</i>
        </span>{" "}
        IPL betting game that requires no prior knowledge of cricket. It's all
        about playing with your heart and enjoying the game. You can invite your
        friends to join you, making it a more exciting and social experience.
        The game is administered by an admin who will handle any inquiries or
        issues that may arise. So, if you're looking for a way to add some
        excitement to your IPL watching experience, give Crickbet a try!
      </p>
      <div className="container">
        <h2 style={{ color: "lightgreen" }}>How To Play ?</h2>
        <p style={{ fontSize: "20px" }}>
          <span>
            Just half an hour before every match admin will post a poll for
            teams. Select the team of your choice and the result will be
            displayed in stats. Compete with your friends and remember Crickbet
            is fun and friendly.{" "}
          </span>
        </p>
      </div>
      <div className="container text-center d-flex justify-content-center">
        <div className="row container">
          <div className="col my-3 container">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2022/02/01/1018227-rcb.jpg"
                className="card-img-top"
                alt="Virat Kohli"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "lightgreen" }}>
                  Virat Kohli
                </h5>
                <p className="card-text">
                  "Winning and losing is part of the game, but the spirit in
                  which you play is what really matters."
                </p>
              </div>
            </div>
          </div>
          <div className="col my-3">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://india.postsen.com/content/uploads/2023/03/19/1f9d5b02f0.jpg"
                className="card-img-top"
                alt="MS Dhoni"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "lightgreen" }}>
                  MS Dhoni
                </h5>
                <p className="card-text">
                  "IPL is not just about cricket, it's about the passion, the
                  excitement, and the emotions it evokes among the fans."
                </p>
              </div>
            </div>
          </div>
          <div className="col my-3">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://images.hindustantimes.com/img/2022/05/11/1600x900/tendulkar_mi_ipl_1650777563845_1652256166916.webp"
                className="card-img-top"
                alt="Sachin Tendulkar"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "lightgreen" }}>
                  Sachin Tendulkar
                </h5>
                <p className="card-text">
                  "IPL is a platform where young Indian talent gets a chance to
                  showcase their skills and make a name for themselves."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center foot-bar">
        <footer>
          <div>The admin of Crickbet is Damru.</div>
          <div>This game may be habit-forming. Play responsibly.</div>
        </footer>
      </div>
    </div>
  );
}
