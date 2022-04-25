import axios from "axios";
import React from "react";
import { checkToken } from "../../../script";
import "./delete-post.css";

import ModalFocus from "../ModalFocus";

const DeletePost = ({ modal, setDeletePost, setPosts }) => {
  const sendDeletePost = () => {
    checkToken(async (token) => {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_PORT}/posts/${modal.postId}`,
          token
        );
        setPosts((state) => {
          const filt = state.filter((itme) => itme.postId !== modal.postId);
          return [...filt];
        });
        setDeletePost((state) => ({
          ...state,
          open: false,
          postId: undefined,
        }));
      } catch (error) {
        console.error(error);
        setDeletePost((state) => ({
          ...state,
          open: false,
          postId: undefined,
        }));
      }
    });
  };

  return (
    <ModalFocus
      event={() => setDeletePost((state) => ({ ...state, open: false }))}
    >
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <p>Excluir post?</p>
        <div className="confirm-btn">
          <button
            className="no"
            onClick={() =>
              setDeletePost((state) => ({ ...state, open: false }))
            }
          >
            Cancelar
          </button>
          <button className="yes" onClick={sendDeletePost}>
            Excluir
          </button>
        </div>
      </div>
    </ModalFocus>
  );
};

export default DeletePost;
