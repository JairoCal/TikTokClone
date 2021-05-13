const GET_FOLLOWING = "user/GET_FOLLOWING";
const ADD_FOLLOWER = "user/ADD_FOLLOWER";

// Action
const getFollowing = (following) => ({
  type: GET_FOLLOWING,
  payload: following,
});

const addFollower = (newFollower) => ({
  type: ADD_FOLLOWER,
  payload: newFollower,
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

export const followUploader =
  (follower_id, uploader_id) => async (dispatch) => {
    const response = await fetch(
      `/api/follows/user/${follower_id}/follow/${uploader_id}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const uploader = await response.json();
    dispatch(addFollower(uploader));
    return uploader;
  };

// Reducer
export default function followingReducer(state = { following: [] }, action) {
  let newState;
  switch (action.type) {
    case GET_FOLLOWING:
      return action.payload.follows;
    case ADD_FOLLOWER:
      newState = [...state]
      newState.push(action.payload);
      return newState;
    default:
      return state;
  }
}
