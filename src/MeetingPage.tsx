import React, { useState, useEffect } from "react";
import "./meeting-page-dependencies.css";
import { io } from "socket.io-client";

const socket = io("your-socket-server-url"); // Replace with actual server URL

const MeetingPage: React.FC = () => {
  const [meetingID, setMeetingID] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const meetingID = urlParams.get("meetingID");
    const userID = window.prompt("Enter your userID");

    if (!userID || !meetingID) {
      alert("User ID or meeting ID missing");
      window.location.href = "/action.html";
    } else {
      setMeetingID(meetingID);
      setUserID(userID);
      socket.emit("joinMeeting", { userID, meetingID });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleHandRaise = () => setIsHandRaised(!isHandRaised);
  const toggleChat = () => setShowChat(!showChat);

  return (
    <main className="home-wrap">
      <div className="g-top">
        <div className="top-remote-video-show-wrap">
          <div id="meetingContainer">
            <VideoContent isHandRaised={isHandRaised} isVideoOn={isVideoOn} />
          </div>
          {showChat && <ChatSidebar participantCount={participantCount} />}
        </div>
        <TopControls
          participantCount={participantCount}
          toggleChat={toggleChat}
        />
      </div>
      <Controls
        toggleMute={toggleMute}
        toggleVideo={toggleVideo}
        toggleHandRaise={toggleHandRaise}
        isMuted={isMuted}
        isVideoOn={isVideoOn}
        isHandRaised={isHandRaised} // Pass isHandRaised to Controls
      />
    </main>
  );
};

// VideoContent Component
const VideoContent: React.FC<{ isHandRaised: boolean; isVideoOn: boolean }> = ({
  isHandRaised,
  isVideoOn,
}) => {
  return (
    <div className="call-wrap">
      <div className="video-wrap" id="divUsers">
        <div id="me" className="userbox display-center flex-column">
          <h2 className="display-center" style={{ fontSize: "14px" }}>
            You
          </h2>
          <div className="display-center" style={{ position: "relative" }}>
            {isHandRaised && (
              <img
                className="handRaise"
                src="/public/Assets/images/handRaise.png"
                style={{
                  position: "absolute",
                  height: "30px",
                  top: "8%",
                  left: "3%",
                  display: "block",
                }}
                alt="Hand Raised"
              />
            )}
            <video autoPlay muted={!isVideoOn} id="localVideoPlayer" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ChatSidebar Component
const ChatSidebar: React.FC<{ participantCount: number }> = ({
  participantCount,
}) => {
  return (
    <div className="g-right-details-wrap">
      <div className="meeting-heading-wrap">
        <h3>Meeting Details</h3>
        <button className="meeting-heading-cross" onClick={() => {}}>
          <span className="material-icons">clear</span>
        </button>
      </div>
      <div className="people-chat-wrap">
        <div className="people-heading">
          <span className="material-icons">people</span> Participants (
          <span className="participant-count">{participantCount}</span>)
        </div>
        <div className="chat-heading">
          <span className="material-icons">message</span> Chat
        </div>
      </div>
      <div className="chat-message-show" id="messages">
        {/* Chat messages go here */}
      </div>
      <div className="chat-message-sent">
        <input
          type="text"
          className="chat-message-sent-input-field"
          placeholder="Send a message to everyone"
        />
        <button className="chat-message-sent-action">
          <span className="material-icons">send</span>
        </button>
      </div>
    </div>
  );
};

// Controls Component (Bottom Controls)
const Controls: React.FC<{
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleHandRaise: () => void;
  isMuted: boolean;
  isVideoOn: boolean;
  isHandRaised: boolean; // Add isHandRaised prop
}> = ({
  toggleMute,
  toggleVideo,
  toggleHandRaise,
  isMuted,
  isVideoOn,
  isHandRaised,
}) => {
  return (
    <div className="g-bottom">
      <div className="bottom-middle">
        <div onClick={toggleMute} className="mic-toggle-wrap">
          <span className="material-icons">{isMuted ? "mic_off" : "mic"}</span>
        </div>
        <div onClick={toggleVideo} className="video-toggle-wrap">
          <span className="material-icons">
            {isVideoOn ? "videocam" : "videocam_off"}
          </span>
        </div>
        <div onClick={toggleHandRaise} className="handRaiseAction">
          <img
            src={
              isHandRaised
                ? "/public/Assets/images/handRaiseActive.png"
                : "/public/Assets/images/handRaiseBlack.png"
            }
            alt="Hand Raise"
            style={{ height: "30px", width: "30px" }}
          />
        </div>
      </div>
    </div>
  );
};

// TopControls Component (Top Right)
const TopControls: React.FC<{
  participantCount: number;
  toggleChat: () => void;
}> = ({ participantCount, toggleChat }) => {
  return (
    <div className="g-top-left">
      <div className="top-left-participant-wrap">
        <span className="material-icons">people</span>
        <span className="top-left-participant-count">{participantCount}</span>
      </div>
      <div className="top-left-chat-wrap" onClick={toggleChat}>
        <span className="material-icons">message</span>
      </div>
    </div>
  );
};

export default MeetingPage;
