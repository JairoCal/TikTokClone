import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";

import "./DirectMessageText.css";

const io = require("socket.io-client");
export const privateSocket = io("/private");

function DirectMessagesText(props) {
  const messages = useSelector((state) => state.privateMessages);
  const user = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");
  const [stateMessages, setStateMessages] = useState(messages);
  const [userObject, setUserObject] = useState(null);

  const onClick = (e) => {
    e.preventDefault();
    if (message !== "") {
      user.messages = message;
      user.roomId = props.roomId;
      if (props.currentRecipientId !== null) {
        user.receiver_id = Number(props.currentRecipientId);
      } else {
        user.receiver_id = Number(props.receiver_id);
      }
      user.sender_id = user.id;
      privateSocket.emit("private_message", user);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  useEffect(() => {
    setUserObject(null);
  }, [props.currentRecipientId]);

  useEffect(() => {
    if (userObject === null) {
      setStateMessages(messages);
    } else {
      setStateMessages([...stateMessages, userObject]);
    }
  }, [messages.length, userObject]);

  useEffect(() => {
    privateSocket.on("private_room", (msg) => {
      setUserObject(msg);
    });
  }, [stateMessages]);

  return (
    <div className="message_container">
      <ul className="message_list">
        {stateMessages.length > 0 &&
          stateMessages.map((message) => (
            <div className="message_holder">
              <div className="user_image_box">
                <img
                  className="user_image_message"
                  src={message.profile_image ? message.profile_image : ""}
                  alt=""
                ></img>
              </div>
              <div className="message_box">
                <div className="message_info">
                  <div className="message_username">{message.username}</div>
                  <div className="message_time">
                    <Moment
                      local
                      date={message.created_at}
                      format="hh:mm"
                      tz="Atlantic/Reykjavik"
                    />
                  </div>
                </div>
                <div className="message_content">{message.messages} </div>
              </div>
            </div>
          ))}
      </ul>
      <div className="message_bar">
        <form onSubmit={onClick} className="comment_form">
          <input
            className="message_input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <label className="message_label">Message</label>
          <button className="comment_button" onClick={onClick}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default DirectMessagesText;
