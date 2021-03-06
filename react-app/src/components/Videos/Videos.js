import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import Dispatches
import { getFriendsFeed } from "../../store/friendsfeed";
import { getAllVideos } from "../../store/allvideos";
import { getCategoriesFeed } from "../../store/foryou";
import { showModal, setCurrentModal } from "../../store/modal";
import UserForm from "../auth/UserForm";
import { getId } from "../../store/User";
import { getUserName } from "../../store/UserName";
import { getVideoId } from "../../store/VideoId";

import Ticker from "react-ticker";
// Import Icons
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import "./videos.css";
import Comments from "../Comments/Comments";

function Videos() {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const user = useSelector((state) => state.session.user);
  const allFeed = useSelector((state) => state.allVideos);
  const friendsFeed = useSelector((state) => state.friendsFeed);
  const categoriesFeed = useSelector((state) => state.categoriesFeed);
  const followingFriends = useSelector((state) => state.following);
  const [page, setPage] = useState(0);
  const [videoId, setVideoId] = useState(null);
  const videoRef = useRef(null);
  const categoriesBoolean = useSelector(
    (state) => state.categoriesBoolean.followingCategories
  );

  const showUserForm = (e) => {
    dispatch(getUserName(e.target.classList[0]));
    dispatch(getId(e.target.id));
    dispatch(setCurrentModal(UserForm));
    dispatch(showModal());
  };

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
      dispatch(getVideoId(videoRef.current.id));
      setVideoId(videoRef.current.id);
      videoRef.current.play();
      setPlaying(true);
    }
    // on no videos playing we trigger this which will then set a new current and play it
    else {
      videoRef.current = e.target;
      dispatch(getVideoId(videoRef.current.id));
      setVideoId(videoRef.current.id);
      onVideoClick();
    }
  };

  // grabs the Friends Feed videos
  useEffect(() => {
    if (user) {
      dispatch(getFriendsFeed(user.id));
    }
  }, [dispatch, user, page]);

  // grabs the For You videos
  useEffect(() => {
    if (user) {
      dispatch(getCategoriesFeed(user.id));
    }
  }, [dispatch, user, page, categoriesBoolean]);

  // grabs all videos
  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch, page]);

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
                {followingFriends.length > 0 && (
                  <a onClick={onFriendsFeed}>Friends Feed</a>
                )}
              </div>
              <div>
                {categoriesFeed.length > 0 && (
                  <a onClick={onForYou}>Your Categories</a>
                )}
              </div>
              <div>
                <a onClick={onAllFeed}>All Videos</a>
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

                <div className="video_footer">
                  <div className="video_footer_text">
                    <a
                      id={video.user[0].id}
                      className={video.user[0].username}
                      onClick={showUserForm}
                    >
                      @{video.user[0].username}
                    </a>
                    <p>{video.description}</p>
                    <div className="video_ticker">
                      <MusicNoteOutlinedIcon className="music_icon" />
                      <Ticker mode="smooth">
                        {({ index }) => (
                          <>
                            <p>{video.title}</p>
                          </>
                        )}
                      </Ticker>
                    </div>
                    <div className="spinning_wheel_holder">
                      <img
                        className="spinning_wheel"
                        src="https://static.thenounproject.com/png/934821-200.png"
                        alt=""
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {friendsFeed.length > 0 && page === 1 && (
          <div className="video_container">
            <div className="buttons_container">
              <div>
                {followingFriends.length > 0 && (
                  <a onClick={onFriendsFeed}>Friends Feed</a>
                )}
              </div>
              <div>
                {categoriesFeed.length > 0 && (
                  <a onClick={onForYou}>Your Categories</a>
                )}
              </div>
              <div>
                <a onClick={onAllFeed}>All Videos</a>
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

                <div className="video_footer">
                  <div className="video_footer_text">
                    <a
                      id={video.user[0].id}
                      className={video.user[0].username}
                      onClick={showUserForm}
                    >
                      @{video.user[0].username}
                    </a>
                    <p>{video.description}</p>
                    <div className="video_ticker">
                      <MusicNoteOutlinedIcon className="music_icon" />
                      <Ticker mode="smooth">
                        {({ index }) => (
                          <>
                            <p>{video.title}</p>
                          </>
                        )}
                      </Ticker>
                    </div>
                    <div className="spinning_wheel_holder">
                      <img
                        className="spinning_wheel"
                        src="https://static.thenounproject.com/png/934821-200.png"
                        alt=""
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {categoriesFeed.length > 0 && page === 2 && (
          <div className="video_container">
            <div className="buttons_container">
              <div>
                {followingFriends.length > 0 && (
                  <a onClick={onFriendsFeed}>Friends Feed</a>
                )}
              </div>
              <div>
                {categoriesFeed.length > 0 && (
                  <a onClick={onForYou}>Your Categories</a>
                )}
              </div>
              <div>
                <a onClick={onAllFeed}>All Videos</a>
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

                <div className="video_footer">
                  <div className="video_footer_text">
                    <a
                      id={video.user[0].id}
                      className={video.user[0].username}
                      onClick={showUserForm}
                    >
                      @{video.user[0].username}
                    </a>
                    <p>{video.description}</p>
                    <div className="video_ticker">
                      <MusicNoteOutlinedIcon className="music_icon" />
                      <Ticker mode="smooth">
                        {({ index }) => (
                          <>
                            <p>{video.title}</p>
                          </>
                        )}
                      </Ticker>
                    </div>
                    <div className="spinning_wheel_holder">
                      <img
                        className="spinning_wheel"
                        src="https://static.thenounproject.com/png/934821-200.png"
                        alt=""
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="comments_container">
        <div className="comments_header">
          <h1>Comments</h1>
        </div>
        <div>
          <Comments videoId={videoId} />
        </div>
      </div>
    </div>
  );
}

export default Videos;
