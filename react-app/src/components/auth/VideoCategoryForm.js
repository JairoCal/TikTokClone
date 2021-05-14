import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { videoFollowCategory } from "../../store/FollowCategory";
import { hideModal} from "../../store/modal";


function VideoCategoryForm() {
  const dispatch = useDispatch();
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

  return (
    <div>
      <form onSubmit={onCategoryAdd}>
        {categories.length > 0 &&
          categories.map((category) => (
            <div key={category.id}>
              <input
                id={category.id}
                type="checkbox"
                onChange={onCheck}
              ></input>
              <label>{category.genre}</label>
            </div>
          ))}
        <button onClick={onCategoryAdd}>Add to Category</button>
      </form>
    </div>
  );
}

export default VideoCategoryForm;
