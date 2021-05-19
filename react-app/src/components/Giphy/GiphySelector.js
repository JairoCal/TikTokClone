import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import ReactGiphySearchbox from "react-giphy-searchbox";
import { hideModal } from "../../store/modal";
import { postComment } from "../../store/Comments";

function GiphySelector() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const video_id = useSelector((state) => state.VideoId);
  //   const messagesEndRef = useRef(null);
  //   const scrollToBottom = () => {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   };

  const onClick = (item) => {
    console.log(item);
    let gif = item.embed_url;
    // let video_id = Number(videoId);
    let user_id = Number(user.id);
    dispatch(postComment(gif, Number(video_id), user_id));
    // scrollToBottom();
    dispatch(hideModal());
  };
  return (
    <div>
      <ReactGiphySearchbox
        apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
        // onSelect={(item) => console.log(item)}
        onSelect={onClick}
        masonryConfig={[
          { columns: 2, imageWidth: 110, gutter: 5 },
          { mq: "700px", columns: 3, imageWidth: 110, gutter: 5 },
        ]}
      />
    </div>
  );
}

export default GiphySelector;
