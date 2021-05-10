import React from "react";

import getVideoComments from '../../store/Comments'

function Comments(props) {

  if(props.videoId) {
    console.log(props.videoId)
  }
  
  return (
    <div>
      <div></div>
    </div>
  );
}

export default Comments;
