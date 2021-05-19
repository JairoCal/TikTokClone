import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { showModal, setCurrentModal } from "../../store/modal";
import { showModal2, setCurrentModal2 } from "../../store/modal2";

import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import VideoForm from "../auth/VideoForm";

// Materials Icons
import HomeIcon from "@material-ui/icons/Home";
import PublishIcon from "@material-ui/icons/Publish";
import EmailIcon from "@material-ui/icons/Email";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const showLogin = () => {
    dispatch(setCurrentModal2(LoginForm));
    dispatch(showModal2());
  };

  const showSignup = () => {
    dispatch(setCurrentModal2(SignUpForm));
    dispatch(showModal2());
  };

  const showVideoForm = () => {
    dispatch(setCurrentModal(VideoForm));
    dispatch(showModal());
  };

  return (
    <nav className="bottom_navbar">
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          <HomeIcon></HomeIcon>
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
          <a onClick={showVideoForm}>
            <PublishIcon />
          </a>
        </div>
      )}
      {user && (
        <div>
          <NavLink to="/privatemessages">
            <EmailIcon />
          </NavLink>
        </div>
      )}
      {user && (
        <div className="user_logout_container">
          <div>
            <div className="user_info">
              <img className="image_radius" src={user.profile_image}></img>
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
