import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userFollowCategory } from "../../store/FollowCategory";
import { hideModal2 } from "../../store/modal2";

import "./auth.css";


function UserCategoryForm() {
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
    dispatch(hideModal2());
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

export default UserCategoryForm;
