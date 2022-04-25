import React, { useState } from "react";

import Comments from "./Comments";
import Upvote from "../UpVote";

import "./postContainer.css";

const Post = ({ data }) => {
  const [enter, setEnter] = useState(false);
  return (
    <main
      className='cc'
      style={{ flexDirection: "column", alignItems: "center" }}
    >
      <div className='field'>
        <div className='post-header'>
          <div
            className='post-user-infos'
            onClick={() => (window.location = `/profile/${data.creatorId}`)}
            onMouseEnter={() => setEnter(true)}
            onMouseLeave={() => setEnter(false)}
          >
            <img src={data.creatorImg} alt={`Foto de ${data.creatorName}`} />
            <div
              className='user-area'
              style={{ textDecoration: enter ? "underline" : undefined }}
            >
              <p>{data.creatorName}</p>
            </div>
          </div>
          <Upvote data={data} />
        </div>
        <div className='post-content'>
          <p>{data.content}</p>
        </div>
      </div>
      <div className='post-divider'></div>
      <Comments postId={data.postId} />
    </main>
  );
};

export default Post;
