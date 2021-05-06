import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getUserFollowing} from '../../store/following'

function LeftNavBar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const following = useSelector(state => state.following)

    useEffect(() =>{
        dispatch(getUserFollowing(user.id))
    },[dispatch])


  return (
    <div>
      <div>
        <h1>Following! for user {user.id}</h1>
      </div>
      <div>
        <h1>This is where all I follow will go!</h1>
        <ul>
            {following.length > 0 && following.map((following) => (
                <div>
                    {following.username}
                </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default LeftNavBar;
