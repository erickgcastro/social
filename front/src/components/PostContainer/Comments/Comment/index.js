import axios from "axios";
import React, { useState, useEffect, memo, useContext, useRef } from "react";
import { checkToken } from "../../../../script";

import UpVote from "../../../UpVote";
import { StoreContext } from "../../../../App";
import { FiTrash } from "react-icons/fi";
import "./comment.css";

const Comment = ({ data, margin, setAllComments, setPage }) => {
  const refComment = useRef();
  const { adm, _id: userId } = useContext(StoreContext);
  const [enter, setEnter] = useState(true);
  const [ul, setUl] = useState(false);

  const deleteComment = () => {
    checkToken(async (auth) => {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_PORT}/posts/${data.postId}/comments/${data.commentId}`,
          auth
        );
        setAllComments((state) => {
          return state.filter((item) => item.commentId !== data.commentId);
        });
      } catch (error) {
        console.error(error.message);
      }
    });
  };

  const callComments = () => {
    if (setPage) {
      if (refComment.current) {
        if (
          refComment.current.getBoundingClientRect().top < window.innerHeight
        ) {
          setPage((page) => page + 1);
          setPage = false;
        }
      }
    }
  };
  useEffect(() => {
    window.addEventListener("load", callComments());
    window.addEventListener("scroll", callComments);
    return () => {
      window.removeEventListener("load", callComments);
      window.removeEventListener("scroll", callComments);
    };
  }, []);

  return (
    <div
      ref={refComment}
      className="comment"
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      style={margin ? { marginBottom: 20 } : undefined}
    >
      {userId === data.creatorId || adm ? (
        <button
          style={enter ? { opacity: 1 } : { opacity: 0 }}
          onClick={deleteComment}
        >
          <FiTrash />
        </button>
      ) : undefined}

      <div className="s1">
        <div
          className="post-user-infos"
          style={{
            marginBottom: 7,
            textDecoration: ul ? "underline" : undefined,
          }}
          onMouseEnter={() => setUl(true)}
          onMouseLeave={() => setUl(false)}
          onClick={() => (window.location = `/profile/${data.creatorId}`)}
        >
          <img src={data.creatorImg} alt="" style={{ width: 25 }} />
          <div className="user-area" style={{ fontSize: 16 }}>
            <p>{data.creatorName}</p>
          </div>
        </div>

        <div className="comment-content">
          <p>{data.content}</p>
        </div>
      </div>

      <div className="upvote">
        <UpVote data={data} comment={true} />
      </div>
    </div>
  );
};

export default memo(Comment);
