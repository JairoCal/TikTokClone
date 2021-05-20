import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserVideos } from "../../store/UsersVideos";

import LogoutButton from "../auth/LogoutButton";

import "./ProfilePage.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [playing, setPlaying] = useState(false);

  const user = useSelector((state) => state.session.user);
  const userVideos = useSelector((state) => state.UserVideos);
  const videoRef = useRef(null);

  useEffect(() => {
    dispatch(getUserVideos(Number(userId)));
  }, [dispatch, userId]);

  const onVideoClick = () => {
    videoRef.current.play();
    setPlaying(true);
  };

  const onClick = (e) => {
    // if a video is playing and we clicked on the same video as the first time
    // then pause that video and set it to false
    if (playing && videoRef.current === e.target) {
      videoRef.current.pause();
      setPlaying(false);
    }
    // if a video is playing but we clicked on a different video than the first time
    // then we pause the video that was previously clicked and play new one and set to current
    else if (playing && videoRef.current !== e.target) {
      videoRef.current.pause();
      setPlaying(false);
      videoRef.current = e.target;
      videoRef.current.play();
      setPlaying(true);
    }
    // on no videos playing we trigger this which will then set a new current and play it
    else {
      videoRef.current = e.target;
      onVideoClick();
    }
  };

  return (
    <div className="profile_container">
      <style type="text/css">{`.left_navbar {display: none}`}</style>
      <div className="logout_section">
        <LogoutButton />
      </div>
      <div className="profile_user_info">
        <img
          className="profile_user_image"
          src={user.profile_image}
          alt=""
        ></img>
        <p>@{user.username}</p>
      </div>
      <div className="profile_my_videos_section">
        <h1>My Videos</h1>
        <div className="profile_my_videos_container">
          {userVideos.length > 0 &&
            userVideos?.map((video) => (
              <div className="profile_video_holder">
                <video
                  id={video.id}
                  key={video.id}
                  onClick={onClick}
                  className="video_player_user"
                  src={video.video_url}
                  ref={videoRef}
                ></video>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
