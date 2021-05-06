import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriendsFeed } from "../../store/friendsfeed";

import './videos.css'

function Videos() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const friendsFeed = useSelector((state) => state.friendsFeed);
  useEffect(() => {
    if (user) {
      console.log("we here boys");
      dispatch(getFriendsFeed(user.id));
    }
  }, [dispatch]);

  return (
    <div className="right_nav">
      <div className="video_container">
        {friendsFeed.length > 0 && friendsFeed.map((video) => (
            <div>
            {video.description}
            </div>
        ))}
      </div>
      <div className="comments_container"></div>
    </div>
  );
}

export default Videos;
