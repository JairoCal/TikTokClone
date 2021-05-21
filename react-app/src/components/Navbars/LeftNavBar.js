import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowing } from "../../store/following";
import { showModal, setCurrentModal } from "../../store/modal";

import UserForm from "../auth/UserForm";
import { getId } from "../../store/User";
import { getUserName } from "../../store/UserName";
import { getCategories } from "../../store/Categories";
import { getUserCategories } from "../../store/myCategories";

import "./Navbars.css";

function LeftNavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.following);
  const userCategories = useSelector((state) => state.userCategories);
  const categoriesBoolean = useSelector(
    (state) => state.categoriesBoolean.followingCategories
  );

  useEffect(() => {
    if (user) {
      dispatch(getUserCategories(user.id));
    }
  }, [dispatch, user, categoriesBoolean]);

  useEffect(() => {
    if (user) {
      dispatch(getUserFollowing(user.id));
    }
    dispatch(getCategories());
  }, [dispatch, user]);

  const showUserForm = (e) => {
    dispatch(getUserName(e.target.classList[0]));
    dispatch(getId(e.target.id));
    dispatch(setCurrentModal(UserForm));
    dispatch(showModal());
  };

  return (
    <nav className="left_navbar">
      {user && (
        <div className="left_navbar_header">
          <h1>Followed Users</h1>
        </div>
      )}
      <div className="following_users">
        {user &&
          following.length > 0 &&
          following.map((following) => (
            <div key={following.username} className="followed_name">
              <img
                className="image_radius"
                src={following.profile_image}
                alt=""
              ></img>
              <div>
                <a
                  id={following.id}
                  className={following.username}
                  onClick={showUserForm}
                >
                  @{following.username}
                </a>
              </div>
            </div>
          ))}
      </div>
      {user && (
        <div>
          <div className="categories_followed_header">
            <h1>Categories Followed</h1>
          </div>
          <div className="categories_followed">
            {user &&
              userCategories.length > 0 &&
              userCategories?.map((category) => (
                <p className="navbar_category">{category.genre}</p>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default LeftNavBar;
