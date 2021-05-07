import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Import Dispatches
import { getFriendsFeed } from "../../store/friendsfeed";
import { getAllVideos } from '../../store/allvideos'
import { getCategoriesFeed } from '../../store/foryou'
import "./videos.css";

function Videos() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allFeed = useSelector((state) => state.allVideos);
  const friendsFeed = useSelector((state) => state.friendsFeed);
  const categoriesFeed = useSelector((state) => state.categoriesFeed);
  const [videos, setVideos] = useState(allFeed)
  
  // grabs the Friends Feed videos
  useEffect(() => {
    if (user) {
      dispatch(getFriendsFeed(user.id));
    }
  }, [dispatch]);

  // grabs the For You videos
  useEffect(() => {
    if (user) {
      dispatch(getCategoriesFeed(user.id));
    }
  }, [dispatch]);

  // grabs all videos
  useEffect(() => {
      dispatch(getAllVideos());
  }, [dispatch]);

  const onForYou = async (e) => {
    e.preventDefault();
    setVideos(friendsFeed)
  }

  const onFriendsFeed = async (e) => {
    e.preventDefault();
    setVideos(categoriesFeed)
  }

  const onAllFeed = async (e) => {
    e.preventDefault();
    setVideos(allFeed)
  }

  return (
    <div className="right_nav">
      <div>
        <button onClick={onFriendsFeed}>Friends Feed</button>
      </div>
      <div>
        <button onClick={onForYou}>For You</button>
      </div>
      <div>
        <button onClick={onAllFeed}>Explore</button>
      </div>
      {console.log(videos)}
      <div className="video_container">
        {videos.length > 0 &&
          videos.map((video) => (
            <div>
              <video width="500px" src={video.video_url} controls></video>
              <p>{video.title}</p>
              <p>{video.description}</p>
            </div>
          ))}
      </div>
      <div className="comments_container">
        <div className="comments_header">
          <h1>Comments!</h1>
        </div>
      </div>
    </div>
  );
}

export default Videos;
