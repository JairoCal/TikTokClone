import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userFollowCategory } from "../../store/FollowCategory";
import { hideModal2 } from "../../store/modal2";
import { getUserCategories } from "../../store/myCategories";

import "./auth.css";

function UserCategoryForm() {
  let history = useHistory();
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.session.user.id);

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
    dispatch(userFollowCategory(checkedCategories, user_id));
    dispatch(getUserCategories(user_id));
    history.push("/");
    dispatch(hideModal2());
  };
  return (
    <form
      id="video_category"
      className="user_category_form"
      onSubmit={onCategoryAdd}
    >
      <div className="checkbox_holder">
        {categories.length > 0 &&
          categories.map((category) => (
            <div
              id="categories_checkbox"
              className="categories_checkbox"
              key={category.id}
            >
              <label className="checkbox_label">
                <input
                  id={category.id}
                  type="checkbox"
                  onChange={onCheck}
                ></input>
                <span></span>
                <i className="switch"></i>
              </label>
              <div>
                <label className="category_label">{category.genre}</label>
              </div>
            </div>
          ))}
        <div className="category_label">
          <button
            className="private_message_button categories_button"
            onClick={onCategoryAdd}
          >
            Follow Categories
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserCategoryForm;
