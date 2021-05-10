const GET_COMMENTS = "user/GET_COMMENTS";

// action
const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments,
});

//thunk
export const getVideoComments = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/comments/all/${videoId}`);
  if (response.ok) {
    const comments = await response.json();
    dispatch(getComments(comments));
    return comments;
  } else {
    console.log("response not ok");
  }
  return null;
};

// reducer
export default function commentsReducer(state = { comments: {} }, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload.comments;
    default:
      return state;
  }
}
