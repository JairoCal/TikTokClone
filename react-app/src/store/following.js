const GET_FOLLOWING = "user/GET_FOLLOWING";

// Action
const getFollowing = (following) => ({
  type: GET_FOLLOWING,
  payload: following,
});

// Thunk
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

export const followUploader = (follower_id, uploader_id) => async (dispatch) => {
  const response = await fetch(`/api/follows/user/${follower_id}/follow/${uploader_id}`, {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })
  const data = await response.json();
}

// Reducer
export default function followingReducer(state = { following: {} }, action) {
  switch (action.type) {
    case GET_FOLLOWING:
      return action.payload.follows
    default:
      return state;
  }
}
