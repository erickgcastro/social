import React, { useState, useEffect } from "react";
import "./profile.css";

import User from "./User";
import CreatorModal from "../PostsField/modalCreator";
import DeletePost from "../PostsField/DeletePost";
import Content from "./Content";
import Block from "../Block";

export const PostsContext = React.createContext();
const Profile = ({ data, block, setBlock }) => {
  const [posts, setPosts] = useState([]);
  const [modalCreator, setModalCreator] = useState({
    open: false,
    method: "",
    post: "",
    update: false,
  });
  const [modalDeletePost, setDeletePost] = useState({
    open: false,
    postId: undefined,
  });

  useEffect(() => {
    if (modalDeletePost.open || modalCreator.open) {
      document.body.classList.add("modal-delete-post");
    } else {
      document.body.classList.remove("modal-delete-post");
    }
  }, [modalDeletePost, modalCreator]);

  return (
    <>
      {modalCreator.open && (
        <CreatorModal
          modalCreator={modalCreator}
          setModalCreator={setModalCreator}
          setPosts={setPosts}
        />
      )}
      {modalDeletePost.open && (
        <DeletePost
          modal={modalDeletePost}
          setPosts={setPosts}
          setDeletePost={setDeletePost}
        />
      )}
      <main className="cc">
        <div className="profile">
          <User data={data} block={block} setBlock={setBlock} />
          <PostsContext.Provider
            value={{
              modalCreator,
              setModalCreator,
              setDeletePost,
              setPosts,
              posts,
            }}
          >
            {block ? <Block /> : <Content search={data._id} />}
          </PostsContext.Provider>
        </div>
      </main>
    </>
  );
};

export default Profile;
