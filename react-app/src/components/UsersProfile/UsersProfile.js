import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../store/UserInfo";

function UsersProfile() {
  // user id for the persons page we want to see
  const { user_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(user_id));
  }, [dispatch, user_id]);

  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
}

export default UsersProfile;
