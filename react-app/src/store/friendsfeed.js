const GET_FRIENDS_FEED = "user/GET_FRIENDS_FEED";

// action
const getFriendsVideos = (friendsFeed) => ({
  type: GET_FRIENDS_FEED,
  payload: friendsFeed,
});

//thunk
export const getFriendsFeed = (userId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${userId}/users/videos`);
  if (response.ok) {
    const friendsFeed = await response.json();
    dispatch(getFriendsVideos(friendsFeed));
    return friendsFeed;
  } else {
    console.log("response not ok");
  }
  return null;
};

// reducer
export default function friendsFeedReducer(state = { friendsFeed: {} }, action) {
  switch (action.type) {
    case GET_FRIENDS_FEED:
      return action.payload.following_videos;
    default:
      return state;
  }
}
