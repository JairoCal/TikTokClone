import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";

import "./ProfilePage.css";

function ProfilePage() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="profile_container">
      <style type="text/css">{`.left_navbar {display: none}`}</style>
      <div className="logout_section">
        <LogoutButton />
      </div>
      <div className="profile_user_info">
        <img className="profile_user_image" src={user.profile_image} alt=""></img>
        <p>@{user.username}</p>
      </div>
      <div className="profile_my_videos_section">
        <h1>My Videos</h1>
        <div className="profile_my_videos_container">
          <h1>My videos will go here displayed with a flex-wrap</h1>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
