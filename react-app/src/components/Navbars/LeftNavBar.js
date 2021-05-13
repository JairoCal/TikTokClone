import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowing } from "../../store/following";
import { showModal, setCurrentModal } from "../../store/modal";

import UserForm from "../auth/UserForm";
import {getId} from "../../store/User"
import { getUserName } from "../../store/UserName";

import "./Navbars.css";

function LeftNavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.following);

  useEffect(() => {
    if (user) {
      dispatch(getUserFollowing(user.id));
    }
  }, [dispatch, user]);

  const showUserForm = (e) => {
    dispatch(getUserName(e.target.classList[0]));
    dispatch(getId(e.target.id))
    dispatch(setCurrentModal(UserForm));
    dispatch(showModal());
  };

  return (
    <nav className="left_navbar">
      <div className="left_navbar_header">
        <h1>Following</h1>
      </div>
      <div>
        {user &&
          following.length > 0 &&
          following.map((following) => (
            <div key={following.username} className="followed_name">
              <img src={following.profile_image} alt=""></img>
              <div>
                <a id={following.id} className={following.username} onClick={showUserForm}>@{following.username}</a>
              </div>
            </div>
          ))}
      </div>
    </nav>
  );
}

export default LeftNavBar;
