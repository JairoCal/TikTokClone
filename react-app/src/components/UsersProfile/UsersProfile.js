import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function UsersProfile() {
    // user id for the persons page we want to see
  const { user_id } = useParams();
  const dispatch = useDispatch();

  

  return <div></div>;
}

export default UsersProfile;
