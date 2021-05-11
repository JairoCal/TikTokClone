import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";

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
            <div>
              {console.log(comment)}
              <div className="comment_image">
                <img src={comment.user[0].profile_image}></img>
              </div>
              <div className="comment_info">
                <p>{comment.user[0].username}</p>
                <Moment
                  local
                  date={comment.created_at}
                  format="hh:mm"
                  tz="Atlantic/Reykjavik"
                />
              </div>
            
              <div>
                <p>{comment.message}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comments;
