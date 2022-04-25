import React, { memo, useContext } from "react";
import { StoreContext } from "../../../../App";

const Nav = ({ setNavPage, navPage, userId }) => {
  const { _id } = useContext(StoreContext);

  return (
    <div className="nav">
      <button
        name="posts"
        className={navPage === "posts" ? "focus" : undefined}
        onClick={(e) => setNavPage(e.target.name)}
      >
        Posts
      </button>
      <button
        name="following"
        className={navPage === "following" ? "focus" : undefined}
        onClick={(e) => setNavPage(e.target.name)}
      >
        Following
      </button>
      <button
        name="followers"
        className={navPage === "followers" ? "focus" : undefined}
        onClick={(e) => setNavPage(e.target.name)}
      >
        Followers
      </button>
      {userId === _id && (
        <button
          name="blacklist"
          className={navPage === "blacklist" ? "focus" : undefined}
          onClick={(e) => setNavPage(e.target.name)}
        >
          Bloqueados
        </button>
      )}
    </div>
  );
};

export default memo(Nav);
