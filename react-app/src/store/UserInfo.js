const GET_USER_INFO = "user/GET_USER_INFO";

// action
const addUserInfo = (userInfo) => ({
  type: GET_USER_INFO,
  payload: userInfo,
});

//thunk
export const getUserInfo = (userId) => async (dispatch) => {
  const response = await fetch(`/api/userinfo/${userId}`);
  if (response.ok) {
    const userInfo = await response.json();
    dispatch(addUserInfo(userInfo));
    return userInfo;
  } else {
    console.log("response not ok");
  }
  return null;
};

// reducer
export default function userInfoReducer(state = { userInfo: {} }, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload;
    default:
      return state;
  }
}
