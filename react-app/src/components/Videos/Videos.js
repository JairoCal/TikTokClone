import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// Import Dispatches
import { getFriendsFeed } from "../../store/friendsfeed";
import { getAllVideos } from "../../store/allvideos";
import { getCategoriesFeed } from "../../store/foryou";
import "./videos.css";

function Videos() {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const user = useSelector((state) => state.session.user);
  const allFeed = useSelector((state) => state.allVideos);
  const friendsFeed = useSelector((state) => state.friendsFeed);
  const categoriesFeed = useSelector((state) => state.categoriesFeed);
  const [page, setPage] = useState(0);
  const videoRef = useRef(null);

  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const onClick = (e) => {
    videoRef.current = e.target
    console.log(e.target, "i am the target")
    onVideoClick()
  }

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
      <div className="center_container">
        {allFeed.length > 0 && page === 0 && (
          <div className="video_container">
            <div className="buttons_container">
              <div>
                <button onClick={onFriendsFeed}>Friends Feed</button>
              </div>
              <div>
                <button onClick={onForYou}>For You</button>
              </div>
              <div>
                <button onClick={onAllFeed}>Explore</button>
              </div>
            </div>
            {allFeed?.map((video) => (
              <div className="video_holder">
                <video
                  id={video.id}
                  key={video.id}
                  onClick={onClick}
                  className="video_player"
                  src={video.video_url}
                  ref={videoRef}
                ></video>
              </div>
            ))}
          </div>
        )}

        {friendsFeed.length > 0 && page === 1 && (
          <div className="video_container">
            <div className="buttons_container">
              <div>
                <button onClick={onFriendsFeed}>Friends Feed</button>
              </div>
              <div>
                <button onClick={onForYou}>For You</button>
              </div>
              <div>
                <button onClick={onAllFeed}>Explore</button>
              </div>
            </div>
            {friendsFeed?.map((video) => (
              <div className="video_holder">
                <video
                  id={video.id}
                  key={video.id}
                  onClick={onClick}
                  className="video_player"
                  src={video.video_url}
                  ref={videoRef}
                ></video>
              </div>
            ))}
          </div>
        )}
        {categoriesFeed.length > 0 && page === 2 && (
          <div className="video_container">
            <div className="buttons_container">
              <div>
                <button onClick={onFriendsFeed}>Friends Feed</button>
              </div>
              <div>
                <button onClick={onForYou}>For You</button>
              </div>
              <div>
                <button onClick={onAllFeed}>Explore</button>
              </div>
            </div>
            {categoriesFeed?.map((video) => (
              <div className="video_holder">
                <video
                  id={video.id}
                  key={video.id}
                  onClick={onClick}
                  className="video_player"
                  src={video.video_url}
                  ref={videoRef}
                ></video>
              </div>
            ))}
          </div>
        )}
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
