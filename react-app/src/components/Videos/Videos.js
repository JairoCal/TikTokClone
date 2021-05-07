import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Import Dispatches
import { getFriendsFeed } from "../../store/friendsfeed";
import { getAllVideos } from "../../store/allvideos";
import { getCategoriesFeed } from "../../store/foryou";
import "./videos.css";

function Videos() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allFeed = useSelector((state) => state.allVideos);
  const friendsFeed = useSelector((state) => state.friendsFeed);
  const categoriesFeed = useSelector((state) => state.categoriesFeed);
  const [page, setPage] = useState(0);

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
    setPage(2);
  };

  const onFriendsFeed = async (e) => {
    e.preventDefault();
    setPage(1);
  };

  const onAllFeed = async (e) => {
    e.preventDefault();
    setPage(0);
  };

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
      {allFeed.length > 0 && page === 0 && (
        <div className="video_container">
          {allFeed?.map((video) => (
            <div>
              <video width="100%" src={video.video_url} controls></video>
              <p>{video.title}</p>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      )}
      {friendsFeed.length > 0 && page === 1 && (
        <div className="video_container">
          {friendsFeed?.map((video) => (
            <div>
              <video width="100%" src={video.video_url} controls></video>
              <p>{video.title}</p>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      )}
      {categoriesFeed.length > 0 && page === 2 && (
        <div className="video_container">
          {categoriesFeed?.map((video) => (
            <div>
              <video width="100%" src={video.video_url} controls></video>
              <p>{video.title}</p>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="comments_container">
        <div className="comments_header">
          <h1>Comments!</h1>
        </div>
      </div>
    </div>
  );
}

export default Videos;
