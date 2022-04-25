import axios from "axios";
import React, { useEffect, useState } from "react";

import { AiFillFire } from "react-icons/ai";
import { checkToken } from "../../script";

const UpVote = ({ data, margin, comment }) => {
  const [myVote, setMyVote] = useState(false);
  const [upVote, setUpVote] = useState(data.upVote);

  const sendUpVote = (e) => {
    e.stopPropagation();
    checkToken(async (token) => {
      try {
        const url = `${process.env.REACT_APP_API_PORT}/posts/${data.postId}/${
          comment ? `comments/${data.commentId}/` : ""
        }upvote`;
        const res = await axios.patch(url, {}, token);
        setUpVote(res.data.count);
        setMyVote(res.data.upVote);
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    checkToken(async (auth) => {
      try {
        const url = `${process.env.REACT_APP_API_PORT}/posts/${data.postId}/${
          comment ? `comments/${data.commentId}/` : ""
        }upvote`;
        const res = await axios.get(url, {
          ...auth,
          cancelToken: source.token,
        });
        setUpVote(res.data.count);
        setMyVote(res.data.upVote);
      } catch (error) {
        console.error(error.message);
      }
    });
    return () => {
      source.cancel("AXIOS_REQUEST_CANCELLED");
    };
  }, []);

  return (
    <div
      className="upvote"
      style={{ marginBottom: margin ? 15 : undefined, cursor: "pointer" }}
      onClick={sendUpVote}
    >
      <AiFillFire style={myVote && { color: "red" }} />
      <p>{upVote}</p>
    </div>
  );
};

export default UpVote;
