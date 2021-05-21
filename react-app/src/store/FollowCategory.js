// Action
const SET_BOOLEAN = "categories/SET_BOOLEAN";

const setBoolean = () => ({
  type: SET_BOOLEAN,
  payload: { followingCategories: true },
});

// Thunk
export const videoFollowCategory = (categories, video_id) => async () => {
  await fetch(`/api/categories/video/follow/category`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      categories,
      video_id,
    }),
    method: "POST",
  });
};

export const userFollowCategory = (categories, user_id) => async (dispatch) => {
  await fetch(`/api/categories/user/follow/category`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      categories,
      user_id,
    }),
    method: "POST",
  });
  dispatch(setBoolean());
};

export default function allVideosReducer(
  state = { followingCategories: false },
  action
) {
  switch (action.type) {
    case SET_BOOLEAN:
      return action.payload;
    default:
      return state;
  }
}
