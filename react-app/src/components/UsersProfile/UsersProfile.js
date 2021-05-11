import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../store/UserInfo";

function UsersProfile() {
  const user = useSelector((state) => state.userInfo);
  // user id for the persons page we want to see
  const { user_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(user_id));
  }, [dispatch, user_id]);

  return (
    <div className="profile_container">
      <style type="text/css">{`.left_navbar {display: none}`}</style>
      {user && (
        <div>
        {console.log(user,"----------------------------")}
          <div className="profile_user_info">
            <img className="profile_user_image" src={user.profile_image}></img>
            <p>@{user.username}</p>
          </div>
          <div className="profile_my_videos_section">
            <h1>My Videos</h1>
            <div className="profile_my_videos_container">
              <h1>My videos will go here displayed with a flex-wrap</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersProfile;
