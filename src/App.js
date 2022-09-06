import Navbar from "./components/Navbar";
import LoginCard from "./components/LoginCard";
import React, { useState } from "react";
import AlertMessage from "./components/AlertMessage";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import MyProfile from "./components/MyProfile";
import ProfileSettings from "./components/ProfileSettings";
import UserProfile from "./components/UserProfile";
function App() {
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  let navigate = useNavigate();
  const flashMessage = (message, category) => {
    setMessage(message);
    setCategory(category);
  };
  const login = async (u) => {
    setLoggedIn(true);
    let token = localStorage.token;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const fetchData = async () => {
      const response = await fetch(
        "https://kekambas-blog.herokuapp.com/auth/me",
        { headers: myHeaders }
      );
      if (response.ok) {
        let data = await response.json();
        localStorage.setItem("username", data.username);
      }
    };
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userSearch");
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <>
      <Navbar logout={logout} />

      {message ? (
        <AlertMessage
          message={message}
          category={category}
          flashMessage={flashMessage}
        />
      ) : null}
      <Routes>
        {loggedIn ? (
          <Route
            path="/"
            element={<Home flashMessage={flashMessage} login={login} />}
          />
        ) : (
          <Route
            path="/"
            element={<LoginCard flashMessage={flashMessage} login={login} />}
          />
        )}
        <Route
          path="/profile"
          element={<MyProfile flashMessage={flashMessage} />}
        />
        <Route
          path="/profile/settings"
          element={<ProfileSettings flashMessage={flashMessage} />}
        />
        <Route path="/userSearch" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
