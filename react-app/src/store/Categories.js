const GET_CATEGORIES = "privateMessages/GET_CATEGORIES";

// Action
const getTheCategories = (allCategories) => ({
  type: GET_CATEGORIES,
  payload: allCategories,
});

// Thunk
export const getCategories = (userId, receiver_id) => async (dispatch) => {
  const response = await fetch(
    `/api/categories/all`
  );
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
  state = { categories: [] },
  action
) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload.categories;
    default:
      return state;
  }
}
