// constants
const UPLOAD_VIDEO = "video/UPLOAD_VIDEO";

const upload = (video) => ({
  type: UPLOAD_VIDEO,
  payload: video,
});

// thunks
export const uploadVideo =
  (userId, title, description, video) => async (dispatch) => {
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

// Reducer
export default function uploadReducer(state = { video: {} }, action) {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return action.payload;
    default:
      return state;
  }
}
