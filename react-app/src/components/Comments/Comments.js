import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";
import "./Comments.css";

import { getVideoComments } from "../../store/Comments";

function Comments(props) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.videoComments);

  useEffect(() => {
    if (props.videoId !== null) {
      let videoId = Number(props.videoId);
      dispatch(getVideoComments(videoId));
    }
  }, [dispatch, props.videoId]);

  return (
    <div>
      <div>
        {comments?.length > 0 &&
          comments[0].map((comment) => (
            <div className="comment_container">
              {console.log(comment)}
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
    </div>
  );
}

export default Comments;
