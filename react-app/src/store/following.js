const GET_FOLLOWING = "user/GET_FOLLOWING";

// action
const getFollowing = (following) => ({
  type: GET_FOLLOWING,
  payload: following,
});

//thunk
export const getUserFollowing = (userId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${userId}`);
  if (response.ok) {
    const following = await response.json();
    dispatch(getFollowing(following));
    return following;
  } else {
    console.log("response not ok");
  }
  return null;
};

// reducer
export default function followingReducer(state = { following: {} }, action) {
  switch (action.type) {
    case GET_FOLLOWING:
      return action.payload.follows
    default:
      return state;
  }
}
