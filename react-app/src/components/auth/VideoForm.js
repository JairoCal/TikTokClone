import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../../store/uploadvideo";
import { hideModal, showModal, setCurrentModal } from "../../store/modal";
import VideoCategoryForm from "../auth/VideoCategoryForm";

import { videoFollowCategory } from "../../store/FollowCategory";

import "./VideoForm.css";
import "./auth.css";

function VideoForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const onUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", video);
    if (user) {
      const userId = user.id;
      setImageLoading(true);
      await dispatch(uploadVideo(userId, title, description, video));
      setImageLoading(false);
      // dispatch(setCurrentModal(VideoCategoryForm));
      // dispatch(showModal());
      const el1 = document.getElementById("video_form");
      const el2 = document.getElementById("video_category");
      el1.style.left = "-800px";
      el2.style.left = "0px";
    }
  };

  const video_id = useSelector((state) => state.video.id);

  const categories = useSelector((state) => state.categories);
  const [checkedCategories, setCheckedCategories] = useState([]);

  const onCheck = (e) => {
    let category = Number(e.target.id);
    if (e.target.checked && !checkedCategories.includes(category)) {
      checkedCategories.push(category);
    } else if (!e.target.checked && checkedCategories.includes(category)) {
      checkedCategories.splice(checkedCategories.indexOf(category), 1);
    }
  };

  const onCategoryAdd = (e) => {
    e.preventDefault();
    dispatch(videoFollowCategory(checkedCategories, video_id));
    dispatch(hideModal());
  };

  const moveThis = (e) => {
    e.preventDefault();
    const el1 = document.getElementById("video_form");
    const el2 = document.getElementById("video_category");
    el1.style.left = "-800px";
    el2.style.left = "0px";
  };

  const updateVideo = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="video_form">
      <form id="video_form" className="video_form" onSubmit={onUpload}>
        <div>
          <button onClick={moveThis}>Testing if this moves</button>
        </div>
        <div className="video_input">
          <input
            placeholder="Title"
            type="text"
            name="title"
            onChange={updateTitle}
            value={title}
          ></input>
        </div>
        <div className="video_input">
          <input
            placeholder="Description"
            type="text"
            name="description"
            onChange={updateDescription}
            value={description}
          ></input>
        </div>
        <div className="video_input">
          <input
            type="file"
            name="video_url"
            placeholder="Select Video"
            accept="video/*"
            onChange={updateVideo}
          ></input>
        </div>
        <div className="upload_button">
          <button
            className="private_message_button upload_button"
            type="submit"
            value="Upload"
          >
            Upload
          </button>
        </div>
        {imageLoading && (
          <div className="container">
            <div className="loading">
              <span className="text">Loading</span>
              <div className="percent">
                <div className="progress"></div>
              </div>
            </div>
          </div>
        )}
      </form>
      <form
        id="video_category"
        className="video_category_form"
        onSubmit={onCategoryAdd}
      >
        <div className="checkbox_holder">
          {categories.length > 0 &&
            categories.map((category) => (
              <div className="categories_checkbox" key={category.id}>
                <div>
                  <label className="checkbox_label">
                    <input
                      id={category.id}
                      type="checkbox"
                      onChange={onCheck}
                    ></input>
                    <span></span>
                    <i className="switch"></i>
                  </label>
                </div>
                <div>
                  <label className="category_label">{category.genre}</label>
                </div>
              </div>
            ))}
          <div className="categories_button">
            <button
              className="private_message_button categories_button"
              onClick={onCategoryAdd}
              type="submit"
            >
              Add Categories
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VideoForm;
