import React, { useState, useEffect, useRef, memo } from "react";

import { BiCommentDetail } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

import UpVote from "../../UpVote";
import DropMenu from "./DropMenu";

import "./post.css";

const Post = (props) => {
  const { data, setDeletePost, setPosts, modalCreator, setModalCreator } =
    props;
  let { setPage } = props;

  const refPost = useRef();
  const [limit, setLimit] = useState(true);
  const [btnMenu, setBtnMenu] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);
  const [comments, setComments] = useState(data.comments);

  const sendComment = (e) => {
    e.stopPropagation();
    setModalCreator((state) => ({
      ...state,
      method: "COMMENT",
      post: data.postId,
      open: true,
    }));
  };

  useEffect(() => {
    const w = window.innerWidth;
    if (w <= 768) setBtnMenu(true);
  }, [btnMenu]);

  useEffect(() => {
    if (modalCreator.post === data.postId) {
      if (modalCreator.update) {
        setComments((state) => state + 1);
      }
    }
  }, [modalCreator.update]);

  const callPost = () => {
    if (limit) {
      setLimit(false);
      if (setPage) {
        if (refPost.current) {
          if (
            refPost.current.getBoundingClientRect().top < window.innerHeight
          ) {
            setPage((page) => page + 1);
            setPage = false;
          }
        }
      }
    }
  };
  useEffect(() => {
    window.addEventListener("load", callPost());
    window.addEventListener("scroll", callPost);
    return () => {
      window.removeEventListener("load", callPost);
      window.removeEventListener("scroll", callPost);
    };
  }, []);

  const openPost = () => {
    window.location = `/posts/${data.postId}`;
  };

  return (
    <div
      className='post'
      ref={refPost}
      onMouseEnter={() => setBtnMenu(true)}
      onMouseLeave={() => setBtnMenu(false)}
      onClick={openPost}
    >
      <div className='post-infos' onClick={(e) => e.stopPropagation()}>
        <div className='post-infos-container'>
          <UpVote data={data} margin={true} />
          <div className='comments' onClick={sendComment}>
            <BiCommentDetail style={{ marginRight: 1 }} />
            <p>{comments}</p>
          </div>
        </div>
      </div>
      <div className='post-main'>
        <div
          className='user-post'
          onClick={(e) => {
            e.stopPropagation();
            window.location = `/profile/${data.creatorId}`;
          }}
        >
          <img src={data.creatorImg} alt={data.creatorName} />
          <div className='user-infos-post'>
            <p>{data.creatorName}</p>
            {data.adm ? (
              <span
                className='adm'
                onClick={(e) => {
                  e.stopPropagation();
                  window.location = `/profile/${data.creatorId}`;
                }}
              >
                adm
              </span>
            ) : undefined}
          </div>
        </div>
        <div className='content-post'>
          <p>
            {data.content.substring(0, 200).trim()}{" "}
            {data.content.length > 200 && (
              <span style={{ color: "red", fontWeight: 600 }}>....</span>
            )}
          </p>
        </div>
      </div>

      <button
        className='btn-modal-post'
        style={btnMenu ? { opacity: 1 } : { opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          dropMenu ? setDropMenu(false) : setDropMenu(true);
        }}
      >
        <BsThreeDotsVertical />
      </button>

      {dropMenu && (
        <DropMenu
          {...{
            setDropMenu,
            setDeletePost,
            creatorId: data.creatorId,
            postId: data.postId,
            setPosts,
          }}
        />
      )}
    </div>
  );
};

export default memo(Post);
