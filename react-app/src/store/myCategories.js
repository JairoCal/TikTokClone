const GET_USER_CATEGORIES = "privateMessages/GET_USER_CATEGORIES";

// Action
const getTheCategories = (allCategories) => ({
  type: GET_USER_CATEGORIES,
  payload: allCategories,
});

// Thunk
export const getUserCategories = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/categories/${user_id}`);
  if (response.ok) {
    const allCategories = await response.json();
    dispatch(getTheCategories(allCategories));
    return allCategories;
  } else {
  }
  return null;
};

// Reducer
export default function categoriesReducer(
  state = { userCategories: [] },
  action
) {
  switch (action.type) {
    case GET_USER_CATEGORIES:
      return action.payload.categories;
    default:
      return state;
  }
}
