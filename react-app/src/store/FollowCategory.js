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
