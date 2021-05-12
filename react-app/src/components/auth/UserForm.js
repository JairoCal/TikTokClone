import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { hideModal } from "../../store/modal";

function UserForm() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const onProfile = () => {
    dispatch(hideModal());
  };

  return (
    <div>
      <h1>Hi testing</h1>
      {userId && (
        <NavLink to={`/user/profile/${userId}`}>
          <button onClick={onProfile}>Profile Page</button>
        </NavLink>
      )}
    </div>
  );
}

export default UserForm;
