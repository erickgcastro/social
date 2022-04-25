import axios from "axios";
import React, { useState, useEffect } from "react";
import "./comments.css";

import CommentCreator from "./Creator";
import Comment from "./Comment";
import { checkToken } from "../../../script";
import Loading from "../../LoadingField";
import Wl from "../../Wl";

const Comments = ({ postId }) => {
  const [loading, setloading] = useState(true);
  const [wl, setWl] = useState(true);
  const [allComments, setAllComments] = useState([]);
  const [page, setPage] = useState(1);
  const id = postId;

  useEffect(() => {
    const source = axios.CancelToken.source();
    checkToken(async (auth) => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_PORT}/posts/${id}/comments?page=${page}`,
          { ...auth, cancelToken: source.token }
        );
        setAllComments((state) => [...state, ...data.comments]);
        if (data.comments.length === 0) setWl(false);
        setloading(false);
      } catch (error) {
        console.error(error.message);
      }
    });
    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, [page]);

  return (
    <>
      <CommentCreator setAllComments={setAllComments} postId={postId} />
      <div
        className="field ch"
        style={{
          // width: 650,
          background: loading ? "none" : undefined,
          border: loading ? "none" : undefined,
        }}
      >
        <div className="post-comments">
          {loading ? (
            <Loading top={60} />
          ) : (
            <>
              {allComments.map((item, index) => (
                <Comment
                  data={item}
                  key={item.commentId}
                  setAllComments={setAllComments}
                  margin={index !== allComments.length - 1 ? true : false}
                  setPage={
                    index === allComments.length - 1 ? setPage : undefined
                  }
                />
              ))}
              <Wl loading={wl} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
