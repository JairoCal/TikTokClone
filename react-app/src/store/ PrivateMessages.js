const GET_PRIVATE_MESSAGES = "privateMessages/GET_PRIVATE_MESSAGES";

// Action
const getThePrivateMessages = (privateMessages) => ({
  type: GET_PRIVATE_MESSAGES,
  payload: privateMessages,
});

// Thunk
export const getPrivateMessages = (userId, receiver_id) => async (dispatch) => {
  const response = await fetch(
    `/api/private_messages/${userId}/${receiver_id}`
  );
  if (response.ok) {
    const privateMessages = await response.json();
    dispatch(getThePrivateMessages(privateMessages));
    return privateMessages;
  } else {
  }
  return null;
};

// Reducer
export default function private_MessagesReducer(
  state = { privateMessages: {} },
  action
) {
  switch (action.type) {
    case GET_PRIVATE_MESSAGES:
      return action.payload.privateMessages;
    default:
      return state;
  }
}
