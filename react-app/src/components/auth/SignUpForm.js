import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { hideModal2, showModal2, setCurrentModal2 } from "../../store/modal2";
import UserCategoryForm from '../auth/UserCategoryForm'

import "./auth.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    if (password === repeatPassword) {
      await dispatch(
        signUp(username, email, firstName, lastName, about, image, password)
      );
      await dispatch(hideModal2());
      dispatch(setCurrentModal2(UserCategoryForm))
      dispatch(showModal2())
      // history.push("/");
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateAbout = (e) => {
    setAbout(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup_form">
      <div className="square_1 square"></div>
      <div className="square_2 square"></div>
      <div className="square_3 square"></div>
      <div className="square_4 square"></div>
      <div className="square_5 square"></div>
      <h2>SignUp</h2>
      <form onSubmit={onSignUp}>
        <div></div>
        <div className="signup_input">
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="signup_input">
          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="signup_input">
          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div className="signup_input">
          <input
            placeholder="Last Name"
            type="text"
            name="lastName"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
        <div className="signup_input">
          <textarea
            placeholder="About"
            name="about"
            onChange={updateAbout}
            value={about}
          ></textarea>
        </div>
        <div className="signup_div_image">
          <input
            name="profile_image"
            type="file"
            placeholder="Select Image"
            accept="image/*"
            onChange={updateImage}
            className="signup_input_image"
          ></input>
        </div>
        <div className="signup_input">
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="signup_input">
          <input
            placeholder="Repeat Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="signup_input">
          <input type="submit" value="SignUp" />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
