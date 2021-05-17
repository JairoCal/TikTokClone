import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { hideModal2 } from "../../store/modal2";

import "./auth.css";

const LoginForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      dispatch(hideModal2());
      history.push("/");
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login_form">
      <div className="square_1 square"></div>
      <div className="square_2 square"></div>
      <div className="square_3 square"></div>
      <div className="square_4 square"></div>
      <div className="square_5 square"></div>
      <h2>Login</h2>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="login_input">
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login_input">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <div className="login_input">
            <input type="submit" value="Login" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
