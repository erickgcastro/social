import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "./Pages/About";
import Auth from "./Pages/Auth";
import All from "./Pages/All";
import Post from "./Pages/Post";
import Users from "./Pages/Users";
import Home from "./Pages/Home";
import ProfilePage from "./Pages/Profile";
import SettingsPage from "./Pages/Settings";
import Error from "./Pages/error";

const MainRoutes = ({ loading }) => {
  return (
    <Routes>
      <Route path="/" element={<Home loadingPage={loading} />} />
      <Route path="/about" element={<About loadingPage={loading} />} />
      <Route path="/all" element={<All loadingPage={loading} />} />
      <Route path="/users" element={<Users loadingPage={loading} />} />
      <Route path="/posts/:postId" element={<Post loadingPage={loading} />} />
      <Route path="/profile/settings" element={<SettingsPage loadingPage={loading} />} />
      <Route path="/profile/:userId" element={<ProfilePage loadingPage={loading} />}/>
      <Route exact path="/auth" element={<Auth loadingPage={loading} />} />
      <Route path="*" element={<Error/>} />
    </Routes>
  );
};

export default MainRoutes;
