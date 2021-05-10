import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import getVideoComments from "../../store/Comments";

function Comments(props) {
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (props.videoId) {
    dispatch(getVideoComments)
  }
  }, [dispatch, props.videoId]);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default Comments;
