const GET_USER_VIDEOS = "user/GET_USER_VIDEOS";

// action
const getVideos = (allVideos) => ({
  type: GET_USER_VIDEOS,
  payload: allVideos,
});

//thunk
export const getUserVideos = (userId) => async (dispatch) => {
  const response = await fetch(`/api/videos/user/${userId}`);
  if (response.ok) {
    const allVideos = await response.json();
    dispatch(getVideos(allVideos));
    return allVideos;
  } else {
    console.log("response not ok");
  }
  return null;
};

// reducer
export default function allVideosReducer(
  state = { allUserVideos: [] },
  action
) {
  switch (action.type) {
    case GET_USER_VIDEOS:
      return action.payload.videos;
    default:
      return state;
  }
}
