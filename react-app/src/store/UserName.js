const GET_USER_NAME = "user/GET_USER_NAME";

// action
const addUserName = (userName) => ({
  type: GET_USER_NAME,
  payload: userName,
});

//thunk
export const getUserName = (userName) => async (dispatch) => {
  dispatch(addUserName(userName));
  return userName;
};

// reducer
export default function userNameReducer(state = { userName: {} }, action) {
  switch (action.type) {
    case GET_USER_NAME:
      return action.payload;
    default:
      return state;
  }
}
