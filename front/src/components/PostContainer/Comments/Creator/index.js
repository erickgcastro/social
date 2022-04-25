import axios from "axios";
import React, { useState, useContext } from "react";
import { StoreContext } from "../../../../App";
import { checkToken } from "../../../../script";
import Loading from "../../../LoadingField";
import "./commentCreator.css";

const CommentCreator = ({ setAllComments, postId }) => {
  const { image, name } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [btnForm, setBtnForm] = useState(false);
  const [inputAlert, setInputAlert] = useState(false);

  const sendComment = (e) => {
    e.preventDefault();
    checkToken(async (auth) => {
      if (content.match(/\w/g)) {
        try {
          setLoading(true);
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_PORT}/posts/${postId}/comments`,
            { content },
            auth
          );
          setAllComments((state) => [data, ...state]);
          setContent("");
          setBtnForm(false);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setInputAlert(true);
          console.log(error);
        }
      } else {
        setContent("");
      }
    });
  };

  return (
    <div
      className="field ch ct"
      style={{
        padding: 5,
        marginBottom: 5,
        // width: 650,
        height: loading ? 90 : undefined,
      }}
    >
      <div className="comment-creator">
        {loading ? (
          <Loading top={20} />
        ) : (
          <>
            <img src={image} alt={name} />
            <form
              style={btnForm ? { marginTop: 3 } : undefined}
              onSubmit={sendComment}
            >
              <textarea
                name="content"
                placeholder={!btnForm ? "Comentar" : undefined}
                value={content}
                onChange={(e) => setContent((state) => e.target.value)}
                onFocus={() => setBtnForm(true)}
                onBlur={() => {
                  setInputAlert(false);
                  if (!content.match(/\w/g)) {
                    setTimeout(() => setBtnForm(false), 150);
                  }
                }}
                style={{
                  height: btnForm ? 64 : undefined,
                  border: inputAlert ? "solid 1px var(--red)" : undefined,
                }}
              ></textarea>
              {btnForm && <button type="submit">Enviar</button>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentCreator;
