import React, { useState, useEffect, useContext } from "react";

import Nav from "./Nav";
import UserPost from "./UserPosts";
import Follo from "./Follo";

import { PostsContext } from "..";
const Content = ({ search, data }) => {
  const { setPosts } = useContext(PostsContext);
  const [navPage, setNavPage] = useState("posts");

  useEffect(() => {
    setPosts([]);
  }, [navPage]);

  return (
    <div className="user-content">
      <Nav setNavPage={setNavPage} navPage={navPage} userId={search} />
      <div className={navPage === "posts" ? "ct qq" : "ct ee"}>
        {/* {
          {
            posts: <UserPost />,
            following: <Follo field={navPage} />,
            followers: <Follo field={navPage} />,
            blacklist: "blacklist",
          }[navPage]
        } */}
        {navPage === "posts" && <UserPost search={search} />}
        {navPage === "following" && <Follo field={navPage} search={search} />}
        {navPage === "followers" && <Follo field={navPage} search={search} />}
        {navPage === "blacklist" && (
          <Follo field={navPage} search={search} block={true} />
        )}
      </div>
    </div>
  );
};

export default Content;
