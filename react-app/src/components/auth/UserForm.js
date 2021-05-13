import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { hideModal } from "../../store/modal";
import { privateSocket } from "../DirectMessagesText/DirectMessagesText";
import { followUploader } from "../../store/following";

function UserForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipientId = useSelector((state) => state.userId);
  const recipientUserName = useSelector((state) => state.userName);
  const following = useSelector((state) => state.following);

  const user = useSelector((state) => state.session.user);
  const [trigger, setTrigger] = useState(false);
  const [followButton, setFollowButton] = useState(false)

  //************ Private Message ************
  const privateMessageHandler = async (e) => {
    const senderId = user.id;
    const senderUserName = user.username;
    const roomArr = [senderUserName, recipientUserName];
    const sortedRoomArr = roomArr.sort();
    const roomName = sortedRoomArr.join; //
    // the names must match exactly what's in the backend
    user.messages = `${senderUserName} has started a chat!`;
    user.roomId = roomName;
    user.receiver_id = Number(recipientId);
    user.sender_id = senderId;
    setTrigger(!trigger);
  };

  // when the trigger is changed we send to socket.io to start the chat
  useEffect(async () => {
    if (trigger === true) {
      await privateSocket.emit("join_room", { roomId: user.roomId });
      await privateSocket.emit("private_message", user);
      history.push(`/privatemessages/${recipientId}`);
      dispatch(hideModal());
    }
  }, [trigger]);
  //*********************************************

  const onProfile = () => {
    dispatch(hideModal());
  };
  // onClick follow button
  const onFollow = () => {
    dispatch(followUploader(user.id, recipientId));
    setFollowButton(true)
  };

  // When we click on a different user run this to check if we already follow that person
  useEffect(() => {
    if(following && recipientId) {
      following.forEach(user => {
        if(user.id == recipientId) {
          setFollowButton(true)
          console.log("yeah we follow this dude ....................")
        } else{
          setFollowButton(false)
        }
      })
    }
  }, [dispatch, recipientId])

  return (
    <div>
      <h1>Hi testing</h1>
      {recipientId && (
        <NavLink to={`/user/profile/${recipientId}`}>
          <button onClick={onProfile}>Profile Page</button>
        </NavLink>
      )}
      {recipientUserName && <h1>{recipientUserName}</h1>}
      {recipientId && recipientUserName && (
        <div>
          <button onClick={privateMessageHandler}>Private Message</button>
        </div>
      )}
      {recipientId && (
        <div>
          <button onClick={onFollow} disabled={followButton} >Follow</button>
        </div>
      )}
    </div>
  );
}

export default UserForm;
