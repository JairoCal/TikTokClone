import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { showModal, setCurrentModal } from "../../store/modal";

import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import VideoForm from "../auth/VideoForm";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const showLogin = () => {
    dispatch(setCurrentModal(LoginForm));
    dispatch(showModal());
  };

  const showSignup =  () => {
    dispatch(setCurrentModal(SignUpForm))
    dispatch(showModal());
  }
  
  const showVideoForm =  () => {
    dispatch(setCurrentModal(VideoForm))
    dispatch(showModal());
  }

  return (
    <nav className="bottom_navbar">
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </div>
      {!user && (
        <div>
          <a onClick={showLogin}>Login</a>
        </div>
      )}
      {!user && (
        <div>
          <a onClick={showSignup}>SignUp</a>
        </div>
      )}
      {user && (
        <div>
          <a onClick={showVideoForm}>Upload Video</a>
        </div>
      )}
      {user && (
        <div className="user_logout_container">
          <div>
            <div className="user_info">
              <img src={user.profile_image}></img>
              <NavLink to="/myprofile" exact={true} activeClassName="active">
                {user.username}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
