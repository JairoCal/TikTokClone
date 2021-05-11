import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserFollowing } from "../../store/following";

import "./Navbars.css";

function LeftNavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.following);

  useEffect(() => {
    if (user) {
      dispatch(getUserFollowing(user.id));
    }
  }, [dispatch]);

  return (
    <nav className="left_navbar">
      <div className="left_navbar_header">
        <h1>Following</h1>
      </div>
      <div>
        {user &&
          following.length > 0 &&
          following.length > 0 &&
          following.map((following) => (
            <div key={following.username} className="followed_name">
              <img src={following.profile_image}></img>
              <NavLink to={`/user/profile/${following.id}`}>
                @{following.username}
              </NavLink>
            </div>
          ))}
      </div>
    </nav>
  );
}

export default LeftNavBar;
