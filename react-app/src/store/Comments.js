const GET_COMMENTS = "comments/GET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UNLOAD = "comments/UNLOAD"

// Action
const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments,
});

export const Unload = () => ({
  type: UNLOAD
})

// Thunk
export const getVideoComments = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/comments/all/${videoId}`);
  if (response.ok) {
    const comments = await response.json();
    dispatch(getComments(comments.comments));
    return comments.comments;
  } else {
    console.log("response not ok");
  }
  return null;
};

export const postComment = (message, video_id, user_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/post`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      video_id,
      user_id,
    }),
    method: "POST",
  });
  if (response.ok) {
    const data = await response.json();
    await dispatch(addComment(data))
  }
}

// Reducer
export default function commentsReducer(state = { comments: [] }, action) {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      newState = Object.assign({}, state);
      const allComments = newState[0];
      allComments.push(action.payload);
      newState[0] = allComments;
      let newArr = [];
      newArr.push(newState[0])
      return newArr;
    case UNLOAD:
      return {
        comments: [],
      };
    default:
      return state;
  }
}
