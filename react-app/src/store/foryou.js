const GET_CATEGORIES_FEED = "user/GET_CATEGORIES_FEED";
const UNLOAD = "categoriesFeed/UNLOAD";

// action
const getVideos = (categoriesFeed) => ({
  type: GET_CATEGORIES_FEED,
  payload: categoriesFeed,
});

export const UnloadCategoriesFeed = () => ({
  type: UNLOAD,
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
    case UNLOAD:
      return {
        categoriesFeed: {},
      };
    default:
      return state;
  }
}
