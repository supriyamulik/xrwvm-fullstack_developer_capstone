import React, { useState } from 'react';
import "./Register.css";
import Header from '../Header/Header';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(true);

  let register_url = window.location.origin + "/djangoapp/register";

  const register = async (e) => {
    e.preventDefault();

    if (!userName || !password || !firstName || !lastName || !email) {
      alert("All fields are required.");
      return;
    }

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });

    const json = await res.json();

    if (json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
      setOpen(false);
    } else if (json.error === "Already Registered") {
      alert("This username is already taken. Please choose another.");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  if (!open) {
    window.location.href = "/";
  }

  return (
    <div>
      <Header />
      <div className="register_container">
        <h2 className="header">Register</h2>
        <form className="inputs" onSubmit={register}>
          <div className="input">
            <span className="input_field">Username&nbsp;</span>
            <input
              type="text"
              id="username"
              className="input_field"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input">
            <span className="input_field">First Name&nbsp;</span>
            <input
              type="text"
              id="firstname"
              className="input_field"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input">
            <span className="input_field">Last Name&nbsp;</span>
            <input
              type="text"
              id="lastname"
              className="input_field"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input">
            <span className="input_field">Email&nbsp;</span>
            <input
              type="email"
              id="email"
              className="input_field"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <span className="input_field">Password&nbsp;</span>
            <input
              type="password"
              id="password"
              className="input_field"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="submit_panel">
            <input
              className="submit"
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
