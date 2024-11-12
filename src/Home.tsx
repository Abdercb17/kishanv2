// src/Home.tsx
import React from "react";
import { IoVideocam } from "react-icons/io5"; // Icon for new meeting
import { FaVideo } from "react-icons/fa"; // Optional, for meeting icon

const Home = () => {
  const handleNewMeeting = () => {
    const eightDigitValue = Math.floor(Math.random() * 100000000);
    const meetingUrl = `${window.location.origin}/meeting?meetingID=${eightDigitValue}`;
    window.location.replace(meetingUrl);
  };

  const handleJoin = () => {
    const joinValue = (
      document.querySelector(".enter-code") as HTMLInputElement
    )?.value;
    const meetingUrl = `${window.location.origin}/meeting?meetingID=${joinValue}`;
    window.location.replace(meetingUrl);
  };

  return (
    <div className="home-page">
      <div className="jumbotron d-flex align-items-center">
        <div className="left-section">
          <h1>Premium video meetings. Now free for everyone.</h1>
          <p>
            We re-engineered the service we built for secure business meetings,
            making it free for everyone to use.
          </p>
          <div className="button-group">
            <button
              className="btn btn-lg text-light font-weight-bold new-meeting rounded"
              onClick={handleNewMeeting}
            >
              <IoVideocam size={24} className="mr-2" />
              New Meeting
            </button>

            <div className="join-input-wrapper pl-3">
              <input
                type="text"
                placeholder="Enter a code"
                className="enter-code form-control"
              />
              <button
                className="btn btn-lg btn-outline-secondary text-dark font-weight-bold rounded"
                onClick={handleJoin}
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="right-section">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Google_Meet_logo.svg/1024px-Google_Meet_logo.svg.png"
            alt="meeting"
            className="signin-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
