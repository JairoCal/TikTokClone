import React from 'react'
import { useSelector } from "react-redux";


function UserForm() {
      const userId = useSelector((state) => state.userId);

      if(userId) {
          
      }

    return (
        <div>
            <h1>Hi testing</h1>
            {userId && (
                <h2>{userId}</h2>
            )}
        </div>
    )
}

export default UserForm
