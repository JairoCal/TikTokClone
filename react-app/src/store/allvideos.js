const GET_ALL_VIDEOS = "user/GET_ALL_VIDEOS";

// action
const getVideos = (allVideos) => ({
  type: GET_ALL_VIDEOS,
  payload: allVideos,
});

//thunk
export const getAllVideos = () => async (dispatch) => {
  const response = await fetch(`/api/videos/`);
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
  state = { allVideosFeed: {} },
  action
) {
  switch (action.type) {
    case GET_ALL_VIDEOS:
      return action.payload.videos;
    default:
      return state;
  }
}
