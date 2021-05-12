import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";
import "./Comments.css";

import { getVideoComments, postComment, Unload } from "../../store/Comments";

function Comments({videoId}) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.videoComments);
  const user = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (videoId !== null) {
      dispatch(getVideoComments(Number(videoId)));
    }
    return () => {
      dispatch(Unload())
    }
  }, [dispatch, videoId]);

  const sendComment = (e) => {
    e.preventDefault();
    let video_id = Number(videoId);
    let user_id = Number(user.id)
    dispatch(postComment(message, video_id, user_id))
    setMessage("")
  }

  return (
    <div className="comments_input_holder">
      <div className="all_comments">
        {comments?.length > 0 &&
          comments[0].map((comment) => (
            <div className="comment_container">
              <div className="comment_image">
                <img src={comment.user[0].profile_image}></img>
              </div>
              <div className="comment_info">
                <div className="comment_top">
                  <div className="comment_username">
                    <p>{comment.user[0].username} </p>
                  </div>
                  <div className="comment_time">
                    <Moment
                      local
                      date={comment.created_at}
                      format="hh:mm"
                      tz="Atlantic/Reykjavik"
                    />
                  </div>
                </div>
                <div className="comment_message">
                  <p>{comment.message}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="message_bar">
        <form onSubmit={sendComment} className="comment_form">
          <textarea
            className="comment_input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Comment..."
          ></textarea>
          <button className="comment_button" onClick={sendComment}>Comment</button>
        </form>
      </div>
    </div>
  );
}

export default Comments;
