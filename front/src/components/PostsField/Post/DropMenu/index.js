import axios from "axios";
import React, { useEffect, useRef, useContext } from "react";
import { StoreContext } from "../../../../App";
import { checkToken } from "../../../../script";

import { FiTrash } from "react-icons/fi";
import { FaUserAltSlash } from "react-icons/fa";
import "./dropmenu-post.css";

const DropMenu = (props) => {
  const { setDropMenu, setDeletePost, creatorId, postId, setPosts } = props;
  const refPostMenu = useRef();
  const { _id: userId, adm } = useContext(StoreContext);

  const blockUser = (e) => {
    e.stopPropagation();
    checkToken(async (auth) => {
      try {
        await axios.patch(
          `${process.env.REACT_APP_API_PORT}/users/field/blacklist/${creatorId}`,
          {},
          auth
        );
        setPosts((posts) => {
          const filter = posts.filter((item) => item.creatorId !== creatorId);
          return filter;
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    const bodyClick = () => setDropMenu(false);
    const scroll = () => setDropMenu(false);
    window.addEventListener("scroll", scroll);
    document.body.addEventListener("click", bodyClick);
    return () => {
      document.body.removeEventListener("click", bodyClick);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <div
      className="dropmenu-post"
      ref={refPostMenu}
      onClick={(e) => e.stopPropagation()}
    >
      {creatorId === userId || adm ? (
        <button
          style={creatorId !== userId ? { marginBottom: 5 } : undefined}
          onClick={(e) => {
            e.stopPropagation();
            setDeletePost({ open: true, postId });
          }}
        >
          <FiTrash /> Deletar
        </button>
      ) : undefined}

      {creatorId !== userId ? (
        <button onClick={blockUser}>
          <FaUserAltSlash /> Bloquear usuário
        </button>
      ) : undefined}
    </div>
  );
};

export default DropMenu;
