const GET_CATEGORIES_FEED = "user/GET_CATEGORIES_FEED";

// action
const getVideos = (categoriesFeed) => ({
  type: GET_CATEGORIES_FEED,
  payload: categoriesFeed,
});

//thunk
export const getCategoriesFeed = (userId) => async (dispatch) => {
  const response = await fetch(`/api/categories/videos/user/${userId}`);
  if (response.ok) {
    const categoriesFeed = await response.json();
    dispatch(getVideos(categoriesFeed));
    return categoriesFeed;
  } else {
    console.log("response not ok");
  }
  return null;
};

// reducer
export default function categoriesFeedReducer(
  state = { categoriesFeed: {} },
  action
) {
  switch (action.type) {
    case GET_CATEGORIES_FEED:
      return action.payload.category_videos;
    default:
      return state;
  }
}
