import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPrivateMessageRecipients } from "../../store/privateMessageRecipients";
import { useParams } from "react-router-dom";
import { getPrivateMessages } from "../../store/ PrivateMessages";
import DirectMessagesText, {
  privateSocket,
} from "../DirectMessagesText/DirectMessagesText";

import "./PrivateMessages.css";

function PrivateMessages() {
  const { receiver_id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [recipientsList, setRecipientList] = useState([]);
  const [currentRecipientId, setCurrentRecipientId] = useState(null);
  const [roomId, setRoomId] = useState(null);

  // useEffect to grab all of those we have chats with
  useEffect(async () => {
    let data = await dispatch(getPrivateMessageRecipients(user.id));
    setRecipientList(data.recipients);
  }, [dispatch, receiver_id]);

  // On clicking on a user from our messaged users list
  const onClick = async (e) => {
    let recipientId = e.target.id;
    let recipientName = e.target.classList[0];
    // if our roomId is null meaning we are currently in a chatroom then leave it before continuing further
    if (roomId !== null) {
      privateSocket.emit("leave_room", roomId);
    }
    // get the private messages between the logged in user and the other person
    await dispatch(getPrivateMessages(user.id, recipientId));
    // set the currentRecipient the the person we just clicked on
    await setCurrentRecipientId(recipientId);
    // create the name for the room we will be joining and then set it
    let roomArray = [recipientName, user.username];
    let sortedRoomArray = roomArray.sort();
    await setRoomId(sortedRoomArray.join());
  };

  useEffect(async () => {
    if (roomId !== null) {
      privateSocket.emit("join_room", { roomId: roomId });
    } else {
      dispatch(getPrivateMessages(user.id, receiver_id));
    }
  }, [roomId]);

  return (
    <div className="messages_holder">
      <style type="text/css">{`.left_navbar {display: none}`}</style>
      <div className="recipients_list_bar">
        <h2>Messaged Users</h2>
        {recipientsList.length > 0 &&
          recipientsList.map((recipient) => (
            <div
              key={recipient.id}
              id={recipient.id}
              className={recipient.username}
              onClick={onClick}
            >
              {recipient.username}
            </div>
          ))}
      </div>
      <div className="messages_section">
        <div>
          <DirectMessagesText
            currentRecipientId={currentRecipientId}
            roomId={roomId}
            receiver_id={receiver_id}
          />
        </div>
      </div>
    </div>
  );
}

export default PrivateMessages;
