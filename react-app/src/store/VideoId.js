const GET_VIDEO_ID = "user/GET_VIDEO_ID";

// action
const addId = (videoId) => ({
  type: GET_VIDEO_ID,
  payload: videoId,
});

//thunk
export const getVideoId = (videoId) => async (dispatch) => {
  dispatch(addId(videoId));
  return videoId;
};

// reducer
export default function videoIdReducer(state = { videoId: {} }, action) {
  switch (action.type) {
    case GET_VIDEO_ID:
      return action.payload;
    default:
      return state;
  }
}
