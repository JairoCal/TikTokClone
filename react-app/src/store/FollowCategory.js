// Thunk
export const videoFollowCategory = (categories, video_id) => async () => {
  console.log(categories, "we are the categories array=========");
  console.log(video_id, "i am the video ID----------------------");
  // const formData = new FormData();
  // formData.append("video_id", video_id);
  // formData.append("categories", categories);
  await fetch(`/api/categories/video/follow/category`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      categories,
      video_id,
    }),
    method: "POST",
  });
};
