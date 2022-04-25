import React, { useState, useEffect, memo } from "react";

// COMPONENTES
import Wl from "../Wl";
import CreatorModal from "./modalCreator";
import CreatorField from "./CreatorField";
import Post from "./Post";
import SideContainer from "./SideContainer";
import LoadingField from "../LoadingField";
import DeletePost from "./DeletePost";
import Error from "../Error";

import "./postField.css";

const PostsField = (props) => {
  const { loading, posts, setPosts, setPage, creator, wl } = props;
  const [fc, setFc] = useState(false);

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
        <div className="ac">
          <div className="posts-container">
            {loading ? (
              <LoadingField />
            ) : (
              <>
                {creator && (
                  <CreatorField setModalCreator={setModalCreator} fc={fc} />
                )}
                {posts.map((item, index) => (
                  <Post
                    key={item.postId + item.creatorId + index}
                    data={item}
                    setModalCreator={setModalCreator}
                    modalCreator={modalCreator}
                    setPosts={setPosts}
                    setDeletePost={setDeletePost}
                    setPage={index === posts.length - 1 ? setPage : undefined}
                  />
                ))}
                <Wl loading={wl} />
                {!wl && posts.length === 0 && (
                  <Error post={true} setFc={setFc} />
                )}
              </>
            )}
          </div>
          <SideContainer />
        </div>
      </main>
    </>
  );
};

export default memo(PostsField);
