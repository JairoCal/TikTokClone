const GET_USER_ID = "user/GET_USER_ID";

// action
const addId= (userId) => ({
  type: GET_USER_ID,
  payload: userId,
});

//thunk
export const getId= (userId) => async (dispatch) => {
    dispatch(addId(userId));
    return userId
};

// reducer
export default function userIdReducer(state = { userId: {} }, action) {
  switch (action.type) {
    case GET_USER_ID:
      return action.payload;
    default:
      return state;
  }
}
