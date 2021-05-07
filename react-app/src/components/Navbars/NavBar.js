import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav className="bottom_navbar">
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </div>
      {!user && 
        <div>
        <NavLink to="/login" exact={true} activeClassName="active">
        Login
        </NavLink>
        </div>
      }
      {!user && 
        <div>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
        Sign Up
        </NavLink>
        </div>
      }
      {user && 
      <div>
      <NavLink to="/upload" exact={true} activeClassName="active">Upload Video</NavLink>
      </div>
      }
      <div className="user_logout_container">
        <div>
          {user && (
            <div className="user_info">
              <img src={user.profile_image}></img>
              <p>{user.email}</p>
            </div>
          )}
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
