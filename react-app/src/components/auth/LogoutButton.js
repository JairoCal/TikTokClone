import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

import { Unload } from "../../store/friendsfeed";
import { UnloadFollows } from "../../store/following";
import { UnloadCategoriesFeed } from "../../store/foryou";

const LogoutButton = () => {
  let history = useHistory();

  const dispatch = useDispatch();
  const onLogout = async () => {
    await dispatch(logout());
    dispatch(Unload());
    dispatch(UnloadFollows());
    dispatch(UnloadCategoriesFeed());
    history.push("/");
  };

  return (
    <button className="logout_button" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
