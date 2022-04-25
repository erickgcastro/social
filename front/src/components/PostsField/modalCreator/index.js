import axios from "axios";
import React, { useState } from "react";
import { checkToken } from "../../../script";

import ModalFocus from "../ModalFocus";
import LoadingField from "../../LoadingField";

import { IoMdClose } from "react-icons/io";

import "./modalCreator.css";

const CreatorModal = ({ setModalCreator, setPosts, modalCreator }) => {
  const [alertInputText, setAlertInputText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const sendPost = (e) => {
    e.preventDefault();
    if (content.match(/\w/g)) {
      checkToken(async (auth) => {
        if (modalCreator.method === "POST") {
          try {
            setLoading(true);
            const { data } = await axios.post(
              `${process.env.REACT_APP_API_PORT}/posts/`,
              { content },
              auth
            );
            const newPost = await axios.get(
              `${process.env.REACT_APP_API_PORT}/posts/${data.newPost._id}`,
              auth
            );
            setPosts((posts) => [newPost.data[0], ...posts]);
            setLoading(false);
            setModalCreator(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
            setAlertInputText(true);
          }
        } else if (modalCreator.method === "COMMENT") {
          try {
            setLoading(true);
            await axios.post(
              `${process.env.REACT_APP_API_PORT}/posts/${modalCreator.post}/comments`,
              { content },
              auth
            );
            setModalCreator((state) => ({ ...state, update: true }));
            setLoading(false);
            setModalCreator(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
            setAlertInputText(true);
          }
        }
      });
    } else {
      setAlertInputText(true);
    }
  };

  return (
    <ModalFocus
      event={() =>
        !loading
          ? setModalCreator((state) => ({ ...state, open: false }))
          : undefined
      }
    >
      <form onSubmit={sendPost}>
        <div className="creator-container" onClick={(e) => e.stopPropagation()}>
          {loading ? (
            <LoadingField top={130} />
          ) : (
            <>
              <div className="creator-description">
                <p>
                  {modalCreator.method === "POST" ? "Criar post" : "Comentar"}
                </p>
                <button
                  className="close-creator"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalCreator(false);
                  }}
                >
                  <IoMdClose />
                </button>
              </div>
              <textarea
                name="content"
                id="content"
                placeholder="No que você está pensando?"
                style={
                  alertInputText ? { borderColor: "var(--red)" } : undefined
                }
                value={content}
                onFocus={() => setAlertInputText(false)}
                onChange={(e) => setContent(e.target.value)}
                autoFocus
              ></textarea>
              <button type="submit">Enviar</button>
            </>
          )}
        </div>
      </form>
    </ModalFocus>
  );
};

export default CreatorModal;
