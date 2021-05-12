// constants
const UPLOAD_VIDEO = "video/UPLOAD_VIDEO";

const upload = (user) => ({
  type: UPLOAD_VIDEO,
  payload: user,
});

// thunks
export const uploadVideo = (userId, title, description, video) => async (
  dispatch
) => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("title", title);
  formData.append("description", description);
  if (video) {
    formData.append("video", video);
  }
  const response = await fetch(`/api/videos/uploadvideo/user/${userId}`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  dispatch(upload(data));
};

// reducer
const initialState = { video: null };

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return { user: action.payload };
    default:
      return state;
  }
}
